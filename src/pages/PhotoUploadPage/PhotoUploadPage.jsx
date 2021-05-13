import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function PhotoUploadPage({ addPhoto }) {
  const [photoName, setPhotoName] = useState("My New Photo");
  const history = useHistory();

  async function handleUploadPhoto(evt) {
    evt.preventDefault();


    const formData = new FormData();


    const fileField = document.querySelector('input[type="file"]');


    formData.append('name', photoName);
    fileField.files.length && formData.append('photo', fileField.files[0]);


    const newPhotosArray = await photosAPI.create(formData);
    console.log(newPhotosArray);
    addPhoto(newPhotosArray);
    history.push("/photos");
  }

  function handleChange(evt) {
    setPhotoName(evt.target.value);
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
          value={photoName}
          onChange={handleChange}
          type="text"
        />
        <input type="file" name="imageURL" />
      </form>
    </div>
  );
}