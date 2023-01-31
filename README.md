# Art app

### Description

React application using API from https://www.rijksmuseum.nl to fetch art objects and showcase information about artists and their work.

### DEMO

Live DEMO at [Github pages](https://olof-sky.github.io/art-app/)

### Setup

- Commands

  - npm install
  - npm start
  - npm run build

- Deploy
  - npm run deploy
  - Tutorial to setup gh pages: https://github.com/gitname/react-gh-pages

### TODO

- [x] Make search click re-route to index and reset list of suggestions.
- [x] If search on artist doesnt have artworks, show error text.
- [x] Removing search text completely resets search query.
- [x] Fix text color on artwork label
- [x] Work on styling
- [ ] Add rijksmuseum reference
- [ ] Add artist reference in img title
- [ ] Add error page
- [ ] Add login with google
- [ ] Add favorites, artworks
- [ ] Add follow artist

- [ ] Add random results, suggestion....

```
  /*========= Get random results =========/*

    data.count == 3396 ex.
    ps (amount of pics per page)
    p (page)

    pageMax = Math.floor(data.count / ps);

    p = random(pageMax)
```

### Data flow

- App fetches artworks data and holds it in state => Data is displayed in Main route.
- Artwork button routes to ArtworkPage with selected id as param.
- ArtworkPage fetches data by id on render and stores it with { useState } hook

### .env

```
REACT_APP_BASE_URL="/"
REACT_APP_MASTER_KEY= { Your rijksmuseum apikey }
REACT_APP_RIJKS_URL="https://www.rijksmuseum.nl/api"
```

### Other

- Make sure to use process.env.REACT_APP_BASE_URL in front of every route link
