import React from 'react';
import {Movie} from "@/app/interfaces/common";
import Image from "next/image";
import {FaPlay} from "react-icons/fa";

interface movieCardProps{
    movie: Movie
}
const MovieCard:  React.FC<movieCardProps> = ({movie}) => {
    const truncateText = (text: string, maxLength: number = 50, replacementChar: string = '...') => {
        if(text.length > maxLength)
            return `${text.substring(0,maxLength)}${replacementChar}`
        return text;
    }
    return (
        // <div className="movie-card w-[450px]">
        //     <Image src={movie.poster} alt={movie.title} width={200} height={300}/>
        //     <h3>{movie.title}</h3>
        //     <p>{truncateText(movie.description)}</p>
        //     <p><strong>Genres:</strong> {movie.genres.join(', ')}</p>
        //     <p><strong>Duration:</strong> {movie.duration}</p>
        //     <p><strong>Rating:</strong> {movie.rating} / 10</p>
        // </div>
        <div className="overflow-hidden relative max-w-sm bg-white rounded-lg shadow-lg transition duration-700 hover:shadow-2xl hover:scale-105">
            {/* Image with absolute positioning */}
            <div className="relative w-[250px] h-[330px]">
                <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0"
                    priority // Add this if it's an important image for early load
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Overlay content on top of the image */}
            <div className="absolute top-0 left-0 p-2">
                <p className="p-4 bg-white rounded-full transition duration-700 cursor-pointer text-high_darkblue w-fit hover:text-white hover:bg-high_darkblue">
                    <FaPlay/>
                </p>
            </div>
            <div className="absolute bottom-0 left-0 p-4 w-full text-white bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-semibold">{movie.title}</h3>
                <p className="mt-2 text-sm truncate">{truncateText(movie.description)}</p>
                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center">
            <span className="px-2 py-1 mr-2 text-xs font-semibold text-white bg-yellow-400 rounded-full">
              {movie.rating.toFixed(1)}
            </span>
                        <span className="text-xs">{movie.releaseDateFormatted}</span>
                    </div>
                    <a
                        href={movie.homepage ?? ''}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-blue-500 hover:underline"
                    >
                        More Info
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;