import './App.css';
import React,{useState} from 'react'
import Map from './components/Map';
import LoginContainer from './components/LogIn'
function App() {
  const [isLogIn, setLogIn]  = useState(false);
  
  function handleChange() {
    setLogIn(now => !now);

  }

  return (
    <div className="App">

      {isLogIn ?
        <>
        <Map />
        </>
       : 
        <LoginContainer  isLogIn={isLogIn} onChange={handleChange} />
      }

      </div>
  );
}

export default App;
