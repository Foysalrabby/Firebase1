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
       password:'',
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
let isTwofiedValid =true;

const handlechange = (e) => {

     console.log(e.target.name,e.target.value);
     if(e.target.name==="email"){
      var isTwofiedValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
       console.log(isTwofiedValid); 

     }

     if(e.target.name === "password"){

      var isTwofiedValid=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(e.target.value);
      console.log(isTwofiedValid);
     }
     //towfillesd valid then isTwofiedValid take set korbo
     if(isTwofiedValid){

     const newuserinfo={...userinfo};
     newuserinfo[e.target.name]=e.target.value; //jetatae click korbo sttar value set hobe
     setinfo(newuserinfo); //and see to the authentication ptag

     }

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
     <p>Email: {userinfo.email}</p>
     <p>password: {userinfo.password}</p>
       <form onSubmit={handlesubmit}>
        <input type="text" name="email" onChange={handlechange} placeholder="Enter your name" required /><br></br>
        <input type="password" name="password" onChange={handlechange}  placeholder="Enter your password" required/><br/>
        <input type="submit" value="submit" />

       </form>

    </div>
  );
}

export default App;
