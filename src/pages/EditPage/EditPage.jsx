import { useState } from "react";
import * as photosAPI from '../../utilities/photos-api';

export default function EditPage({  }) {

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
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
          onChange={handleChange}
          type="text"
        />
        {/* <input type="file" name="image" /> */}
      </form>
    </div>
  );
}