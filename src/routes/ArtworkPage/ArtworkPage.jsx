import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BtnRoundLink from "../../components/Buttons/BtnRoundLink";
import Artwork from "../../components/Artwork/Artwork";
import ArtworkDescription from "../../components/Artwork/ArtworkDescription/ArtworkDescription";

const key = process.env.REACT_APP_MASTER_KEY;
const url = process.env.REACT_APP_RIJKS_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

function ArtworkPage() {
  const [artwork, setArtwork] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getArtworkById(id);
  }, []);

  async function getArtworkById(id) {
    setLoading(true);
    try {
      const response = await fetch(`${url}/en/collection/${id}?key=${key}`);
      if (!response.ok) {
        throw new Error();
      } else {
        const data = await response.json();
        setArtwork(data.artObject);
        setLoading(false);
        console.log("Data::", data);
        return data;
      }
    } catch (error) {
      console.log("Error::", error);
      setLoading(false);
      setError(true);
      throw new Error();
    }
  }

  if (error) {
    return <div>Page couldn't load</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <main className="artwork_container">
        <Artwork
          imgSrc={artwork.webImage.url}
          maker={artwork.principalOrFirstMaker}
          title={artwork.title}
        />
        <ArtworkDescription artwork={artwork} />
        <BtnRoundLink link={baseUrl} goBack={true} />
      </main>
    );
  }
}

export default ArtworkPage;
