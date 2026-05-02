// Reusable components — Mir Sazzat Hossain
const { useState, useEffect, useMemo } = React;

// ============== ICONS ==============
const Icon = {
  arrow: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  ext: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  github: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1 .1-.8.4-1.4.8-1.7-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.4-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg>,
  linkedin: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 1 1 8.3 6.5a1.78 1.78 0 0 1-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0 0 13 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 0 1 2.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>,
  twitter: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  scholar: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14.06L0 5.4 12 0l12 5.4-12 8.66zM3.6 8.4v8.18l8.4 6.06 8.4-6.06V8.4L12 14.46 3.6 8.4z"/></svg>,
  email: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  search: () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
  moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  rss: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>,
  pdf: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  cite: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3-1 5-4 5-8H4V5h8v8c0 3-2 7-9 8zm12 0c3-1 5-4 5-8h-4V5h8v8c0 3-2 7-9 8z"/></svg>,
  code: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  slides: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  video: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  poster: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>,
  download: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  calendar: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  clock: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  tag: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  pin: () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  link: () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  menu: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  arrowUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
};

// ============== NAV ==============
function Nav({ page, go, dark, toggleDark, onSearch }) {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "publications", label: "Publications" }, { id: "projects", label: "Projects" },
    { id: "courses", label: "Courses" }, { id: "snippets", label: "Snippets" },
    { id: "resources", label: "Resources" }, { id: "posts", label: "Posts" },
  ];
  const isActive = (id) => {
    if (id === "home") return page === "home" || page === "";
    return page === id;
  };
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="#home" onClick={(e) => { e.preventDefault(); go("home"); setOpen(false); }} aria-label="Home">
          <span className="nav__brand-mark">M.</span>
          <span className="nav__brand-name">Mir Sazzat Hossain</span>
        </a>
        <nav className="nav__pill">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav__link ${isActive(l.id) ? "is-active" : ""}`}
               onClick={(e) => { e.preventDefault(); go(l.id); }}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__tools">
          <button className="nav__icon" onClick={onSearch} aria-label="Search" title="Search (⌘K)"><Icon.search/></button>
          <a className="nav__icon" href="/rss.xml" aria-label="RSS feed" title="RSS feed"><Icon.rss/></a>
          <button className="nav__icon" onClick={toggleDark} aria-label="Toggle theme" title="Toggle theme">{dark ? <Icon.sun/> : <Icon.moon/>}</button>
          <button className="nav__icon nav__icon--mobile" onClick={() => setOpen(o => !o)} aria-label="Menu">
            {open ? <Icon.close/> : <Icon.menu/>}
          </button>
        </div>
      </div>
      {open && (
        <nav className="nav__mobile">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`} className={`nav__mobile-link ${isActive(l.id) ? "is-active" : ""}`}
               onClick={(e) => { e.preventDefault(); go(l.id); setOpen(false); }}>{l.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

// ============== BACK TO TOP ==============
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" title="Back to top">
      <Icon.arrowUp/>
    </button>
  );
}

// ============== LANG GLYPH ==============
const LANG_META = {
  python:     { label: "Python",     color: "#3572A5", glyph: "py"  },
  bash:       { label: "Bash",       color: "#4EAA25", glyph: "$_"  },
  shell:      { label: "Shell",      color: "#4EAA25", glyph: "$_"  },
  javascript: { label: "JavaScript", color: "#f1e05a", glyph: "JS"  },
  typescript: { label: "TypeScript", color: "#3178C6", glyph: "TS"  },
  latex:      { label: "LaTeX",      color: "#3D6117", glyph: "TeX" },
  yaml:       { label: "YAML",       color: "#cb171e", glyph: "Y"   },
  sql:        { label: "SQL",        color: "#e38c00", glyph: "SQL" },
  rust:       { label: "Rust",       color: "#dea584", glyph: "Rs"  },
  cpp:        { label: "C++",        color: "#f34b7d", glyph: "C++" },
  office:     { label: "Office",     color: "#D24726", glyph: "Off" },
};
function LangBadge({ lang, size = 32 }) {
  const meta = LANG_META[String(lang || "").toLowerCase()] || { label: lang, color: "#94a3b8", glyph: "</>" };
  return (
    <span className="lang-badge" style={{ width: size, height: size, background: meta.color }} title={meta.label}>
      {meta.glyph}
    </span>
  );
}

// ============== FOOTER ==============
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>© 2026 {SITE.name} · all rights reserved.</span>
        <span style={{ fontFamily: "var(--font-mono)" }}>built by hand · last updated Apr 2026</span>
      </div>
    </footer>
  );
}

// ============== SOCIAL ==============
function SocialIcon({ kind }) {
  const map = { github: <Icon.github/>, linkedin: <Icon.linkedin/>, twitter: <Icon.twitter/>, scholar: <Icon.scholar/>, email: <Icon.email/> };
  return map[kind] || null;
}

// ============== PUB CARD ==============
function authorsLine(authors) {
  return authors.map((a, i) => {
    const isMe = a.includes("M.S. Hossain");
    return <React.Fragment key={i}>{isMe ? <span className="pub__me">{a}</span> : a}{i < authors.length - 1 ? ", " : ""}</React.Fragment>;
  });
}
function PubLink({ icon, label, href }) {
  return <a className="pub__link" href={href}>{icon}<span>{label}</span></a>;
}
function PubItem({ p, go }) {
  return (
    <article className="pub">
      <div className="pub__badges">
        <span className="badge badge--venue">{p.venue}</span>
        <span className="badge badge--type">{p.type}</span>
        {p.rank && <span className={`badge badge--rank badge--rank-${p.rank.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}>{p.rank}</span>}
        {p.year >= 2025 && <span className="badge badge--cite">New</span>}
      </div>
      <h3 className="pub__title"><a href={`#publications/${p.id}`} onClick={(e) => { e.preventDefault(); go(`publications/${p.id}`); }}>{p.title}</a></h3>
      <p className="pub__authors">{authorsLine(p.authors)}</p>
      <p className="pub__venue">{p.venueLong}</p>
      <div className="pub__links">
        {p.links?.paper && <PubLink icon={<Icon.pdf/>} label="Paper" href={p.links.paper}/>}
        {p.links?.arxiv && <PubLink icon={<Icon.ext/>} label="arXiv" href={p.links.arxiv}/>}
        {p.links?.code && <PubLink icon={<Icon.code/>} label="Code" href={p.links.code}/>}
        {p.links?.slides && <PubLink icon={<Icon.slides/>} label="Slides" href={p.links.slides}/>}
        {p.links?.poster && <PubLink icon={<Icon.poster/>} label="Poster" href={p.links.poster}/>}
        {p.links?.video && <PubLink icon={<Icon.video/>} label="Video" href={p.links.video}/>}
        {p.links?.bibtex && <PubLink icon={<Icon.cite/>} label="BibTeX" href={p.links.bibtex}/>}
      </div>
    </article>
  );
}

// ============== SEARCH MODAL ==============
function SearchModal({ close, go }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const t = setTimeout(() => document.getElementById("__search-input")?.focus(), 30);
    return () => clearTimeout(t);
  }, []);
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const out = [];
    PUBLICATIONS.forEach(p => {
      if ((p.title + " " + p.authors.join(" ") + " " + p.venue).toLowerCase().includes(needle))
        out.push({ kind: "Publication", title: p.title, sub: `${p.venue} · ${p.year}`, href: `publications/${p.id}` });
    });
    POSTS.forEach(p => {
      if ((p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(needle))
        out.push({ kind: "Post", title: p.title, sub: `${p.date} · ${p.readMin} min`, href: `posts/${p.slug}` });
    });
    SNIPPETS.forEach(s => {
      if ((s.title + " " + s.desc + " " + s.tags.join(" ") + " " + s.lang).toLowerCase().includes(needle))
        out.push({ kind: "Snippet", title: s.title, sub: `${s.lang} · ${s.date}`, href: `snippets/${s.slug}` });
    });
    PROJECTS.forEach(p => {
      if ((p.name + " " + p.desc + " " + p.tags.join(" ")).toLowerCase().includes(needle))
        out.push({ kind: "Project", title: p.name, sub: p.desc, href: "projects" });
    });
    COURSES.forEach(c => {
      if ((c.code + " " + c.title + " " + c.desc).toLowerCase().includes(needle))
        out.push({ kind: "Course", title: `${c.code} — ${c.title}`, sub: `${c.term} · ${c.inst}`, href: "courses" });
    });
    return out.slice(0, 12);
  }, [q]);
  return (
    <div className="search-modal" onClick={close}>
      <div className="search-modal__panel" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal__field">
          <Icon.search/>
          <input id="__search-input" placeholder="Search publications, posts, snippets…" value={q} onChange={(e) => setQ(e.target.value)}/>
          <kbd className="kbd">Esc</kbd>
        </div>
        <div className="search-modal__results">
          {!q && <p className="search-modal__hint">Try “equivariant”, “federated”, “LiteSRNet”, “SSH tunnel”, “poisson”…</p>}
          {q && results.length === 0 && <p className="search-modal__hint">No results.</p>}
          {results.map((r, i) => (
            <a key={i} className="search-modal__row" href={`#${r.href}`}
               onClick={(e) => { e.preventDefault(); go(r.href); close(); }}>
              <span className="search-modal__kind">{r.kind}</span>
              <div>
                <div className="search-modal__title">{r.title}</div>
                <div className="search-modal__sub">{r.sub}</div>
              </div>
              <Icon.arrow/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Nav, BackToTop, LangBadge, LANG_META, SearchModal, Footer, SocialIcon, PubItem, authorsLine, PubLink });
