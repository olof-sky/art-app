# Art app

### Description

Application using API from https://www.rijksmuseum.nl to fetch art objects and showcase information about artists and their work.

### Data flow

App fetches and holds artworks data in state. It then displays the data in Main.
Main triggers selectArtwork on image press.
App fetches artworkDataById and routes to ArtworkPage with selected data as props.
