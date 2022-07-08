import React,{useState}  from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate,useParams} from 'react-router-dom';

function EditStudent(props) {
  let params = useParams();

  let [name,setName] = useState(props.data.students[params.id].name);
  let [email,setEmail] = useState(props.data.students[params.id].email);
  let [mobile,setMobile] = useState(props.data.students[params.id].mobile);
  let [batch,setBatch] = useState(props.data.students[params.id].batch);

  let navigate = useNavigate();

  let handleSubmit = ()=>{
      let data = {
        name,
        email,
        mobile,
        batch
      }

      let students = [...props.data.students]

      students.splice(params.id,1,data)

      props.data.setStudents(students)
      
      //Just to jump to different route
      navigate('/dashboard')
  }

  return <>
    <div>
    <Form>
        <Form.Group className="mb-3" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/>
        </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="text" value={mobile} placeholder="Mobile" onChange={(e)=>{
          setMobile(e.target.value)
        }}/>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Batch </Form.Label>
        <Form.Control type="text" value={batch} placeholder="Batch" onChange={(e)=>setBatch(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" onClick={()=>handleSubmit()}>
        Submit
      </Button>
</Form>
    </div>
  </>
}

export default EditStudent