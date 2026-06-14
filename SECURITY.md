# Política de Seguridad

## Contexto

**Ludema es una aplicación frontend-only**: no tiene backend, no tiene servidor de
autenticación, no almacena datos en una base de datos remota y no maneja cuentas de
usuario. Todo el estado del usuario (progreso, XP, racha) vive exclusivamente en el
`localStorage` del navegador.

Esto hace que la superficie de ataque sea acotada: no hay credenciales en tránsito,
no hay API con autenticación, y no hay datos personales centralizados.

## Qué reportar

Si encontrás una vulnerabilidad de seguridad (por ejemplo: XSS en el renderizado de
fórmulas lógicas, exposición involuntaria de datos del localStorage, dependencias con
CVEs activos), por favor **no** abras un issue público.

## Cómo reportar

Enviá un correo a **luis.aca1997@gmail.com** con:

1. Una descripción de la vulnerabilidad y su impacto potencial.
2. Los pasos para reproducirla.
3. Si ya tenés una propuesta de solución, incluila — es bienvenida.

Responderemos dentro de los **7 días hábiles**. Si la vulnerabilidad es confirmada,
coordinaremos el parche y el disclosure antes de hacerlo público.

## Versiones con soporte

Solo la versión más reciente publicada en GitHub Pages recibe actualizaciones de
seguridad. No hay versiones anteriores en producción.

## Reconocimiento

Si encontrás y reportás responsablemente un problema de seguridad, te agradecemos en
el CHANGELOG junto al fix (si lo permitís).
