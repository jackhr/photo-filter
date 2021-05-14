import { useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';
import './EditPage.css';

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
        <div className="update-photo-div">
          <label>Name</label>
          <input
            name="name"
            value={photoName}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="update-photo-div button-div">
          <button type="submit">Update</button>
        </div>
      </form>
      <img className="detail-image" src={photo.imageURL} alt="test" />
      {user && (photo.user._id === user._id) ? (
        <div className="delete-button-div">
          <Link to={`/photos/${idx}`}>Go Back</Link>
          <button onClick={handleDelete}>DELETE</button>
        </div>
      ) : (
        <>
          <p>You shouldn't even be here!</p>
        </>
      )}
    </div>
  );
}