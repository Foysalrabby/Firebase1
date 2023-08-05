import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import firebase, {initializeApp} from './fairbase';
import { getAuth} from 'firebase/auth';
import { signInWithPopup , GoogleAuthProvider} from "firebase/auth";
import {  signOut } from "firebase/auth";
const provider = new GoogleAuthProvider();





function App() {
  const [userinfo,setinfo]=useState({
    isSigned: false,
    name:"",
    email:"",
    photo:""

  });
  const handleuser=()=>{

    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then(res =>{
      const {displayName,email,photoUrl}=res.user;
      const userdata = {
           isSigned:true,
           name : displayName,
           email : email,
           photo :photoUrl


      }
      setinfo(userdata);
      
      console.log(displayName,email,photoUrl);
    }).catch(error =>{
      console.log(error.message);
    })
  
  };

  const handlesignout=()=>{

    const auth = getAuth();
    signOut(auth)
    .then(res => {
      const sinoutuser={
       isSigned:false,
       name:'',
       email:'',
       photo:''
        
      }
   setinfo(sinoutuser);
   console.log(res);

    }).catch(error=>{
      console.log(error);

    });
      
    console.log("clicked");

  }
  //----------------handlesubmit

  const handlesubmit = () => {


  }
//-------------onChange={handlechange} 

const handlechange = () => {


}



  return (
    <div className="App">
    {
     userinfo.isSigned ?<button onClick={handlesignout}>singnout</button>:
     <button onClick={handleuser}>Sign in</button> //like if (userinfo.isSigned == true)
     //<button onClick={handlesignout}>singnout</button>:
    }
     
     {
      userinfo.isSigned && <div>
      <p>{userinfo.name}</p>
      <p>{userinfo.email}</p>
      <img src={userinfo.photo} alt="m" srcset="" />
      </div>
     }
     <h1> Your authentication...</h1>
       <form onSubmit={handlesubmit}>
        <input type="text" name="name" onChange={handlechange} placeholder="Enter your name" required /><br></br>
        <input type="password" name="password" onChange={handlechange}  placeholder="Enter your password" required/><br/>
        <input type="submit" value="submit" />

       </form>

    </div>
  );
}

export default App;
