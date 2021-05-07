import { useState } from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom'; for later use
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      { user ? 
        <>
          <NavBar user={user} setUser={setUser} />
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
