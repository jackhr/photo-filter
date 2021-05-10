import { useState } from "react";
import * as photosAPI from '../../utilities/photos-api';

export default function PhotoUploadPage({ addPhoto }) {
  const [photoData, setPhotoData] = useState({ name: "" });

  async function handleUploadPhoto(evt) {
    evt.preventDefault();
    const newPhoto = await photosAPI.upload(photoData);
    addPhoto(newPhoto);
  }

  function handleChange(evt) {
    setPhotoData({ name: evt.target.value });
  }
  
  return(
    <div>
      <form
        onSubmit={handleUploadPhoto}
        encType="multipart/form-data"
      >
        <label>Name: </label>
        <input
          name="name"
          value={photoData.name}
          onChange={handleChange}
          type="text"
        />
        {/* <input type="file" name="image" /> */}
      </form>
    </div>
  );
}