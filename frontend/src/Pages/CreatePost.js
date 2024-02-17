import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import EditorToolbar, { modules, formats } from "../Utilities/EditorToolbar"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function UpdatePost() {
    const[title, setTitle] = useState("");
    const[summary, setSummary] = useState("");
    const[content, setContent] = useState("");
    const[files, setFiles] = useState("");
    
    const navigate = useNavigate();
    
    const createNewPost = (ev) => 
    {
        const data = new FormData();
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        ev.preventDefault();

         const axiosInstance = axios.create({withCredentials: true, headers: {
        "Content-type": "multipart/form-data",
        }})

        
        axiosInstance.post('http://localhost:7078/post', data)
        .then(res => 
            {
                // console.log(res.data)
                if(res.status === 200) 
                {
                    navigate("/")
                }
               
            })      
        .catch(err => console.log(err))
    }

    return(
        <form onSubmit = {createNewPost}> 
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
            {/* <ReactQuill value = {content}  />     */}
            {/* <ReactQuill theme="snow" value={content} onChange={setContent} /> */}

            <EditorToolbar />
            <ReactQuill
                theme="snow"
                value={content}
                onChange={newValue => setContent(newValue)}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
            />

            <button style = {{marginTop: "10px", width: "100%", color: "#fff", border: " 2px solid black", backgroundColor: "grey"}}>Create post</button>
            
        </form>
    )
}

