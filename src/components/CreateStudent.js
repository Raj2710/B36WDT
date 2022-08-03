import React,{useEffect,useState}  from 'react'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios'
import {useFormik} from 'formik';
import * as yup from 'yup'
import Sidebar from './Sidebar';
import {validate} from '../common/common'

function CreateStudent() {

  let navigate = useNavigate();
  let [message,setMessage] = useState("");

  useEffect(()=>{
    if(validate()){}
    else
        navigate('/login')
},[])

  let handleSubmit = async(data)=>{
    setMessage("")
    
    data.role = 'student'
    console.log(data)
    let res = await axios.post(`${url}/register`,data)
    if(res.data.statusCode === 200)
    {
      navigate('/dashboard')
    }
    else
    {
      setMessage(res.data.message)
    }
  }


  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      mobile:""
    },
    validationSchema: yup.object({
      name:yup.string().required('* Required'),
      email:yup.string().email('Enter a valid email').required('* Required'),
      mobile:yup.string().matches(/^\d{10}$/, "Enter a valid Mobile number").required('* Required'),
      password:yup.string().required('* Required')
    }),
    onSubmit:values=>{
      handleSubmit(values)
    }
  })
  return <>
  <Sidebar/>
    <div id="content-wrapper" className="d-flex flex-column container-fluid">
    
      <h1>Add Student Details</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            name='name'
            type='text'
            className='form-control'
            placeholder='Name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name?(<div style={{"color":"red"}}>{formik.errors.name}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            className='form-control'
            placeholder='Email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email?(<div style={{"color":"red"}}>{formik.errors.email}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Mobile</label>
          <input
            id='mobile'
            name='mobile'
            type='text'
            className='form-control'
            placeholder='Mobile'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.touched.mobile && formik.errors.mobile?(<div style={{"color":"red"}}>{formik.errors.mobile}</div>):null}
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            className='form-control'
            placeholder='Password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password?(<div style={{"color":"red"}}>{formik.errors.password}</div>):null}
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      {message?<div style={{"color":"red"}}>{message}</div>:<></>}
    </div>
  </>
}

export default CreateStudent