import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import PhotoUploadPage from '../PhotoUploadPage/PhotoUploadPage';
import IndexPage from '../IndexPage/IndexPage';

export default function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ? 
        <>
        </>
        :
        <Switch>
          <Route path="/photos/new">
            <PhotoUploadPage />
          </Route>
          <Route path="/photos">
            <IndexPage />
          </Route>
          <Redirect to="/photos"/>
          {/* <PhotoUploadPage /> */}
          {/* <LandingPage /> */}
          {/* <AuthPage setUser={setUser} /> */}
        </Switch>
      }
    </main>
  );
}
