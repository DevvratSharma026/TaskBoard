const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.status(400).json({ success: false, message: 'All fields are required' });

        const task = await Task.create({ user: req.user.userId, title, content });
        res.status(201).json({ success: true, task });
    } catch (err) {
        console.error('createTask error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = { user: req.user.userId };
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { content: { $regex: q, $options: 'i' } }
    ];
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    console.error('getTasks error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(404).json({
                success: false,
                message: "Title or content is required to update the task."
            })
        }

        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            content,
            updatedAt: Date.now()
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (err) {
        console.error('updateTask error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        res.status(200).json({ success: true, message: 'Task deleted' });
    } catch (err) {
        console.error('deleteTask error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
