import { useState } from "react";
import * as photosAPI from '../../utilities/photos-api';

export default function PhotoUploadPage() {
  const [photos, setPhotos] = useState([]); // This will be passed down eventually
  
  async function handleUploadPhoto(evt) {
    console.log(evt.target);
    const photo = await photosAPI.upload();
    setPhotos([...photos, photo]);
  }
  
  return(
    <div>
      <form
        onClick={handleUploadPhoto}
        enctype="multipart/form-data"
      >
        <input type="text" name="name" />
        <input type="file" name="image" />
      </form>
    </div>
  );
}