import { useEffect } from "react";
import { Clock3, Heart, LibraryBig, Pin } from "lucide-react";
import { usePrompt } from "../hooks/usePrompt";

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export function Dashboard() {
  const { prompts, loading, error, fetchPrompts } = usePrompt();

  useEffect(() => {
    void fetchPrompts();
  }, [fetchPrompts]);

  const favorites = prompts.filter((prompt) => prompt.favorite).length;
  const pinned = prompts.filter((prompt) => prompt.pinned).length;
  const recentPrompts = [...prompts]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <section className="dashboard-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Your workspace</p>
          <h1>Dashboard</h1>
          <p className="page-subtitle">A quick view of your saved AI prompts.</p>
        </div>
      </div>

      <div className="stats-grid" aria-label="Prompt statistics">
        <article className="stat-card"><LibraryBig aria-hidden="true" /><div><span>Total prompts</span><strong>{prompts.length}</strong></div></article>
        <article className="stat-card"><Heart aria-hidden="true" /><div><span>Favorites</span><strong>{favorites}</strong></div></article>
        <article className="stat-card"><Pin aria-hidden="true" /><div><span>Pinned</span><strong>{pinned}</strong></div></article>
      </div>

      <section className="recent-section" aria-labelledby="recent-heading">
        <div className="section-heading">
          <div>
            <h2 id="recent-heading">Recent prompts</h2>
            <p>Your most recently updated prompts.</p>
          </div>
        </div>

        {loading ? (
          <div className="dashboard-state" role="status">Loading your prompts…</div>
        ) : error ? (
          <div className="dashboard-state" role="alert"><Clock3 size={28} aria-hidden="true" /><h3>Unable to load prompts</h3><p>{error}</p><button className="button button-primary" type="button" onClick={() => void fetchPrompts()}>Try again</button></div>
        ) : recentPrompts.length === 0 ? (
          <div className="dashboard-state"><Clock3 size={28} aria-hidden="true" /><h3>No prompts yet</h3><p>Add your first prompt to start building your library.</p></div>
        ) : (
          <div className="recent-list">
            {recentPrompts.map((prompt) => (
              <article className="recent-prompt" key={prompt._id}>
                <div className="recent-prompt-copy">
                  <div className="recent-prompt-title"><h3>{prompt.title}</h3>{prompt.pinned && <Pin size={15} aria-label="Pinned" />}</div>
                  <p>{prompt.description || prompt.prompt}</p>
                </div>
                <div className="recent-prompt-meta"><span>{prompt.category}</span><time dateTime={prompt.updatedAt}>{formatDate(prompt.updatedAt)}</time></div>
              </article>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}
