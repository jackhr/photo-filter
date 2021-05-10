import { useEffect, useState } from "react";
import * as photosAPI from '../../utilities/photos-api';

export default function IndexPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(function() {
    async function getPhotos() {
      const photos = await photosAPI.getAll();
      setPhotos(photos);
    }
    getPhotos();
  }, []);

  return(
    <div>
      {photos.length ? (
        photos.map(photo => <img src={photo.url}/>)
      ) : (
        <h1>Ain't got no photos yet BRUH!</h1>
      )}
    </div>
  );
}