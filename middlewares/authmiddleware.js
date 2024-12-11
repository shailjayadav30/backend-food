
import jwt from "jsonwebtoken";

export const jwtverifytoken = async (req, res, next) => {
  try {
    let token = req.headers.authorizaion?.split("")[1];
    if (!token) {
      return res.status(401).json({
        msg: "No token authorization failed",
      });
    }
    const verifytoken=jwt.verify(token,process.env.JWT_TOKEN)
    req.body=verifytoken
    next()
  } catch (error) {
    res.status(401).json({
        msg:"Invalid or expired token"
    })
  }
};
