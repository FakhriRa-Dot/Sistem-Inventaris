const User = require("../models/User");
const bcrypt = require("bcryptjs");

const tambahUser = async (req, res) => {
  try {
    const { user_id, name, email, password, unit, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const lastUser = await User.findOne().sort({ nomor: -1 });
    const nextUser = lastUser ? lastUser.nomor + 1 : 1;

    const user = new User({
      nomor: nextUser,
      user_id,
      name,
      email,
      password,
      unit,
      role,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        nomor: user.nomor,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        unit: user.unit,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "User creation failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -__v");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

const hapusUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
};

module.exports = {
  tambahUser,
  getAllUsers,
  hapusUser,
  updateUser,
};
