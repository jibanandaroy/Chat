import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from 'react'
import '../style.css'
import { auth, db } from '../../firebase'
import { setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;


    createUserWithEmailAndPassword(auth, email, password).then(
      async (res) => {
        const user = res.user;
        await updateProfile(user,
          {
            displayName
          });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName,
          email
        })
        navigate('/')

      }

    ).catch((err) => {
      setError(true);
    })




  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className='logo'>Live Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password' />

          <button>Sign up</button>
          {error && <span>Something went worng</span>}
        </form>
        <p>you do have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register