import React from "react";
import SearchBox from "./searchBox/SearchBox";
import searchIcon from "../../assets/icons/magnify.svg";
import "../../assets/styles/components/header.scss";

function Header(props) {
  const toggleSearch = () => {
    const searchBox = document.querySelector(".search_form");
    searchBox.classList.contains("active")
      ? searchBox.classList.remove("active")
      : searchBox.classList.add("active");
  };

  return (
    <header>
      <div className="logo">Skylan arts</div>
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
