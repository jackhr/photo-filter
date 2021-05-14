import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import * as photosAPI from '../../utilities/photos-api';
import './DetailPage.css'

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
          {user && (photo.user._id === user._id) ? (
            <div className="edit-link-div">
              <Link className="edit-link" to={`/photos/${idx}/edit`}>Edit</Link>
            </div>
          ) : (
            <div className="more-from-user-div">
              <Link>More from <span>{photo.user.name}</span></Link>
              {/*set a link to the user's page*/}
            </div>
          )}
        </>
      ) : (
        "wagwan"
      )}
    </div>
  );
}