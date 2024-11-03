import z from "zod";

export const signupInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username : z.string().email(),
    password : z.string().min(6),
})

export type SigninInput = z.infer<typeof signinInput>

export const blogInput = z.object({
    title : z.string(),
    content : z.string(),
    thumbnail : z.string()
})

export type BlogInput = z.infer<typeof blogInput>

export const updateInput = z.object({
    title : z.string(),
    content : z.string(),
    thumbnail : z.string(),
    id : z.string()
})

export type UpdateInput = z.infer<typeof updateInput>