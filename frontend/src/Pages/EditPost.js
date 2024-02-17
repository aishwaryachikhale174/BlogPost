import { useEffect, useState } from "react";
import React from 'react'
import ReactQuill from "react-quill"
import EditorToolbar, { modules, formats } from "../Utilities/EditorToolbar"
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const EditPost = () => {
    const{id} = useParams();
    const navigate = useNavigate();
    const[title, setTitle] = useState("");
    const[summary, setSummary] = useState("");
    const[content, setContent] = useState("");
    const[files, setFiles] = useState("");

    useEffect(()=> {
        const axiosInstance = axios.create({withCredentials: true, headers: {
            "Content-type": "application/json",
        }});
        axiosInstance.get(`http://localhost:7078/post/${id}`)
        .then(res => {
            setTitle(res.data.title)
            setSummary(res.data.summary)
            setContent(res.data.content)
        })
        .catch(err => console.log(err))

    }, [])

    function updatePost(ev){
        ev.preventDefault()
        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set("id", id)
        if(files?.[0]) {
            data.set('file', files?.[0]);
        }

        const axiosInstance = axios.create({withCredentials: true, headers: {
            "Content-type": "multipart/form-data",
            }});

            axiosInstance.put('http://localhost:7078/post', data)
            .then(res => 
                {
                    console.log (res.data)
                    if(res.status === 200) 
                    {
                        navigate('/post/'+id)
                    }
                    console.log(res);
                   
                })      
            .catch(err => console.log(err))
    
       

    }

  return (
    <form onSubmit = {updatePost}> 
            <div className = "title mb-3">
                <input type = "text" 
                        placeholder = {"Title"}  
                        value = {title} 
                        onChange = {ev => setTitle(ev.target.value)}/>
            </div>
            <div className = "summary mb-3">
                <input type = "summary"
                        placeholder = {"Summary"}
                        value = {summary} 
                        onChange = {ev => setSummary(ev.target.value)}  />
            </div>
            <div className = "file mb-3">
                 <input type = "file" 
                        onChange = {ev => setFiles(ev.target.files)}/> 
            </div>  
            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={content}
                onChange={newValue => setContent(newValue)}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />

            <button style = {{marginTop: "10px", width: "100%", color: "#fff", border: " 2px solid black", backgroundColor: "grey"}}>Update post</button>
            
        </form>      
  )
}

export default EditPost;