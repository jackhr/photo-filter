import { Link } from 'react-router-dom';

export default function Photo({ index, photo, onIndexPage }) {
  const imageClass = onIndexPage ? "index-image" : "detail-image";
  const PhotoNameClass = onIndexPage ? "index-photo-name" : "detail-photo-name";

  return (
    <>
      <h2 className={PhotoNameClass}>{photo.name}</h2>
      <Link to={`/photos/${index}`}>
        <img  
          className={imageClass}
          src={photo.sourceURL}
          alt={`This has been uploaded by the user: ${photo.user.name}.`}
        />
      </Link>
    </>
  );
}