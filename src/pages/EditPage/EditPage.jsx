import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ user, photos, setPhotos }) {
  const { idx } = useParams();
  const history = useHistory();
  const photo = photos[idx];
  const [photoName, setPhotoName] = useState(photo.name);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('name', photoName);
    const newPhotosArray = await photosAPI.update(photo._id, formData);
    history.push('/photos');
    setPhotos(newPhotosArray);
  }

  function handleChange(evt) {
    setPhotoName(evt.target.value);
  }

  async function handleDelete() {
    const newPhotosArray = await photosAPI.deletePhoto(photo._id);
    history.push('/photos');
    setPhotos(newPhotosArray);
  }

  return(
    <div className="below-nav">
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
        <button type="submit">Update</button>
      </form>
      <img className="display-image" src={photo.imageURL} alt="test" />
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