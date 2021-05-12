import { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ user, photos, updatePhoto, deletePhoto }) {
  const { idx } = useParams();
  const history = useHistory();

  const photo = photos[idx];

  const [photoData, setPhotoData] = useState({...photo})

  async function handleSubmit(evt) {
    evt.preventDefault();
    const newPhotosArray = await photosAPI.update(photo._id, photoData);
    history.push('/photos');
    updatePhoto(newPhotosArray);
  }

  function handleChange(evt) {
    setPhotoData({ ...photoData, [evt.target.name]: evt.target.value });
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
          value={photoData.name}
          onChange={handleChange}
          type="text"
        />
        {/* <input type="file" name="image" /> */}
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