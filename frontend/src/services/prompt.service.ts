
import api from "./axios";
import type { Prompt} from "../types/prompt";
import type { PromptFormData } from "../schemas/prompt.schema";

export const getPrompts = async (params?: {
    search?: string;
    category?: string;
    favorite?: boolean;
    sort?: string;
}) => {
    const response = await api.get<Prompt[]>("/prompts", {
        params,
    });

    return response.data;
};

export const getPromptById = async (id: string) => {
    const response = await api.get<Prompt>(`/prompts/${id}`);

    return response.data;
};

export const createPrompt = async (data: PromptFormData) => {
    const response = await api.post<Prompt>("/prompts", data);

    return response.data;
};

export const updatePrompt = async (
    id: string,
    data: PromptFormData
) => {
    const response = await api.put<Prompt>(
        `/prompts/${id}`,
        data
    );

    return response.data;
};

export const deletePrompt = async (id: string) => {
    await api.delete(`/prompts/${id}`);
};

export const duplicatePrompt = async (id: string) => {
    const response = await api.post<Prompt>(
        `/prompts/${id}/duplicate`
    );

    return response.data;
};

export const exportPrompts = async () => {
    const response = await api.get<Prompt[]>("/prompts/export");

    return response.data;
};

export const importPrompts = async (
    prompts: PromptFormData[]
) => {
    const response = await api.post(
        "/prompts/import",
        prompts
    );

    return response.data;
};