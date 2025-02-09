import React from 'react';
import MainMovie from "@/app/components/main-movie";
import MovieList from "@/app/components/movie-list";
const Page = () => {
    return (
            <div className="pb-32">
                <MainMovie/>
                <MovieList/>
            </div>
    );
    
};
export default Page;