import logo from './logo.svg';
import './App.css';
// import WhisperTranscription from './WhisperTranscription';
// import WhisperTranscription2 from './WhisperTranscription2';
import Login from './Login';
import {useState} from 'react';
import { Form, Button } from 'react-bootstrap'
import WhisperTranscription from './WhisperTranscription';

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
    // if not logged in call that componenet
    return (
      <div>
        <p>We are not logged in :/</p>
        {/* <button onClick={handleLogin}>Login</button> */}
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
            />
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
            />
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form.Group>
        </Form>
        <Login />
      </div>
    )
  } else {
    // if logged in call that component
    return (
      <div>
        <p>We are logged in!</p>
        {/* <WhisperTranscription />
        <WhisperTranscription2 /> */}
        <button onClick={handleLogout}>Log out</button>
      </div>
    )
  }
}

export default App;
