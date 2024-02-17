import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs';
import Post from "./Models/PostModel.js";
import jwt from "jsonwebtoken";
import path from 'path';



const upload = multer({ dest: 'uploads/' });

const portNum = 7078;

const app = express();

const __dirname = path.resolve()



dotenv.config();

const connect = async () =>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to Mongodb")
    } catch (error) {
    throw(error);
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
});



// Middleware
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use("/api/auth", AuthRoute);
app.use('/uploads', express.static(path.resolve() + '/uploads'));


app.use((err, req, res, next) => {
    const errStatus = err.status || 500;
    const errMessage = err.message || 'something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMessage,
        stack: err.status,     
     })

});

app.post("/post", upload.single('file'), async (req, res, next) => {
    try{
        const {originalname, path} = req.file;
        const parts = originalname.split(".")
        const ext = parts[parts.length-1];
        const newPath = path + "." + ext
        fs.renameSync(path, newPath);

        const sessionToken = req.cookies.SESSION_TOKEN;
        jwt.verify(sessionToken, process.env.SESSION_SECRET_KEY, async (err, info) =>
         {
            if(err) return next(createError(400, err.toString()));

            const{title, summary, content} = req.body
            const PostDoc=  await Post.create({
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author: info.id
                })
                res.json(PostDoc)

        });   
    } catch(err) {
            return next(err);
        }
})

app.get("/post", async(req, res, next) => {
    try {
      res.json(await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20))
    } catch(err){
        return next(err)
    }
})


app.put('/post', upload.single('file'), async(req, res) =>{
    let newPath = null;
  if(req.file)
   {
    const {originalname, path} = req.file;
    const parts = originalname.split(".")
    const ext = parts[parts.length-1];
    newPath = path + "." + ext
    fs.renameSync(path, newPath)
  }
  
  const sessionToken = req.cookies.SESSION_TOKEN;
  jwt.verify(sessionToken, process.env.SESSION_SECRET_KEY, async (err, info) =>
     {     
        if(err) throw err;
        const{id, title, summary, content} = req.body
        const PostDoc = await Post.findById(id)
        console.log(PostDoc)
        const isAuthor = JSON.stringify(PostDoc.author) === JSON.stringify(info.id)
        if(!isAuthor) {
            return res.status(400).json("You are not the author")
        } 
        const update = await PostDoc.updateOne({
            title, 
            summary,
            content, 
            cover: newPath ? newPath : PostDoc.cover
        })
        res.json(update)
    })
   
});
        


 

// To see entire post on seperate page
app.get("/post/:id", async(req, res, next) => {
    const{id} = req.params;
    try{
       const postDoc = await Post.findById(id).populate('author', ['username'] )
       res.json(postDoc)
    } catch(err) {
        next(err)
    }
})

app.listen(portNum, ()=> {
    connect();
    console.log("connected to backend")
})