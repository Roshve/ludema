/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Tipos documentados en CONTRIBUTING.md
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "docs",
        "style",
        "refactor",
        "chore",
        "build",
        "ci",
        "test",
        "revert",
      ],
    ],
    // Permite cuerpos de commit largos (descripciones de contenido)
    "body-max-line-length": [1, "always", 200],
    // Permite scope vacío
    "scope-empty": [0],
    // Descripción en minúsculas (estilo del repo)
    "subject-case": [2, "always", "lower-case"],
  },
};
