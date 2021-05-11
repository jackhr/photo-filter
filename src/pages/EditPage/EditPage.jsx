import { useState } from "react";
import { useParams } from "react-router";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ photos }) {
  const { photoId } = useParams();
  const photo = photos[photoId];

  const [photoData, setPhotoData] = useState({...photos[photoId]})

  async function handleSubmit(evt) {
    evt.preventDefault();
    const updatedPhoto = await photosAPI.update(photoId, photoData);

  }

  function handleChange(evt) {
    setPhotoData({ name: evt.target.value });
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
    </div>
  );
}