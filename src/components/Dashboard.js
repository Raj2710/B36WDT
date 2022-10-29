import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import {env} from '../enviroinment'
import axios from 'axios'
import Table from 'react-bootstrap/Table';

function Dashboard() {

    let [data,setData] = useState([])
    let navigate = useNavigate()

    let loadData = async()=>{
        let token = sessionStorage.getItem('token')
        if(token)
        {
            let res = await axios.get(`${env.apiurl}/users/all-users`,{
                headers:{
                    authorization:`Bearer ${token}`
                }
            })

            if(res.data.statusCode===200)
            {
                toast.success(res.data.message)
                setData(res.data.users)
            }
            else
            {
                toast.error(res.data.message)
                setTimeout(()=>{
                    navigate('/login')
                },3000)
            }
        }
        else
        {
            toast.error("No Token Found!")
            setTimeout(()=>{
                navigate('/login')
            },3000)
        }
    }
    useEffect(()=>{
        loadData()
    },[])
  return (
    <div>
        <h1 style={{"textAlign":"center"}}>Dashboard</h1>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
            {
                data.map((e,i)=>{
                    return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{e.firstName}</td>
                        <td>{e.lastName}</td>
                        <td>{e.email}</td>
                        <td>{e.role}</td>
                    </tr>
                })
            }
      </tbody>
    </Table>
    <Button variant='primary' onClick={()=>loadData()}>Refresh</Button>


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

export default Dashboard