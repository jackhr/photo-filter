import { useState } from "react";
import { useParams } from "react-router";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ photos }) {
  const { idx } = useParams();
  const photo = photos[idx];

  const [photoData, setPhotoData] = useState({...photo})

  async function handleSubmit(evt) {
    evt.preventDefault();
    const updatedPhoto = await photosAPI.update(photo._id, photoData);

  }

  function handleChange(evt) {
    setPhotoData({ ...photoData, [evt.target.name]: evt.target.value });
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