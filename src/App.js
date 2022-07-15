import './App.css';
import React,{ useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import CreateStudent from './components/CreateStudent';
import EditStudent from './components/EditStudent';
import HooksDemo from './components/HooksDemo';
import Ref from './components/Ref';
import Memo from './components/Memo';
import Reduce from './components/Reduce';
export const url = 'https://61ee1f7ed593d20017dbac50.mockapi.io/students'

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
      <Sidebar/>
      <StudentContext.Provider value ={{data,students,setStudents}}>
          <Routes>
              <Route path='dashboard' element={<Dashboard/>}/>
              <Route path='create-student' element={<CreateStudent/>}/>
              <Route path='edit-student/:id' element={<EditStudent/>}/>
              <Route path='hooks-demo' element={<HooksDemo/>}>
                  <Route path='ref' element={<Ref/>}/>
                  <Route path='memo' element={<Memo/>}/>
                  <Route path='reduce' element={<Reduce/>}/>
              </Route>
              <Route path='*' element={<Navigate to='/dashboard'/>}/>
          </Routes>
        </StudentContext.Provider>
      </BrowserRouter>
  </div>
  </>
}
export default App;
