import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config'; // Use lowercase 'f'
import {useContext} from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate} from 'react-router-dom'



firebase.initializeApp(firebaseConfig);

function App() {
  const [newUser ,setNewUser] = useState(false);
  const [user , setUser] = useState({
  isSignIn:false ,
  name :'',
  email :'',
  password :'',
  photo :''
  })

  const [logInUser , setLogInUser] = useContext(UserContext);
  const history = useNavigate();
  const location = useLocation()

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handelSignIn =()=>{
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const {displayName ,photoURL, email} = result.user;
      const signIn = {
        isSignIn :true ,
        name : displayName,
        email :email ,
        photo : photoURL
      }

      setUser(signIn);
      console.log(displayName , photoURL ,email);
    })
    .catch(error =>{
      console.log(error);
      console.log(error.message)
    })
  }
  const handelSignOut = ()=>{
    firebase.auth().signOut()
    .then(res => {
        const signOut ={
          isSignIn : false ,
          name : '',
          email : '',
          photo : '',
          error : '',
          success : false
        }
        setUser(signOut)
        console.log(signOut)
    })
    .catch(err =>{

    })
  }
  const handelBlur =(event)=>{
    console.log(event.target.name ,event.target.value)
    let isFromValid = true;
    if(event.target.name === 'email'){
        isFromValid = /^\S+@\S+\.\S+$/.test(event.target.value)
    }
    if(event.target.name === 'password'){
        const isPasswordValid = event.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(event.target.value)
        isFromValid = isPasswordValid && passwordHasNumber
    }
    if(isFromValid){
      const newUserInfo = {...user}
      newUserInfo[event.target.name]=event.target.value;
      setUser(newUserInfo)
    }
  }
  const handelSubmit =(e) =>{
    console.log(user.email ,user.password)
    if(newUser && user.email && user.password){
     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name)
          console.log('user name Udateed' , res.user)
        })
        .catch((error) => {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then((res) => {
    const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          setLogInUser(newUserInfo)
  })
  .catch((error) => {
    const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
      });
    }
    e.preventDefault()
  }
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
          user.updateProfile({
          displayName: name
        }).then((res) => {
         console.loh('user name successfully')
        }).catch((error) => {
          console.log(error)
        }); 
  }
   const handelFBSignIn = () =>{
    firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var credential = result.credential;
    var user = result.user;
    var token = credential.accessToken;
        console.log(token);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;

    // ...
  });
   }
  return (
    <div style={{textAlign:'center'}}>
      
          {
            user.isSignIn ? <button onClick={handelSignOut}>Sign out</button>:
            <button onClick={handelSignIn}>Sign in</button>
          }
            <button onClick={handelFBSignIn}>Log in Using Facebook</button>
          {
            user.isSignIn && 
            <div> 
              <p>Welcome ,{user.name}</p>
              <p>Email :{user.email}</p>
              <img src={user.photo} alt=""></img>
            </div>  
          }
          <h1>Our own Authentication</h1>
          <input type="checkbox" onChange={() => setNewUser(!newUser)}  name="newUser" id="" />
          <level htmlFor="newUser">New User Sign Up</level>
          <form onSubmit={handelSubmit}>
         { newUser && <input type="text" onBlur={handelBlur} name="name" placeholder='Your name' />}
          <br />
          <input type="text" onBlur={handelBlur} name="email" placeholder='your Email address' />
          <br />
          <input type="password" name="password" onBlur={handelBlur} placeholder='your password'/>
          <br />
          <input type="submit" value={newUser ? "SignUp" : "signIn"} />
          </form>
          <p style={{color :'red'}}>{user.error}</p>
          {user.success && <p style={{color :'green'}}>user {newUser ? 'created' : "logIn"} Success</p>}
    </div>
  );
}

export default App;
