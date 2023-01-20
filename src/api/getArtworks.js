const key = process.env.REACT_APP_MASTER_KEY;
const url = process.env.REACT_APP_RIJKS_URL;

export async function getArtworksHelper(
  type,
  page,
  artworksPerPage,
  searchTerm
) {
  try {
    const response = await fetch(
      `${url}/en/collection?key=${key}&type=${type}&p=${page}&ps=${artworksPerPage}&q=${searchTerm}`
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
