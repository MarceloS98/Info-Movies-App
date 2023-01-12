export const getMovies = (data) => {
  const loadedMovies = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      release: movie.release_date,
      poster: movie.poster_path,
      backdrop: movie.backdrop_path,
      rating: movie.vote_average,
    };
  });
  const results = {
    page: data.page,
    total_pages: data.total_pages,
    results: loadedMovies,
  };
  return results;
};
