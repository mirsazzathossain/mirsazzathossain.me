// App + Tweaks
const { useState: useSt, useEffect: useEf } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2563eb",
  "headingFont": "serif",
  "density": "comfortable",
  "showStatus": true
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useSt(() => (location.hash || "#home").slice(1));
  const [dark, setDark] = useSt(() => localStorage.getItem("msh-theme") === "dark");
  const [searchOpen, setSearchOpen] = useSt(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEf(() => {
    const onHash = () => { setRoute((location.hash || "#home").slice(1)); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEf(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    localStorage.setItem("msh-theme", dark ? "dark" : "light");
  }, [dark]);
  useEf(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(o => !o); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEf(() => {
    const r = document.documentElement;
    r.style.setProperty("--link", tweaks.accent);
    r.style.setProperty("--font-serif", tweaks.headingFont === "sans" ? "var(--font-sans)" : tweaks.headingFont === "mono" ? "var(--font-mono)" : "'Newsreader', 'Source Serif 4', Georgia, serif");
    r.style.setProperty("--max", tweaks.density === "compact" ? "1000px" : "1100px");
  }, [tweaks]);

  const go = (path) => { location.hash = path; };
  const [head, ...rest] = route.split("/");
  const isNarrow = head === "posts" && rest.length > 0;

  let view;
  if (head === "home" || head === "") view = <HomePage go={go}/>;
  else if (head === "publications" && rest.length === 0) view = <PublicationsPage go={go}/>;
  else if (head === "publications") view = <PublicationDetail id={rest.join("/")} go={go}/>;
  else if (head === "posts" && rest.length === 0) view = <PostsPage go={go}/>;
  else if (head === "posts") view = <PostDetail slug={rest.join("/")} go={go}/>;
  else if (head === "courses" && rest.length === 0) view = <CoursesPage go={go}/>;
  else if (head === "courses") view = <CourseDetail go={go}/>;
  else if (head === "projects") view = <ProjectsPage/>;
  else if (head === "snippets" && rest.length === 0) view = <SnippetsPage go={go}/>;
  else if (head === "snippets") view = <SnippetDetail slug={rest.join("/")} go={go}/>;
  else if (head === "resources") view = <ResourcesPage/>;
  else if (head === "cv") view = <CVPage/>;
  else if (head === "about") view = <AboutPage/>;
  else view = <HomePage go={go}/>;

  return (
    <>
      <Nav page={head} go={go} dark={dark} toggleDark={() => setDark(d => !d)} onSearch={() => setSearchOpen(true)}/>
      <main className={`app__main ${isNarrow ? "page--narrow" : ""}`}>{view}</main>
      <Footer/>
      <BackToTop/>
      {searchOpen && <SearchModal close={() => setSearchOpen(false)} go={go}/>}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Color">
          <TweakColor label="Accent" value={tweaks.accent} onChange={v => setTweak("accent", v)}/>
        </TweakSection>
        <TweakSection title="Typography">
          <TweakRadio label="Heading font" value={tweaks.headingFont} options={[{ value: "serif", label: "Serif" }, { value: "sans", label: "Sans" }, { value: "mono", label: "Mono" }]} onChange={v => setTweak("headingFont", v)}/>
        </TweakSection>
        <TweakSection title="Layout">
          <TweakRadio label="Density" value={tweaks.density} options={[{ value: "comfortable", label: "Comfortable" }, { value: "compact", label: "Compact" }]} onChange={v => setTweak("density", v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
