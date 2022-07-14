import React,{useState,useMemo} from 'react'

function Memo() {
    const [number,setNumber] = useState(0)
    const [dark,setDark] = useState(false)
    const double = useMemo(()=>{
        return  slowFunction(number)
    },[number])

    const themeStyle = {
        backgroundColor:dark?'black':'white',
        color:dark?'white':'black'
    }


  return <>
    <div>
        <input type={'number'} value = {number} onChange={e=>setNumber(parseInt(e.target.value))}/>

        <button onClick={()=>setDark(prev=>!prev)}>Chnage Theme</button>

        <div style={themeStyle}>{double}</div>
    </div>
  </>
}

function slowFunction(num){
    console.log('Slow Function')
    for(let i=0;i<1000000000;i++){}
    return num*2
}


export default Memo