import React, { useState } from 'react';
import "./Styles/register.scss";
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log("e",email,password)
    
    try{
      await signInWithEmailAndPassword(auth , email, password)
      navigate("/")

    }catch(e){
      setError(true)
    }


  }

  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Aj Chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password'/>
                
                <button>Sign in</button>
                {error && <span>Something went Wrong</span>}
            </form>
            <p >You don't have an account? <Link to={'/register'}>Register</Link></p>
        </div>
    </div>
  )
}

export default Login