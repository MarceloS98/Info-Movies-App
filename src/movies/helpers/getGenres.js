export const getGenres = async (API_KEY) => {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_API_KEY
  );
  const data = await res.json();
  const loadedGenres = data.genres.map((genre) => genre);
  // console.log(loadedGenres);
  return loadedGenres;
};
