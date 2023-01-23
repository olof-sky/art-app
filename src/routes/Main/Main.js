import { useEventListener } from "../../hooks/hooks.js";
import { Loading } from "../../components/loading/Loading.js";
import Artwork from "../../components/artwork/Artwork";

function Main(props) {
  const handler = () => {
    props.onScroll();
  };

  useEventListener("scroll", handler);
  //Loading
  if (!props.artworks) {
    return <Loading />;
  }
  // Artworks fetched
  else {
    const artworks = props.artworks;
    return (
      <main className="artworks_container">
        {Object.keys(artworks).map((key) => {
          return (
            <Artwork
              imgSrc={artworks[key].webImage.url}
              id={artworks[key].objectNumber}
              maker={artworks[key].principalOrFirstMaker}
              title={artworks[key].title}
              key={artworks[key].id}
              displayLinkButton={true}
            />
          );
        })}
        {props.loading ? <Loading /> : null}
      </main>
    );
  }
}

export default Main;
