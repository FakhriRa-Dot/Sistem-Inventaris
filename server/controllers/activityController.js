const LoginActivity = require("../models/Activity");

exports.logLogin = async (req, res) => {
  try {
    const { user_id, name, role } = req.body;

    const log = await LoginActivity.create({ user_id, name, role });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLogins = async (req, res) => {
  try {
    const logs = await LoginActivity.find().sort({ login_time: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
