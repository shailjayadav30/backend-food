
import express from "express"
import {login,signup} from "../controllers/authcontroller.js"
import {jwtverifytoken}  from "../middlewares/authmiddleware.js"

const router=express.Router()
router.post("/signup",signup)

router.post("/login",login)

router.get("/protected",jwtverifytoken,(req,res)=>{
    res.status(200).json({
        msg: "You have access to this protected route!",
        user: req.user,
    })
})
export default router