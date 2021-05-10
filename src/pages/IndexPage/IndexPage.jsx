import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Photo from "../../components/Photo/Photo";
import * as photosAPI from '../../utilities/photos-api';

export default function IndexPage({ photos, setPhotos }) {

  useEffect(function() {
    async function getPhotos() {
      const photos = await photosAPI.getAll();
      setPhotos(photos);
    }
    getPhotos();
  }, []);

  return(
    <div>
      {photos.length ? (
        photos.map((p, idx) =>
          <>
            <Photo photo={p} />
            <Link to={`/photos/${idx}`}>Details</Link>
            <hr />
          </>
        )
      ) : (
        <h1>Ain't got no photos yet BRUH!</h1>
      )}
    </div>
  );
}