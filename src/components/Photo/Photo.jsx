import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function Photo({ index, photo, onIndexPage }) {
  const imageClass = onIndexPage ? "index-image" : "detail-image";
  const PhotoNameClass = onIndexPage ? "index-photo-name" : "detail-photo-name";

  return (
    <>
      <h2 className={PhotoNameClass}>{photo.name}</h2>
      <Link to={`/photos/${index}`}>
        <img  
          className={imageClass}
          src={photo.imageURL}
        />
      </Link>
    </>
  );
}