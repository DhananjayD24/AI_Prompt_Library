import type { Request, Response } from "express";
import Prompt from "../models/prompt.model.js";

export const exportPrompts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const prompts = await Prompt.find().sort({
            pinned: -1,
            createdAt: -1,
        });

        res.status(200).json(prompts);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to export prompts",
        });
    }
};

export const importPrompts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const prompts = req.body;

        if (!Array.isArray(prompts)) {
            res.status(400).json({
                success: false,
                message: "Expected an array of prompts",
            });
            return;
        }

        const promptsToImport = prompts.map((prompt) => ({
            title: prompt.title,
            prompt: prompt.prompt,
            description: prompt.description,
            category: prompt.category,
            tags: prompt.tags,
            favorite: prompt.favorite ?? false,
            pinned: prompt.pinned ?? false,
        }));
        
        const importedPrompts = await Prompt.insertMany(promptsToImport, {
            ordered: false,
        });

        res.status(201).json({
            success: true,
            message: `${importedPrompts.length} prompts imported successfully`,
            data: importedPrompts,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to import prompts",
        });
    }
};