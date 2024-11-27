import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const UpcomingMoviesPage = () => {
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

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return (
          <IconButton aria-label="add to playlist">
            <PlaylistAddIcon color="primary" fontSize="large" />
          </IconButton>
        );
      }}
    />
  );
};

export default UpcomingMoviesPage;
