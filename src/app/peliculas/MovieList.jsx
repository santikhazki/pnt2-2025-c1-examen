import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {movies.map((movie) => (
        <MovieCard 
          key={movie._id} 
          movie={movie} 
        />
      ))}
    </div>
  );
}
