import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import PhotoUploadPage from '../PhotoUploadPage/PhotoUploadPage';
import IndexPage from '../IndexPage/IndexPage';
import EditPage from '../EditPage/EditPage';
import DetailPage from '../DetailPage/DetailPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  const [photos, setPhotos] = useState([]);

  function updatePhoto(newPhotosArray) {
    setPhotos(newPhotosArray);
  }

  function deletePhoto(newPhotosArray) {
    setPhotos(newPhotosArray);
  }
  
  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      { user ? 
        <Switch>
          <Route exact path="/photos">
            <IndexPage photos={photos} setPhotos={setPhotos} />
          </Route>
          <Route exact path="/photos/new">
            <PhotoUploadPage setPhotos={setPhotos} />
          </Route>
          <Route exact path="/photos/:idx">
            <DetailPage photos={photos} user={user} />
          </Route>
          <Route exact path="/photos/:idx/edit" >
            <EditPage
              user={user}
              photos={photos}
              setPhotos={setPhotos}
            />
          </Route>
          <Redirect to="/photos"/>
        </Switch>
        :
        <Switch>
          <Route exact path="/photos">
            <IndexPage photos={photos} setPhotos={setPhotos} />
          </Route>
          <Route exact path="/photos/:idx">
            <DetailPage photos={photos} />
          </Route>
          <Route path="/login">
            <AuthPage setUser={setUser} />
          </Route>
          <Redirect to="/photos"/>
          {/* <LandingPage /> */}
        </Switch>
      }
    </main>
  );
}
