import { Menu, Moon, Plus, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

interface NavbarProps {
  onMenuClick: () => void;
  onNewPrompt: () => void;
}

export function Navbar({ onMenuClick, onNewPrompt }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <button
        className="icon-button mobile-menu-button"
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu size={22} />
      </button>
      <Link className="brand" to="/dashboard" aria-label="Prompt Library home">
        <span className="brand-mark">P</span>
        <span>Prompt Library</span>
      </Link>
      <div className="navbar-actions">
        <button
          className="icon-button"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
        </button>
        <button className="button button-primary add-prompt-button" type="button" onClick={onNewPrompt}>
          <Plus size={18} />
          <span>New prompt</span>
        </button>
      </div>
    </header>
  );
}
