"use client";

import { useEffect, useState } from "react";

/*
 * Asset paths are centralised here. They currently point at brand-matched SVG
 * placeholders because the original high-resolution assets (multi-megabyte,
 * e.g. the 8413×3246 logo) exceed the 256 KiB Claude Design sync cap and could
 * not be pulled intact. To use the real artwork, drop the files into
 * `public/assets/` and point each entry below at the real filename.
 */
const ASSETS = {
  logoHeader: "/assets/logo-header.svg", // real: /assets/logo-header.png
  logoSquare: "/assets/logo-square.svg", // real: /assets/logo-square.png
  hero: "/assets/hero-park.svg", // real: /assets/hero-park.jpg
  renderAerial: "/assets/render-aerial.svg", // real: /assets/render-aerial.png
  renderEntrance: "/assets/render-entrance.svg", // real: /assets/render-entrance.png
  map: "/mapa-rc-parks.webp",
};

const CYAN = "#4EBFE0";
const INK = "#0A0A0A";
const SAND = "#E8E6E4";

type UnitKey = "parks" | "built" | "inmobiliario";
type DevKey = "cienega" | "pesqueria" | "santacatarina" | "juarez" | "suazua";
type LocKey = "empresas" | "aeropuertos" | "accesos" | "ferrocarriles";

const MARQUEE_WORDS = [
  "Triple A",
  "Manufactura inteligente",
  "Almacenamiento",
  "4,500 KWa",
  "Built to Suit",
  "Bodegas de concreto",
  "Logística",
  "Ciénega de Flores",
  "Monterrey · Texas",
];

const UNIT_DEFS: { key: UnitKey; name: string; tag: string; desc: string }[] = [
  {
    key: "parks",
    name: "RC Parks",
    tag: "Parques industriales",
    desc: "Desarrollo y operación de parques industriales Triple A.",
  },
  {
    key: "built",
    name: "RC Built to Suit",
    tag: "Construcción a la medida",
    desc: "Diseño y construcción de naves industriales a la medida.",
  },
  {
    key: "inmobiliario",
    name: "RC Inmobiliario",
    tag: "Espacios disponibles",
    desc: "Bodegas y espacios industriales en renta inmediata.",
  },
];

const DEV_DEFS: {
  key: DevKey;
  short: string;
  loc: string;
  status: string;
  upcoming: boolean;
}[] = [
  {
    key: "cienega",
    short: "Ciénega de Flores",
    loc: "Ciénega de Flores, N.L.",
    status: "En desarrollo",
    upcoming: false,
  },
  {
    key: "pesqueria",
    short: "Pesquería",
    loc: "Pesquería, N.L.",
    status: "Próximamente",
    upcoming: true,
  },
  {
    key: "santacatarina",
    short: "Santa Catarina",
    loc: "Santa Catarina, N.L.",
    status: "Próximamente",
    upcoming: true,
  },
  {
    key: "juarez",
    short: "Juárez",
    loc: "Cd. Juárez, Chih.",
    status: "Próximamente",
    upcoming: true,
  },
  {
    key: "suazua",
    short: "Suázua",
    loc: "Suázua, N.L.",
    status: "Próximamente",
    upcoming: true,
  },
];

const LOC_DEFS: { key: LocKey; label: string }[] = [
  { key: "empresas", label: "Empresas" },
  { key: "aeropuertos", label: "Aeropuertos" },
  { key: "accesos", label: "Accesos" },
  { key: "ferrocarriles", label: "Ferrocarriles" },
];

const LOC_DATA: Record<LocKey, { num: string; name: string; km: string }[]> = {
  empresas: [
    { num: "01", name: "Lego", km: "14.6 km" },
    { num: "02", name: "Volvo", km: "5.2 km" },
    { num: "03", name: "Ternium Pesquería", km: "26 km" },
    { num: "04", name: "Ternium Planos", km: "24 km" },
    { num: "05", name: "Ternium Largos", km: "19 km" },
    { num: "06", name: "Kia Plant", km: "25 km" },
  ],
  aeropuertos: [
    { num: "", name: "Aeropuerto Int. del Norte", km: "18 km" },
    {
      num: "",
      name: "Aeropuerto Int. de Monterrey · Mariano Escobedo",
      km: "32 km",
    },
  ],
  accesos: [
    { num: "", name: "Autopista MTY – Reynosa", km: "232 km" },
    { num: "", name: "Autopista MTY – Laredo", km: "201 km" },
    { num: "", name: "Autopista MTY – Saltillo", km: "106 km" },
  ],
  ferrocarriles: [
    { num: "", name: "Ferromex", km: "Directo" },
    { num: "", name: "Kansas City Southern", km: "Directo" },
  ],
};

const STATS = [
  { value: "100,000", label: "m² · Área total del parque" },
  { value: "65,000", label: "m² · Área arrendable" },
  { value: "4,500", label: "KWa · Disponibilidad energética" },
  { value: "+200,000", label: "Casas habitación alrededor" },
];

const AMENITIES = [
  {
    num: "01",
    title: "Caseta de vigilancia 24/7",
    desc: "Seguridad permanente y acceso controlado al parque.",
  },
  {
    num: "02",
    title: "Oficinas con salas de juntas",
    desc: "Espacios corporativos listos para operar.",
  },
  {
    num: "03",
    title: "Bodegas Triple A / AAA",
    desc: "Construcción de concreto de la más alta especificación.",
  },
  {
    num: "04",
    title: "Planta de CFE frente al parque",
    desc: "Subestación dedicada con energía de alta capacidad.",
  },
  {
    num: "05",
    title: "Rampas neumáticas",
    desc: "Andenes diseñados para carga y descarga eficiente.",
  },
  {
    num: "06",
    title: "+200,000 casas alrededor",
    desc: "Disponibilidad inmediata de mano de obra calificada.",
  },
];

const FRONTERAS = [
  { name: "Puente Colombia", km: "230 km" },
  { name: "Pharr, Texas", km: "190 km" },
  { name: "Reynosa", km: "232 km" },
];

const BODEGAS = [
  {
    name: "Bodega 1",
    m2: "12,500 m²",
    status: "Disponible",
    desc: "Nave Triple A con andenes, oficinas y patio de maniobras.",
  },
  {
    name: "Bodega 2",
    m2: "18,000 m²",
    status: "Disponible",
    desc: "Espacio modular con energía dedicada y opción de expansión.",
  },
  {
    name: "Bodega 3",
    m2: "24,000 m²",
    status: "Disponible",
    desc: "Nave para manufactura de gran escala, lista para operar.",
  },
];

export default function Page() {
  const [unit, setUnit] = useState<UnitKey>("parks");
  const [dev, setDev] = useState<DevKey>("cienega");
  const [locTab, setLocTab] = useState<LocKey>("empresas");

  // Scroll-reveal: fade+rise elements marked [data-reveal] as they enter view.
  // Re-runs when panel content changes so newly mounted nodes get observed.
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
          <nav style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <a href="#sobre" style={navLink}>
              Nosotros
            </a>
            <a href="#unidades" style={navLink}>
              Unidades de negocio
            </a>
            <a href="#contacto" style={navLink}>
              Contacto
            </a>
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
              Solicitar espacio
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "0.92fr 1.08fr",
              gap: 0,
              alignItems: "stretch",
              minHeight: "calc(100vh - 92px)",
            }}
          >
            <div
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
                  Desarrollos industriales · Noreste de México
                </span>
              </div>
              <h1
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
                Desarrollamos el <span style={{ color: CYAN }}>futuro</span>{" "}
                industrial.
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
                En R.C. Desarrollos diseñamos, construimos y operamos parques
                industriales Triple A. Infraestructura de clase mundial para la
                nueva era de manufactura y almacenamiento en el Noreste de
                México y Texas.
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
                  Solicitar un espacio
                </a>
                <a href="#unidades" className="btn-outline" style={heroOutline}>
                  Unidades de negocio
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 40,
                  marginTop: 56,
                  flexWrap: "wrap",
                  animation: "fadeUp 1.1s ease 0.24s both",
                }}
              >
                <div>
                  <div style={heroStatNum}>100,000 m²</div>
                  <div style={heroStatLabel}>Área total del parque</div>
                </div>
                <div style={{ width: 1, background: SAND }} />
                <div>
                  <div style={heroStatNum}>4,500 KWa</div>
                  <div style={heroStatLabel}>Disponibilidad energética</div>
                </div>
              </div>
            </div>
            <div
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
                alt="Parque Ciénega de Flores"
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
              <div
                style={{
                  position: "absolute",
                  left: 28,
                  bottom: 28,
                  background: "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  borderRadius: 3,
                  padding: "20px 26px",
                  maxWidth: 300,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    marginBottom: 8,
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
                      fontSize: 11.5,
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      color: "rgba(10,10,10,0.55)",
                      fontWeight: 500,
                    }}
                  >
                    Proyecto actual
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: INK,
                    lineHeight: 1.3,
                    letterSpacing: -0.3,
                  }}
                >
                  Parque Ciénega de Flores — bodegas Triple A en desarrollo.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        style={{
          background: INK,
          color: "#fff",
          overflow: "hidden",
          whiteSpace: "nowrap",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "marquee 30s linear infinite",
            willChange: "transform",
          }}
        >
          {[0, 1].map((rail) => (
            <span
              key={rail}
              style={{ display: "inline-block", padding: "18px 0" }}
              aria-hidden={rail === 1 ? true : undefined}
            >
              {MARQUEE_WORDS.map((w, i) => (
                <span key={i}>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {w}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: CYAN,
                      margin: "0 28px",
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE */}
      <section id="sobre" style={{ background: "#fff", padding: "130px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
          <div
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
                Sobre R.C. Desarrollos
              </span>
              <div
                style={{ marginTop: 22, width: 54, height: 2, background: INK }}
              />
            </div>
            <div data-reveal="true" data-delay="120">
              <h2
                style={{
                  fontSize: 46,
                  lineHeight: 1.1,
                  fontWeight: 500,
                  letterSpacing: -1.6,
                  textWrap: "balance",
                }}
              >
                El epicentro de las oportunidades en el sector industrial del
                Noreste de México.
              </h2>
              <p style={sobreParagraph}>
                En R.C. Desarrollos no solo ofrecemos lugares: encarnamos una
                visión sólida y un compromiso con la excelencia. Diseñamos,
                construimos y operamos infraestructura industrial de clase
                mundial, representando oportunidades para el crecimiento y el
                éxito empresarial.
              </p>
              <p style={{ ...sobreParagraph, marginTop: 20 }}>
                Combinamos infraestructura, ubicación y asesoría para el éxito de
                nuestros clientes, generando un impacto positivo en el desarrollo
                económico y social de la región.
              </p>
              <div
                style={{
                  marginTop: 44,
                  display: "flex",
                  gap: 48,
                  flexWrap: "wrap",
                  borderTop: `1px solid ${SAND}`,
                  paddingTop: 30,
                }}
              >
                <div>
                  <div style={sobreMetaLabel}>Fundación</div>
                  <div style={sobreMetaValue}>2024</div>
                </div>
                <div>
                  <div style={sobreMetaLabel}>Giro</div>
                  <div style={sobreMetaValue}>Parques Industriales</div>
                </div>
                <div>
                  <div style={sobreMetaLabel}>Región</div>
                  <div style={sobreMetaValue}>Noreste de México · Texas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIDADES DE NEGOCIO */}
      <section id="unidades" style={{ background: SAND, padding: "130px 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px" }}>
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
              Unidades de negocio
            </span>
            <h2
              style={{
                marginTop: 18,
                fontSize: 48,
                lineHeight: 1.05,
                fontWeight: 500,
                letterSpacing: -1.6,
                textWrap: "balance",
              }}
            >
              Tres formas de construir tu operación industrial.
            </h2>
          </div>

          {/* unit cards */}
          <div
            data-reveal="true"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 16,
              marginBottom: 16,
            }}
          >
            {UNIT_DEFS.map((u) => {
              const on = u.key === unit;
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
                        color: on ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.5)",
                        fontWeight: 500,
                      }}
                    >
                      {u.tag}
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
                        color: on ? "rgba(255,255,255,0.6)" : "rgba(10,10,10,0.5)",
                      }}
                    >
                      {u.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PANEL */}
          <div
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
                    <span style={unitEyebrow}>RC Parks — Desarrollos</span>
                    <h3 style={unitTitle}>Parques industriales Triple A</h3>
                  </div>
                  <p style={unitLede}>
                    Selecciona un desarrollo para conocer sus detalles. Nuevos
                    parques en camino en todo el Noreste.
                  </p>
                </div>

                {/* dev selector */}
                <div
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
                              background: up ? "#F1F0DA" : CYAN,
                            }}
                          />
                          <span
                            style={{
                              fontSize: 10.5,
                              letterSpacing: 1,
                              textTransform: "uppercase",
                              color: up ? "rgba(255,255,255,0.6)" : CYAN,
                              fontWeight: 500,
                            }}
                          >
                            {d.status}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            lineHeight: 1.2,
                            letterSpacing: -0.3,
                          }}
                        >
                          {d.short}
                        </div>
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
                        alt="Parque Ciénega de Flores"
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
                          En desarrollo · Ciénega de Flores, N.L.
                        </span>
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 500,
                            marginTop: 6,
                            letterSpacing: -0.6,
                          }}
                        >
                          RC Parks Ciénega de Flores
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            color: "rgba(255,255,255,0.75)",
                            marginTop: 4,
                          }}
                        >
                          Ciénega de Flores 405, Predio No. 23, Zona Norte, N.L.
                        </div>
                      </div>
                    </div>

                    {/* stats */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4,1fr)",
                        gap: 1,
                        background: SAND,
                        border: `1px solid ${SAND}`,
                        marginBottom: 40,
                      }}
                    >
                      {STATS.map((s, i) => (
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
                    <div style={sectionLabel}>Amenidades estratégicas</div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 1,
                        background: SAND,
                        border: `1px solid ${SAND}`,
                        marginBottom: 44,
                      }}
                    >
                      {AMENITIES.map((a, i) => (
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
                            {a.num}
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
                    <div style={sectionLabel}>Ubicación estratégica</div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 12,
                        marginBottom: 24,
                      }}
                    >
                      {FRONTERAS.map((f, i) => (
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
                              Frontera
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
                          alt="Mapa de puntos estratégicos"
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
                          {LOC_DEFS.map((t) => {
                            const on = t.key === locTab;
                            return (
                              <button
                                key={t.key}
                                onClick={() => setLocTab(t.key)}
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
                                {t.label}
                              </button>
                            );
                          })}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {LOC_DATA[locTab].map((i, idx) => (
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
                          <div style={proxCard}>
                            <div style={proxNum}>15 min</div>
                            <div style={proxLabel}>
                              del Aeropuerto Int. del Norte
                            </div>
                          </div>
                          <div style={proxCard}>
                            <div style={proxNum}>20 min</div>
                            <div style={proxLabel}>del centro de Nuevo León</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upcoming dev */}
                {isUpcomingDev && (
                  <div
                    style={{
                      border: "1px dashed #C9C7C4",
                      borderRadius: 6,
                      padding: "80px 48px",
                      textAlign: "center",
                      background: "#FAFAF9",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 11.5,
                        letterSpacing: 2,
                        textTransform: "uppercase",
                        color: INK,
                        background: "#F1F0DA",
                        padding: "7px 16px",
                        borderRadius: 100,
                        fontWeight: 500,
                      }}
                    >
                      Próximamente
                    </span>
                    <h3
                      style={{
                        marginTop: 24,
                        fontSize: 36,
                        fontWeight: 500,
                        letterSpacing: -1.2,
                      }}
                    >
                      RC Parks {activeDev.short}
                    </h3>
                    <p
                      style={{
                        marginTop: 12,
                        fontSize: 17,
                        color: "rgba(10,10,10,0.55)",
                      }}
                    >
                      {activeDev.loc}
                    </p>
                    <p
                      style={{
                        margin: "20px auto 0",
                        fontSize: 16,
                        color: "rgba(10,10,10,0.5)",
                        maxWidth: 440,
                        lineHeight: 1.55,
                      }}
                    >
                      Nuevo desarrollo industrial Triple A en planeación. Déjanos
                      tus datos para recibir información en cuanto esté
                      disponible.
                    </p>
                    <a
                      href="#contacto"
                      className="btn-dark"
                      style={{
                        display: "inline-block",
                        marginTop: 28,
                        background: INK,
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: 15,
                        fontWeight: 500,
                        padding: "14px 30px",
                        borderRadius: 2,
                      }}
                    >
                      Recibir información
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* BUILT TO SUIT */}
            {isBuilt && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 56,
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={unitEyebrow}>RC Built to Suit</span>
                  <h3
                    style={{
                      marginTop: 12,
                      fontSize: 34,
                      fontWeight: 500,
                      letterSpacing: -1.1,
                      lineHeight: 1.08,
                    }}
                  >
                    Construcción industrial a la medida.
                  </h3>
                  <p style={builtParagraph}>
                    Especializados en el diseño y la construcción de
                    instalaciones industriales adaptadas a las especificaciones
                    precisas y los requerimientos de cada cliente.
                  </p>
                  <p style={{ ...builtParagraph, marginTop: 18 }}>
                    Colaboramos de la mano con nuestra empresa hermana,{" "}
                    <strong style={{ fontWeight: 500, color: INK }}>
                      GP Construcción
                    </strong>
                    , para garantizar la ejecución impecable de cualquier
                    proyecto, sin importar su complejidad.
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
                      Iniciar un proyecto
                    </a>
                  </div>
                </div>
                <div style={{ borderRadius: 5, overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ASSETS.renderEntrance}
                    alt="Construcción a la medida"
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
                    <span style={unitEyebrow}>RC Inmobiliario</span>
                    <h3 style={unitTitle}>Espacios disponibles</h3>
                  </div>
                  <p style={unitLede}>
                    Bodegas Triple A listas para renta inmediata dentro de
                    nuestros parques.
                  </p>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 16,
                  }}
                >
                  {BODEGAS.map((b, i) => (
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
                          Solicitar ficha técnica →
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
      <section id="contacto" style={{ background: "#000", padding: "130px 0" }}>
        <div
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
              Contacto
            </span>
            <h2
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
              Solicita tu espacio en R.C. Desarrollos.
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
              Déjanos tus datos y un asesor te contactará para conocer tus
              necesidades de espacio, energía y logística.
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
                <span style={contactLabel}>Email</span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                  contacto@rc-parks.com
                </span>
              </a>
              <a
                href="https://wa.me/528100000000"
                className="link-cyan"
                style={contactLink}
              >
                <span style={contactLabel}>Teléfono · WhatsApp</span>
                <span style={{ fontSize: 20, fontWeight: 500 }}>
                  +52 81 0000 0000
                </span>
              </a>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span style={contactLabel}>Dirección</span>
                <span
                  style={{
                    fontSize: 16,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.45,
                  }}
                >
                  Ciénega de Flores 405, Predio No. 23,
                  <br />
                  Zona Norte, N.L. México
                </span>
              </div>
            </div>
          </div>

          <LeadForm revealDelay={100} />
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
              Redefiniendo la logística industrial del Noreste de México y Texas.
              Espacios Triple A para la nueva era de manufactura.
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
          style={{
            maxWidth: 1400,
            margin: "44px auto 0",
            padding: "24px 40px 0",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          © 2026 R.C. Desarrollos. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

/* ---- reusable lead-capture form (dark panel) ---- */

function LeadForm({ revealDelay }: { revealDelay?: number }) {
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
            ¡Gracias{sentName ? `, ${sentName}` : ""}!
          </h3>
          <p
            style={{
              fontSize: 16,
              color: "rgba(10,10,10,0.6)",
              lineHeight: 1.55,
            }}
          >
            Hemos recibido tu solicitud. Un asesor de R.C. Desarrollos te
            contactará muy pronto.
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 22 }}
        >
          <div style={fieldWrap}>
            <label style={fieldLabel}>Nombre completo</label>
            <input
              name="nombre"
              required
              placeholder="Tu nombre"
              className="field"
              style={fieldInput}
            />
          </div>
          <div style={fieldWrap}>
            <label style={fieldLabel}>Empresa</label>
            <input
              name="empresa"
              placeholder="Nombre de tu empresa"
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
              <label style={fieldLabel}>Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="field"
                style={fieldInput}
              />
            </div>
            <div style={fieldWrap}>
              <label style={fieldLabel}>Teléfono</label>
              <input
                name="telefono"
                placeholder="+52"
                className="field"
                style={fieldInput}
              />
            </div>
          </div>
          <div style={fieldWrap}>
            <label style={fieldLabel}>¿Qué espacio buscas?</label>
            <textarea
              name="mensaje"
              rows={3}
              placeholder="m² requeridos, energía, fechas..."
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
            Enviar solicitud
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

const heroStatNum: React.CSSProperties = {
  fontSize: 30,
  fontWeight: 500,
  letterSpacing: -1,
  color: INK,
};

const heroStatLabel: React.CSSProperties = {
  fontSize: 13,
  color: "rgba(10,10,10,0.5)",
  marginTop: 4,
  letterSpacing: 0.3,
};

const sobreParagraph: React.CSSProperties = {
  marginTop: 30,
  fontSize: 19,
  lineHeight: 1.65,
  color: "rgba(10,10,10,0.7)",
  textWrap: "pretty",
};

const sobreMetaLabel: React.CSSProperties = {
  fontSize: 13,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "rgba(10,10,10,0.45)",
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
