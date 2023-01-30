import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEventListener } from "../../../hooks/hooks";
import { debounce } from "../../../helpers/helpers";
import { artistsList } from "../../../data/artists";
import "../../../assets/styles/components/searchBox.scss";

/*
TODO: If artist option selected =>
On input, show artist where query matches input
On artist select, input = selected artist
*/

function SearchBox(props) {
  const artists = [...artistsList];
  const searchInputField = document.querySelector(".search_input");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("");
  const [suggestions, setSuggestions] = useState(artists);

  const search = (e, artist) => {
    props.onSearch(e, artist);
    setSuggestions([]);
    navigate(process.env.REACT_APP_BASE_URL);
    setQuery("");
  };

  const handler = () => {
    setSearchSuggestions();
  };

  async function setSearchSuggestions() {
    setQuery(searchInputField.value.toLowerCase());
    const query = searchInputField.value.toLowerCase();
    let filteredArtist = artists
      .filter((artist) => {
        return artist.toLowerCase().includes(query);
      })
      .sort(
        (a, b) =>
          b.toLowerCase().startsWith(query) - a.toLowerCase().startsWith(query)
      );
    !query ? setArtist("") : setArtist(filteredArtist[0]);
    return setSuggestions(filteredArtist);
  }

  useEventListener("input", debounce(handler, 300), searchInputField);

  function setActiveArtist(artist) {
    setArtist(artist);
    searchInputField.value = artist;
  }

  return (
    <form className="search_form" onSubmit={(e) => search(e, artist)}>
      <input className="search_input" type="text" />
      <button type="submit">Search</button>
      {query ? (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {
            return suggestion == artist ? (
              <li
                className="active_artist"
                key={index}
                onClick={() => setActiveArtist(suggestion)}
              >
                {suggestion}
              </li>
            ) : (
              <li key={index} onClick={() => setActiveArtist(suggestion)}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      ) : null}
    </form>
  );
}
export default SearchBox;
