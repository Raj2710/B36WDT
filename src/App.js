import './App.css';
import {BrowserRouter, Routes,Route,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import TwoFA from './components/TwoFA';
function App() {
  return <>
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/2fa' element={<TwoFA/>}/>
          <Route path='/dashboard' element={ <ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
          <Route path="*" element={<Navigate to='/login'/>}/>
        </Routes>
    </BrowserRouter>
  </>
}

export default App;
