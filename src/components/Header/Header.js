import React from "react";
import SearchBox from "./searchBox/SearchBox";
import searchIcon from "../../assets/icons/magnify.svg";
import "../../assets/styles/components/header.scss";
import { Link } from "react-router-dom";
const baseUrl = process.env.REACT_APP_BASE_URL;

function Header(props) {
  const toggleSearch = () => {
    const searchBox = document.querySelector(".search_form");
    searchBox.classList.contains("active")
      ? searchBox.classList.remove("active")
      : searchBox.classList.add("active");
  };

  return (
    <header>
      <div className="logo">
        <Link to={baseUrl}>Skylan arts</Link>
      </div>
      <div className="search_container">
        <button className="search_button" onClick={toggleSearch}>
          <img src={searchIcon} />
        </button>
        <SearchBox onSearch={props.onSearch} />
      </div>
    </header>
  );
}
export default Header;
