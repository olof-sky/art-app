import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { debounce } from "./helpers/helpers";
import { getArtworksHelper } from "./api/getArtworks";

import ArtworkPage from "./pages/artworkPage/ArtworkPage";
import Header from "./components/header/Header";
import Main from "./pages/main/Main";

import "./index.scss";

const baseUrl = process.env.REACT_APP_BASE_URL;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getMoreArtworks = this.getMoreArtworks.bind(this);
    this.getSearchResult = this.getSearchResult.bind(this);
    this.getArtworks = this.getArtworks.bind(this);
    this.setArtworks = this.setArtworks.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      searchTerm: "",
      page: 1,
      artworksPerPage: 3,
      artworks: {},
      type: ["drawing", "painting"],
      loading: false,
    };
  }

  componentDidMount() {
    this.getArtworks();
  }

  getSearchResult(e, artist) {
    e.preventDefault();
    this.setState(
      {
        page: 1,
        artworks: [],
        searchTerm: artist,
      },
      async () => {
        await this.getArtworks();
      }
    );
  }

  async getMoreArtworks() {
    this.setState(
      {
        page: this.state.page + 1,
      },
      async () => await this.getArtworks()
    );
  }

  async getArtworks() {
    this.setState({
      loading: true,
    });
    await getArtworksHelper(
      this.state.type[1],
      this.state.page,
      this.state.artworksPerPage,
      this.state.searchTerm
    ).then((response) => {
      this.setArtworks(response);
    });
  }

  setArtworks(response) {
    let artworks = this.state.artworks;
    response.artObjects.forEach((artwork) => {
      artworks[artwork.id] = artwork;
    });
    console.log("Artworks::", Object.keys(artworks).length, artworks);
    this.setState({
      artworks: artworks,
      loading: false,
    });
  }

  onScroll() {
    const mainWindow = document.querySelector("body");
    //If bottom
    if (mainWindow.getBoundingClientRect().bottom < window.innerHeight) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        async () => {
          await this.getArtworks();
        }
      );
    }
  }

  render() {
    return (
      <Routes>
        <Route
          path={baseUrl}
          element={<Layout onSearch={this.getSearchResult} />}
        >
          <Route
            path={baseUrl}
            index
            element={
              <Main
                loading={this.state.loading}
                onScroll={debounce(this.onScroll, 300)}
                artworks={this.state.artworks}
              />
            }
          ></Route>
          <Route path={baseUrl + "/artwork/:id"} element={<ArtworkPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    );
  }
}

function Layout(props) {
  return (
    <div className="content">
      <Header onSearch={props.onSearch} />
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to={process.env.REACT_APP_BASE_URL}>Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
