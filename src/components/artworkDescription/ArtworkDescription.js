import "../../assets/styles/components/artworkDescription.scss";

function Description(props) {
  const artwork = props.artwork;
  return (
    <span className="artwork_description">
      <ul>
        <li>Dating:{artwork.dating.presentingDate || "No dating listed"}</li>
        <li>
          Physical medium:{" "}
          {artwork.physicalMedium || "No physical medium listed"}
        </li>
        <li>
          Production place:{" "}
          {artwork.productionPlaces.join(", ") || "No production place listed"}
        </li>
      </ul>
      <p>Description:</p>
      <p>{artwork.plaqueDescriptionEnglish || "No description available"}</p>
    </span>
  );
}

export default Description;
