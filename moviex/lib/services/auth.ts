import api from '../utils/api';
export interface LoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
        username: string;
        role: string;
        avatar?: string;
        email_verified_at: string | null;
    };
    access_token: string;
    token_type: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
    role: 'content_creator' | 'viewer';
    avatar?: File;
}

const  API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';
const API_URL_WITH_CSRF = `${BACKEND_URL}/sanctum/csrf-cookie`;
const API_AUTH_URL = `${API_URL}/auth`;

export const authService = {

    async checkAuthStatus() {
        try {
            const response = await api.get(`${API_URL}/user`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getCsrfToken() {
        await api.get(`${API_URL_WITH_CSRF}`);
    },

    async login(email: string,password: string,remember: boolean): Promise<LoginResponse> {
        await this.getCsrfToken();
        const response = await api.post(`${API_AUTH_URL}/login`,{email,password,remember});
        return response.data;
    },

    async register(data: RegisterData): Promise<LoginResponse>{
        await this.getCsrfToken();
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if(key === 'avatar' && data[key]) {
                formData.append(key,data[key] as File);
            }else{
                formData.append(key,data[key] as string);
            }
        })
        const response = await api.post(`${API_AUTH_URL}/register`,formData);
        return response.data;
    },

    async logout(): Promise<void>{
        await this.getCsrfToken();
        const response = await api.post(`${API_AUTH_URL}/logout`);
        return response.data;
    },
    async getUser(){
        await this.getCsrfToken();
        const response = await api.get(`${API_AUTH_URL}/user`);
        return response.data;
    },
    async forgotPassword(email: string) {
        await this.getCsrfToken();
        const response = await api.post(`${API_AUTH_URL}/forgot-password`,{email});
        return response.data;
    },
    async resetPassword(data: 
        {
            email: string,
            password: string,
            password_confirmation: string,
            token: string
        }){
            const response = await api.post(`${API_AUTH_URL}/reset-password`,data);
            return response.data;
        }
}