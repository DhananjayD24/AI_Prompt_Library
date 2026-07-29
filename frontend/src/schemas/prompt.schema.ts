import { z } from "zod";
import { CATEGORIES } from "../types/prompt";

export const promptSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(100, "Maximum 100 characters"),

    prompt: z
        .string()
        .trim()
        .min(1, "Prompt is required"),

    description: z
        .string()
        .trim()
        .max(300, "Maximum 300 characters")
        .optional(),

    category: z.enum([...(CATEGORIES as readonly string[])] as [string, ...string[]], {
        message: "Please select a category",
    }),

    tags: z.array(z.string()).default([]),

    favorite: z.boolean().default(false),

    pinned: z.boolean().default(false),
});

export type PromptFormData = z.infer<typeof promptSchema>;