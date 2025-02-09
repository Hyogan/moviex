'use client'
import {Movie} from "@/app/interfaces/common";
import {useState} from "react";
import Modal from "@/app/components/shared/modal";
import { FaPlay } from 'react-icons/fa';
import { FaDownload } from 'react-icons/fa';


const MainMovie = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const movie : Movie = {
        id: 0,
        title: 'Spider-Man: Across the Spider-Verse',
        description: 'Miles Morales catapults across the multiverse, where he encounters a team of spider-people charged with protecting its very existence.',
        categories: ['Animation', 'Adventure', 'Science', 'Fantasy'],
        duration: '1h 45m',
        poster: '/images/spiderman.png',
        rating: 8.9,              // Average rating (out of 10)
        releaseDate: '2023-06-16',  // Release date in ISO format
        releaseDateFormatted: 'June 16, 2023', // Formatted release date
        genres: ['Animation', 'Adventure', 'Science', 'Fantasy'], // Genres as an array of strings
        runtime: 105,             // Runtime in minutes (1h 45m)
        tagline: 'Mischief. Mayhem. Spider-Verse.',  // Tagline (optional)
        homepage: 'https://www.spidermovie.com', // Official homepage (optional)
    }


    const truncate = (oldtext: string,maxSize: number = 100, replacement: string = '...') => {
        return oldtext.length > maxSize ? oldtext.substring(0,maxSize) + replacement : oldtext
    }
    return (
        <div>
            {/*<span> {movie.title}</span>*/}
            <div
                className={`flex inset-0 flex-col justify-start items-start w-full rounded-xl transition-opacity duration-500 h-[450px]`}
                style={{
                    background: 'none', // Reset the shorthand background property
                    backgroundColor: 'black', // Optional, if you want a base background color
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), hsla(240, 11%, 15%, 1)), url(${movie.poster})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className="inset-0 bg-black bg-opacity-100"></div>
                {/* Overlay */}
                <div className="relative max-w-[60%] z-10 flex flex-col items-start h-full w-full pl-1 md:pl-20 justify-end py-2">
                    <div className="flex gap-2 items-center mb-4 w-full">
                        {movie.categories.map((category,id) => (
                            <span key={id} className="px-4 py-1 text-white bg-white bg-opacity-20 rounded-full shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105 hover:bg-blue-700/20">{category}</span>
                        ))}
                    </div>
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">{movie.title}</h1>
                    <p className="mt-4 text-white drop-shadow-md text-md">{truncate(movie.description, 150)}</p>
                    <div className="flex gap-4 items-start my-4 w-full">
                        <button
                            onClick={openModal}
                            className="flex gap-3 items-center px-8 py-4 bg-white rounded-full shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105 text-smooth_darkblue">
                            <FaPlay /><span>Watch</span>
                        </button>
                        <button
                            onClick={openModal}
                            className="flex gap-3 items-center px-8 py-4 text-white bg-transparent rounded-full border-2 shadow-lg backdrop-blur-lg transition-transform duration-300 hover:scale-105">
                            <FaDownload /> <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="mb-4 text-2xl font-semibold text-center text-white">Information Unavailable</h2>
                <p className="mb-6 text-center text-gray-200">
                    The details for this place are not yet available, please come later, or
                    <a href="/contact" className="mx-1 text-blue-400 hover:text-blue-600">
                        contact us
                    </a>
                    to provide any relevant information about it.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 text-white bg-red-600 rounded-full transition-all duration-300 ease-in-out hover:bg-red-700"
                    >
                        Close
                    </button>
                </div>
            </Modal>

        </div>

        // <div className="bg-blue-500">Hello world</div>
    );
}

export default MainMovie;