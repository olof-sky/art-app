import { React, useState } from "react";
import { useEventListener } from "../../../hooks/hooks";
import { debounce } from "../../../helpers/helpers";

/*
TODO: If artist option selected =>
On input, show artist where query matches input
On artist select, input = selected artist
*/

function SearchBox(props) {
  const searchInputField = document.querySelector(".search-input");
  const artists = [
    "George Hendrik Breitner",
    "Jan Luyken",
    "Ed van der Elsken",
    "Reinier Vinkeles",
    "Marius Bauer",
    "Isaac Israels",
    "Johannes Tavenraat",
    "Daniel Nikolaus Chodowiecki",
    "Aat Veldhoen",
    "Bernard Picart",
    "Vincent Samuel Mentzel",
    "Willem Witsen",
    "anoniem",
    "Antonio Tempesta",
    "Jacob Houbraken",
    "Carel Adolph Lion Cachet",
    "Rembrandt van Rijn",
    "Johan Braakensiek",
    "Simon Fokke",
    "Romeyn de Hooghe",
    "Philips Galle",
    "Richard Nicolaüs Roland Holst",
    "Sébastien Leclerc",
    "Meissener Porzellan Manufaktur",
    "Jozef Israëls",
    "Willem Diepraam",
    "Johan Michaël Schmidt Crans",
    "Jan Veth",
    "Frans Hogenberg",
    "Crispijn van de Passe",
    "Wenceslaus Hollar",
    "Gerrit Willem Dijsselhof",
    "Jacob de Gheyn",
    "Leo Gestel",
    "Johann Sadeler",
    "Stefano della Bella",
    "Jeanne Bieruma Oosting",
    "Caspar Luyken",
    "Michel Wolgemut",
    "Hendrick Goltzius",
    "Hendrik Spilman",
    "Anton Mauve",
    "Adriaen Collaert",
    "Reinier Willem Petrus de Vries",
    "Virgilius Solis",
    "Jacques Callot",
    "Jan van de Velde",
    "Pieter Schenk",
    "Cornelis Vreedenburgh",
    "diverse vervaardigers",
    "Hendrik Herman van den Berg",
    "Carel Nicolaas Storm van 's-Gravesande",
    "Christoffel van Sichem",
    "Theo van Hoytema",
    "veuve Delpech",
    "Anselmus Boëtius de Boodt",
    "Israël Silvestre",
    "Georg Rueter",
    "Johannes of Lucas van Doetechum",
    "August Allebé",
    "Reijer Stolk",
    "Willem Cornelis Rip",
    "Jean Lepautre",
    "Eva Charlotte Pennink-Boelen",
    "Jan Caspar Philips",
    "Hendrik Doijer",
    "Simon Frisius",
    "Abraham Rademaker",
    "Giorgio Sommer",
    "Manufactuur Oud-Loosdrecht",
    "Claude Mellan",
    "Crispijn van de Passe",
    "Hieronymus Wierix",
    "Charles Donker",
    "Pam Georg Rueter",
    "Martin Bernigeroth",
    "Albert Greiner",
    "Carel Christiaan Antony Last",
    "Jacob Ernst Marcus",
    "Henry Pauw van Wieldrecht",
    "Giovanni Battista Piranesi",
    "Jan Punt",
    "Delizy",
    "Johannes Wierix",
    "Neue Photographische Gesellschaft",
    "Geldolph Adriaan Kessler",
    "Anthonie van den Bos",
    "Johannes Josephus Aarts",
    "Antoon Derkinderen",
    "Jacob Matham",
    "Woodbury Page",
    "Isaac Weissenbruch",
    "Peter Vos",
    "Claes Jansz. Visscher",
    "Aegidius Sadeler",
    "Jacob Folkema",
    "Jan Brandes",
    "Carel Willink",
  ];

  const [query, setQuery] = useState("");
  const [artist, setArtist] = useState("");
  const [suggestions, setSuggestions] = useState(artists);

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
    <form onSubmit={(e) => props.onSearch(e, artist)}>
      <input className="search-input" type="text" placeholder="Search" />
      <button type="submit">Search</button>
      <h4>{artist}</h4>
      <ul>
        {suggestions.map((suggestion, index) => {
          return query ? (
            <li key={index} onClick={() => setActiveArtist(suggestion)}>
              {suggestion}
            </li>
          ) : null;
        })}
      </ul>
    </form>
  );
}
export default SearchBox;