import { Link } from "react-router-dom";
import arrowIcon from "../../assets/icons/chevron-right.png";

function BtnRoundLink(props) {
  return (
    <button className="btn_round_link" alt="btn_link">
      <Link to={props.link}>
        {props.goBack ? (
          <img className="reversed" src={arrowIcon} />
        ) : (
          <img src={arrowIcon} />
        )}
      </Link>
    </button>
  );
}

export default BtnRoundLink;
