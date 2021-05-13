import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import * as photosAPI from '../../utilities/photos-api';
import './IndexPage.css';

export default function IndexPage({ photos, setPhotos, user }) {

  const onIndexPage = true;

  useEffect(function() {
    async function getPhotos() {
      const photos = await photosAPI.getAll();
      setPhotos(photos);
    }
    getPhotos();
  }, []);

  return(
    <div className="below-nav index-div">
      {photos.length ? (
        <>
          {photos.map((p, idx) =>
            <div
              style={{gridColumnStart: (idx % 3) + 1}}
            >
              <Link to={`/photos/${idx}`}>
                <Photo
                  key={idx}
                  photo={p}
                  onIndexPage={onIndexPage}
                />
              </Link>
            </div>
          )}
        </>
      ) : (
        <>
          {/* If there are no photos at all in the database */}
          {user ? (
            <>
              <h1>You're our first customer!</h1>
              <Link to="/photos/new">Hit me!</Link>
            </>
          ) : (
            <>
              <h1>It's just you here...</h1>
              <span>
                Click
                <Link to="/login"> Here </Link>
                to sign up!
              </span>
            </>
          )}
        </>
      )}
    </div>
  );
}