import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import * as photosAPI from '../../utilities/photos-api';
import './IndexPage.css';

export default function IndexPage({ photos, setPhotos, user }) {

  useEffect(function() {
    async function getPhotos() {
      const photos = await photosAPI.getAll();
      setPhotos(photos);
    }
    getPhotos();
  }, []);

  return(
    <div className="below-nav">
      {photos.length ? (
        <div>
          {photos.map((p, idx) =>
            <>
              <Photo photo={p} />
              <Link to={`/photos/${idx}`}>Details</Link>
              <hr />
            </>
          )}
        </div>
      ) : (
        <>
          {/* If there are no photos at all in the database */}
          <h1>You're our first customer!</h1>
          {user && <Link to="/photos/new">Hit me!</Link> }
        </>
      )}
    </div>
  );
}