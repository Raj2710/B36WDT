import React,{useState, useEffect}  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate,useParams} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios';
import Sidebar from './Sidebar';
import {validate} from '../common/common'

function EditStudent() {
  let params = useParams();
  let navigate = useNavigate();
  let [name,setName] = useState("");
  let [email,setEmail] = useState("");
  let [mobile,setMobile] = useState("");
  let [role,setRole] = useState("");
  let [password,setPWD] = useState("")
  useEffect(()=>{
    if(validate())
      getData()
    else
      navigate('/login')
  },[])

  let getData = async ()=>{
    let token = window.sessionStorage.getItem('token');
    let res = await axios.get(`${url}/${params.id}`,{headers: {authorization:`Bearer ${token}`}})
    if(res.data.statusCode===200)
    {
      setName(res.data.users.name)
      setEmail(res.data.users.email)
      setMobile(res.data.users.mobile)
      setRole(res.data.users.role)
      setPWD(res.data.users.password)
    }
    else if(res.data.statusCode===401)
    {
      alert(res.data.message)
      navigate('/login')
    }
    else
    {
        alert(res.data.message)
    }
  }



  let handleSubmit = async ()=>{
      let data = {
        name,
        email,
        mobile,
        role,
        password
      }
      let token = window.sessionStorage.getItem('token');
      let res = await axios.put(`${url}/edit-user/${params.id}`,data,{headers: {authorization:`Bearer ${token}`}})
      //Just to jump to different route
      if(res.status===200)
        navigate('/dashboard')
        else if(res.data.statusCode===401)
        {
          alert(res.data.message)
          navigate('/login')
        }
        else
        {
          alert(res.data.message)
        }
  }

  return <>
    <Sidebar/>
    <div id="content-wrapper" className="d-flex flex-column container-fluid">
    <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" value={mobile} placeholder="Mobile" onChange={(e)=>{
          setMobile(e.target.value)
        }}/>
      </Form.Group>
      
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
</Form>
    </div>
  </>
}

export default EditStudent