import axios from 'axios';
import { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router";
import { AuthContext } from '../context/authContext.jsx';

const Login = () => {

  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  });

  const [err, setErr] = useState(null);

  const navigate =  useNavigate();

  const {login} = useContext(AuthContext);

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setErr(error.response.data);
    }
  }

  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <input required type="text" placeholder='username' name='username' onChange={handleChange} />
        <input required type="password" placeholder='password' name='password' onChange={handleChange} />
        <button onClick={handleSubmit} >Login</button>
        {err && <p>{err}</p>}
        <span>
          Don&apos;t you have an account? <Link to="/register">Register</Link> 
        </span>
      </form>
    </div>
  )
}

export default Login