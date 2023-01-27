import ArtworkLabel from "./artworkLabel/ArtworkLabel";
function Artwork(props) {
  return (
    <span className="artwork_image_and_label">
      <img
        className="artwork_image"
        src={props.imgSrc}
        loading="lazy"
        alt={props.title}
        id={props.id}
      />
      <ArtworkLabel {...props} />
    </span>
  );
}

export default Artwork;
