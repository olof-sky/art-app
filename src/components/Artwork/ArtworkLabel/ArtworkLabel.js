import { React, useEffect } from "react";
import { getContrastYIQ } from "../../../helpers/helpers";
import BtnRoundLink from "../../buttons/BtnRoundLink";
import "../../../assets/styles/components/artworkLabel.scss";

const baseUrl = process.env.REACT_APP_BASE_URL;

function Label(props) {
  useEffect(() => {
    setColors();
  }, []);

  function setColors() {
    //Only sets if inside ArtworkPage
    const label = document.querySelector(".artwork_container .artwork_label");
    if (label) {
      setLabelColor(label, props.labelColor);
      setTextColor(label, props.labelColor);
    }
  }
  function setLabelColor(label, color) {
    return (label.style.backgroundColor = color);
  }

  function setTextColor(label, color) {
    const textColor = getContrastYIQ(color);
    return (label.style.color = textColor);
  }

  const link = `${baseUrl}/artwork/${props.id}`;
  return (
    <span className="artwork_label">
      <div>
        <h1 alt="artwork_artist">{props.maker}</h1>
        <h3 alt="artwork_title">{props.title}</h3>
      </div>
      {props.displayLinkButton ? <BtnRoundLink link={link} /> : null}
    </span>
  );
}

export default Label;
