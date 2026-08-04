export type Lang = "es" | "en";
export type LocKey = "empresas" | "aeropuertos" | "accesos" | "ferrocarriles";

const es = {
  nav: {
    about: "Nosotros",
    units: "Unidades de negocio",
    contact: "Contacto",
    cta: "Solicitar espacio",
  },
  hero: {
    eyebrow: "Desarrolladora Inmobiliaria",
    titleBefore: "Desarrollamos el ",
    titleHighlight: "futuro",
    titleAfter: " industrial.",
    desc: "R.C. Desarrollos es una desarrolladora inmobiliaria que controla el ciclo completo: identificamos la tierra, diseñamos, construimos y operamos.",
    ctaPrimary: "Solicitar un espacio",
    ctaSecondary: "Unidades de negocio",
    projectLabel: "Proyecto actual",
    projectText: "Parque Ciénega de Flores — bodegas Triple A en desarrollo.",
  },
  sobre: {
    eyebrow: "Sobre R.C. Desarrollos",
    heading:
      "El epicentro de las oportunidades en el sector industrial del Noreste de México.",
    p1: "R.C. Desarrollos nace en Nuevo León con una convicción: el crecimiento de la región se sostiene en la infraestructura que se construye hoy. Conocemos el suelo, el mercado y a la gente que lo hace posible, porque es donde vivimos y donde apostamos nuestro capital.",
    p2: "Desarrollamos con visión de largo plazo. Adquirimos la tierra, la diseñamos, la construimos y la operamos.",
    meta: [
      { label: "Años de experiencia", value: "+30 años" },
      { label: "Construcción", value: "+300,000 m²" },
    ],
  },
  units: {
    eyebrow: "Unidades de negocio",
    items: [
      {
        tag: "Parques industriales",
        desc: "Desarrollo y operación de parques industriales Triple A.",
      },
      {
        tag: "Construcción a la medida",
        desc: "Diseño y construcción de naves industriales a la medida.",
      },
      {
        tag: "Espacios disponibles",
        desc: "Bodegas y espacios industriales en renta inmediata.",
      },
    ],
  },
  parks: {
    eyebrow: "RC Parks — Desarrollos",
    title: "Parques industriales Triple A",
    lede: "Selecciona un desarrollo para conocer sus detalles. Nuevos parques en camino en todo el Noreste.",
    comingSoon: "Próximamente",
    cienega: {
      loc: "Ciénega de Flores, N.L.",
      name: "RC Parks Ciénega de Flores",
      address: "Ciénega de Flores 405, Predio No. 23, Zona Norte, N.L.",
    },
    stats: [
      { value: "100,000", label: "m² · Área total del parque" },
      { value: "65,000", label: "m² · Área arrendable" },
      { value: "4,500", label: "KWa · Disponibilidad energética" },
      { value: "+200,000", label: "Casas habitación alrededor" },
    ],
    amenitiesLabel: "Amenidades estratégicas",
    amenities: [
      {
        title: "Caseta de vigilancia 24/7",
        desc: "Seguridad permanente y acceso controlado al parque.",
      },
      {
        title: "Oficinas con salas de juntas",
        desc: "Espacios corporativos listos para operar.",
      },
      {
        title: "Bodegas Triple A / AAA",
        desc: "Construcción de concreto de la más alta especificación.",
      },
      {
        title: "Planta de CFE frente al parque",
        desc: "Subestación dedicada con energía de alta capacidad.",
      },
      {
        title: "Rampas neumáticas",
        desc: "Andenes diseñados para carga y descarga eficiente.",
      },
      {
        title: "+200,000 casas alrededor",
        desc: "Disponibilidad inmediata de mano de obra calificada.",
      },
    ],
    locationLabel: "Ubicación estratégica",
    borderLabel: "Frontera",
    fronteras: [
      { name: "Puente Colombia", km: "230 km" },
      { name: "Pharr, Texas", km: "190 km" },
      { name: "Reynosa", km: "232 km" },
    ],
    locTabs: ["Empresas", "Aeropuertos", "Accesos", "Ferrocarriles"],
    locData: {
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
    },
    prox: [
      { value: "15 min", label: "del Aeropuerto Int. del Norte" },
      { value: "20 min", label: "del centro de Nuevo León" },
    ],
    upcoming: {
      desc: "Nuevo desarrollo industrial Triple A en planeación. Déjanos tus datos para recibir información en cuanto esté disponible.",
      cta: "Recibir información",
    },
  },
  built: {
    eyebrow: "RC Built to Suit",
    title: "Construcción industrial a la medida.",
    p1: "Especializados en el diseño y la construcción de inmuebles industriales ajustados a las especificaciones precisas y los requerimientos particulares de cada cliente.",
    p2: "Ejecutamos con equipo propio, controlando directamente ingeniería, obra y supervisión, para garantizar la entrega de cualquier proyecto sin importar su complejidad.",
    cta: "Iniciar un proyecto",
  },
  inmo: {
    eyebrow: "RC Inmobiliario",
    title: "Espacios disponibles",
    lede: "Bodegas Triple A listas para renta inmediata dentro de nuestros parques.",
    items: [
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
    ],
    cardCta: "Solicitar ficha técnica →",
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Ponte en contacto con nosotros.",
    desc: "Déjanos tus datos y un especialista te contactará.",
    emailLabel: "Email",
    phoneLabel: "Teléfono · WhatsApp",
    addressLabel: "Dirección",
    addressLine1: "Ciénega de Flores 405, Predio No. 23,",
    addressLine2: "Zona Norte, N.L. México",
    form: {
      name: "Nombre completo",
      namePh: "Tu nombre",
      company: "Empresa",
      companyPh: "Nombre de tu empresa",
      email: "Email",
      emailPh: "tu@email.com",
      phone: "Teléfono",
      phonePh: "+52",
      unit: "Unidad de negocio",
      unitPh: "Selecciona una opción",
      unitOptions: [
        "Inventario RC Parks",
        "Built to Suit",
        "Inventario Inmobiliario",
      ],
      msg: "¿Qué espacio buscas?",
      msgPh: "m² requeridos, energía, fechas...",
      submit: "Enviar solicitud",
      successPrefix: "¡Gracias",
      successText:
        "Hemos recibido tu solicitud. Un asesor de R.C. Desarrollos te contactará muy pronto.",
    },
  },
  footer: {
    desc: "Redefiniendo la logística industrial del Noreste de México y Texas. Espacios Triple A para la nueva era de manufactura.",
    copyright: "© 2026 R.C. Desarrollos. Todos los derechos reservados.",
  },
};

export type Content = typeof es;

const en: Content = {
  nav: {
    about: "About",
    units: "Business units",
    contact: "Contact",
    cta: "Request space",
  },
  hero: {
    eyebrow: "Real Estate Developer",
    titleBefore: "We develop the industrial ",
    titleHighlight: "future",
    titleAfter: ".",
    desc: "R.C. Desarrollos is a real estate developer that controls the full cycle: we identify the land, design, build, and operate.",
    ctaPrimary: "Request a space",
    ctaSecondary: "Business units",
    projectLabel: "Current project",
    projectText:
      "Ciénega de Flores Park — Triple A warehouses under development.",
  },
  sobre: {
    eyebrow: "About R.C. Desarrollos",
    heading:
      "The epicenter of opportunity in Northeast Mexico's industrial sector.",
    p1: "R.C. Desarrollos was born in Nuevo León with one conviction: the region's growth rests on the infrastructure built today. We know the land, the market, and the people who make it possible, because this is where we live and where we invest our own capital.",
    p2: "We develop with a long-term vision. We acquire the land, design it, build it, and operate it.",
    meta: [
      { label: "Years of experience", value: "+30 years" },
      { label: "Construction", value: "+300,000 m²" },
    ],
  },
  units: {
    eyebrow: "Business units",
    items: [
      {
        tag: "Industrial parks",
        desc: "Development and operation of Triple A industrial parks.",
      },
      {
        tag: "Build to suit",
        desc: "Design and construction of custom industrial buildings.",
      },
      {
        tag: "Available spaces",
        desc: "Warehouses and industrial spaces for immediate lease.",
      },
    ],
  },
  parks: {
    eyebrow: "RC Parks — Developments",
    title: "Triple A industrial parks",
    lede: "Select a development to see its details. New parks on the way across the Northeast.",
    comingSoon: "Coming soon",
    cienega: {
      loc: "Ciénega de Flores, N.L.",
      name: "RC Parks Ciénega de Flores",
      address: "Ciénega de Flores 405, Predio No. 23, Zona Norte, N.L.",
    },
    stats: [
      { value: "100,000", label: "m² · Total park area" },
      { value: "65,000", label: "m² · Leasable area" },
      { value: "4,500", label: "KWa · Power availability" },
      { value: "+200,000", label: "Households nearby" },
    ],
    amenitiesLabel: "Strategic amenities",
    amenities: [
      {
        title: "24/7 security booth",
        desc: "Round-the-clock security and controlled park access.",
      },
      {
        title: "Offices with meeting rooms",
        desc: "Corporate spaces ready to operate.",
      },
      {
        title: "Triple A / AAA warehouses",
        desc: "Concrete construction of the highest specification.",
      },
      {
        title: "CFE plant facing the park",
        desc: "Dedicated substation with high-capacity power.",
      },
      {
        title: "Pneumatic ramps",
        desc: "Docks designed for efficient loading and unloading.",
      },
      {
        title: "+200,000 homes nearby",
        desc: "Immediate availability of skilled labor.",
      },
    ],
    locationLabel: "Strategic location",
    borderLabel: "Border",
    fronteras: [
      { name: "Puente Colombia", km: "230 km" },
      { name: "Pharr, Texas", km: "190 km" },
      { name: "Reynosa", km: "232 km" },
    ],
    locTabs: ["Companies", "Airports", "Highways", "Railroads"],
    locData: {
      empresas: [
        { num: "01", name: "Lego", km: "14.6 km" },
        { num: "02", name: "Volvo", km: "5.2 km" },
        { num: "03", name: "Ternium Pesquería", km: "26 km" },
        { num: "04", name: "Ternium Planos", km: "24 km" },
        { num: "05", name: "Ternium Largos", km: "19 km" },
        { num: "06", name: "Kia Plant", km: "25 km" },
      ],
      aeropuertos: [
        { num: "", name: "North Int'l Airport", km: "18 km" },
        {
          num: "",
          name: "Monterrey Int'l Airport · Mariano Escobedo",
          km: "32 km",
        },
      ],
      accesos: [
        { num: "", name: "MTY – Reynosa Highway", km: "232 km" },
        { num: "", name: "MTY – Laredo Highway", km: "201 km" },
        { num: "", name: "MTY – Saltillo Highway", km: "106 km" },
      ],
      ferrocarriles: [
        { num: "", name: "Ferromex", km: "Direct" },
        { num: "", name: "Kansas City Southern", km: "Direct" },
      ],
    },
    prox: [
      { value: "15 min", label: "from the North Int'l Airport" },
      { value: "20 min", label: "from downtown Nuevo León" },
    ],
    upcoming: {
      desc: "New Triple A industrial development in planning. Leave your details to receive information as soon as it's available.",
      cta: "Get information",
    },
  },
  built: {
    eyebrow: "RC Built to Suit",
    title: "Custom industrial construction.",
    p1: "Specialized in the design and construction of industrial buildings tailored to the precise specifications and particular requirements of each client.",
    p2: "We execute with our own team, directly controlling engineering, construction, and supervision, to guarantee the delivery of any project no matter its complexity.",
    cta: "Start a project",
  },
  inmo: {
    eyebrow: "RC Inmobiliario",
    title: "Available spaces",
    lede: "Triple A warehouses ready for immediate lease within our parks.",
    items: [
      {
        name: "Warehouse 1",
        m2: "12,500 m²",
        status: "Available",
        desc: "Triple A building with docks, offices, and a maneuvering yard.",
      },
      {
        name: "Warehouse 2",
        m2: "18,000 m²",
        status: "Available",
        desc: "Modular space with dedicated power and an expansion option.",
      },
      {
        name: "Warehouse 3",
        m2: "24,000 m²",
        status: "Available",
        desc: "Large-scale manufacturing building, ready to operate.",
      },
    ],
    cardCta: "Request spec sheet →",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Get in touch with us.",
    desc: "Leave your details and a specialist will contact you.",
    emailLabel: "Email",
    phoneLabel: "Phone · WhatsApp",
    addressLabel: "Address",
    addressLine1: "Ciénega de Flores 405, Predio No. 23,",
    addressLine2: "Zona Norte, N.L. Mexico",
    form: {
      name: "Full name",
      namePh: "Your name",
      company: "Company",
      companyPh: "Your company name",
      email: "Email",
      emailPh: "you@email.com",
      phone: "Phone",
      phonePh: "+52",
      unit: "Business unit",
      unitPh: "Select an option",
      unitOptions: [
        "RC Parks Inventory",
        "Built to Suit",
        "Real Estate Inventory",
      ],
      msg: "What space are you looking for?",
      msgPh: "Required m², power, dates...",
      submit: "Send request",
      successPrefix: "Thank you",
      successText:
        "We've received your request. An R.C. Desarrollos advisor will contact you very soon.",
    },
  },
  footer: {
    desc: "Redefining industrial logistics across Northeast Mexico and Texas. Triple A spaces for the new era of manufacturing.",
    copyright: "© 2026 R.C. Desarrollos. All rights reserved.",
  },
};

export const content: Record<Lang, Content> = { es, en };
