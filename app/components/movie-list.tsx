'use client'
import {Movie} from "@/app/interfaces/common";
import MovieCard from "@/app/components/movie-card";
import React, {useEffect, useState} from "react";
import Loader from "@/app/components/utils/loader";

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch("http://localhost:3000/mocks/movies.json");
                const data = await res.json();
                setMovies(data); // Updates movies state
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false); // Stops the loading state
            }
        };
        fetchMovies().then(r => console.log(r));
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="w-full max-w-full">
            <div className="text-white flex items-center justify-between px-2 my-4 ">
                <h1 className="text-xl font-bold">Movie list</h1>
                <button className="px-4 py-1 text-white rounded-full shadow-lg bg-white bg-opacity-20 backdrop-blur-lg hover:scale-105 hover:bg-blue-700/20 transition-transform duration-300">View all</button>
            </div>

            <div className="movie-list flex w-full flex-wrap gap-4  center justify-center">
                {movies.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
};
export default MovieList;