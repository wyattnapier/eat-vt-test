import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [inputUser, setInputUser] = useState("");
  const [inputPass, setInputPass] = useState("");

  const handleLogin = () => {
    // check if the input user exists
      // if so: find their real associated pass
      // check if the real associated pass matches the input pass
      setLoggedIn(true)
  }

  const handleLogout = () => {
    // may need to permanently save changes from session or something when you log out
    setLoggedIn(false)
  }

  if (!loggedIn) {
    // if not logged in
    return (
      <div>
        <p>We are not logged in :/</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    )
  } else {
    // if logged in
    return (
      <div>
        <p>We are logged in!</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
    )
  }
}

export default App;
