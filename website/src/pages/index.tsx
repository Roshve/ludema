import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import styles from "./index.module.css";

const APP_URL = "https://roshve.github.io/ludema/";

interface Materia {
  name: string;
  description: string;
  link: string | null;
  status: "disponible" | "próximamente";
  accent: string;
}

const MATERIAS: Materia[] = [
  {
    name: "Lógica",
    description:
      "Lógica proposicional · Tablas de verdad · Leyes lógicas · Cuantificadores · Inferencia",
    link: "/logica/intro",
    status: "disponible",
    accent: "#2563eb",
  },
  {
    name: "Álgebra",
    description: "Estructuras algebraicas · Matrices · Sistemas de ecuaciones",
    link: null,
    status: "próximamente",
    accent: "#7c3aed",
  },
  {
    name: "Análisis",
    description: "Límites · Derivadas · Integrales · Series",
    link: null,
    status: "próximamente",
    accent: "#06b6d4",
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
          <h1 className={styles.heroTitle}>Ludema</h1>
          <p className={styles.heroTagline}>{siteConfig.tagline}</p>
          <p className={styles.heroSub}>
            Una plataforma estilo Duolingo para aprender cualquier materia
            universitaria jugando. La <strong>Lógica</strong> es la primera
            materia — y hay mucho más por venir.
          </p>
          <div className={styles.heroCtas}>
            <Link
              className={`button button--primary button--lg ${styles.ctaPrimary}`}
              to="/proyecto/intro"
            >
              Explorar el proyecto
            </Link>
            <Link
              className={`button button--secondary button--lg`}
              href={APP_URL}
            >
              Ir a la app →
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
            {MATERIAS.map((m) => (
              <div
                key={m.name}
                className={`${styles.materiaCard} ${
                  m.status !== "disponible" ? styles.materiaCardSoon : ""
                }`}
              >
                <div
                  className={styles.materiaStripe}
                  style={{ backgroundColor: m.accent }}
                />
                <div className={styles.materiaBody}>
                  <h3 className={styles.materiaName}>{m.name}</h3>
                  <p className={styles.materiaDesc}>{m.description}</p>
                  {m.status === "disponible" && m.link ? (
                    <Link to={m.link} className={styles.materiaLink}>
                      Ver guía →
                    </Link>
                  ) : (
                    <span className={styles.comingSoon}>Próximamente</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className={styles.features}>
          {[
            {
              emoji: "🎮",
              title: "Gamificada",
              desc: "Corazones, XP, rachas diarias y niveles. Aprendé sin darte cuenta.",
            },
            {
              emoji: "🧠",
              title: "Validación automática",
              desc: "Las respuestas se corrigen en el momento — sin esperar correcciones manuales.",
            },
            {
              emoji: "📴",
              title: "Sin cuenta, sin backend",
              desc: "Todo el progreso vive en tu dispositivo. Nada que instalar, nada que registrarse.",
            },
          ].map((f) => (
            <div key={f.title} className={styles.feature}>
              <span className={styles.featureEmoji}>{f.emoji}</span>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </section>
      </main>
    </Layout>
  );
}
