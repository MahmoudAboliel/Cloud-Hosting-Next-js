import { z } from 'zod';

// Create Article Schema
export const articleSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    }).min(2).max(200),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string"
    }).min(10)
});

// Register User Schema
export const registerUserSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name should be of type string"
    }).min(3).max(50),
    email: z.string({
        required_error: "Email is required",
    }).min(5).max(200).email(),
    password: z.string({
        required_error: "Password is required",
    }).min(6)
});

// Login User Schema
export const loginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
    }).min(5).max(200).email(),
    password: z.string({
        required_error: "Password is required",
    }).min(6)
});

// Update User Schema
export const updateUserSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name should be of type string"
    }).min(3).max(50).optional(),
    email: z.string({
        required_error: "Email is required",
    }).min(5).max(200).email().optional(),
    password: z.string({
        required_error: "Password is required",
    }).min(6).optional()
});

// Create Comment Schema
export const createCommentSchema = z.object({
    text: z.string().min(2).max(1000),
    articleId: z.string(),
});

// Update Comment Schema
export const updateCommentSchema = z.object({
    text: z.string().min(2).max(1000),
});