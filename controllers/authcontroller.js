import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import { z } from "zod";

const userschema = z.object({
  username: z
    .string()
    .min(3, { message: "Must be 3 or more characters " })
    .max(50),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Message must be atleast 8 characters" })
    .max(50),
    role:z.enum(["admin","user"]).default("user")
});

export const signup = async (req, res) => {
  try {
    const validatedata=userschema.parse(req.body)
    const { username,  email, password,role } = validatedata
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(400).json({
        msg: "User allready exists",
      });
    }
    const hashedpasss = await bcrypt.hash(password, 10);
    const newuser = new User({
      username,
      email,
      password: hashedpasss,
      role,
    });
    await newuser.save();

    res.status(201).json({
      msg: "User registered successfully",
    });
  } catch (err) {
    if (err.errors) {
      const messages = err.errors.map((e) => 
         e.message,
      );
      return res.status(400).json({ msg: "Validation Error", errors:messages });
    }
    // console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(400).json({
        msg: "User does not exist. Please signup first.",
      });
    }
    const ispassvalid = await bcrypt.compare(password, existinguser.password);
    if (!ispassvalid) {
      return res.status(400).json({
        msg: "invalid email or password",
      });
    }
 const token=jwt.sign(
  {id:existinguser._id,email:existinguser.email},
  process.env.JWT_TOKEN,
  {expiresIn:"1h"}
 )

    res.status(200).json({
      msg: "Login successful",
      token:token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
};



