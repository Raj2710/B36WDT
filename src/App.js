import './App.css';
import React,{ useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';

export const StudentContext = React.createContext();

function App() {
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
      <Sidebar/>
      <StudentContext.Provider value ={{data,students,setStudents}}>
          <Routes>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='create-student' element={<CreateStudent/>}/>
              <Route path='edit-student/:id' element={<EditStudent/>}/>
              <Route path='*' element={<Navigate to='/dashboard'/>}/>
          </Routes>
        </StudentContext.Provider>
      </BrowserRouter>
  </div>
  </>
}
export default App;
