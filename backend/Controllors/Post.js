
// import Post from "./Models/PostModel.js";
// import fs from 'fs';

// export const Post = (req, res, next) => {
//     try{
//         const {originalname, path} = req.file;
//         const parts = originalname.split(".")
//         const ext = parts[parts.length-1];
//         fs.renameSync(path, path + "." + ext)
//         res.json({ext});
//     } catch(err) {
//         return next(err);
//     }
// }
