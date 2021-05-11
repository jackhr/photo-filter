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
  
  const { idx } = useParams();

  return(
    <div>
      <h1>
        {photos[idx].name}
      </h1>
      <Link to={`/photos/${idx}/edit`}>Edit</Link>
    </div>
  );
}