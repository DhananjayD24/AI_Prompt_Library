import { Router } from "express";
import {
  createPrompt,
  getPrompts,
  getPromptById,
  updatePrompt,
  deletePrompt,
  duplicatePrompt,
} from "../controllers/prompt.controller.js";
import { exportPrompts, importPrompts } from "../controllers/prompt.import_export.js";

const router = Router();

// Create Prompt
router.post("/", createPrompt);

// Get All Prompts
router.get("/", getPrompts);

// Import/export must be registered before /:id so "export" is not treated as an id.
router.get("/export", exportPrompts);
router.post("/import", importPrompts);

// Get Single Prompt
router.get("/:id", getPromptById);

// Update Prompt
router.put("/:id", updatePrompt);

// Delete Prompt
router.delete("/:id", deletePrompt);

// Duplicate Prompt
router.post("/:id/duplicate", duplicatePrompt);

export default router;
