import { useEffect, useState } from "react";
import photosAPI from '../../utilities/photos-api';

export default function LandingPage() {
  const [photos, setPhotos] = useState([]);

  // useEffect(function() {
  //   async function getPhotos() {
  //     const photos = await photosAPI.getAll();
  //     setPhotos(photos);
  //   }
  //   getPhotos();
  // }, []);

  return(
    <div>
      {photos.map(photo => <img src={photo.url}/>)}
    </div>
  );
}