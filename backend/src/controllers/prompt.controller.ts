import type { Request, Response } from "express";
import Prompt from "../models/prompt.model.js";

export const createPrompt = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const {
            title,
            prompt,
            description,
            category,
            tags,
            favorite,
            pinned,
        } = req.body;

        const newPrompt = await Prompt.create({
            title,
            prompt,
            description,
            category,
            tags,
            favorite,
            pinned,
        });

        res.status(201).json({
            success: true,
            message: "Prompt created successfully",
            data: newPrompt,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create prompt",
        });
    }
};

export const getPrompts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { search, category, favorite, sort } = req.query;

        const filter: any = {};

        // Search
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    prompt: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    tags: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Category Filter
        if (category) {
            filter.category = category;
        }

        // Favorite Filter
        if (favorite === "true") {
            filter.favorite = true;
        }

        let sortOption = {};

        switch (sort) {
            case "newest":
                sortOption = { createdAt: -1 };
                break;

            case "oldest":
                sortOption = { createdAt: 1 };
                break;

            case "az":
                sortOption = { title: 1 };
                break;

            case "za":
                sortOption = { title: -1 };
                break;

            default:
                sortOption = { createdAt: -1 };
        }

        const prompts = await Prompt.find(filter).sort({
            pinned: -1,
            ...sortOption,
        });

        res.status(200).json({
            success: true,
            data: prompts,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getPromptById = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const prompt = await Prompt.findById(req.params.id);

        if (!prompt) {
            res.status(404).json({
                success: false,
                message: "Prompt not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: prompt,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Invalid prompt id",
        });
    }
};

export const updatePrompt = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const prompt = await Prompt.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!prompt) {
            res.status(404).json({
                success: false,
                message: "Prompt not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Prompt updated successfully",
            data: prompt,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to update prompt",
        });
    }
};

export const deletePrompt = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const prompt = await Prompt.findByIdAndDelete(req.params.id);

        if (!prompt) {
            res.status(404).json({
                success: false,
                message: "Prompt not found",
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Prompt deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to delete prompt",
        });
    }
};

export const duplicatePrompt = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const existingPrompt = await Prompt.findById(req.params.id);

        if (!existingPrompt) {
            res.status(404).json({
                success: false,
                message: "Prompt not found",
            });
            return;
        }

        const duplicatedPrompt = await Prompt.create({
            title: `${existingPrompt.title} (Copy)`,
            prompt: existingPrompt.prompt,
            description: existingPrompt.description,
            category: existingPrompt.category,
            tags: existingPrompt.tags,
            favorite: false,
            pinned: false,
        });

        res.status(201).json({
            success: true,
            message: "Prompt duplicated successfully",
            data: duplicatedPrompt,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to duplicate prompt",
        });
    }
};

