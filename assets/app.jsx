// ============================================
// True Story Studios — UI Kit Components
// A24-style: dark, editorial, image-forward
// ============================================

const { useState, useEffect, useRef } = React;

const HERO_IMAGES = [
  "ThePettys.jpg",
  "RunningTheAmazon.png",
  "SixDimesAndANickel.jpg",
  "DarknessIsMyCandle.png"
];



// ----- Logo -----
function Logo({ height = 28, reverse = true, className = "" }) {
  const src = reverse
    ? 'assets/logo-rev.png'
    : 'assets/logo-main.png';
  // reverse logo is white-on-transparent; tint it ember for the dark site nav
  return (
    <a href="#top" className={`ts-logo ${className}`} aria-label="True Story Studios">
      <img
        src={'assets/logo-main.png'}
        alt="True Story Studios"
        style={{
          height,
          display: "block",
          /* keep original ember color */
        }}
      />
    </a>
  );
}

function LogoMark({ size = 40 }) {
  // crop the flame portion of the wordmark by using the full logo at large size & masking
  return (
    <img
      src={'assets/logo-main.png'}
      alt=""
      aria-hidden="true"
      style={{
        height: size,
        objectFit: "contain",
        objectPosition: "center",
      }}
    />
  );
}

// ----- Nav -----
function Nav({ active = "work" }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const items = [
    { id: "work", label: "Work" },
    { id: "studio", label: "Studio" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className={`ts-nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="ts-nav-inner">
        <Logo height={26} />
        <ul className="ts-nav-links">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={active === it.id ? "is-active" : ""}
              >
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ----- Hero -----
function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="ts-hero" id="top">
      <div className="ts-hero-carousel">
        {HERO_IMAGES.map((img, i) => (
          <div key={img} className={`ts-hero-slide ${i === current ? 'is-active' : ''}`}>
            <img src={img} alt="" />
          </div>
        ))}
      </div>
      <div className="ts-hero-scrim" aria-hidden="true" />
      <div className="ts-hero-grain" aria-hidden="true" />
      <div className="ts-hero-inner">
        <div className="ts-eyebrow">Founded 2024 · Los Angeles</div>
        <h1 className="ts-display ts-hero-title">
          Facts are<br />just the<br />
          <span className="ts-hero-spark">spark.</span>
        </h1>
        <p className="ts-lead ts-hero-sub">
          We find the best true stories — and recreate them for the screen.
        </p>
        <div className="ts-hero-actions">
          <a href="#work" className="ts-btn ts-btn-primary">
            See the slate
          </a>
          <a href="#contact" className="ts-btn ts-btn-ghost">
            Get in touch
          </a>
        </div>
      </div>
      <div className="ts-hero-marquee" aria-hidden="true">
        <div className="ts-marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="ts-marquee-item">
              REAL PEOPLE · REAL STAKES · REAL STORIES ·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}



// ----- Slate -----
const SLATE = [
  {
    id: "the-pettys",
    title: "The Pettys",
    format: "Limited Series",
    year: "In Development",
    logline:
      "The true father-and-son story of Lee and Richard Petty — Yellowstone meets Friday Night Lights, served up at two hundred miles an hour.",
    palette: ["#1A1410", "#2A1810", "#7A3A1E", "#D06028"],
    tag: "TS-001",
    image: "ThePettys.jpg",
  },
  {
    id: "running-the-amazon",
    title: "Running the Amazon",
    format: "Feature Film",
    year: "In Development",
    logline:
      "1985. A mismatched band of explorers attempts to kayak the Amazon River from source to sea. Deliverance, from 18,000 feet to the Atlantic.",
    palette: ["#0F1A14", "#1A2A1E", "#3D5A3A", "#8AB060"],
    tag: "TS-002",
    image: "RunningTheAmazon.png",
    position: "left center",
  },
  {
    id: "six-dimes",
    title: "Six Dimes and a Nickel",
    format: "Feature Film",
    year: "In Development",
    logline:
      "The true story of ex-college quarterback and stockbroker Damon West. Shawshank Redemption, for the 21st century.",
    palette: ["#15110D", "#241B14", "#5A4630", "#C28B4A"],
    tag: "TS-003",
    image: "SixDimesAndANickel.jpg",
    position: "left center",
  },
];

function SlateCard({ item, index, onOpen }) {
  return (
    <article
      className="ts-slate-card"
      onClick={() => onOpen(item)}
    >
      <div className="ts-slate-poster">
        <div
          className="ts-slate-poster-bg"
          style={{
            background: item.image 
              ? `url(${item.image}) ${item.position || 'center'}/cover no-repeat`
              : `linear-gradient(160deg, ${item.palette[0]} 0%, ${item.palette[1]} 40%, ${item.palette[2]} 100%)`,
          }}
        />
        {item.image && <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.2)', mixBlendMode: 'multiply' }} />}

        <div className="ts-slate-poster-grain" aria-hidden="true" />
        <div className="ts-slate-poster-meta">
          <span className="ts-caption">{item.tag}</span>
          <span className="ts-caption">{item.format}</span>
        </div>
        <div className="ts-slate-poster-title">
          <h3 className="ts-h2">{item.title}</h3>
        </div>
        <div className="ts-slate-poster-corner">
          <span className="ts-caption">{String(index + 1).padStart(2, "0")} / {String(SLATE.length).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="ts-slate-meta">
        <div className="ts-slate-format">
          <span className="ts-caption">{item.format}</span>
          <span className="ts-caption ts-slate-year">{item.year}</span>
        </div>
        <p className="ts-slate-logline">{item.logline}</p>
      </div>
    </article>
  );
}

function Slate({ onOpen }) {
  return (
    <section className="ts-slate" id="work">
      <div className="ts-section-inner">
        <div className="ts-section-head">
          <div className="ts-eyebrow">The Slate · 2026</div>
          <h2 className="ts-h1 ts-section-title">
            The current<br />work.
          </h2>
          <p className="ts-lead ts-section-sub">
            Three projects in active development. Each begins with a real person, and a real reason audiences will not look away.
          </p>
        </div>
        <div className="ts-slate-grid">
          {SLATE.map((item, i) => (
            <SlateCard key={item.id} item={item} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ----- Slate detail (modal) -----
function SlateDetail({ item, onClose }) {
  if (!item) return null;
  return (
    <div className="ts-modal" onClick={onClose}>
      <div className="ts-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="ts-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div
          className="ts-modal-poster"
          style={{
            background: `linear-gradient(160deg, ${item.palette[0]} 0%, ${item.palette[1]} 40%, ${item.palette[2]} 100%)`,
          }}
        >
          <div className="ts-slate-poster-grain" aria-hidden="true" />
        </div>
        <div className="ts-modal-body">
          <div className="ts-eyebrow">{item.tag} · {item.format}</div>
          <h3 className="ts-h1" style={{ marginTop: 8 }}>{item.title}</h3>
          <p className="ts-lead" style={{ marginTop: 16 }}>{item.logline}</p>
          <div className="ts-modal-meta">
            <div>
              <div className="ts-caption">Status</div>
              <div className="ts-body">{item.year}</div>
            </div>
            <div>
              <div className="ts-caption">Format</div>
              <div className="ts-body">{item.format}</div>
            </div>
            <div>
              <div className="ts-caption">Stage</div>
              <div className="ts-body">Script Development</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----- Studio (process) -----
function Studio() {
  const pillars = [
    {
      n: "01",
      title: "Excavate the emotional core",
      body: "We dig beneath events to find what actually moves people: love, grief, injustice, redemption — the emotional truth that makes a story universal.",
    },
    {
      n: "02",
      title: "Weave facts and feelings",
      body: "We stitch key moments together to amplify that core. Every beat earns its place.",
    },
    {
      n: "03",
      title: "Shape a narrative that resonates",
      body: "What emerges is a cinematic experience — truthful in feeling, coherent in structure, designed to move audiences.",
    },
  ];
  return (
    <section className="ts-studio" id="studio">
      <div className="ts-section-inner">
        <div className="ts-section-head">
          <div className="ts-eyebrow">The Studio</div>
          <h2 className="ts-h1 ts-section-title">
            How we<br />make them.
          </h2>
        </div>
        <ol className="ts-pillar-list">
          {pillars.map((p) => (
            <li key={p.n} className="ts-pillar">
              <div className="ts-pillar-n">{p.n}</div>
              <div className="ts-pillar-text">
                <h3 className="ts-h4">{p.title}</h3>
                <p className="ts-body">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ----- Founder -----
function Founder() {
  return (
    <section className="ts-founder">
      <div className="ts-section-inner ts-founder-grid">
        <div className="ts-founder-portrait" aria-hidden="true">
          <div className="ts-founder-portrait-frame">
            <div className="ts-founder-portrait-placeholder">
              <span className="ts-caption">Portrait · placeholder</span>
            </div>
          </div>
          <div className="ts-founder-tag">
            <span className="ts-caption">DAC · Founder &amp; CEO</span>
          </div>
        </div>
        <div className="ts-founder-text">
          <div className="ts-eyebrow">The face of True Story</div>
          <h2 className="ts-h2" style={{ marginTop: 16 }}>David Aaron Cohen</h2>
          <p className="ts-lead" style={{ marginTop: 16 }}>
            Thirty years writing and producing in Hollywood.
          </p>
          <p className="ts-body" style={{ marginTop: 16, color: "var(--ts-fg-2)" }}>
            Selected credits: <em>The Devil's Own</em> (Harrison Ford, Brad Pitt). <em>Friday Night Lights</em> (Billy Bob Thornton). <em>American Underdog</em> (Zachary Levi, Anna Paquin).
          </p>
        </div>
      </div>
    </section>
  );
}

// ----- Contact -----
function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };
  return (
    <section className="ts-contact" id="contact">
      <div className="ts-section-inner">
        <div className="ts-contact-grid">
          <div>
            <div className="ts-eyebrow">Contact</div>
            <h2 className="ts-h1 ts-section-title">
              Got a true<br />story?
            </h2>
            <p className="ts-lead ts-section-sub">
              Investors, talent, or someone with a story to tell — start here.
            </p>
            <div className="ts-contact-direct">
              <div>
                <div className="ts-caption">Email</div>
                <a href="mailto:info@truestorystudios.com" className="ts-h4 ts-contact-link">
                  info@truestorystudios.com
                </a>
              </div>
              <div>
                <div className="ts-caption">Phone</div>
                <div className="ts-h4">+1 555 55 55 55</div>
              </div>
            </div>
          </div>
          <form className="ts-form" onSubmit={handleSubmit}>
            <label className="ts-field">
              <span className="ts-caption">Name</span>
              <input type="text" required defaultValue="" />
            </label>
            <label className="ts-field">
              <span className="ts-caption">Email</span>
              <input type="email" required defaultValue="" />
            </label>
            <label className="ts-field">
              <span className="ts-caption">I am a…</span>
              <select defaultValue="">
                <option value="" disabled>Select one</option>
                <option>Investor</option>
                <option>Producer / Studio</option>
                <option>Talent / Representation</option>
                <option>Story owner / Subject</option>
                <option>Press</option>
                <option>Other</option>
              </select>
            </label>
            <label className="ts-field">
              <span className="ts-caption">Tell us about it</span>
              <textarea rows="4" defaultValue=""></textarea>
            </label>
            <button type="submit" className="ts-btn ts-btn-primary ts-btn-block">
              {sent ? "Sent — we'll be in touch." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ----- Footer -----
function Footer() {
  return (
    <footer className="ts-footer">
      <div className="ts-section-inner ts-footer-inner">
        <div className="ts-footer-mark">
          <Logo height={22} />
        </div>
        <div className="ts-footer-meta">
          <span className="ts-caption">© 2026 True Story Studios, LLC</span>
          <span className="ts-caption">Los Angeles, CA</span>
          <span className="ts-caption">info@truestorystudios.com</span>
        </div>
      </div>
    </footer>
  );
}

// ----- App -----
function App() {
  const [openItem, setOpenItem] = useState(null);
  return (
    <>
      <Nav />
      <main>
        <Hero />
        
        <Slate onOpen={setOpenItem} />
        <Studio />
        <Founder />
        <Contact />
      </main>
      <Footer />
      <SlateDetail item={openItem} onClose={() => setOpenItem(null)} />
    </>
  );
}

Object.assign(window, {
  Logo, LogoMark, Nav, Hero, Slate, SlateCard, SlateDetail,
  Studio, Founder, Contact, Footer, App, SLATE,
});
