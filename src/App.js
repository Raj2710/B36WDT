import './App.css';
import React,{ useState } from 'react';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import HooksDemo from './components/HooksDemo';
import Ref from './components/Ref';
import Memo from './components/Memo';
import Reduce from './components/Reduce';
import Login from './components/Login';
import Register from './components/Register';
export const url = 'http://localhost:8000/users'

export const StudentContext = React.createContext();

function App() {
  // console.log(students)
  let data = {
    monthly:"Rs. 40,000",
    annual:"Rs. 4,80,000",
    task:70,
    pending:18
  }


  let [students,setStudents] = useState([
    {
      name:"Raj",
      email:"raj@gmail.com",
      mobile:"9659587526",
      batch:"B36WDT",
    },
    {
      name:"Balaji",
      email:"balaji@gmail.com",
      mobile:"9653387526",
      batch:"B35WE",
    },
    {
      name:"Gokul",
      email:"gokul@gmail.com",
      mobile:"12345587526",
      batch:"B36WE",
    }
  ])

  return <>
  <div className='main-wrapper'>

      {/* <Button variant='primary' onClick={()=>setStudents([...students])}>Click Here!</Button> */}
  
      <BrowserRouter>
      <StudentContext.Provider value ={{data,students,setStudents}}>
          <Routes>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='create-student' element={<CreateStudent/>}/>
              <Route path='edit-student/:id' element={<EditStudent/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/> 
              <Route path='*' element={<Navigate to='/login'/>}/>
          </Routes>
        </StudentContext.Provider>
      </BrowserRouter>
  </div>
  </>
}
export default App;
