"use client";
import { use, useState, useEffect } from "react";

export default function PageDetails({ params }) {
    const { id } = use(params);
    const [movie, setMovie] = useState({});
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`https://mflixbackend.azurewebsites.net/api/movies/${id}`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movies:', error);
                setLoading(false);
            }
        }

        fetchMovies();
    }, [id]);


    return (
        <div className="w-[90px] text-center">
        {movie.poster && !imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-[135px] object-cover rounded-md"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-[135px] bg-gray-300 rounded-md flex items-center justify-center">
            <span className="text-xs text-gray-600 text-center">{movie.title}</span>
          </div>
        )}
        <p className="text-xs mt-1 truncate">{movie.title}</p>
        <p className="text-sm mt-2">{movie.fullplot}</p>
    
    </div>
    );



}