import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function DetailPage({ photos }) {

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
  }
  
  const { photoId } = useParams();

  return(
    <div>
      <h1>
        {photos[photoId].name}
      </h1>
      <Link to={`/photos/${photoId}/edit`}>Edit</Link>
    </div>
  );
}