'use client';
import { useState, useEffect } from 'react';
import MovieList from './MovieList';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://mflixbackend.azurewebsites.net/api/movies?pageSize=20&page=${page}`);
        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, [page]);

  return (
    <main className="container mx-auto p-4">
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <>
          <MovieList movies={movies} />
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </button>
            <span className="text-gray-600 mx-4">Página {page}</span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}
    </main>
  );
}
