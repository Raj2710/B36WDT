import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {env} from '../enviroinment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

    let[email,setEmail] = useState("")
    let [password,setPassword] =useState("")
    let navigate = useNavigate()
    const login = async()=>{  
        let res = await axios.post(`${env.apiurl}/users/login`,{email,password})
        if(res.data.statusCode===200)
        {
            toast.success('Login Successfull!');
            sessionStorage.setItem('token',res.data.token)
            navigate('/dashboard')
        }
        else
        {
            toast.error(res.data.message)
        }
    }
  return (
    <div className='login-wrapper'>
        <h1 style={{"textAlign":"center"}}>Login Here!</h1>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>login()}>
        Submit
      </Button>
    </Form>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    </div>
  )
}

export default Login