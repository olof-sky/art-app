import BtnRoundLink from "../../Buttons/BtnRoundLink";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Label(props) {
  const link = `${baseUrl}/artwork/${props.id}`;
  return (
    <div className="artwork_label">
      <h1 alt="artwork_artist">{props.maker}</h1>
      <h3 alt="artwork_title">{props.title}</h3>
      {props.displayLinkButton ? <BtnRoundLink link={link} /> : null}
    </div>
  );
}

export default Label;
