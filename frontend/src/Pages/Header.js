import axios from "axios";
import { useEffect, useContext } from "react";
import {Link, useNavigate} from "react-router-dom"
import { UserContext } from "./UserContext";



export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext)

  const navigate = useNavigate();
    
  useEffect(() => {
    const axiosInstance = axios.create({withCredentials: true, headers: {
      "Content-type": "application/json",
    }})

    axiosInstance.get("http://localhost:7078/api/auth/profile")
    .then(res => {
      console.log(res.data)
      if(res.data != null) {
        setUserInfo(res.data);
      } else {
        navigate("/login");
      }
    }).catch(error => {
      navigate("/login");
    })
    
    }, [])
   
    const logout = () => {
      const axiosInstance = axios.create({withCredentials: true})

      axiosInstance.post("http://localhost:7078/api/auth/logout", null)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      setUserInfo(null)
      navigate("/login")

    }
    const username = userInfo?.username

    return(
        <header>
        <Link to ="" className="logo">MyBlog</Link>
        <nav>
          {username && (
            <>
              <Link to = "/create"><button>Create Post</button></Link> 
              <button onClick = {logout}>Logout</button>
            </>
          )}
          {!username && (
            <>
              <Link to ="/login"><button>Login</button></Link>
              <Link to ="/register"><button>Register</button></Link>
            </>
          )}
          {/* {username} */}
          
        </nav>
      </header>
      
    )
}