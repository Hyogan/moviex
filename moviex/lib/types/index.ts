export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
  }
  
  export interface Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;
    backdropPath: string;
    releaseDate: string;
    voteAverage: number;
    runtime: number;
    genres: string[];
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }
  
  export type AuthError = {
    message: string;
    field?: string;
  }
