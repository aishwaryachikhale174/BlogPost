import express from "express";
import { Login,  Register, Profile, Logout } from "../Controllors/Auth.js";

const router = express.Router();

// Registraion
router.post("/register", Register)

// Login
router.post("/login", Login)

// Jwt verify
router.get("/profile" , Profile)

// Logout User
router.post("/logout" , Logout)




export default router;