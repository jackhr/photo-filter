import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './Photo.css'

export default function Photo({ photo }) {
  function testerz() {
    console.log(photo.imageURL);
  }

  return (
    <div>
      <h1>{photo.name}</h1>
      <img className="display-image" onClick={testerz} src={photo.imageURL} />
    </div>
  );
}