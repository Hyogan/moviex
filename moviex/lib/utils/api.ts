import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    
    withCredentials: true, // Important for cookies
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(error.response?.status === 401 && error.response?.message === 'Unauthenticated' ){
            window.location.href = '/login'
            // console.log(error);
        }
        return Promise.reject(error);
    }
)

export default api;