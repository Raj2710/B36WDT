import React,{useContext, useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import {url,StudentContext} from '../App';
import axios from 'axios';
import Sidebar from './Sidebar';
import {validate} from '../common/common'

function Dashboard() {

    let context = useContext(StudentContext)
    let navigate = useNavigate();
    let [role] = useState(window.sessionStorage.getItem('role'));
    let [data,setData] = useState([]);

    useEffect(()=>{
        if(validate())
            getData()
        else
            navigate('/login')
    },[])

    let getData = async ()=>{
        let token = window.sessionStorage.getItem('token');
       let res = await axios.get(`${url}/all`,{
        headers: {authorization:`Bearer ${token}`}
       })

       if(res.data.statusCode === 200)
            setData(res.data.users)
       else if(res.data.statusCode === 401){
            alert(res.data.message)
            navigate('/login')
       }
    }

    let handleDelete = async(id)=>{
        try
        {
            let token = window.sessionStorage.getItem('token');
            let res = await axios.delete(`${url}/delete-user/${id}`,{headers:{authorization:`Bearer ${token}`}})

            if(res.data.statusCode === 200)
            {
                setData(res.data.users)
            }
            else if(res.data.statusCode === 401)
            {
                alert(res.data.message)
                navigate('/login')
            }
            else
            {
                alert(res.data.message)
            }
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    // let getData = ()=>{
    //     fetch(url)
    // .then((res)=>res.json())
    // .then((response)=>{
    //     setData(response)
    // })
    // .catch((err)=>console.log(err))
    // }
    // let handleDelete = (i)=>{
    //     fetch(`${url}/${i}`,{method:'DELETE'})
    //     .then((res)=>res.json())
    //     .then((res)=>getData())
    //     .catch((err)=>console.log(err))
    // }
  return <>
    <Sidebar/>
    <div id="content-wrapper" className="d-flex flex-column container-fluid">

{/* <!-- Main Content --> */}
<div id="content">

    {/* <!-- Begin Page Content --> */}
    <div className="container-fluid">

        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            <a href="#!" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
        </div>

        {/* <!-- Content Row --> */}
        <div className="row">

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                    Earnings (Monthly)</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{context.data.monthly}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                    Earnings (Annual)</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{context.data.annual}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                </div>
                                <div className="row no-gutters align-items-center">
                                    <div className="col-auto">
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{context.data.task}%</div>
                                    </div>
                                    <div className="col">
                                        <div className="progress progress-sm mr-2">
                                            {/* <div className="progress-bar bg-info" role="progressbar"
                                                style={"width": "50%" aria-valuenow="50" aria-valuemin="0"
                                                aria-valuemax="100"}></div> */}
                                                <div className='progress-bar bg-info' role="progressbar"
                                                style={{"width":`${context.data.task}%`, "ariaValuenow":context.data.task,"ariaValuemin":"0","ariaValuemax":"100"}}
                                                ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Pending Requests</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{context.data.pending}</div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
{/* <!-- End of Main Content --> */}


{/* Start of the Student details */}
<div>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Role</th>
          {role==='Admin'?<th>Action</th>:null}
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
                    {
                        role==='Admin'?<td>
                        <Button variant="primary" onClick={()=>navigate(`/edit-student/${e._id}`)}>Edit</Button>
                        &nbsp;&nbsp;
                        <Button variant="danger" onClick={()=>handleDelete(e._id)}>Delete</Button>
                    </td>:null
                    }
                </tr>
            })
        }
      </tbody>
    </Table>                                         
</div>
{/* End of the Student details */}

{/* <!-- Footer --> */}
<footer className="sticky-footer bg-white">
    <div className="container my-auto">
        <div className="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2021</span>
        </div>
    </div>
</footer>
{/* <!-- End of Footer --> */}

</div>
  </>
}

export default Dashboard