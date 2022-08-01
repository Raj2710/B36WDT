import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
export const url = 'http://localhost:8000/users'
function App() {
  return <>

    <Router>
        <Routes>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='*' element={<Signup/>}/>
        </Routes>
    </Router>
  </>
}

export default App;
