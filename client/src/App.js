import React,{useEffect,useState} from 'react';
import axios  from 'axios';
import { set } from 'mongoose';
const App = () => {
  const [item,setItem] =useState([])
  const [newtask,setnewtask]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/gettask').then(
     arr => setItem(arr.data)
    )
  })
   const submithandler = e=>{
     e.preventDefault();
     axios.post("http://localhost:5000/addtask",{todo:newtask}).then(
       arr => setItem(arr.data),
       setnewtask("")

     )
   }
   const del = id =>{
          axios.delete(`http://localhost:5000/delete/${id}`).then(
            arr => setItem(arr.data)
          )
   }
  return (
    <div className="main">
      <center>
      <h1 style={{fontSize:25}}> To Do List </h1> 
        <form onSubmit={submithandler}>
            <input type="text" value={newtask} onChange={
              (e)=>setnewtask(e.target.value)}/><br/>
            
            <input type="submit" value="submit"/>
        </form>
       
    {item.map(task=>
      <div key={task._id}>
        <h3>{task.todo}{"     "}</h3>
        <button onClick={()=> del(task._id)}>Delete</button>
      </div>
      )} 
      </center> 
   </div>
  )
}

export default App;
