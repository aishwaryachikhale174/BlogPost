
import './App.css';
import { BrowserRouter,Routes, Route} from "react-router-dom"
import Layout from "./Pages/Layout"
import IndexPage from './Pages/IndexPage';
import Login from './Pages/Login'
import Register from './Pages/Register';
import { UserContextProvider } from './Pages/UserContext';
import CreatePost from './Pages/CreatePost';
import PostPage from './Pages/Postpage';
import EditPost from './Pages/EditPost';



function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Layout />}>
          <Route index element = {<IndexPage/>} />
          <Route path = {"/login"} element = {< Login/>} />
          <Route path = {"/register"} element = {<Register/>} />
          <Route path = {"/create"} element = {<CreatePost />} />
          <Route path = {"/post/:id"} element = {<PostPage />} />
          <Route path = {"/edit/:id"} element = {<EditPost />} />
        </Route>
      </Routes>  
      </BrowserRouter>

    </UserContextProvider>
    
   
    

   
  );
}

export default App;
