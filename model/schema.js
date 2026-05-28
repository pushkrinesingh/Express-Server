import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First Name Is Required"],
    minlength: 3,
    maxlength: 30,
    match: [/^[A-Za-z]+$/, "First name should contain only alphabets"],
  },
  last_name: {
    type: String,
    required: [true, "Last Name Is Required"],
    minlength: 3,
    maxlength: 30,
    match: [/^[A-Za-z]+$/, "Last name should contain only alphabets"],
  },

  email: {
    type: String,
    required: [true, "Email Is Required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
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

const User = mongoose.model("user", userSchema);

export default User;