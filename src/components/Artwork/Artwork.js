import ArtworkLabel from "./artworkLabel/ArtworkLabel";

function Artwork(props) {
  return (
    <section className="artwork_image_and_label">
      <img src={props.imgSrc} loading="lazy" alt={props.title} id={props.id} />
      <ArtworkLabel {...props} />
    </section>
  );
}

export default Artwork;
