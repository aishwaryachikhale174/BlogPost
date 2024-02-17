import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import createError from '../utils/error.js'
import jwt from "jsonwebtoken";


export const Register = async(req, res, next) => {
    try {
        console.log(req.body)

        let username = req.body.username.toString();
        let email = req.body.email.toString();

        const userExist = await User.findOne({username: username}, {email: email})
        if(userExist){
            return res.status(422).json("User or email already exists")
        }


        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.password.toString(), salt);

        console.log(password);

        const newUser = new User({username, email, password});
        console.log(newUser)

        await newUser.save();

        res.status(200).json("User has been created")
        console.log(res)
    } catch(error) {
        console.log(error);
        next(createError(404, error));
    }
}

export const Login = async(req, res, next) => {
    try{
        console.log(req.body)
        let email = req.body.email.toString();

       const user = await User.findOne({email: req.body.email.toString()});
       if(!email) return next(createError(404, "User not found"));


       const isPasswordCorrect = await bcrypt.compare( req.body.password.toString(), user.password)

       if(!isPasswordCorrect) return next(createError(400, "Wrong user or password"));

       const data = {username: user.username, email: user.email};

       const jwt_data = {id: user._id, username: user.username};
       const token = jwt.sign(jwt_data, process.env.SESSION_SECRET_KEY);
       
    //    const cookieOptions = {
    //         httpOnly: true,
    //         expires: new Date(Date.now() + 15*60*1000) 
    //     }
        
        res.cookie(process.env.BLOGAPP_SESSION.toString(), token);
       return res.status(200).json({status:1, id: user._id, username: user.username});

    } catch(error) {
        next(createError(400, error.toString()))
    }
}

export const Profile = (req, res, next) => {
    try{
        if(res.cookies === null) {
            return next(createError(400, "Session got expired!!. Please login in"));
        }
        
        const sessionToken = req.cookies.SESSION_TOKEN;

        jwt.verify(sessionToken, process.env.SESSION_SECRET_KEY, (err, info) => {
            if(err) return next(createError(400, err.toString()));
            return res.json(info);

        });

    } catch(error) {
        next(error);
    }
}

export const Logout = (req, res, next) => {
    try{
        res.cookie(process.env.BLOGAPP_SESSION.toString(), "").json("ok")
    } catch(err) {
        next(err)
    }
}

