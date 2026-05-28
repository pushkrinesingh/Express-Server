import User from "../model/schema.js";

export async function GetUsers(req, res) {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function CreateUser(req, res) {
  try {
    const newuser = new User(req.body);
    await newuser.save();
    res.status(201).json({
      message: "User added successfully",
      data: newuser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function CreateBulkUsers(req, res) {
  try {
    const users = await User.insertMany(req.body);

    res.status(201).json({
      message: "Bulk users added successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function UpdateUser(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

export async function DeleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}
