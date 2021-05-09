import { useState } from "react";
import photosAPI from '../../utilities/photos-api';

export default function PhotoUploadPage() {
  const [photos, setPhotos] = useState([]); // This will be passed down eventually
  
  async function handleUploadPhoto(photoData) {
    const photo = await photosAPI.upload(photoData);
    setPhotos([...photos, photo]);
  }
  
  return(
    <div>
      <h1>Wagwan!</h1>
    </div>
  );
}