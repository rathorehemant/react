import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  const[inputValue,setInputValue] = useState('');
  const [error, setError] = useState('');
  const [previous, previousValue] = useState([]);

  function formSubmit(e){
    e.preventDefault();
    if(validateInput(inputValue)){
      previousValue(previous => [...previous,inputValue])
      setError('');
    }else{
      setError('Value are empty')
    }
  }

  const handleChange = (event)=>{
    setInputValue(event.target.value)
  }

  const validateInput = (value)=>{
    return value.trim() !== ''
  }
  return (
    <>
    
      <form onSubmit={formSubmit}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">Email address</label>
        <input type="text" value = {inputValue} onChange={handleChange}className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
      {error && <div className='text-danger'>{error}</div>}
      
    </form>
    
    <div>
      <h2>Previous Values</h2>
      
      
        {previous.map((value,index)=>(
          <div key={index} className="alert alert-success" role="alert">
          {value}
        </div>
          
        ))}
        
    </div>
      
    </>
  )
}

export default App
