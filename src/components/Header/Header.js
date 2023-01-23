import React from "react";
import SearchBox from "./searchBox/SearchBox";

function Header(props) {
  return (
    <header>
      <div className="logo">Skylan arts</div>
      <div className="search_container">
        <SearchBox onSearch={props.onSearch} />
      </div>
    </header>
  );
}
export default Header;
