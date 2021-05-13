import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function Photo({ photo, onIndexPage }) {
  const imageClass = onIndexPage ? "index-image" : "detail-image";
  const usernameClass = onIndexPage ? "index-username" : "detail-username";
  const PhotoNameClass = onIndexPage ? "index-photo-name" : "detail-photo-name";

  return (
    <>
      <span className={usernameClass}>{photo.user.name}'s photo: </span>
      <span className={PhotoNameClass}>{photo.name}</span>
      <img
        className={imageClass}
        src={photo.imageURL}
      />
    </>
  );
}