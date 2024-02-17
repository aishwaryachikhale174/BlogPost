import Post from '../BlogPost'
import {useEffect, useState} from "react";
import axios from "axios";
export default function IndexPage() {

    const[posts, setPosts] = useState([]);
    useEffect(() => 
    {
        const axiosInstance = axios.create({withCredentials: true, headers: {
            "Content-type": "application/json",
        }});

        axiosInstance.get("http://localhost:7078/post")
        .then((res) => 
        {
            console.log(res.data)
            setPosts(res.data)
        })
        .catch(err => console.log(err));
    }, []);
    return(
        <>
         
        {posts.length > 0 && posts.map(post => (
          
            <Post key = {post._id} {...post}/>

        ))}
         
        </>
    )
}