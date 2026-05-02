// Pages — Mir Sazzat Hossain
const { useState: useS, useMemo: useM } = React;

// ============== HOME ==============
function HomePage({ go }) {
  const featured = PUBLICATIONS.filter(p => p.featured).slice(0, 4);
  const recentPosts = POSTS.slice(0, 2);
  return (
    <>
      <section className="hero">
        <aside className="profile">
          <img className="profile__avatar" src="assets/profile.png" alt={SITE.name}/>
          <h1 className="profile__name">{SITE.name}</h1>
          <p className="profile__title">{SITE.title}</p>
          <p className="profile__affil">
            <a href={SITE.affiliationUrl}>{SITE.affiliation}</a>
            <span className="profile__inst">{SITE.institution}</span>
          </p>
          <span className="status-pill"><span className="status-pill__dot"/>{SITE.phdStatus}</span>
          <ul className="social-row">
            {SITE.socials.map(s => <li key={s.kind}><a href={s.url} aria-label={s.label} title={s.label}><SocialIcon kind={s.kind}/></a></li>)}
          </ul>
          <div className="profile__interests">
            <span className="profile__interests-label">Research interests</span>
            <div className="tags">{SITE.research.map(t => <span key={t} className="tag">{t}</span>)}</div>
          </div>
        </aside>
        <div>
          <p className="hero__bio">{SITE.bio}</p>

          <div className="block">
            <div className="block__head">
              <h2 className="block__title">Recent News</h2>
              <a className="block__more" href="#about" onClick={(e) => { e.preventDefault(); go("about"); }}>Full timeline <Icon.arrow/></a>
            </div>
            <ul className="news">
              {NEWS.slice(0, 5).map((n, i) => (
                <li key={i} className="news__item">
                  <span className="news__date">{n.date}</span>
                  <span className={`news__tag news__tag--${n.tag}`}>{n.tag}</span>
                  <span className="news__text">{n.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="block">
            <div className="block__head">
              <h2 className="block__title">Selected Publications</h2>
              <a className="block__more" href="#publications" onClick={(e) => { e.preventDefault(); go("publications"); }}>All publications <Icon.arrow/></a>
            </div>
            <div className="pubs">{featured.map(p => <PubItem key={p.id} p={p} go={go}/>)}</div>
          </div>

          <div className="block">
            <div className="block__head">
              <h2 className="block__title">From the blog</h2>
              <a className="block__more" href="#posts" onClick={(e) => { e.preventDefault(); go("posts"); }}>All posts <Icon.arrow/></a>
            </div>
            <ul className="posts">
              {recentPosts.map(p => (
                <li key={p.slug} className="post-row">
                  <div className="post-row__meta"><span>{p.date}</span><span>·</span><span>{p.readMin} min read</span></div>
                  <h3 className="post-row__title"><a href={`#posts/${p.slug}`} onClick={(e) => { e.preventDefault(); go(`posts/${p.slug}`); }}>{p.title}</a></h3>
                  <p className="post-row__excerpt">{p.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

// ============== PUBLICATIONS LIST ==============
function PublicationsPage({ go }) {
  const [type, setType] = useS("All");
  const [q, setQ] = useS("");
  const types = ["All", "Conference", "Workshop", "Preprint"];
  const filtered = PUBLICATIONS.filter(p => (type === "All" || p.type === type) && (!q || (p.title + p.authors.join(" ") + p.venue).toLowerCase().includes(q.toLowerCase())));
  const grouped = useM(() => {
    const map = {};
    filtered.forEach(p => { (map[p.year] ??= []).push(p); });
    return Object.entries(map).sort((a, b) => b[0] - a[0]);
  }, [filtered]);

  // simple histogram by year
  const yearCounts = useM(() => {
    const map = {};
    PUBLICATIONS.forEach(p => { map[p.year] = (map[p.year] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0] - b[0]);
  }, []);
  const maxCount = Math.max(...yearCounts.map(([, c]) => c));

  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Research</p>
        <h1 className="page-title__h1">Publications</h1>
        <p className="page-title__lede">Peer-reviewed papers, workshop contributions, and preprints across computer vision, domain adaptation, and astrophysical machine learning.</p>
      </header>

      <div className="stats">
        <div className="stats__numbers">
          <div><span className="stat__num">{PUBLICATIONS.length}</span><span className="stat__lbl">Papers</span></div>
          <div><span className="stat__num">3</span><span className="stat__lbl">2025–26</span></div>
          <div><span className="stat__num">142</span><span className="stat__lbl">Citations</span></div>
          <div><span className="stat__num">1</span><span className="stat__lbl">Awards</span></div>
        </div>
        <div className="stats__chart">
          {yearCounts.map(([y, c]) => (
            <div key={y} className="stats__bar-wrap">
              <span className="stats__bar-num">{c}</span>
              <div className="stats__bar" style={{ height: `${(c / maxCount) * 100}%` }}/>
              <span className="stats__bar-lbl">{String(y).slice(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="filters">
        <div className="filters__group">
          <span className="filters__label">Type</span>
          {types.map(t => <button key={t} className={`chip ${type === t ? "chip--active" : ""}`} onClick={() => setType(t)}>{t}</button>)}
        </div>
        <div className="search-field"><Icon.search/><input placeholder="Search title, author, venue…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
      </div>

      {grouped.map(([y, items]) => (
        <section key={y} className="block">
          <div className="block__head"><h2 className="block__title">{y}</h2><span className="block__more" style={{ color: "var(--ink-3)" }}>{items.length} {items.length === 1 ? "paper" : "papers"}</span></div>
          <div className="pubs">{items.map(p => <PubItem key={p.id} p={p} go={go}/>)}</div>
        </section>
      ))}
      {filtered.length === 0 && <div className="empty">No papers match your filters.</div>}
    </>
  );
}

// ============== PUBLICATION DETAIL ==============
function PublicationDetail({ id, go }) {
  const p = PUBLICATIONS.find(x => x.id === id);
  if (!p) return <div className="empty">Publication not found.</div>;
  const bibtex = `@inproceedings{hossain${p.year}${p.id.split("-")[0]},
  title     = {${p.title}},
  author    = {${p.authors.join(" and ")}},
  booktitle = {${p.venueLong}},
  year      = {${p.year}}
}`;
  return (
    <article>
      <a href="#publications" onClick={(e) => { e.preventDefault(); go("publications"); }} style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 14, display: "inline-block" }}>← All publications</a>
      <p className="pubd__type">{p.type} · {p.venue} · {p.year}</p>
      <h1 className="pubd__title">{p.title}</h1>
      <p className="pubd__authors">{authorsLine(p.authors)}</p>
      <p className="pubd__venue">{p.venueLong}</p>

      <div className="pubd">
        <div>
          <div className="figure-ph">[ teaser figure / system diagram ]</div>

          <div className="pubd__sect">
            <h2 className="pubd__sect-title">Abstract</h2>
            <p className="pubd__abstract">{p.abstract}</p>
          </div>

          <div className="pubd__sect">
            <h2 className="pubd__sect-title">Contributions</h2>
            <ul className="pubd__contribs">{p.contributions.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>

          <div className="pubd__sect">
            <h2 className="pubd__sect-title">Method</h2>
            <div className="figure-ph">[ method overview figure ]</div>
            <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, lineHeight: 1.6, color: "var(--ink)" }}>The full method, training details, and ablations are described in the paper. Code and trained checkpoints are available in the linked repository.</p>
          </div>

          <div className="pubd__sect">
            <h2 className="pubd__sect-title">Cite</h2>
            <pre className="pubd__bibtex">{bibtex}</pre>
          </div>
        </div>

        <aside className="pubd__side">
          <div className="side-card">
            <h4 className="side-card__title">Resources</h4>
            <div className="side-links">
              {p.links?.paper && <a className="side-link" href={p.links.paper}><span>Paper PDF</span><Icon.pdf/></a>}
              {p.links?.arxiv && <a className="side-link" href={p.links.arxiv}><span>arXiv {p.arxiv}</span><Icon.ext/></a>}
              {p.links?.code && <a className="side-link" href={p.links.code}><span>Code</span><Icon.github/></a>}
              {p.links?.slides && <a className="side-link" href={p.links.slides}><span>Slides</span><Icon.slides/></a>}
              {p.links?.poster && <a className="side-link" href={p.links.poster}><span>Poster</span><Icon.poster/></a>}
              {p.links?.video && <a className="side-link" href={p.links.video}><span>Talk video</span><Icon.video/></a>}
            </div>
          </div>
          <div className="side-card">
            <h4 className="side-card__title">Metadata</h4>
            <div style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
              <div><strong>Venue:</strong> {p.venue}</div>
              <div><strong>Year:</strong> {p.year}</div>
              <div><strong>Type:</strong> {p.type}</div>
              {p.arxiv && <div><strong>arXiv:</strong> {p.arxiv}</div>}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

// ============== POSTS LIST ==============
function PostsPage({ go }) {
  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Writing</p>
        <h1 className="page-title__h1">Posts</h1>
        <p className="page-title__lede">Notes on machine learning, mathematics, and the occasional engineering recipe — written while learning out loud.</p>
      </header>
      <ul className="posts">
        {POSTS.map(p => (
          <li key={p.slug} className="post-row">
            <div className="post-row__meta"><span>{p.date}</span><span>·</span><span>{p.readMin} min read</span></div>
            <h3 className="post-row__title"><a href={`#posts/${p.slug}`} onClick={(e) => { e.preventDefault(); go(`posts/${p.slug}`); }}>{p.title}</a></h3>
            <p className="post-row__excerpt">{p.excerpt}</p>
            <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

// ============== POST DETAIL ==============
function PostDetail({ slug, go }) {
  const idx = POSTS.findIndex(x => x.slug === slug);
  const p = POSTS[idx];
  if (!p) return <div className="empty">Post not found.</div>;
  const prev = POSTS[idx + 1];
  const next = POSTS[idx - 1];
  const related = POSTS.filter((x, i) => i !== idx && (x.category === p.category || x.tags.some(t => p.tags.includes(t)))).slice(0, 2);
  return (
    <article className="article">
      <a href="#posts" onClick={(e) => { e.preventDefault(); go("posts"); }} style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 18, display: "inline-block" }}>← All posts</a>
      <header className="article__head">
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span className="badge badge--venue">{p.category}</span>
        </div>
        <h1 className="article__title">{p.title}</h1>
        <div className="article__meta">
          <span><Icon.calendar/> {p.date}</span>
          <span><Icon.clock/> {p.readMin} min read</span>
          {p.tags.map(t => <span key={t}><Icon.tag/> {t}</span>)}
        </div>
      </header>
      <div className="article__body">
        <p>{p.excerpt}</p>
        <h2>Introduction</h2>
        <p>This is a sample rendering of the long-form post layout — the live blog stays on its current generator. The reading width is calibrated for a ~65-character measure, the body type is set in Newsreader, and code samples adopt JetBrains Mono with a soft tinted background.</p>
        <figure><div className="placeholder">[ figure / diagram ]</div><figcaption>Visual placeholder — replace with actual figure asset on import.</figcaption></figure>
        <h2>A worked example</h2>
        <p>Code blocks render with monospace and a clear bounding box:</p>
        <pre><code>{`import torch
import torch.nn as nn

class LiteSRNet(nn.Module):
    def __init__(self, ch=32):
        super().__init__()
        self.head = nn.Conv2d(3, ch, 3, padding=1)
        self.recurrent = nn.Conv2d(ch, ch, 3, padding=1)
        self.tail = nn.Conv2d(ch, 3, 3, padding=1)`}</code></pre>
        <blockquote>Equivariance is not just a constraint — it's a prior, and a strong one when data is scarce.</blockquote>
        <h3>Why this matters</h3>
        <p>The post layout supports section headings, blockquotes, code blocks, figures with captions, and inline <code>monospace</code> spans — readable on both light and dark themes.</p>
      </div>

      <div className="share-row">
        <span className="share-row__lbl">Share</span>
        <a className="share-btn" href="#"><Icon.twitter/> Twitter</a>
        <a className="share-btn" href="#"><Icon.linkedin/> LinkedIn</a>
        <a className="share-btn" href="#"><Icon.link/> Copy link</a>
      </div>

      <div className="article-cite">
        <h4>Cite this post</h4>
        <pre>{`@misc{hossain${p.date.slice(0, 4)}${slug.replace(/-/g, "")},
  title  = {${p.title}},
  author = {Mir Sazzat Hossain},
  year   = {${p.date.slice(0, 4)}},
  url    = {https://mirsazzathossain.me/articles/${slug}}
}`}</pre>
      </div>

      <div className="article-author">
        <img src="assets/profile.png" alt={SITE.name}/>
        <div>
          <p className="article-author__name">Mir Sazzat Hossain</p>
          <p className="article-author__bio">Junior Research Scientist at CCDS, IUB. Working on computer vision, domain adaptation, and the occasional radio-galaxy problem.</p>
        </div>
      </div>

      <div className="prevnext">
        {prev ? (
          <a className="prevnext__cell" href={`#posts/${prev.slug}`} onClick={(e) => { e.preventDefault(); go(`posts/${prev.slug}`); }}>
            <div className="prevnext__lbl">← Previous</div>
            <div className="prevnext__title">{prev.title}</div>
          </a>
        ) : <div/>}
        {next ? (
          <a className="prevnext__cell prevnext__cell--next" href={`#posts/${next.slug}`} onClick={(e) => { e.preventDefault(); go(`posts/${next.slug}`); }}>
            <div className="prevnext__lbl">Next →</div>
            <div className="prevnext__title">{next.title}</div>
          </a>
        ) : <div/>}
      </div>

      {related.length > 0 && (
        <section className="related">
          <h3 className="related__title">Related posts</h3>
          <div className="related__grid">
            {related.map(r => (
              <a key={r.slug} className="related__card" href={`#posts/${r.slug}`} onClick={(e) => { e.preventDefault(); go(`posts/${r.slug}`); }}>
                <div className="related__date">{r.date} · {r.readMin} min</div>
                <div className="related__heading">{r.title}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="comments">
        <strong style={{ color: "var(--ink-2)" }}>Comments</strong><br/>
        Powered by giscus — sign in with GitHub to leave a comment.
      </section>
    </article>
  );
}

// ============== COURSES LIST ==============
function CoursesPage({ go }) {
  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Teaching</p>
        <h1 className="page-title__h1">Courses</h1>
        <p className="page-title__lede">Tutorial sessions, lab worksheets, and tutorial materials I've prepared as a teaching assistant at IUB. Click any course for full syllabus, weekly schedule, and notebooks.</p>
      </header>
      <div className="grid-cards">
        {COURSES.map(c => (
          <a key={c.code} className="course" href={`#courses/${c.code.toLowerCase().replace(/\s+/g, "")}`} onClick={(e) => { e.preventDefault(); go(`courses/${c.code.toLowerCase().replace(/\s+/g, "")}`); }}>
            <div className="course__top">
              <LangBadge lang={c.lang === "Python" ? "python" : c.lang === "Office" ? "office" : "shell"} size={36}/>
              <div className="course__top-text">
                <span className="course__code">{c.code}</span>
                <span className="course__role">{c.role}</span>
              </div>
            </div>
            <h3 className="course__title">{c.title}</h3>
            <p className="course__inst">{c.inst}</p>
            <p className="course__desc">{c.desc}</p>
            <div className="course__foot">
              <span className="course__term">{c.term}</span>
              <span className="course__cta">View materials <Icon.arrow/></span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

// ============== COURSE DETAIL ==============
function CourseDetail({ go }) {
  const c = COURSE_DETAIL_CSC100;
  return (
    <div className="course-detail">
      <aside className="course-detail__aside">
        <a href="#courses" onClick={(e) => { e.preventDefault(); go("courses"); }} style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 14, display: "inline-block" }}>← All courses</a>
        <div className="callout">
          <div className="callout__label">Course code</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--ink)" }}>{c.code}</div>
        </div>
        <div className="callout">
          <div className="callout__label">On the page</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 12.5 }}>
            <li><a href="#syllabus">Syllabus</a></li>
            <li><a href="#schedule">Weekly schedule</a></li>
            <li><a href="#notebooks">Tutorial notebooks</a></li>
            <li><a href="#resources">Resources</a></li>
          </ul>
        </div>
      </aside>
      <main>
        <p className="page-title__eyebrow">{c.role} · {c.term}</p>
        <h1 className="course-detail__title">{c.title}</h1>
        <p className="course-detail__inst">{c.inst}</p>
        <div className="course-detail__meta">
          <span><Icon.calendar/> {c.term}</span>
          <span><Icon.pin/> {c.inst}</span>
          <span>👥 {c.students} students</span>
          <span><Icon.github/> <a href={c.repo}>Course repository</a></span>
        </div>

        <section id="syllabus" className="pubd__sect">
          <h2 className="pubd__sect-title">Syllabus</h2>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.62, color: "var(--ink)", maxWidth: "65ch" }}>{c.syllabus}</p>
          <div className="callout"><div className="callout__label">Learning outcome</div><div style={{ color: "var(--ink-2)" }}>{c.outcome}</div></div>
        </section>

        <section id="schedule" className="pubd__sect">
          <h2 className="pubd__sect-title">Weekly schedule</h2>
          <ol className="schedule">{c.schedule.map((s, i) => <li key={i}><span className="schedule__week">{s.week}</span><span>{s.topic}</span></li>)}</ol>
        </section>

        <section id="notebooks" className="pubd__sect">
          <h2 className="pubd__sect-title">Tutorial notebooks</h2>
          <div className="notebooks">
            {c.notebooks.map(n => (
              <div key={n.n} className="notebook">
                <span className="notebook__n">#{n.n}</span>
                <span className="notebook__title">{n.title}</span>
                <a className="notebook__cta" href="#"><Icon.download/> .ipynb</a>
              </div>
            ))}
          </div>
        </section>

        <section id="resources" className="pubd__sect">
          <h2 className="pubd__sect-title">Resources & references</h2>
          <ul className="resource-list">
            {c.resources.map((r, i) => <li key={i}><span>{r.title}</span><a href={r.href} className="pub__link"><Icon.link/> open</a></li>)}
          </ul>
        </section>
      </main>
    </div>
  );
}

// ============== PROJECTS ==============
function ProjectsPage() {
  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Code</p>
        <h1 className="page-title__h1">Projects</h1>
        <p className="page-title__lede">Open-source code I've shipped, contributed to, or maintained — research code, libraries, and small utilities.</p>
      </header>
      <div className="proj-grid">
        {PROJECTS.map(p => (
          <a key={p.name} className="proj" href={p.href}>
            <div className="proj__head">
              <span className="proj__glyph">{p.glyph}</span>
              <span className="proj__name">{p.name}</span>
              <span className="proj__star">★ {p.stars}</span>
            </div>
            <p className="proj__desc">{p.desc}</p>
            <div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
            <div className="proj__foot">
              <span className="proj__lang-dot" style={{ background: p.langColor }}/>
              <span>{p.lang}</span>
              <span className="proj__ext">github.com/mirsazzathossain <Icon.ext/></span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

// ============== SNIPPETS LIST ==============
function SnippetsPage({ go }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return SNIPPETS;
    return SNIPPETS.filter(s =>
      (s.title + " " + s.desc + " " + s.tags.join(" ") + " " + s.lang).toLowerCase().includes(needle)
    );
  }, [q]);
  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Reference</p>
        <h1 className="page-title__h1">Snippets</h1>
        <p className="page-title__lede">Tiny, copy-paste-ready solutions for tasks I keep running into — kept here so I (and you) don't re-derive them from scratch.</p>
      </header>
      <div className="search-field search-field--block"><Icon.search/><input placeholder="Search snippets…" value={q} onChange={(e) => setQ(e.target.value)}/></div>
      <div className="snippets">
        {filtered.map(s => {
          const meta = LANG_META[String(s.lang).toLowerCase()] || { label: s.lang, color: "#94a3b8", glyph: "</>" };
          return (
            <a key={s.slug} className="snippet" href={`#snippets/${s.slug}`} onClick={(e) => { e.preventDefault(); go(`snippets/${s.slug}`); }}>
              <span className="snippet__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
                  <path d="M5 7.2 12 3l7 4.2v9.6L12 21l-7-4.2Z"/>
                </svg>
                <span className="snippet__icon-glyph" style={{ color: meta.color }}>{meta.glyph}</span>
              </span>
              <h3 className="snippet__title">{s.title}</h3>
              <p className="snippet__desc">{s.desc}</p>
              <div className="snippet__tags">
                <span className="tag tag--pill tag--accent">Snippet</span>
                <span className="tag tag--pill">{(LANG_META[String(s.lang).toLowerCase()] || {}).label || s.lang}</span>
              </div>
            </a>
          );
        })}
        {filtered.length === 0 && <div className="empty" style={{ gridColumn: "1 / -1" }}>No snippets match your search.</div>}
      </div>
    </>
  );
}

// ============== SNIPPET DETAIL ==============
function SnippetDetail({ slug, go }) {
  const s = SNIPPETS.find(x => x.slug === slug);
  if (!s) return <div className="empty">Snippet not found.</div>;
  return (
    <article className="snippet-detail">
      <a href="#snippets" onClick={(e) => { e.preventDefault(); go("snippets"); }} style={{ fontFamily: "var(--font-mono)", fontSize: 12, marginBottom: 18, display: "inline-block" }}>← All snippets</a>
      <header className="snippet-detail__head">
        <div className="snippet-detail__head-text">
          <h1 className="snippet-detail__title">{s.title}</h1>
          <p className="snippet-detail__desc">{s.desc}</p>
          <div className="snippet-detail__tags">
            <span className="tag tag--pill tag--accent">Snippet</span>
            <span className="tag tag--pill">{(LANG_META[String(s.lang).toLowerCase()] || {}).label || s.lang}</span>
            {s.tags.map(t => <span key={t} className="tag tag--pill">{t}</span>)}
          </div>
        </div>
        <span className="snippet-detail__icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
            <path d="M5 7.2 12 3l7 4.2v9.6L12 21l-7-4.2Z"/>
          </svg>
          <span className="snippet-detail__icon-glyph">{(LANG_META[String(s.lang).toLowerCase()] || {}).glyph || "</>"}</span>
        </span>
      </header>
      {s.steps.map((st, i) => (
        <section key={i} className="snippet-step">
          <h3 className="snippet-step__title">{st.title}</h3>
          <pre className="snippet-step__code">{st.code}</pre>
          {st.note && <span className="snippet-step__note"><strong>Note:</strong> {st.note}</span>}
        </section>
      ))}
      <div className="article__meta" style={{ marginTop: 28, paddingTop: 18, borderTop: "1px solid var(--rule)" }}>
        <span><Icon.calendar/> {s.date}</span>
        {s.tags.map(t => <span key={t}><Icon.tag/> {t}</span>)}
      </div>
    </article>
  );
}

// ============== RESOURCES ==============
function ResourcesPage() {
  return (
    <>
      <header className="page-title">
        <p className="page-title__eyebrow">Curated</p>
        <h1 className="page-title__h1">Resources</h1>
        <p className="page-title__lede">Bookmarks, tutorials, and references I keep returning to. Organized by topic for easy scanning.</p>
      </header>
      {RESOURCES.map(s => (
        <section key={s.topic} className="res-section">
          <h2 className="res-section__title">{s.topic}</h2>
          <div className="res-grid">
            {s.items.map(r => (
              <a key={r.title} href="#" className="res-card">
                <div className="res-card__source"><Icon.ext/> {r.source}</div>
                <h3 className="res-card__title">{r.title}</h3>
                <p className="res-card__desc">{r.desc}</p>
              </a>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

// ============== CV ==============
function CVPage() {
  return (
    <div className="cv-page">
      <header className="cv-head">
        <h1 className="cv-head__name">{SITE.name}</h1>
        <div className="cv-head__contacts">
          <span><Icon.pin/> {SITE.location}</span>
          <span><Icon.email/> {SITE.email}</span>
          <span><Icon.scholar/> Google Scholar</span>
          <span><Icon.github/> mirsazzathossain</span>
        </div>
        <a className="cv-head__download" href="#"><Icon.download/> Download PDF</a>
      </header>

      <section className="cv-block">
        <h2 className="cv-block__title">Education</h2>
        <ul className="cv-list">
          {CV.education.map((e, i) => (
            <li key={i}>
              <div className="cv-list__head"><h3>{e.role}</h3><span className="cv-list__time">{e.time}</span></div>
              <p className="cv-list__org">{e.org}</p>
              <p className="cv-list__meta">{e.meta}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-block">
        <h2 className="cv-block__title">Research Experience</h2>
        <ul className="cv-list">
          {CV.research.map((e, i) => (
            <li key={i}>
              <div className="cv-list__head"><h3>{e.role}</h3><span className="cv-list__time">{e.time}</span></div>
              <p className="cv-list__org">{e.org}</p>
              <ul className="cv-list__bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-block">
        <h2 className="cv-block__title">Industry Experience</h2>
        <ul className="cv-list">
          {CV.industry.map((e, i) => (
            <li key={i}>
              <div className="cv-list__head"><h3>{e.role}</h3><span className="cv-list__time">{e.time}</span></div>
              <p className="cv-list__org">{e.org}</p>
              <ul className="cv-list__bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-block">
        <h2 className="cv-block__title">Teaching</h2>
        <ul className="cv-list">
          {CV.teaching.map((e, i) => (
            <li key={i}>
              <div className="cv-list__head"><h3>{e.role}</h3><span className="cv-list__time">{e.time}</span></div>
              <p className="cv-list__org">{e.org}</p>
              <ul className="cv-list__bullets">{e.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="cv-block">
        <h2 className="cv-block__title">Honors & Awards</h2>
        <ul className="cv-awards">
          {CV.awards.map((a, i) => <li key={i}><span className="cv-awards__title">{a.title}</span><span className="cv-awards__time">{a.time}</span></li>)}
        </ul>
      </section>

      <section className="cv-block">
        <h2 className="cv-block__title">Skills</h2>
        <dl className="cv-skills">
          {Object.entries(CV.skills).map(([k, v]) => (<React.Fragment key={k}><dt>{k}</dt><dd>{v.join(" · ")}</dd></React.Fragment>))}
        </dl>
      </section>
    </div>
  );
}

// ============== ABOUT ==============
function AboutPage() {
  return (
    <div>
      <header className="page-title">
        <p className="page-title__eyebrow">About</p>
        <h1 className="page-title__h1">{SITE.name}</h1>
        <p className="page-title__lede">{SITE.title} at <a href={SITE.affiliationUrl}>{SITE.affiliation}</a>, {SITE.institution}.</p>
      </header>
      <div className="about-page">
        <aside>
          <img className="about-page__photo" src="assets/profile.png" alt={SITE.name}/>
          <div className="about-page__contacts">
            <span><Icon.pin/> {SITE.location}</span>
            <span><Icon.email/> {SITE.email}</span>
            <span><Icon.scholar/> Google Scholar</span>
            <span><Icon.github/> mirsazzathossain</span>
            <span><Icon.linkedin/> mirsazzathossain</span>
            <span><Icon.twitter/> @mirsazzathos</span>
          </div>
        </aside>
        <div>
          <h2 className="about-block-title">Bio</h2>
          {SITE.bioLong.map((p, i) => <p key={i}>{p}</p>)}

          <h2 className="about-block-title">Education</h2>
          {CV.education.map((e, i) => (
            <div key={i} className="edu-row">
              <div className="edu-row__logo">IUB</div>
              <div style={{ flex: 1 }}>
                <h3 className="edu-row__title">{e.org}</h3>
                <p className="edu-row__meta">{e.role}</p>
                <p className="edu-row__desc">{e.meta}</p>
              </div>
              <span className="edu-row__time">{e.time}</span>
            </div>
          ))}

          <h2 className="about-block-title">Experience</h2>
          {[...CV.research, ...CV.industry, ...CV.teaching].map((e, i) => (
            <div key={i} className="edu-row">
              <div className="edu-row__logo">{e.org.includes("CCDS") ? "CC" : e.org.includes("IUB") ? "IUB" : e.org.slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <h3 className="edu-row__title">{e.role}</h3>
                <p className="edu-row__meta">{e.org}</p>
                {e.bullets && <p className="edu-row__desc">{e.bullets[0]}</p>}
              </div>
              <span className="edu-row__time">{e.time}</span>
            </div>
          ))}

          <h2 className="about-block-title">Honors & Awards</h2>
          <ul className="cv-awards">
            {CV.awards.map((a, i) => <li key={i}><span className="cv-awards__icon">{a.icon}</span><span className="cv-awards__title">{a.title}</span><span className="cv-awards__time">{a.time}</span></li>)}
          </ul>

          <h2 className="about-block-title">Talks & presentations</h2>
          <ul className="talk-list">
            {CV.talks.map((t, i) => (
              <li key={i} className="talk-row">
                <span className={`talk-row__type talk-row__type--${t.type}`}>{t.type}</span>
                <div className="talk-row__main">
                  <p className="talk-row__title">{t.title}</p>
                  <p className="talk-row__venue">{t.venue} · <span className="talk-row__loc">{t.location}</span></p>
                </div>
                <span className="talk-row__date">{t.date}</span>
              </li>
            ))}
          </ul>

          <h2 className="about-block-title">Service & reviewing</h2>
          <div className="service-grid">
            {CV.service.map((s, i) => (
              <div key={i} className="service-card">
                <span className="service-card__role">{s.role}</span>
                <span className="service-card__venue">{s.venue}</span>
                <span className="service-card__year">{s.year}</span>
              </div>
            ))}
          </div>

          <h2 className="about-block-title">Press & mentions</h2>
          <ul className="press-list">
            {CV.press.map((p, i) => (
              <li key={i} className="press-row">
                <div className="press-row__head">
                  <span className="press-row__outlet">{p.outlet}</span>
                  <span className="press-row__date">{p.date}</span>
                </div>
                <p className="press-row__title">{p.title}</p>
                <p className="press-row__desc">{p.desc}</p>
              </li>
            ))}
          </ul>

          <h2 className="about-block-title">Reach out</h2>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, lineHeight: 1.62, color: "var(--ink)", maxWidth: "65ch", marginBottom: 16 }}>
            Best ways to get in touch are <a href={`mailto:${SITE.email}`}>email</a> for anything
            substantive, or DMs on the socials below for casual things. Currently
            available for short calls in the windows shaded green — most weeks
            look roughly like this:
          </p>

          <div className="avail">
            <div className="avail__head">
              <div>
                <p className="avail__title">Typical week — {AVAILABILITY.rangeLabel}</p>
                <p className="avail__sub">All times shown in <strong>{AVAILABILITY.tz}</strong>. Booked slots in pink, free in green.</p>
              </div>
              <div className="avail__legend">
                <span><span className="avail__sw avail__sw--free"/> free</span>
                <span><span className="avail__sw avail__sw--busy"/> busy</span>
              </div>
            </div>
            <div className="avail__grid">
              <div className="avail__corner"/>
              {AVAILABILITY.dates.map((d, i) => (
                <div key={i} className="avail__day">
                  <span className="avail__dow">{AVAILABILITY.days[i]}</span>
                  <span className="avail__date">{d}</span>
                </div>
              ))}
              {AVAILABILITY.hours.map((h, ri) => (
                <React.Fragment key={ri}>
                  <div className="avail__hour">{h}</div>
                  {AVAILABILITY.grid[ri].split("").map((c, ci) => (
                    <div key={ci} className={`avail__cell avail__cell--${c}`} title={`${AVAILABILITY.days[ci]} ${h}`}/>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <p className="avail__note">Shoot me an <a href={`mailto:${SITE.email}`}>email</a> with a 2–3 slot suggestion and I'll confirm one.</p>
          </div>

          <h2 className="about-block-title">Timeline</h2>
          <div>
            {TIMELINE_BY_YEAR.map(yr => (
              <div key={yr.year} className="timeline-yr">
                <div className="timeline-yr__year">{yr.year}</div>
                <div className="timeline-yr__items">
                  {yr.items.map((it, j) => (
                    <div key={j} className="timeline-yr__item">
                      <span className={`timeline-yr__kind timeline-yr__kind--${it.kind}`}>{it.kind}</span>
                      <span>{it.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomePage, PublicationsPage, PublicationDetail, PostsPage, PostDetail, CoursesPage, CourseDetail, ProjectsPage, SnippetsPage, ResourcesPage, CVPage, AboutPage });
