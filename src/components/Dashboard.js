import React,{useState,useEffect} from 'react'
import Table from 'react-bootstrap/Table';
import {url} from '../App'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import axios from 'axios'

function Dashboard() {

    let [data,setData] =useState([]);
    let navigate = useNavigate();
    let getData = async()=>{
       let token =  window.sessionStorage.getItem('token')
       if(token)
       {
            let res = await axios.get(`${url}/all`,{
                headers:{authorization:`Bearer ${token}`}
            });
            if(res.data.statusCode===200)
            {
                setData(res.data.users)
            }
            else
            {
                alert("Token Expired")
                navigate('/login')

            }
       }
       else
       {
        alert("Please Login!")
        navigate('/login')
       }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
            data.map((e,i)=>{
                return <tr key={e._id}>
                    <td>{i+1}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.mobile}</td>
                    <td>{e.role}</td>
                </tr>
            })
        }
      </tbody>
    </Table>
    <Button variant="success" onClick={getData}>Refresh</Button>
    </div>
  )
}

export default Dashboard