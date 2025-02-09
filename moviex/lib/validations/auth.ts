import { z } from 'zod';

export const loginSchema = z.object({
    email: z 
        .string()
        .min(1, 'Email is required')
        .email('Invalid email adress'),
    password: z
        .string()
        .min(8,'password is required')
        .min(6,'password must be at least 6 characters')
});

export const registerSchema  = z.object({
    name: z 
        .string()
        .min(1,'Name is required')
        .min(2, 'name must be at least 6 characters'),
    username: z
        .string()
        .min(1,'Username is required')
        .min(2, 'Username must be at least 6 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),
    profile_picture: z
        .any()
        .optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match ",
    path: ["confirmedPassword"]
})