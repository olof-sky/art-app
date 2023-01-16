import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const key = process.env.REACT_APP_MASTER_KEY;
const url = process.env.REACT_APP_RIJKS_URL;

function ArtworkPage(props) {
  const [artwork, setArtwork] = useState({});
  const [loading, setLoading] = useState(true);
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
        setArtwork(data);
        setLoading(false);
        return data;
      }
    } catch (error) {
      console.log("Error::", error);
      setLoading(false);
      throw new Error();
    }
  }

  if (!id) {
    return <div>No id</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  } else
    return (
      <div>
        <h1>{artwork.artObject.title}</h1>
      </div>
    );
}

export default ArtworkPage;
