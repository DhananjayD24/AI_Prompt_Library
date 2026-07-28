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

// Get Single Prompt
router.get("/:id", getPromptById);

// Update Prompt
router.put("/:id", updatePrompt);

// Delete Prompt
router.delete("/:id", deletePrompt);

// Duplicate Prompt
router.post("/:id/duplicate", duplicatePrompt);

//import-export 
router.get("/export", exportPrompts);
router.post("/import", importPrompts);

export default router;