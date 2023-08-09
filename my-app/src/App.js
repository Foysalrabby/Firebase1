import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import firebase, {initializeApp} from './fairbase';
import { getAuth} from 'firebase/auth';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup , GoogleAuthProvider} from "firebase/auth";
import {  signInWithEmailAndPassword } from "firebase/auth";
import {  updateProfile } from "firebase/auth";
import {  signOut } from "firebase/auth";
const provider = new GoogleAuthProvider();





function App() {
  const [singupuser,setsignupser]=useState(false);
  const [userinfo,setinfo]=useState({
    isSigned: false,
    name:"",
    email:"",
    password:"",
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
       photo:'',
       error:'',
       success:''
       
        
      }
   setinfo(sinoutuser);
   console.log(res);

    }).catch(error=>{
      console.log(error);

    });
      
    console.log("clicked");

  }
  //----------------handlesubmit to take password and gmail to sign in

  const handlesubmit = (e) => {

    if(singupuser && userinfo.email && userinfo.password){
     

      const auth = getAuth();
      createUserWithEmailAndPassword(auth,userinfo.email, userinfo.password)
        .then((res) => {

          const newuserDISmess={...userinfo};
          newuserDISmess.success=true;
          newuserDISmess.error='';
          setinfo(newuserDISmess);
          usernameOtherinfo(newuserDISmess.name);
          // Signed in 
         // const user = userCredential.user;
          //console.log(user);

          // ...
        })
        .catch((error) => {
          const newuserDISmess={...userinfo};
          newuserDISmess.success=false;
          newuserDISmess.error=error.message;
          //const errorCode = error.code;
          //onst errorMessage = error.message;
          //console.log(errorMessage);
          setinfo(newuserDISmess);
          // ..
        });
    }
    if(!singupuser && userinfo.email && userinfo.password){
      

      const auth = getAuth();
      signInWithEmailAndPassword(auth,userinfo.email, userinfo.password)
        .then((res) => {
          const newuserDISmess={...userinfo};
          newuserDISmess.success=true;
          newuserDISmess.error='';
          setinfo(newuserDISmess);
          console.log("when sign up user name and details",res.user);
        })
        .catch((error) => {
          const newuserDISmess={...userinfo};
          newuserDISmess.success=true;
          newuserDISmess.error=error.message;
          setinfo(newuserDISmess);
          //const errorCode = error.code;
          //const errorMessage = error.message;
        });

    }
   e.preventDefault(); //jate automatic vabe submit hoy na
  
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
//to takeusername and dispaly
const usernameOtherinfo = namex =>{
const auth = getAuth();
updateProfile(auth.currentUser, {
    displayName:namex
   
  }).then(() => {
    console.log("Update the name successfully");
  }).catch((error) => {
    console.log(error);
  });

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
      <input type="checkbox" onChange={()=>setsignupser(!singupuser)}  name="checkbox" id="" />
      <label>New user</label>
       <form onSubmit={handlesubmit}>
        {singupuser && <input type="text" name="name" onChange={handlechange} placeholder="Enter your name" />} <br></br>
        <input type="text" name="email" onChange={handlechange} placeholder="Enter your email" required /><br></br>
        <input type="password" name="password" onChange={handlechange}  placeholder="Enter your password" required/><br/>
        <input type="submit" value={singupuser?"sign up" :"submit"}/>

       </form>
       <p style={{color:'red'}}>{userinfo.error}</p>
      {userinfo.success && <p style={{color:'green'}}>{singupuser ? "created" :"login"}</p>}

    </div>
  );
}

export default App;
