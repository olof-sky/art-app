# Art app

### Description

Application using API from https://www.rijksmuseum.nl to fetch art objects and showcase information about artists and their work.

### Data flow

App fetches artworks data and holds it in state. Data is displayed in Main route.
Artwork button routes to ArtworkPage with selected id as param.
ArtworkPage fetches data by id on render and stores it with { useState } hook

### .env
```
REACT_APP_BASE_URL="/"
REACT_APP_MASTER_KEY= { Your rijksmuseum apikey }
REACT_APP_RIJKS_URL="https://www.rijksmuseum.nl/api"
```
### Other

- Make sure to use process.env.REACT_APP_BASE_URL in front of every route link
