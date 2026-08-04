"use client";

import { useEffect, useState } from "react";
import { content, type Lang, type LocKey, type Content } from "./dictionaries";

const ASSETS = {
  logoHeader: "/assets/logo-header.svg",
  logoSquare: "/assets/logo-square.svg",
  hero: "/hero-rc-desarrollos.webp",
  renderAerial: "/rc-parks-industrial.webp",
  renderEntrance: "/rc-desarrollos-build-to-suit.webp",
  map: "/mapa-rc-parks.webp",
};

const CYAN = "#4EBFE0";
const INK = "#0A0A0A";
const SAND = "#E8E6E4";

type UnitKey = "parks" | "built" | "inmobiliario";
type DevKey = "cienega" | "pesqueria" | "santacatarina" | "juarez" | "suazua";

// Structure only — place/brand names are language-neutral; translatable text
// comes from the dictionary, aligned by index.
const UNIT_DEFS: { key: UnitKey; name: string }[] = [
  { key: "parks", name: "RC Parks" },
  { key: "built", name: "RC Built to Suit" },
  { key: "inmobiliario", name: "RC Inmobiliario" },
];

const DEV_DEFS: {
  key: DevKey;
  short: string;
  title: string;
  loc: string;
  upcoming: boolean;
}[] = [
  {
    key: "cienega",
    short: "Ciénega de Flores",
    title: "RC Parks",
    loc: "Ciénega de Flores, N.L.",
    upcoming: false,
  },
  {
    key: "pesqueria",
    short: "Pesquería",
    title: "Pesquería, N.L.",
    loc: "Pesquería, N.L.",
    upcoming: true,
  },
  {
    key: "santacatarina",
    short: "Santa Catarina",
    title: "Santa Catarina, N.L.",
    loc: "Santa Catarina, N.L.",
    upcoming: true,
  },
  {
    key: "juarez",
    short: "Juárez",
    title: "Juárez, N.L.",
    loc: "Juárez, N.L.",
    upcoming: true,
  },
  {
    key: "suazua",
    short: "Zuazua",
    title: "Zuazua, N.L.",
    loc: "Zuazua, N.L.",
    upcoming: true,
  },
];

// Dark gradients (black → RC Parks blue) for each "Próximamente" development.
const UPCOMING_GRADIENTS: Record<DevKey, string> = {
  cienega: "#0A0A0A",
  pesqueria: "linear-gradient(140deg, #0A0A0A 0%, #0C2A34 48%, #2AA0C4 100%)",
  santacatarina:
    "linear-gradient(140deg, #0A0A0A 0%, #0E2440 48%, #2C6FB0 100%)",
  juarez: "linear-gradient(140deg, #0A0A0A 0%, #0B2E38 48%, #1E88A8 100%)",
  suazua: "linear-gradient(140deg, #0A0A0A 0%, #0C2C33 48%, #23A0A8 100%)",
};

const LOC_KEYS: LocKey[] = [
  "empresas",
  "aeropuertos",
  "accesos",
  "ferrocarriles",
];

export default function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];
  const [unit, setUnit] = useState<UnitKey>("parks");
  const [dev, setDev] = useState<DevKey>("cienega");
  const [locTab, setLocTab] = useState<LocKey>("empresas");

  // Keep the document language in sync with the current locale.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Scroll-reveal: fade+rise elements marked [data-reveal] as they enter view.
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-reveal-init])",
    );
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const d = parseInt(el.getAttribute("data-delay") || "0", 10);
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "none";
            }, d);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      el.setAttribute("data-reveal-init", "1");
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition =
        "opacity .7s ease, transform .7s cubic-bezier(.2,.7,.2,1)";
      io.observe(el);
    });
    return () => io.disconnect();
  }, [unit, dev, locTab]);

  const isParks = unit === "parks";
  const isBuilt = unit === "built";
  const isInmo = unit === "inmobiliario";

  const activeDev = DEV_DEFS.find((d) => d.key === dev) ?? DEV_DEFS[0];
  const isCienega = dev === "cienega";
  const isUpcomingDev = dev !== "cienega";

  return (
    <div style={{ minHeight: "100vh", overflowX: "hidden" }}>
      {/* NAV */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid ${SAND}`,
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 40px",
            height: 92,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a href="#top" style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.logoHeader}
              alt="R.C. Desarrollos"
              style={{ height: 54, display: "block" }}
            />
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              className="rc-nav-links"
              style={{ display: "flex", alignItems: "center", gap: 36 }}
            >
              <a href="#sobre" style={navLink}>
                {t.nav.about}
              </a>
              <a href="#unidades" style={navLink}>
                {t.nav.units}
              </a>
              <a href="#contacto" style={navLink}>
                {t.nav.contact}
              </a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: INK,
                  opacity: lang === "es" ? 1 : 0.4,
                }}
              >
                ES
              </a>
              <span style={{ opacity: 0.3 }}>/</span>
              <a
                href="/en"
                style={{
                  textDecoration: "none",
                  color: INK,
                  opacity: lang === "en" ? 1 : 0.4,
                }}
              >
                EN
              </a>
            </div>
            <a
              href="#contacto"
              className="btn-dark"
              style={{
                textDecoration: "none",
                background: INK,
                color: "#fff",
                fontSize: 14.5,
                fontWeight: 500,
                padding: "12px 22px",
                borderRadius: 2,
              }}
            >
              {t.nav.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" style={{ background: "#fff" }}>
        <div
          className="rc-wrap"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}
        >
          <div
            className="rc-hero"
            style={{
              display: "grid",
              gridTemplateColumns: "0.92fr 1.08fr",
              gap: 0,
              alignItems: "stretch",
              minHeight: "calc(100vh - 92px)",
            }}
          >
            <div
              className="rc-hero-pad"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "70px 64px 70px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 13,
                  marginBottom: 30,
                  animation: "fadeUp 0.7s ease both",
                }}
              >
                <span style={{ width: 34, height: 1, background: CYAN }} />
                <span
                  style={{
                    fontSize: 12.5,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    color: INK,
                    fontWeight: 500,
                    opacity: 0.6,
                  }}
                >
                  {t.hero.eyebrow}
                </span>
              </div>
              <h1
                className="rc-h1"
                style={{
                  fontSize: 74,
                  lineHeight: 0.97,
                  fontWeight: 500,
                  letterSpacing: -3,
                  color: INK,
                  textWrap: "balance",
                  animation: "fadeUp 0.8s ease 0.05s both",
                }}
              >
                {t.hero.titleBefore}
                <span style={{ color: CYAN }}>{t.hero.titleHighlight}</span>
                {t.hero.titleAfter}
              </h1>
              <p
                style={{
                  marginTop: 30,
                  fontSize: 20,
                  lineHeight: 1.55,
                  color: "rgba(10,10,10,0.66)",
                  maxWidth: 520,
                  textWrap: "pretty",
                  animation: "fadeUp 0.9s ease 0.12s both",
                }}
              >
                {t.hero.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  flexWrap: "wrap",
                  marginTop: 40,
                  animation: "fadeUp 1s ease 0.18s both",
                }}
              >
                <a href="#contacto" className="btn-dark" style={heroPrimary}>
                  {t.hero.ctaPrimary}
                </a>
                <a href="#unidades" className="btn-outline" style={heroOutline}>
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </div>
            <div
              className="rc-hero-media"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 4,
                margin: "32px 0",
                animation: "fadeUp 0.9s ease 0.1s both",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.hero}
                alt={t.parks.cienega.name}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: "kenburns 16s ease-out forwards",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(120deg,rgba(10,10,10,0.18),transparent 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="rc-sec"
        style={{ background: INK, color: "#fff", padding: "130px 0" }}
      >
        <div
          className="rc-wrap"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}
        >
          <div
            className="rc-2col"
            style={{
              display: "grid",
              gridTemplateColumns: "0.8fr 1.2fr",
              gap: 80,
              alignItems: "start",
            }}
          >
            <div data-reveal="true">
              <span
                style={{
                  fontSize: 12.5,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: CYAN,
                  fontWeight: 500,
                }}
              >
                {t.sobre.eyebrow}
              </span>
              <div
                style={{
                  marginTop: 22,
                  width: 54,
                  height: 2,
                  background: CYAN,
                }}
              />
            </div>
            <div data-reveal="true" data-delay="120">
              <h2
                className="rc-h2"
                style={{
                  fontSize: 46,
                  lineHeight: 1.1,
                  fontWeight: 500,
                  letterSpacing: -1.6,
                  textWrap: "balance",
                }}
              >
                {t.sobre.heading}
              </h2>
              <p style={sobreParagraph}>{t.sobre.p1}</p>
              <p style={{ ...sobreParagraph, marginTop: 20 }}>{t.sobre.p2}</p>
              <div
                style={{
                  marginTop: 44,
                  display: "flex",
                  gap: 48,
                  flexWrap: "wrap",
                  borderTop: "1px solid rgba(255,255,255,0.15)",
                  paddingTop: 30,
                }}
              >
                {t.sobre.meta.map((m, i) => (
                  <div key={i}>
                    <div style={sobreMetaLabel}>{m.label}</div>
                    <div style={sobreMetaValue}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES DE NEGOCIO */}
      <section
        id="unidades"
        className="rc-sec"
        style={{ background: SAND, padding: "130px 0" }}
      >
        <div
          className="rc-wrap"
          style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}
        >
          <div data-reveal="true" style={{ marginBottom: 56, maxWidth: 760 }}>
            <span
              style={{
                fontSize: 12.5,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: INK,
                fontWeight: 500,
                opacity: 0.5,
              }}
            >
              {t.units.eyebrow}
            </span>
          </div>

          {/* unit cards */}
          <div
            data-reveal="true"
            className="rc-grid-3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {UNIT_DEFS.map((u, i) => {
              const on = u.key === unit;
              const txt = t.units.items[i];
              return (
                <div
                  key={u.key}
                  className="lift-5"
                  onClick={() => setUnit(u.key)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 6,
                    padding: "34px 32px",
                    minHeight: 210,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: on ? INK : "#fff",
                    color: on ? "#fff" : INK,
                    border: `1px solid ${on ? INK : "#DAD8D5"}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: CYAN,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 22,
                        color: on ? CYAN : "rgba(10,10,10,0.35)",
                      }}
                    >
                      {on ? "↓" : "→"}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: 11.5,
                        letterSpacing: 1.8,
                        textTransform: "uppercase",
                        color: on
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(10,10,10,0.5)",
                        fontWeight: 500,
                      }}
                    >
                      {txt.tag}
                    </span>
                    <h3
                      style={{
                        fontSize: 28,
                        fontWeight: 500,
                        lineHeight: 1.1,
                        letterSpacing: -0.8,
                        marginTop: 8,
                      }}
                    >
                      {u.name}
                    </h3>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: on
                          ? "rgba(255,255,255,0.6)"
                          : "rgba(10,10,10,0.5)",
                      }}
                    >
                      {txt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PANEL */}
          <div
            className="rc-panel"
            style={{
              background: "#fff",
              border: "1px solid #DAD8D5",
              borderRadius: 6,
              padding: 52,
              minHeight: 460,
            }}
          >
            {/* PARKS */}
            {isParks && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 20,
                    marginBottom: 32,
                  }}
                >
                  <div>
                    <span style={unitEyebrow}>{t.parks.eyebrow}</span>
                    <h3 style={unitTitle}>{t.parks.title}</h3>
                  </div>
                  <p style={unitLede}>{t.parks.lede}</p>
                </div>

                {/* dev selector */}
                <div
                  className="rc-grid-5"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5,1fr)",
                    gap: 12,
                    marginBottom: 40,
                  }}
                >
                  {DEV_DEFS.map((d) => {
                    const on = d.key === dev;
                    const up = d.upcoming;
                    return (
                      <button
                        key={d.key}
                        className="lift-3"
                        onClick={() => setDev(d.key)}
                        style={{
                          cursor: "pointer",
                          textAlign: "left",
                          fontFamily: "inherit",
                          borderRadius: 5,
                          padding: "20px 18px",
                          background: on
                            ? up
                              ? "#1A1A1A"
                              : INK
                            : up
                              ? "#161616"
                              : "#fff",
                          color: on || up ? "#fff" : INK,
                          border: `1px solid ${on ? CYAN : up ? "#161616" : "#DAD8D5"}`,
                          boxShadow: on
                            ? "0 12px 28px rgba(10,10,10,0.18)"
                            : "none",
                        }}
                      >
                        {up && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 7,
                              marginBottom: 14,
                            }}
                          >
                            <span
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background: "#F1F0DA",
                              }}
                            />
                            <span
                              style={{
                                fontSize: 10.5,
                                letterSpacing: 1,
                                textTransform: "uppercase",
                                color: "rgba(255,255,255,0.6)",
                                fontWeight: 500,
                              }}
                            >
                              {t.parks.comingSoon}
                            </span>
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            lineHeight: 1.2,
                            letterSpacing: -0.3,
                          }}
                        >
                          {d.title}
                        </div>
                        {d.title !== d.loc && (
                          <div
                            style={{
                              marginTop: 5,
                              fontSize: 12.5,
                              color:
                                on || up
                                  ? "rgba(255,255,255,0.55)"
                                  : "rgba(10,10,10,0.5)",
                            }}
                          >
                            {d.loc}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Ciénega detail */}
                {isCienega && (
                  <div>
                    <div
                      style={{
                        position: "relative",
                        borderRadius: 5,
                        overflow: "hidden",
                        marginBottom: 32,
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ASSETS.renderAerial}
                        alt={t.parks.cienega.name}
                        style={{
                          width: "100%",
                          height: 400,
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(0deg,rgba(10,10,10,0.85),transparent 55%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          bottom: 0,
                          padding: "32px 36px",
                          color: "#fff",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                            color: CYAN,
                          }}
                        >
                          {t.parks.cienega.loc}
                        </span>
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 500,
                            marginTop: 6,
                            letterSpacing: -0.6,
                          }}
                        >
                          {t.parks.cienega.name}
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "rgba(255,255,255,0.75)",
                            marginTop: 4,
                          }}
                        >
                          {t.parks.cienega.address}
                        </div>
                      </div>
                    </div>

                    {/* stats */}
                    <div
                      className="rc-grid-4"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: 1,
                        background: SAND,
                        border: `1px solid ${SAND}`,
                        marginBottom: 40,
                      }}
                    >
                      {t.parks.stats.map((s, i) => (
                        <div
                          key={i}
                          style={{ background: "#fff", padding: "28px 24px" }}
                        >
                          <div
                            style={{
                              fontSize: 38,
                              fontWeight: 500,
                              letterSpacing: -1.8,
                              lineHeight: 1,
                              color: INK,
                            }}
                          >
                            {s.value}
                          </div>
                          <div
                            style={{
                              marginTop: 10,
                              fontSize: 13.5,
                              color: "rgba(10,10,10,0.55)",
                              lineHeight: 1.4,
                            }}
                          >
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* amenities */}
                    <div style={sectionLabel}>{t.parks.amenitiesLabel}</div>
                    <div
                      className="rc-grid-3"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 1,
                        background: SAND,
                        border: `1px solid ${SAND}`,
                        marginBottom: 44,
                      }}
                    >
                      {t.parks.amenities.map((a, i) => (
                        <div
                          key={i}
                          className="amenity"
                          style={{
                            background: "#fff",
                            padding: "26px 24px",
                            minHeight: 150,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: CYAN,
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h4
                              style={{
                                fontSize: 18,
                                fontWeight: 500,
                                lineHeight: 1.2,
                                letterSpacing: -0.3,
                              }}
                            >
                              {a.title}
                            </h4>
                            <p
                              style={{
                                marginTop: 8,
                                fontSize: 13.5,
                                lineHeight: 1.45,
                                color: "rgba(10,10,10,0.5)",
                              }}
                            >
                              {a.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ubicacion */}
                    <div style={sectionLabel}>{t.parks.locationLabel}</div>
                    <div
                      className="rc-grid-3"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 12,
                        marginBottom: 24,
                      }}
                    >
                      {t.parks.fronteras.map((f, i) => (
                        <div
                          key={i}
                          style={{
                            border: `1px solid ${SAND}`,
                            borderRadius: 4,
                            padding: "18px 22px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: 11,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                color: "rgba(10,10,10,0.45)",
                              }}
                            >
                              {t.parks.borderLabel}
                            </div>
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 500,
                                marginTop: 3,
                              }}
                            >
                              {f.name}
                            </div>
                          </div>
                          <div
                            style={{
                              fontSize: 21,
                              fontWeight: 500,
                              color: CYAN,
                              letterSpacing: -1,
                            }}
                          >
                            {f.km}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="rc-2col"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.05fr 0.95fr",
                        gap: 40,
                        alignItems: "start",
                      }}
                    >
                      <div
                        style={{
                          border: `1px solid ${SAND}`,
                          borderRadius: 5,
                          overflow: "hidden",
                          background: SAND,
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={ASSETS.map}
                          alt={t.parks.locationLabel}
                          style={{ width: "100%", display: "block" }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            borderBottom: `1px solid ${SAND}`,
                            marginBottom: 8,
                          }}
                        >
                          {LOC_KEYS.map((key, i) => {
                            const on = key === locTab;
                            return (
                              <button
                                key={key}
                                onClick={() => setLocTab(key)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  fontFamily: "inherit",
                                  fontSize: 14.5,
                                  padding: "12px 4px",
                                  marginRight: 16,
                                  color: on ? INK : "rgba(10,10,10,0.45)",
                                  fontWeight: on ? 500 : 400,
                                  borderBottom: `2px solid ${on ? CYAN : "transparent"}`,
                                }}
                              >
                                {t.parks.locTabs[i]}
                              </button>
                            );
                          })}
                        </div>
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {t.parks.locData[locTab].map((i, idx) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 14,
                                padding: "14px 0",
                                borderBottom: "1px solid #F0EFEC",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 14,
                                }}
                              >
                                {i.num && (
                                  <span
                                    style={{
                                      width: 28,
                                      height: 28,
                                      borderRadius: "50%",
                                      border: `1px solid ${INK}`,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 12,
                                      fontWeight: 500,
                                      fontVariantNumeric: "tabular-nums",
                                      flex: "none",
                                    }}
                                  >
                                    {i.num}
                                  </span>
                                )}
                                <span
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 500,
                                    letterSpacing: -0.2,
                                  }}
                                >
                                  {i.name}
                                </span>
                              </div>
                              <span
                                style={{
                                  fontSize: 15,
                                  fontWeight: 500,
                                  color: CYAN,
                                  fontVariantNumeric: "tabular-nums",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {i.km}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: 12,
                            marginTop: 28,
                          }}
                        >
                          {t.parks.prox.map((p, i) => (
                            <div key={i} style={proxCard}>
                              <div style={proxNum}>{p.value}</div>
                              <div style={proxLabel}>{p.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upcoming dev */}
                {isUpcomingDev && (
                  <div
                    style={{
                      border: "1px dashed rgba(255,255,255,0.18)",
                      borderRadius: 6,
                      padding: "80px 48px",
                      textAlign: "center",
                      background: UPCOMING_GRADIENTS[activeDev.key],
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 11.5,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: CYAN,
                        background: "rgba(78,191,224,0.15)",
                        padding: "7px 16px",
                        borderRadius: 100,
                        fontWeight: 500,
                      }}
                    >
                      {t.parks.comingSoon}
                    </span>
                    <h3
                      style={{
                        marginTop: 24,
                        fontSize: 36,
                        fontWeight: 500,
                        letterSpacing: -1.2,
                        color: "#fff",
                      }}
                    >
                      RC Parks {activeDev.short}
                    </h3>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 17,
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      {activeDev.loc}
                    </p>
                    <p
                      style={{
                        margin: "20px auto 0",
                        fontSize: 16,
                        color: "rgba(255,255,255,0.6)",
                        maxWidth: 440,
                        lineHeight: 1.55,
                      }}
                    >
                      {t.parks.upcoming.desc}
                    </p>
                    <a
                      href="#contacto"
                      className="btn-dark"
                      style={{
                        display: "inline-block",
                        marginTop: 28,
                        background: "#fff",
                        color: INK,
                        textDecoration: "none",
                        fontSize: 15,
                        fontWeight: 500,
                        padding: "14px 30px",
                        borderRadius: 2,
                      }}
                    >
                      {t.parks.upcoming.cta}
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* BUILT TO SUIT */}
            {isBuilt && (
              <div
                className="rc-2col"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 56,
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={unitEyebrow}>{t.built.eyebrow}</span>
                  <h3
                    style={{
                      marginTop: 12,
                      fontSize: 34,
                      fontWeight: 500,
                      letterSpacing: -1.1,
                      lineHeight: 1.08,
                    }}
                  >
                    {t.built.title}
                  </h3>
                  <p style={builtParagraph}>{t.built.p1}</p>
                  <p style={{ ...builtParagraph, marginTop: 18 }}>
                    {t.built.p2}
                  </p>
                  <div
                    style={{
                      marginTop: 36,
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <a
                      href="#contacto"
                      className="btn-dark"
                      style={{
                        background: INK,
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: 15,
                        fontWeight: 500,
                        padding: "15px 30px",
                        borderRadius: 2,
                      }}
                    >
                      {t.built.cta}
                    </a>
                  </div>
                </div>
                <div style={{ borderRadius: 5, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.renderEntrance}
                    alt={t.built.title}
                    style={{
                      width: "100%",
                      height: 460,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            )}

            {/* INMOBILIARIO */}
            {isInmo && (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    flexWrap: "wrap",
                    gap: 20,
                    marginBottom: 36,
                  }}
                >
                  <div>
                    <span style={unitEyebrow}>{t.inmo.eyebrow}</span>
                    <h3 style={unitTitle}>{t.inmo.title}</h3>
                  </div>
                  <p style={unitLede}>{t.inmo.lede}</p>
                </div>
                <div
                  className="rc-grid-3"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 16,
                  }}
                >
                  {t.inmo.items.map((b, i) => (
                    <div
                      key={i}
                      className="card-inmo"
                      style={{
                        border: `1px solid ${SAND}`,
                        borderRadius: 6,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div
                        style={{
                          background: INK,
                          color: "#fff",
                          padding: "26px 26px 22px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: CYAN,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 11,
                              letterSpacing: 1.5,
                              textTransform: "uppercase",
                              color: CYAN,
                              fontWeight: 500,
                            }}
                          >
                            {b.status}
                          </span>
                        </div>
                        <h4
                          style={{
                            marginTop: 16,
                            fontSize: 24,
                            fontWeight: 500,
                            letterSpacing: -0.6,
                          }}
                        >
                          {b.name}
                        </h4>
                        <div
                          style={{
                            marginTop: 6,
                            fontSize: 30,
                            fontWeight: 500,
                            letterSpacing: -1.4,
                            color: "#fff",
                          }}
                        >
                          {b.m2}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "24px 26px",
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14.5,
                            lineHeight: 1.55,
                            color: "rgba(10,10,10,0.6)",
                          }}
                        >
                          {b.desc}
                        </p>
                        <a
                          href="#contacto"
                          className="link-cyan"
                          style={{
                            marginTop: 22,
                            fontSize: 14,
                            fontWeight: 500,
                            color: INK,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          {t.inmo.cardCta}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="rc-sec"
        style={{ background: "#000", padding: "130px 0" }}
      >
        <div
          className="rc-wrap rc-2col"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
          }}
        >
          <div data-reveal="true">
            <span
              style={{
                fontSize: 12.5,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: CYAN,
                fontWeight: 500,
              }}
            >
              {t.contact.eyebrow}
            </span>
            <h2
              className="rc-h2"
              style={{
                marginTop: 20,
                fontSize: 50,
                lineHeight: 1.04,
                fontWeight: 500,
                letterSpacing: -2,
                color: "#fff",
                textWrap: "balance",
              }}
            >
              {t.contact.heading}
            </h2>
            <p
              style={{
                marginTop: 26,
                fontSize: 19,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.65)",
                maxWidth: 440,
                textWrap: "pretty",
              }}
            >
              {t.contact.desc}
            </p>
            <div
              style={{
                marginTop: 48,
                display: "flex",
                flexDirection: "column",
                gap: 26,
              }}
            >
              <a
                href="mailto:contacto@rc-parks.com"
                className="link-cyan"
                style={contactLink}
              >
                <span style={contactLabel}>{t.contact.emailLabel}</span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                  contacto@rc-parks.com
                </span>
              </a>
              <a
                href="https://wa.me/528100000000"
                className="link-cyan"
                style={contactLink}
              >
                <span style={contactLabel}>{t.contact.phoneLabel}</span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                  +52 81 0000 0000
                </span>
              </a>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span style={contactLabel}>{t.contact.addressLabel}</span>
                <span
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.45,
                  }}
                >
                  {t.contact.addressLine1}
                  <br />
                  {t.contact.addressLine2}
                </span>
              </div>
            </div>
          </div>

          <LeadForm form={t.contact.form} revealDelay={100} />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: INK,
          color: "#fff",
          padding: "72px 0 48px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="rc-wrap"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.logoSquare}
              alt="R.C. Desarrollos"
              style={{
                width: 64,
                height: 64,
                borderRadius: 4,
                display: "block",
              }}
            />
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 360,
                lineHeight: 1.55,
                marginTop: 2,
              }}
            >
              {t.footer.desc}
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <a
              href="mailto:contacto@rc-parks.com"
              className="link-cyan"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: 17,
                fontWeight: 500,
              }}
            >
              contacto@rc-parks.com
            </a>
            <p
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              rc-parks.com
            </p>
          </div>
        </div>
        <div
          className="rc-wrap"
          style={{
            maxWidth: 1400,
            margin: "44px auto 0",
            padding: "24px 40px 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          {t.footer.copyright}
        </div>
      </footer>
    </div>
  );
}

/* ---- reusable lead-capture form (light panel) ---- */

function LeadForm({
  form,
  revealDelay,
}: {
  form: Content["contact"]["form"];
  revealDelay?: number;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [sentName, setSentName] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name =
      (fd.get("nombre") || "").toString().trim().split(" ")[0] || "";
    setSubmitted(true);
    setSentName(name);
  };

  const reveal =
    revealDelay !== undefined
      ? { "data-reveal": "true", "data-delay": String(revealDelay) }
      : {};

  return (
    <div
      {...reveal}
      style={{ background: "#fff", color: INK, padding: 48, borderRadius: 4 }}
    >
      {submitted ? (
        <div
          style={{
            minHeight: 440,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <span
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: CYAN,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: INK,
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            ✓
          </span>
          <h3 style={{ fontSize: 28, fontWeight: 500, letterSpacing: -0.6 }}>
            {form.successPrefix}
            {sentName ? `, ${sentName}` : ""}!
          </h3>
          <p
            style={{
              fontSize: 16,
              color: "rgba(10,10,10,0.6)",
              lineHeight: 1.55,
            }}
          >
            {form.successText}
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 22 }}
        >
          <div style={fieldWrap}>
            <label style={fieldLabel}>{form.name}</label>
            <input
              name="nombre"
              required
              placeholder={form.namePh}
              className="field"
              style={fieldInput}
            />
          </div>
          <div style={fieldWrap}>
            <label style={fieldLabel}>{form.company}</label>
            <input
              name="empresa"
              placeholder={form.companyPh}
              className="field"
              style={fieldInput}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 22,
            }}
          >
            <div style={fieldWrap}>
              <label style={fieldLabel}>{form.email}</label>
              <input
                name="email"
                type="email"
                required
                placeholder={form.emailPh}
                className="field"
                style={fieldInput}
              />
            </div>
            <div style={fieldWrap}>
              <label style={fieldLabel}>{form.phone}</label>
              <input
                name="telefono"
                placeholder={form.phonePh}
                className="field"
                style={fieldInput}
              />
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={fieldLabel}>{form.msg}</label>
            <textarea
              name="mensaje"
              rows={3}
              placeholder={form.msgPh}
              className="field"
              style={{ ...fieldInput, resize: "none" }}
            />
          </div>
          <button
            type="submit"
            className="btn-cyan"
            style={{
              marginTop: 10,
              background: CYAN,
              color: INK,
              border: "none",
              fontSize: 16,
              fontWeight: 500,
              padding: 17,
              borderRadius: 2,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {form.submit}
          </button>
        </form>
      )}
    </div>
  );
}

/* ---- shared style fragments ---- */

const navLink: React.CSSProperties = {
  textDecoration: "none",
  color: INK,
  fontSize: 14.5,
  opacity: 0.72,
};

const heroPrimary: React.CSSProperties = {
  background: INK,
  color: "#fff",
  textDecoration: "none",
  fontSize: 16,
  fontWeight: 500,
  padding: "17px 34px",
  borderRadius: 2,
};

const heroOutline: React.CSSProperties = {
  border: "1px solid rgba(10,10,10,0.25)",
  color: INK,
  textDecoration: "none",
  fontSize: 16,
  padding: "17px 34px",
  borderRadius: 2,
};

const sobreParagraph: React.CSSProperties = {
  marginTop: 30,
  fontSize: 19,
  lineHeight: 1.65,
  color: "rgba(255,255,255,0.72)",
  textWrap: "pretty",
};

const sobreMetaLabel: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
};

const sobreMetaValue: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 500,
  marginTop: 6,
  letterSpacing: -0.5,
};

const unitEyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: CYAN,
  fontWeight: 500,
};

const unitTitle: React.CSSProperties = {
  marginTop: 10,
  fontSize: 32,
  fontWeight: 500,
  letterSpacing: -1,
  lineHeight: 1.05,
};

const unitLede: React.CSSProperties = {
  fontSize: 15,
  color: "rgba(10,10,10,0.55)",
  maxWidth: 340,
  lineHeight: 1.5,
};

const builtParagraph: React.CSSProperties = {
  marginTop: 24,
  fontSize: 18,
  lineHeight: 1.65,
  color: "rgba(10,10,10,0.7)",
  textWrap: "pretty",
};

const sectionLabel: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "rgba(10,10,10,0.45)",
  fontWeight: 500,
  marginBottom: 20,
};

const proxCard: React.CSSProperties = {
  background: INK,
  color: "#fff",
  borderRadius: 4,
  padding: "22px 24px",
};

const proxNum: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 500,
  letterSpacing: -1.3,
  color: CYAN,
};

const proxLabel: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(255,255,255,0.7)",
  marginTop: 6,
};

const contactLink: React.CSSProperties = {
  textDecoration: "none",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: 5,
};

const contactLabel: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
};

const fieldWrap: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const fieldLabel: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: 0.5,
  color: "rgba(10,10,10,0.55)",
};

const fieldInput: React.CSSProperties = {
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(10,10,10,0.2)",
  color: INK,
  fontSize: 16,
  padding: "10px 0",
  outline: "none",
  fontFamily: "inherit",
};
