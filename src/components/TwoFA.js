import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {env} from '../enviroinment'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function TwoFA() {
    let navigate = useNavigate()
    let email = sessionStorage.getItem('email')===null?navigate('/login'):sessionStorage.getItem('email')
    let [otp,setOtp] =useState("")
    const login = async()=>{  
        let res = await axios.post(`${env.apiurl}/users/verify-email`,{email,otp})
        if(res.data.statusCode===200)
        {
            toast.success('Verified Successfull!');
            setTimeout(()=>{
                navigate('/login')
            },3000)
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
      <Form.Group className="mb-3" >
        <Form.Label>OTP</Form.Label>
        <Form.Control type="otp" placeholder="OTP" onChange={(e)=>setOtp(e.target.value)}/>
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

export default TwoFA