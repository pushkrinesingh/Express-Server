import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const connect = mongoose
  .connect(
    "mongodb+srv://pushkrinesingh:pushkrine123@cluster0.lh0xwp8.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("DB Connection: OK, Server Running: OK");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  ip_address: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("user", userSchema);

app.get("/", async (req, res) => {
  const users = await user.find();
  return res.json(users);
});


app.post("/users", async (req, res) => {
  const newuser = new user(req.body);

  await newuser.save();

  res.status(201).json({
    message: "User added successfully",
    data: newuser,
  });
});

app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const updatedData = req.body;

  console.log(updatedData);

  const users = await user.findById(req.params.id);

  if (!users) {
    return res.json({
      message: "user not found",
    });
  }

  users.first_name = updatedData.first_name;
  users.last_name = updatedData.last_name;
  users.email = updatedData.email;
  users.gender = updatedData.gender;
  users.ip_address = updatedData.ip_address;
  console.log(users);

  await users.save();

  res.json({
    message: "Data are updated",
    data: users,
  });
});

app.delete("/users/:id", async (req, res) => {
  const deletedUser = await user.findByIdAndDelete(req.params.id);

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json({
    message: "User deleted successfully",
    data: deletedUser,
  });
});

app.listen(8000, () => console.log("server has started"));