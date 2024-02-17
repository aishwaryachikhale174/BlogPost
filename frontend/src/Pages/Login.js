import {useContext, useState, useEffect} from 'react';
import Validation from './LoginValidation'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import { UserContext } from './UserContext';


export default function Login() {
    // useEffect(()=> {
    //     if(userInfo != null) {
    //         navigate("/")
    //     }
    // }, [])

    const {userInfo} = useContext(UserContext)
    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const{setUserInfo} = useContext(UserContext)
    const navigate = useNavigate();
    
    const[errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values))
        console.log(values)
        if (errors.email === "" && errors.password === "") {
            const axiosInstance = axios.create({withCredentials: true, headers: {
                "Content-type": "application/json",
            }})

            axiosInstance.post('http://localhost:7078/api/auth/login', values).then(res => {
                if(res.data != null && res.data.status === 1) {
                    setUserInfo(res.data)
                    navigate("/")
                }
                else{
                    alert("No record exited")
                }  
            }).catch(err => console.log(err));   
        }
    }
    return(
        
        <div className = "d-flex justify-content-center align-item-center bg-white vh-50  ">
            <div className = 'p-3 rounded w-75 border border-dark'>
                <h2>Sign-In</h2>
                <form action = "" onSubmit = {handleSubmit}>
                    <div className = "mb-3" > 
                        <label htmlFor = "email" ><strong>Email</strong></label>
                        <input type = "text" placeholder = "Enter your email" 
                        onChange = {handleInput} name = "email" className = "form-control"/>
                        {errors.email && <span className = 'text-danger'>{errors.email}</span>}
                    </div>
                    <div className= "mb-3">
                        <label htmlFor = "password" ><strong>Password</strong></label>
                        <input type = "password" placeholder = "Enter your password"
                        onChange = {handleInput} name = "password" className = "form-control "/>
                        {errors.password && <span className = 'text-danger'>{errors.password}</span>}
                    </div>
                    <button type = "submit" className = "btn btn-success w-100 ">Login</button>
                    <p>You are aggred to our terms and conditions</p>
                    <Link to = "/register" className = "btn btn-default border bg-light text-decoration-zero w-100">Create Account</Link>
                </form>
            </div>
        </div>
    )
}