'use client'
import {Movie} from "@/app/interfaces/common";
import {useState} from "react";
import Modal from "@/app/components/utils/modal";
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
                className={`inset-0 h-[450px] rounded-xl w-full flex flex-col items-start justify-start transition-opacity duration-500`}
                style={{
                    background: 'none', // Reset the shorthand background property
                    backgroundColor: 'black', // Optional, if you want a base background color
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), hsla(240, 11%, 15%, 1)), url(${movie.poster})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            >
                <div className=" inset-0 bg-black bg-opacity-100"></div>
                {/* Overlay */}
                <div className="relative max-w-[60%] z-10 flex flex-col items-start h-full w-full pl-1 md:pl-20 justify-end py-2">
                    <div className="w-full gap-2 flex mb-4 items-center">
                        {movie.categories.map((category,id) => (
                            <span key={id} className="px-4 py-1 text-white rounded-full shadow-lg bg-white bg-opacity-20 backdrop-blur-lg hover:scale-105 hover:bg-blue-700/20 transition-transform duration-300">{category}</span>
                        ))}
                    </div>
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">{movie.title}</h1>
                    <p className="mt-4 text-md text-white drop-shadow-md">{truncate(movie.description, 150)}</p>
                    <div className="flex w-full items-start gap-4 my-4">
                        <button
                            onClick={openModal}
                            className="flex items-center gap-3 px-8 py-4 rounded-full  shadow-lg bg-white backdrop-blur-lg hover:scale-105 text-smooth_darkblue transition-transform duration-300">
                            <FaPlay /><span>Watch</span>
                        </button>
                        <button
                            onClick={openModal}
                            className="flex items-center gap-3 px-8 py-4 rounded-full  shadow-lg bg-transparent text-white border-2 backdrop-blur-lg hover:scale-105  transition-transform duration-300">
                            <FaDownload /> <span>Download</span>
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">Information Unavailable</h2>
                <p className="text-gray-200 text-center mb-6">
                    The details for this place are not yet available, please come later, or
                    <a href="/contact" className="text-blue-400 hover:text-blue-600 mx-1">
                        contact us
                    </a>
                    to provide any relevant information about it.
                </p>
                <div className="flex justify-center">
                    <button
                        onClick={closeModal}
                        className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all ease-in-out duration-300"
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