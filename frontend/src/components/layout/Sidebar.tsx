import { Heart, LayoutDashboard, LibraryBig, Pin, X } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/prompts", label: "All prompts", icon: LibraryBig },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/pinned", label: "Pinned", icon: Pin },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button className="sidebar-backdrop" type="button" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar${open ? " sidebar-open" : ""}`} aria-label="Primary navigation">
        <div className="sidebar-mobile-header">
          <span>Menu</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close navigation">
            <X size={21} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? " nav-link-active" : ""}`}
              key={to}
              to={to}
              onClick={onClose}
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </nav>
        <p className="sidebar-footer">Build better prompts, faster.</p>
      </aside>
    </>
  );
}
