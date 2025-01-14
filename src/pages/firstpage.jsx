import React, { useState,useEffect} from 'react';
import Login from './login';  // Adjust the path if necessary
import SignUp from './signup';
import '../App.css';

const Firstpage = () => {
  const [direct,setdirect]= useState(null)

  const handleLogin = () => {
    setdirect('login')
  };

  const handleSignUp = () => {
    setdirect('signup')
  };




  const text="Uppload your PDFs and turn them into seamless audio experiences.\n Listen and read along, just like Spotify."
  const displayText = useTypewriter(text, 50);
  return (
    <div className="container">
      <div className="header">
        <div className="auth-buttons">
          <button onClick={handleLogin} className="auth-button">Login</button>
          <button onClick={handleSignUp} className="auth-button">Sign Up</button>
        </div>
        <h1 className="welcome-title">| Welcome: |</h1>
      </div>
      <div className="content">
        <div className="auth-forms">
          {direct === 'login' && <Login />}
          {direct === 'signup' && <SignUp />}
        </div>
        <div className="displayText">
          {displayText}
        </div>
      </div>
    </div>
  );
};


const useTypewriter = (text, speed) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length-1) {
        setDisplayText(prevText => prevText + text[i]);
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};



export default Firstpage;
