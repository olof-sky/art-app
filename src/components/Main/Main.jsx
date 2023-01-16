import { Link } from "react-router-dom";

function Artwork(props) {
  return (
    <section className="artwork__container">
      <img src={props.imgSrc} loading="lazy" alt={props.title} id={props.id} />
      <div className="artwork__label">
        <h1>{props.maker}</h1>
        <h3>{props.title}</h3>
        <Link to={`/artwork/${props.id}`}>GoTo</Link>
      </div>
    </section>
  );
}

function Main(props) {
  //Loading
  if (!props.artworks) {
    return <div>Loading</div>;
  }
  // Artworks fetched
  else {
    const artworks = [...props.artworks];
    return (
      <main className="artworks__container">
        {artworks.map((artwork, index) => {
          return (
            <Artwork
              imgSrc={artwork.webImage.url}
              id={artwork.objectNumber}
              maker={artwork.principalOrFirstMaker}
              title={artwork.title}
              key={artwork.id}
              selectArtwork={props.selectArtwork}
            />
          );
        })}
      </main>
    );
  }
}

/*========= Data Object =========/*
    {
      links: [Object],
      id: 'nl-SK-C-597',
      objectNumber: 'SK-C-597',
      title: 'Portret van een vrouw, mogelijk Maria Trip',
      hasImage: true,
      principalOrFirstMaker: 'Rembrandt van Rijn',
      longTitle: 'Portret van een vrouw, mogelijk Maria Trip, Rembrandt van Rijn, 1639',
      showImage: true,
      permitDownload: true,
      webImage: [Object],
      headerImage: [Object],
      productionPlaces: []
    },
*/

/*========= Data Object =========/*
artObject {
    {
      Use for underline title on art piece
      colors[0].hex: "#256190"

      dating {
        presentingDate: "1642"
      }

      physicalMedium {
        "oil on canvas"
      }

      productionPlaces {
        ['Amsterdam']
      }

      label {
        description
        "Rembrandt's largest and most famous painting was made for one of the three headquarters of Amsterdam's civic guard. These groups of civilian soldiers defended the city from attack. Rembrandt was the first to paint all of the figures in a civic guard piece in action. The captain, dressed in black, gives the order to march out. The guardsmen are getting into formation. Rembrandt used the light to focus on particular details, like the captain's gesturing hand and the young girl in the foreground. She was the company mascot. The nickname Night Watch originated much later, when the painting was thought to represent a nocturnal scene."
        
        makerLine 
        "Rembrandt van Rijn (1606-1669) oil on canvas, 1642"
        
        notes
         "Multimediatour, 500"
        
        title 
        "The Night Watch"
      } 
    }
  }
*/

/*========= Get random results =========/*

    data.count == 3396 ex.  
    ps (amount of pics per page)
    p (page)

    pageMax = Math.floor(data.count / ps);
  */

export default Main;
