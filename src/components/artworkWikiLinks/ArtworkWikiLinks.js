import "../../assets/styles/components/artworkWikiLinks.scss";

function ArtworkWikiLinks(props) {
  const artist = props.artist;
  const physicalMedium = props.physicalMedium;
  return (
    <span className="artwork_wiki_links">
      <span>
        <h2>More on artist:</h2>
        <a href={artist.url}>
          <p>{artist.name}</p>
        </a>
      </span>
      <span>
        <h2>More on technique:</h2>{" "}
        <a href={physicalMedium.url}>
          <p>{physicalMedium.name}</p>
        </a>
      </span>
    </span>
  );
}
export default ArtworkWikiLinks;
