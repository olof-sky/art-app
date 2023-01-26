function ArtworkWikiLinks(props) {
  const artist = props.artist;
  const physicalMedium = props.physicalMedium;
  return (
    <span className="artwork_wiki_links">
      <a href={artist.url}>More on artist: {artist.name}</a>
      <br></br>
      <a href={physicalMedium.url}>More on technique: {physicalMedium.name}</a>
      <br></br>
    </span>
  );
}
export default ArtworkWikiLinks;
