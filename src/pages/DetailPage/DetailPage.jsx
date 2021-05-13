import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import * as photosAPI from '../../utilities/photos-api';

export default function DetailPage({ photos, user }) {

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
  }
  
  const { idx } = useParams();

  return(
    <div>
      {photos.length ? (
        <>
          <h1>
            {photos[idx].name}
          </h1>
          <img className="display-image" src={photos[idx].imageURL}/>
          <br />
          {user && (photos[idx].user._id === user._id) ? (
            <Link to={`/photos/${idx}/edit`}>Edit</Link>
          ) : (
            <>
              <Link>This will eventually go to the page of the user who uploaded this photo</Link>
              {/*set a link to the user's page*/}
            </>
          )}
        </>
      ) : (
        "wagwan"
      )}
    </div>
  );
}