import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import ArtworkPage from "./components/ArtworkPage/ArtworkPage";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import "./index.scss";

const key = process.env.REACT_APP_MASTER_KEY;
const url = process.env.REACT_APP_RIJKS_URL;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getArtworks = this.getArtworks.bind(this);
    this.state = {
      page: 1,
      artworksPerPage: 10,
      artworks: null,
      type: ["drawing", "painting"],
    };
  }

  componentDidMount() {
    this.getArtworks().then((response) => {
      this.setState({ artworks: response.artObjects });
    });
  }

  async getArtworks() {
    try {
      const response = await fetch(
        `${url}/en/collection?key=${key}&type=${this.state.type[1]}&p=${this.state.page}&ps=${this.state.artworksPerPage}`
      );
      if (!response.ok) {
        throw new Error();
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      throw new Error();
    }
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Main artworks={this.state.artworks} />}
          ></Route>
          <Route path="/artwork/:id" element={<ArtworkPage />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    );
  }
}

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
