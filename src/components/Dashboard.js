import React,{useEffect,useState,useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import {env} from '../enviroinment'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';

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
                    logout()
                },3000)
            }
        }
        else
        {
            toast.error("No Token Found!")
            setTimeout(()=>{
                logout()
            },3000)
        }
    }
    let logout = useCallback(()=>{
        sessionStorage.clear()
        navigate('/login')
    })
    
    useEffect(()=>{
        loadData()
    },[loadData])
  return (
    <div>
        <h1 style={{"textAlign":"center"}}>Dashboard</h1>
        <div className='add-user'>
            <Button variant='danger' onClick={()=>logout()}><LogoutIcon/></Button>
            &nbsp;
            <Button variant='success'><PersonAddAltIcon/> Add User</Button>
        </div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
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
                        <td><Button variant='warning'><EditIcon/> Edit</Button> &nbsp; <Button variant='danger'><DeleteIcon/> Delete</Button></td>
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