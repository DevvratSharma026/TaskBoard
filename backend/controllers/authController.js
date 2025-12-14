const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match' });
        }
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'User already exists' });

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashed });

        const payload = { email: user.email, userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        user.password = undefined;
        user.token = token;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        });

        return res.status(201).json({ success: true, token, user });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, message: 'All fields required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const payload = { email: user.email, userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

        user.password = undefined;
        user.token = token;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        });

        return res.status(200).json({ success: true, token, user });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    try {
        //accept token from header or cookie
        const header = req.headers.authorization;
        const cookieToken = req.cookies && req.cookies.token;
        let token = null;

        if (header && header.startsWith('Bearer ')) {
            token = header.split(" ")[1];
        } else if (cookieToken) {
            token = cookieToken;
        }

        // if no token treat it as already logout
        if (!token) {
            //still clear the token
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax"
            })
            return res.status(200).json({
                success: true,
                message: "user logged out"
            })
        }

        //try to decode to find user 
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await User.findById(decode.userId);
            if (user) {
                //remove token form DB
                user.token = null;
                await user.save();
            }
        } catch (err) {
            //token invalid/expired - we will still clear cookie below
        }

        //clear cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : "lax"
        });

        return res.status(200).json({
            success: true,
            message: "User logged out"
        });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ success: false, message: 'Server error during logout' });
    }
}