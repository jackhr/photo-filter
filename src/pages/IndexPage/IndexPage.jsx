import { useEffect, useState } from "react";
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
        photos.map(photo => <p>{photo.name}</p> )
      ) : (
        <h1>Ain't got no photos yet BRUH!</h1>
      )}
    </div>
  );
}