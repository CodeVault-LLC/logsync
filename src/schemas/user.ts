import z from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "The username must not contain spaces or special characters"
    ),
  password: z
    .string()
    .min(6, "The password must be atleast 6 characters")
    .max(100, "The password must be atmost 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).*$/,
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "The email must be atleast 1 character"),
  password: z
    .string()
    .min(6, "The password must be atleast 6 characters")
    .max(100, "The password must be atmost 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9\s]).*$/,
      "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  username: z
    .string()
    .min(3, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "The username must not contain spaces or special characters"
    ),
});

export const editUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "The email must be atleast 1 character"),
  username: z
    .string()
    .min(3, "The username must be atleast 1 character")
    .max(100, "The username must be atmost 100 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "The username must not contain spaces or special characters"
    ),
});
