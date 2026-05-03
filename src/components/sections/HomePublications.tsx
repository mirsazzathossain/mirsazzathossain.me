import React from 'react';

function getRankBadge(venue: string | undefined) {
  if (!venue) return null;
  const v = venue.toLowerCase();
  if (v.includes("icip") || v.includes("ijcnn") || v.includes("ijcai")) {
    // For demo purposes based on design-to-be rank badges
    // ICIP -> CORE B
    // IJCAI -> CORE A*
    if (v.includes("ijcai")) return <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap bg-[#fdf4ff] text-[#86198f] border-[#f5d0fe] font-bold dark:bg-[#4a044e] dark:text-[#f0abfc] dark:border-[#86198f]">CORE A*</span>;
    if (v.includes("icip")) return <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe] font-bold dark:bg-[#172554] dark:text-[#93c5fd] dark:border-[#1e3a8a]">CORE B</span>;
    if (v.includes("ijcnn")) return <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap bg-[#f8fafc] text-[#475569] border-[#cbd5e1] font-bold dark:bg-[#1e293b] dark:text-[#94a3b8] dark:border-[#334155]">CORE C</span>;
  }
  return null;
}

function PubLink({ icon, label, href, download }: { icon: React.ReactNode, label: string, href: string, download?: string }) {
  return (
    <a href={href} download={download} className="inline-flex items-center gap-1 text-[11.5px] font-mono text-ink-2 py-[3px] px-2 border border-rule rounded bg-bg transition-colors hover:text-link hover:border-link/35 hover:bg-accent-soft hover:no-underline" target={download ? undefined : "_blank"} rel="noreferrer">
      {icon}
      <span>{label}</span>
    </a>
  );
}

export function HomePublications({ publications }: { publications: any[] }) {
  const featured = publications.slice(0, 4);

  return (
    <div className="mb-10">
      <div className="flex items-baseline justify-between pb-2 border-b border-rule mb-4 gap-3 flex-wrap">
        <h2 className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-3 font-semibold m-0">Selected Publications</h2>
        <a className="font-mono text-[11.5px] text-link inline-flex items-center gap-1 whitespace-nowrap hover:underline hover:decoration-link/35 hover:underline-offset-[3px]" href="/publications">
          All publications <span className="text-current transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
      
      <div className="flex flex-col">
        {featured.map((p) => {
          const isNew = p.year >= "2025";
          const detailHref = p.id ? `/publications/${p.id}` : p.url || "#";
          const venueShort = p.journal?.includes("Image Processing") ? "ICIP" 
                           : p.journal?.includes("Neural Networks") ? "IJCNN"
                           : p.journal?.includes("Artificial Intelligence") ? "IJCAI"
                           : p.journal?.includes("Astronomy & Astrophysics") ? "A&A"
                           : p.journal || p.booktitle || "Preprint";
                           
          return (
            <article key={p.id} className="py-4 border-b border-rule-2 first:pt-0 last:border-b-0">
              <div className="flex flex-wrap gap-1.5 mb-[7px]">
                <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap font-medium bg-accent-soft text-link border-link/25">
                  {venueShort}
                </span>
                <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border border-rule bg-bg-2 text-ink-2 font-medium whitespace-nowrap">
                  {p.type === "article" ? "Journal" : p.type === "inproceedings" ? "Conference" : "Preprint"}
                </span>
                {getRankBadge(p.journal || p.booktitle)}
                {isNew && (
                  <span className="font-mono text-[10px] tracking-[0.04em] py-[2px] px-[7px] rounded-[3px] border whitespace-nowrap font-medium bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0] dark:bg-[#022c22] dark:text-[#6ee7b7] dark:border-[#064e3b]">
                    New
                  </span>
                )}
              </div>
              <h3 className="font-serif text-[16.5px] leading-[1.32] m-0 mb-[5px] tracking-[-0.01em] font-semibold">
                <a href={detailHref} className="text-ink hover:text-link hover:no-underline transition-colors">
                  {p.title}
                </a>
              </h3>
              <p className="m-0 mb-[3px] text-[12.5px] text-ink-2 leading-[1.5]">
                {p.author.split(' and ').map((a: string, i: number, arr: any[]) => {
                  const isMe = a.includes("Hossain");
                  return (
                    <React.Fragment key={i}>
                      {isMe ? <span className="text-ink font-semibold">{a}</span> : a}
                      {i < arr.length - 1 ? ", " : ""}
                    </React.Fragment>
                  );
                })}
              </p>
              <p className="m-0 mb-[9px] text-[12px] text-ink-3 italic leading-[1.45]">
                {p.journal || p.booktitle}
              </p>
              <div className="flex flex-wrap gap-1">
                {p.url && (
                  <PubLink 
                    href={p.url} 
                    label={p.url.includes("arxiv") ? "arXiv" : "Paper"} 
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} 
                  />
                )}
                {p.code && (
                  <PubLink 
                    href={p.code} 
                    label="Code" 
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>} 
                  />
                )}
                {p.slides && (
                  <PubLink 
                    href={p.slides} 
                    label="Slides" 
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>} 
                  />
                )}
                {p.poster && (
                  <PubLink 
                    href={p.poster} 
                    label="Poster" 
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>} 
                  />
                )}
                {p.raw && (
                  <PubLink 
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(p.raw)}`} 
                    download={`${p.id}.bib`}
                    label="BibTeX" 
                    icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3-1 5-4 5-8H4V5h8v8c0 3-2 7-9 8zm12 0c3-1 5-4 5-8h-4V5h8v8c0 3-2 7-9 8z"/></svg>} 
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
