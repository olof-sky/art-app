import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import BtnRoundLink from "../../components/buttons/BtnRoundLink";
import Artwork from "../../components/artwork/Artwork";
import ArtworkDescription from "../../components/artworkDescription/ArtworkDescription";
import ArtworkWikiLinks from "../../components/artworkWikiLinks/ArtworkWikiLinks";
import "../../assets/styles/components/artworkPage.scss";

const key = process.env.REACT_APP_MASTER_KEY;
const url = process.env.REACT_APP_RIJKS_URL;
const baseUrl = process.env.REACT_APP_BASE_URL;

function ArtworkPage() {
  const [artwork, setArtwork] = useState({});
  const [artistId, setArtistId] = useState("");
  const [physicalMediumId, setPhysicalMediumId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getArtworkById(id);
  }, []);

  function setWikipediaPageId(query, type) {
    var wikiUrl = "https://en.wikipedia.org/w/api.php";
    var params = {
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
    };

    wikiUrl = wikiUrl + "?origin=*";
    Object.keys(params).forEach(function (key) {
      wikiUrl += "&" + key + "=" + params[key];
    });
    try {
      fetch(wikiUrl)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (type === "artist") {
            setArtistId(data.query.search[0].pageid);
          }
          if (type === "physicalMedium") {
            setPhysicalMediumId(data.query.search[0].pageid);
          }
          return data;
        });
    } catch (error) {
      console.log(error);
      setError(true);
      throw new Error();
    }
  }

  async function getArtworkById(id) {
    setLoading(true);
    try {
      const response = await fetch(`${url}/en/collection/${id}?key=${key}`);
      if (!response.ok) {
        throw new Error();
      } else {
        const data = await response.json();
        setArtwork(data.artObject);
        setWikipediaPageId(data.artObject.principalOrFirstMaker, "artist");
        setWikipediaPageId(data.artObject.physicalMedium, "physicalMedium");
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
    const artistUrl = `http://en.wikipedia.org/?curid=${artistId}`;
    const physicalMediumUrl = `http://en.wikipedia.org/?curid=${physicalMediumId}`;
    const artistWiki = { name: artwork.principalOrFirstMaker, url: artistUrl };
    const physicalMediumWiki = {
      name: artwork.physicalMedium,
      url: physicalMediumUrl,
    };
    return (
      <main className="artwork_container">
        <Artwork
          imgSrc={artwork.webImage.url}
          maker={artwork.principalOrFirstMaker}
          title={artwork.title}
          labelColor={artwork.colors[0].hex}
        />
        <div className="artwork_info_container">
          <ArtworkDescription artwork={artwork} />
          <ArtworkWikiLinks
            artist={artistWiki}
            physicalMedium={physicalMediumWiki}
          />
          <BtnRoundLink link={baseUrl} goBack={true} />
        </div>
      </main>
    );
  }
}

export default ArtworkPage;
