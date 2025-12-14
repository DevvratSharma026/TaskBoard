// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const taskCtrl = require('../controllers/taskController');

router.use(auth);

router.post('/create', taskCtrl.createTask);
router.get('/getTasks', taskCtrl.getTasks);
router.put('/updateTask/:id', taskCtrl.updateTask);
router.delete('/deleteTask/:id', taskCtrl.deleteTask);

module.exports = router;
