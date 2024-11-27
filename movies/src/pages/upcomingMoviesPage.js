import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import AddToFavorites from "../components/cardIcons/addToFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const UpcomingMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext);

  // Fetch upcoming movies using react-query
  const { data, isLoading, error } = useQuery(
    "upcomingMovies",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading upcoming movies: {error.message}</div>;
  }

  const movies = data.results.map((movie) => {
    movie.genre_ids = movie.genres ? movie.genres.map(g => g.id) : [];
    return movie;
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <AddToFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
