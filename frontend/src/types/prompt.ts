export const CATEGORIES = [
    "Coding",
    "Marketing",
    "Content Writing",
    "Email",
    "Resume",
    "SQL",
    "Design",
    "Social Media",
    "Productivity",
    "Others",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Prompt {
    _id: string;

    title: string;

    prompt: string;

    description: string;

    category: Category;

    tags: string[];

    favorite: boolean;

    pinned: boolean;

    createdAt: string;

    updatedAt: string;
}