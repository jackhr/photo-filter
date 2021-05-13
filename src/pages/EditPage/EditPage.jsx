import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ user, photos, updatePhoto, deletePhoto }) {
  const { idx } = useParams();
  const history = useHistory();
  const photo = photos[idx];
  const [photoName, setPhotoName] = useState(photo.name);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append('name', photoName);
    formData.append('photo', fileField.files[0]);
    const newPhotosArray = await photosAPI.update(photo._id, photoName);
    history.push('/photos');
    updatePhoto(newPhotosArray);
  }

  function handleChange(evt) {
    setPhotoName(evt.target.value);
  }

  async function handleDelete() {
    const newPhotosArray = await photosAPI.deletePhoto(photo._id);
    history.push('/photos');
    deletePhoto(newPhotosArray);
  }

  return(
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>Name: </label>
        <input
          name="name"
          value={photoName}
          onChange={handleChange}
          type="text"
        />
        <input type="file" name="image" />
        <button type="submit">Update</button>
      </form>
      {user && (photo.user._id === user._id) ? (
        <button onClick={handleDelete}>DELETE</button>
      ) : (
        <>
          <p>You shouldn't even be here!</p>
        </>
      )}
    </div>
  );
}