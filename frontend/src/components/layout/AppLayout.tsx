import { useState } from "react";
import { Outlet } from "react-router-dom";
import type { Prompt } from "../../types/prompt";
import { PromptModal } from "../modals/PromptModal";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalPrompt, setModalPrompt] = useState<Prompt | null | undefined>(undefined);

  const closeModal = () => setModalPrompt(undefined);

  return (
    <div className="app-shell">
      <Navbar onMenuClick={() => setSidebarOpen(true)} onNewPrompt={() => setModalPrompt(null)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Outlet context={{ openCreateModal: () => setModalPrompt(null), openEditModal: (prompt: Prompt) => setModalPrompt(prompt) }} />
      </main>
      {modalPrompt !== undefined && <PromptModal prompt={modalPrompt} onClose={closeModal} />}
    </div>
  );
}
