import React,{useReducer} from 'react'
import Button from 'react-bootstrap/Button';

const initialVlaue = {count:0,name:'raj'};


function reduce(state,action){

    switch(action.type){
        case 'decrement': return {count:state.count-1,name:'raj'};

        case 'increment': return {count:state.count+1,name:'raj'};

        case 'change-name': return {count:state.count,name:'Naga'};

        default: {}
    }

}

function Reduce() {
    const [state,dispatch] = useReducer(reduce,initialVlaue)
  return <>
   <div> 
    <div>
    <Button variant='primary' onClick={()=>dispatch({type:'increment'})}>+</Button>
    &nbsp;
    <span>{state.count}</span>
    &nbsp;
    <Button variant='primary' onClick={()=>dispatch({type:'decrement'})}>-</Button>
    </div>
    <div>
    <Button variant='primary' onClick={()=>dispatch({type:'change-name',productID:'123',alterName:"iPhone 14"})}>Change Name</Button>
    <div>{state.name}</div>
    </div>

    </div>
  </>
}

export default Reduce