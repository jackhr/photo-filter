import { useState } from "react";
import { useParams } from "react-router";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({ photos }) {

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
  }
  
  const { photoId } = useParams();

  return(
    <div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>Name: </label>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder={photos[photoId].name}
        />
        {/* <input type="file" name="image" /> */}
      </form>
    </div>
  );
}