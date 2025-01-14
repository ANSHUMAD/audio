import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Lyrics from './lyrics.jsx';
import '../App.css';

const server_url = import.meta.env.VITE_BACKEND;

const Homepage = () => {
  const location = useLocation();
  const [audioFile, setAudioFile] = useState(null);
  const [text,settext] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [user, setUser] = useState(location.state);
  const [darkMode, setDarkMode] = useState(true);
  const [play, setplay] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  const fetchAudio = (e) => {
    const audioFileName = e.target.id;
  
    axios.get(`${server_url}/audio?phile=${audioFileName}&userid=${user._id}`)
      .then(response => {
        const { audioFile, lyricsFile } = response.data;
  
        // Convert the base64-encoded audio file to a Blob and create an object URL
        const audioBlob = new Blob([new Uint8Array(atob(audioFile).split("").map(c => c.charCodeAt(0)))], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);  // Set the audio URL to your audio player
        // Handle the lyrics (plain text)
        settext(lyricsFile);  // Store lyrics in the state to display in the UI
  
      })
      .catch(error => {
        console.error('Error fetching the audio and lyrics:', error);
      });
  };

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) return;

    const formData = new FormData();
    formData.append('audiofile', audioFile);

    try {
      const response = await axios.post(`${server_url}/uploader/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      
      console.log('Upload success:', response.data);

      // Update the user state with the new file
      const fileName = `${audioFile.name}`;
      setUser(prevUser => ({
        ...prevUser,
        books: [...prevUser.books, fileName]
      }));
      console.log("user boobs==>",user.books)

      // Clear the file input
      setAudioFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='app-container'>
      <Boobs books={user.books} fetchAudio={fetchAudio} isOpen={isOpen} toggleSidebar={toggleSidebar}/>
      
      <div className="toggle-switch-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <div className="mode-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</div>
      </div>

      <div className='panel'>
        <div className='user'>
          <h3>User: {user.name}</h3>
        </div>
        <Upload_audio 
          handleSubmit={handleSubmit} 
          handleFileChange={handleFileChange}
        />
        <Display_audio audioUrl={audioUrl} setplay={setplay}/>
        {text ? (
                  <Lyrics text={text} isPlaying={play}/>
                ) : (
                  <p>audio Transcript will be displayed here.</p>
        )}
        
      </div>
    </div>
  );
};

const Boobs = ({ books, fetchAudio,isOpen,toggleSidebar }) => {
  const tt="<-->"
  return (
    <div className={isOpen ? "sidebar open" : "sidebar"}>
      <button className='hamburger' onClick={toggleSidebar}> {tt}  </button>
      <h3>Files:</h3>
      {books.map((book, index) => (
        <div className='each' key={index}>
          <button id={book} onClick={fetchAudio}>
            {book}
          </button>
        </div>
      ))}
    </div>
  );
};

const Upload_audio = ({ handleSubmit, handleFileChange }) => {
  return (
    <div className='upload_audio'>
      <h2>Upload Audio File</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="audiofile">Select Audio File:</label>
          <input
            type="file"
            id="audiofile"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

const Display_audio = ({ audioUrl,setplay }) => {
  const handleplay=(abc)=>{
    setplay(abc)
  }
  return (
    <div className='display_audio'>
      <h2>Display Audio</h2>
      {audioUrl && <audio onPause={() => handleplay(false)} onPlay={() => handleplay(true)} controls src={audioUrl} />}
    </div>
  );
};

export default Homepage;