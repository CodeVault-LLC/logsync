import z from "zod";

export const monitorSchema = z.object({
  name: z
    .string()
    .min(1, "The name must be atleast 1 character")
    .max(75, "The name must be atmost 100 characters"),

  description: z
    .string()
    .min(1, "The description must be atleast 1 character")
    .max(300, "The description must be atmost 100 characters"),
});

export const monitorEditSchema = z.object({
  name: z
    .string()
    .min(1, "The name must be atleast 1 character")
    .max(75, "The name must be atmost 100 characters"),

  description: z
    .string()
    .min(1, "The description must be atleast 1 character")
    .max(300, "The description must be atmost 100 characters"),
});
