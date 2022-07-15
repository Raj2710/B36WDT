import React,{useReducer} from 'react'
import Button from 'react-bootstrap/Button';
import { Outlet,useNavigate,Link } from 'react-router-dom';

function HooksDemo() {

  let navigate = useNavigate();
  return <>
   <div>

    <Button variant='primary' onClick={()=>navigate('reduce')}>useReduce</Button>
    &nbsp;
    <Link to ='/hooks-demo/ref'>
      <Button variant='primary'>useRef</Button>
    </Link>
    &nbsp;
    <Button variant='primary' onClick={()=>navigate('memo')}>useMemo</Button>
    <hr/>
    <h3>Child Component</h3>
    <hr/>
   <div><Outlet/></div>
    

    </div>
  </>
}

export default HooksDemo