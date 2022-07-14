import React,{useState,useEffect, useRef} from 'react'

function Ref() {
  let [name,setName] = useState("")
  const renderCount = useRef(0)
  const inputRef = useRef();

  // {current:0}

  useEffect(()=>{
    renderCount.current = renderCount.current+1
  })

  function focus(){
    inputRef.current.focus()
    inputRef.current.value = "Hello"
  }

  return (
    <div>
      <input ref={inputRef} value = {name} onChange={e=>setName(e.target.value)}/>
      <div>My name is {name}</div>
      <div>I rendered my component {renderCount.current} times</div>
      <button onClick={focus}>Focus</button>
    </div>
  )
}

export default Ref