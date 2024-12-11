import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  username: { type: String, required: true, min: 3, max: 50 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8, max: 50 },
  role: { type: String, required: true},

});

const User = mongoose.model("User", userschema);
export default User;




// Zod is for input validation.
// Mongoose is for database schema and operations.