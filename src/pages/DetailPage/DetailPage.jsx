import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import * as photosAPI from '../../utilities/photos-api';

export default function DetailPage({ photos, user }) {
  const { idx } = useParams();
  const photo = photos[idx];

  async function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
  }
  

  return(
    <div className="below-nav">
      {photos.length ? (
        <>
          <Photo
            photo={photo}
            index={idx}
          />
          <br />
          {user && (photo.user._id === user._id) ? (
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