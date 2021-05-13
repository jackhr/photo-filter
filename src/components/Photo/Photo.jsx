import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function Photo({ photo, index }) {
  function checkIt() {
    console.log(index);
  }

  return (
    <div>
      <span>{photo.user.name}'s photo:</span>
      <span>{photo.name}</span>
      <img
        className={index ? "detail-image" : "index-image"}
        onClick={checkIt}
        src={photo.imageURL}
      />
    </div>
  );
}