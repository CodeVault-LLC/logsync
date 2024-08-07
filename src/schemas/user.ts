import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters"),
  password: z
    .string()
    .min(6, "The password must be atleast 6 characters")
    .max(100, "The password must be atmost 100 characters"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "The email must be atleast 1 character"),
  password: z
    .string()
    .min(6, "The password must be atleast 6 characters")
    .max(100, "The password must be atmost 100 characters"),
  username: z
    .string()
    .min(1, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters"),
});

export const editUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "The email must be atleast 1 character"),
  username: z
    .string()
    .min(1, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters"),
});
