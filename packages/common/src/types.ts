import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string()
})

export const SignInSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const  CreateRoomSchema = z.object({
    name: z.string(),
})