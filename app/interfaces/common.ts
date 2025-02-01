import React from "react";

export interface linkItemProps  {
    id: number,
    link: string,
    name: string,
    icon: React.ComponentType
}

export interface Movie {
    id: number;               // Unique movie identifier
    title: string;            // Movie title
    description: string;      // Movie description
    categories: string[];     // Categories or genres of the movie
    duration: string;         // Duration in a readable format (e.g., "1h 45m")
    poster: string;           // Path to the movie poster image
    rating: number;           // Average rating (e.g., 7.5)
    releaseDate: string;      // Release date (e.g., "2023-06-16")
    releaseDateFormatted: string; // Formatted release date for better UX (e.g., "June 16, 2023")
    genres: string[];         // List of genres (like ["Animation", "Adventure"])
    runtime: number | null;   // Runtime in minutes (nullable)
    tagline: string | null;   // Tagline of the movie (nullable)
    homepage: string | null;  // Official homepage URL (optional)
}

export interface MovieCategory{
    name: string
}