import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function Photo({ photo }) {

  return (
    <div>
      <h1>{photo.name}</h1>
    </div>
  );
}