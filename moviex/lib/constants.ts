export const APP_NAME = 'MovieX';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  PROFILE: '/profile',
} as const;

export const GENRES = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Adventure' },
  { id: 3, name: 'Comedy' },
  { id: 4, name: 'Drama' },
  { id: 5, name: 'Horror' },
] as const;

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_EXISTS: 'Email already exists',
  WEAK_PASSWORD: 'Password must be at least 8 characters',
} as const;


export const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];