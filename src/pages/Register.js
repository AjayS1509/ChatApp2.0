import React, { useState } from 'react';
import "./Styles/register.scss";
import Add from '../img/addAvatar.png'
import {auth , storage, db} from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    console.log("e",email,password)
    
    try{
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            //navigate("/");
            window.location.assign("/");
          } catch (err) {
            console.log(err);
            setError(true);
            //setLoading(false);
          }
        });
      });

    }catch(e){
      setError(true)
    }


  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Aj Chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                <input type="file" id='file' style={{display:"none"}}/>
                <label htmlFor="file">
                  <img src={Add} alt="add" />
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {error && <span>Something went Wrong</span>}
            </form> 
            <p>You do have an account?  <Link to={'/login'}>Login</Link></p>
        </div>
    </div>
  )
}

export default Register