import {Navigate} from 'react-router-dom'

function ProtectedRoute({children}) {
  return sessionStorage.getItem('token')===null?<Navigate to='/login'/>:children
}

export default ProtectedRoute