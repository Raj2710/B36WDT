import React,{useState}  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom';
import {url} from '../App'
import axios from 'axios'
import {useFormik} from 'formik';
import * as yup from 'yup'
import Sidebar from './Sidebar';

function CreateStudent() {

  let navigate = useNavigate();

  let handleSubmit = async(data)=>{

    let res = await axios.post(url,data)
    if(res.status===201)
      navigate('/dashboard')
  }


  const formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      batch:"",
      mobile:""
    },
    validationSchema: yup.object({
      name:yup.string().required('* Required'),
      email:yup.string().email('Enter a valid email').required('* Required'),
      mobile:yup.string().matches(/^\d{10}$/, "Enter a valid Mobile number").required('* Required'),
      batch:yup.string().max(10,'Maximum character allowed is 10').min(2,'Minimum Character Should be 2').required('* Required')
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
          <label htmlFor='name'>Batch</label>
          <input
            id='batch'
            name='batch'
            type='text'
            className='form-control'
            placeholder='Batch'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.batch}
          />
          {formik.touched.batch && formik.errors.batch?(<div style={{"color":"red"}}>{formik.errors.batch}</div>):null}
        </div>

        <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </>
}

export default CreateStudent