"use client";
import { useState, useEffect } from 'react';
import MovieList from "./peliculas/MovieList";
import Link from "next/link";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://mflixbackend.azurewebsites.net/api/movies`);
        const data = await response.json();
        const topFive = data.filter(p => p.imdb)
          .sort((a, b) => b.imdb.rating - a.imdb.rating)
          .slice(0, 5);
        setMovies(topFive);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 w-full flex justify-center items-center gap-x-4">
        <h1 className="text-lg font-semibold">Press to watch full... </h1>
        <Link href={`/peliculas`}>
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Movies Catalog
          </button>
        </Link>
      </header>
      <main className="container mx-auto p-4 items-center justify-center">
        {loading ? (

          <p className="row-start-3 flex gap-6 flex-wrap items-center justify-center">Loading movies top 5...</p>

        ) : (
          <>
            <MovieList movies={movies} />
          </>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Santiago Khazki. Todos los derechos reservados
      </footer>
    </div>
  );

}
