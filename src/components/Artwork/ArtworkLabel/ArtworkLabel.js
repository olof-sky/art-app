import BtnRoundLink from "../../Buttons/BtnRoundLink";
function Label(props) {
  const link = `/artwork/${props.id}`;
  return (
    <div className="artwork_label">
      <h1 alt="artwork_artist">{props.maker}</h1>
      <h3 alt="artwork_title">{props.title}</h3>
      {props.displayLinkButton ? <BtnRoundLink link={link} /> : null}
    </div>
  );
}

export default Label;
