import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import BtnRoundLink from "../../components/buttons/BtnRoundLink";
import Artwork from "../../components/artwork/Artwork";
import ArtworkDescription from "../../components/artworkDescription/ArtworkDescription";
import ArtworkWikiLinks from "../../components/artworkWikiLinks/ArtworkWikiLinks";
import img from "../../assets/img/noImgAvailable.jpg";
import "../../assets/styles/components/artworkPage.scss";
import { Loading } from "../../components/loading/Loading";
import { setQuery } from "../../helpers/helpers";

const key = process.env.REACT_APP_MASTER_KEY;
let url = process.env.REACT_APP_RIJKS_URL;
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
    let wikiUrl = "https://en.wikipedia.org/w/api.php";
    let params = {
      action: "query",
      list: "search",
      srsearch: query,
      format: "json",
    };

    wikiUrl = wikiUrl + "?origin=*";
    wikiUrl = setQuery(wikiUrl, params);
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
    let params = {
      key: key,
    };
    let searchUrl = url + `/en/collection/${id}?`;
    searchUrl = setQuery(searchUrl, params);

    try {
      const response = await fetch(searchUrl);
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
    return <Loading />;
  } else {
    const artistUrl = `http://en.wikipedia.org/?curid=${artistId}`;
    const physicalMediumUrl = `http://en.wikipedia.org/?curid=${physicalMediumId}`;
    const artistWiki = { name: artwork.principalOrFirstMaker, url: artistUrl };
    const physicalMediumWiki = {
      name: artwork.physicalMedium,
      url: physicalMediumUrl,
    };
    let labelColor = artwork.colors[0] ? artwork.colors[0].hex : "#000000";
    const imgSrc = artwork.webImage ? artwork.webImage.url : img;

    const meta = {
      title: artwork.principalOrFirstMaker,
      description:
        "M??lare: " + artwork.label.makerLine + "; M??tt: " + artwork.subTitle,
      meta: {
        charset: "utf-8",
        name: {
          keywords: `art, artwork, stor tavla, konst, tavla, m??lning, ${artwork.principalOrFirstMaker}, ${artwork.physicalMedium}`,
        },
        "og:title": artwork.principalOrFirstMaker,
        "og:image": imgSrc,
        "og:description": artwork.label.makerLine,
        "og:locale": "en_GB",
      },
    };
    return (
      <DocumentMeta {...meta}>
        <main className="artwork_container">
          <Artwork
            imgSrc={imgSrc}
            maker={artwork.principalOrFirstMaker}
            title={artwork.title}
            labelColor={labelColor}
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
      </DocumentMeta>
    );
  }
}

export default ArtworkPage;
