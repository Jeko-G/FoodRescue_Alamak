import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  NIK: {
    type: String,
    unique: true,
    sparse: true
  },
  full_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Email tidak valid"]
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  address: String,
  birthdate: Date,
  current_employment: String,
  salary: {
    type: Number,
    default: 0
  },
  marriage_status: {
    type: String,
    default: "Single"
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Users = mongoose.model("Users", userSchema);

export default Users;