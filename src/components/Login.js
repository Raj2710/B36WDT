import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {url} from '../App'
import {useNavigate} from 'react-router-dom'

function Login() {
    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [message,setMessage] = useState("")
    let navigate= useNavigate();

    let handleSubmit =async()=>{
        let res = await axios.post(`${url}/login`,{
            email,
            password
        })

        if(res.data.statusCode===200)
        {
            window.sessionStorage.setItem('token',res.data.token)
            navigate('/dashboard')
        }
        else
        {
            setMessage(res.data.message)
        }
    }

  return (
    <div>
        <h2 style={{textAlign: 'center'}}>Login</h2>
        <Form>
      
      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    {message?<div style={{color:"red"}}>{message}</div>:<></>}
    </div>
  )
}

export default Login