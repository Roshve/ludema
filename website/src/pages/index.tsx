import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import {
  Gamepad2,
  Brain,
  WifiOff,
  ArrowRight,
  Workflow,
  Sigma,
  Code2,
  Lock,
  type LucideIcon,
} from "lucide-react";
import styles from "./index.module.css";

const APP_URL = "https://roshve.github.io/ludema/";

interface Materia {
  name: string;
  description: string;
  link: string | null;
  status: "disponible" | "próximamente";
  /** Color primario de acento (hex). */
  accent: string;
  /** Borde inferior más oscuro — efecto 3D Duolingo. */
  accentBorder: string;
  Icon: LucideIcon;
}

// Espeja exactamente SUBJECTS de src/content/subjects.ts de la app.
// accent → hex equivalente a ACCENT[x].bg; accentBorder → un tono -800/-700.
const MATERIAS: Materia[] = [
  {
    name: "Lógica y Estructuras Discretas",
    description: "Proposiciones, tablas de verdad, leyes y razonamientos.",
    link: "/logica/intro",
    status: "disponible",
    accent: "#2563eb",       // blue-600
    accentBorder: "#1e40af", // blue-800
    Icon: Brain,
  },
  {
    name: "Sistemas y Procesos de Negocio",
    description: "Cómo las organizaciones modelan sus sistemas y procesos.",
    link: null,
    status: "próximamente",
    accent: "#06b6d4",       // cyan-500
    accentBorder: "#0e7490", // cyan-700
    Icon: Workflow,
  },
  {
    name: "Álgebra y Geometría Analítica",
    description: "Vectores, matrices, rectas y cónicas paso a paso.",
    link: null,
    status: "próximamente",
    accent: "#7c3aed",       // violet-600
    accentBorder: "#6d28d9", // violet-700
    Icon: Sigma,
  },
  {
    name: "Algoritmos y Estructura de Datos",
    description: "Piensa como programador: algoritmos, listas, pilas y árboles.",
    link: null,
    status: "próximamente",
    accent: "#6366f1",       // indigo-500
    accentBorder: "#4338ca", // indigo-700
    Icon: Code2,
  },
];

interface Feature {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    Icon: Gamepad2,
    title: "Gamificada",
    desc: "Corazones, XP, rachas diarias y niveles. Aprendé sin darte cuenta.",
  },
  {
    Icon: Brain,
    title: "Validación automática",
    desc: "Las respuestas se corrigen en el momento — sin esperar correcciones manuales.",
  },
  {
    Icon: WifiOff,
    title: "Sin cuenta, sin backend",
    desc: "Todo el progreso vive en tu dispositivo. Nada que instalar, nada que registrarse.",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const logoSrc = useBaseUrl("/img/ludema.svg");

  return (
    <Layout title="Inicio" description={siteConfig.tagline}>
      <main>
        {/* ── Hero ── */}
        <section className={styles.hero}>
          <img
            src={logoSrc}
            alt="Ludema"
            className={styles.heroLogo}
            width={96}
            height={96}
          />
          <h1 className={`${styles.heroTitle} heroTitle`}>Ludema</h1>
          <p className={styles.heroTagline}>Gamificá cualquier materia universitaria.</p>
          <p className={styles.heroSub}>
            Estilo Duolingo: corazones, XP, rachas y validación automática.
            Empezá con <strong>Lógica</strong> — sin cuenta, sin instalación.
          </p>
          <div className={styles.heroCtas}>
            <Link
              className={`button button--primary button--lg ${styles.ctaPrimary}`}
              to="/proyecto/intro"
            >
              Explorar el proyecto
            </Link>
            <Link
              className={`button button--secondary button--lg ${styles.ctaSecondary}`}
              href={APP_URL}
            >
              Ir a la app
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* ── Materias ── */}
        <section className={styles.materias}>
          <h2 className={styles.materiasTitle}>Materias</h2>
          <p className={styles.materiasSubtitle}>
            Cada materia es un mundo independiente con su propio currículo gamificado.
          </p>
          <div className={styles.materiasGrid}>
            {MATERIAS.map((m) => {
              // CSS custom props para que icon box / pill / bordes compartan el acento.
              const cssVars = {
                "--accent": m.accent,
                "--accent-border": m.accentBorder,
              } as React.CSSProperties;

              if (m.status !== "disponible" || !m.link) {
                return (
                  <div key={m.name} className={styles.materiaLocked} style={cssVars}>
                    <div className={styles.materiaLockedIconBox}>
                      <m.Icon size={22} strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h3 className={styles.materiaTitle}>{m.name}</h3>
                    <p className={styles.materiaTagline}>{m.description}</p>
                    <div className={styles.materiaLockedLabel}>
                      <Lock size={12} aria-hidden="true" />
                      <span>Próximamente</span>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={m.name}
                  to={m.link}
                  className={styles.materiaCard}
                  style={cssVars}
                >
                  <div className={styles.materiaIconBox}>
                    <m.Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <h3 className={styles.materiaTitle}>{m.name}</h3>
                  <p className={styles.materiaTagline}>{m.description}</p>
                  <span className={styles.materiaPill}>
                    Ver guía
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Features ── */}
        <section className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.feature}>
              <f.Icon
                className={styles.featureIcon}
                size={40}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
