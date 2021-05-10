import { useState } from "react";
import { useParams } from "react-router";
import * as photosAPI from '../../utilities/photos-api';

export default function DetailPage({ photos }) {

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
  }
  
  const { photoId } = useParams();
  console.log(photoId);

  return(
    <div>
      {photos[photoId].name}
    </div>
  );
}