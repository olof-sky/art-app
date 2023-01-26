import BtnRoundLink from "../../buttons/BtnRoundLink";
import "../../../assets/styles/components/artworkLabel.scss";
import { React, useEffect } from "react";

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

  function getContrastYIQ(hexcolor) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? "black" : "white";
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
