import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([]);
  const [userValues, setUserValues] = useState('');
  

  const[inputValue,setInputValue] = useState({
    email : '',
    password : ''
  });
  const [error, setError] = useState('');
  // const [previous, previousValue] = useState([]);

  function formSubmit(e){
    e.preventDefault();
    if(validateInput(inputValue)){

     
      fetch('https://doshipms.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'NN_api_key' : 'fcbf2fee98cee0be1da58b8a2066b7d3826f335def2261d693208e16275dde5b'
        },
        body: JSON.stringify(inputValue)
      })
      .then(response => response.json())
      .then(json => {
        if(json.error){
          setError(json.message)
        }else{
          
    
          let userData = {
            'name' : json.username,
            'user_roles' : json.user_roles,
            'token' : json.token
          }
          
          localStorage.setItem('userData', JSON.stringify(userData));
          let UserValues = JSON.parse(localStorage.getItem('userData'))
    
          setUserValues(UserValues)
        
        }
      }
      )
      
      .catch(error => console.error(error));
      
      
    

      // previousValue(previous => [...previous,inputValue])
      setError('');
    }else{
      setError('Value are empty')
    }

   
      
   
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValue(prevState => ({
      ...prevState,
      [name]: value

    }));
  };

  
  

  const validateInput = (values)=>{
    return values.email.trim() !== '' && values.password.trim() !== '';
    // return values.name.trim() !== '' && values.password.trim() !==''
  }


 
 
  
  

  return (
    <>
    
      <form onSubmit={formSubmit}>
      <div className="mb-3">
        <label htmlFor="Email" className="form-label">Email address</label>
        <input type="email" value = {inputValue.name} onChange={handleChange}className="form-control" id="email"  name = 'email' aria-describedby="emailHelp"/>
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" value = {inputValue.password} onChange={handleChange}className="form-control" id="password"  name = "password" aria-describedby="emailHelp"/>
      </div>
     
      <button type="submit" className="btn btn-primary">Submit</button>
      {error && <div className='text-danger'>{error}</div>}
      
    </form>
    
    <div>
      <h2>User Data </h2>
      
      
       
          
        <div>{userValues.name}</div>
        <div>{userValues.token}</div>
        
    </div>
      
    </>
  )
}

export default App
