# English by Talento Impulsa · App de vocabulario en inglés

Aplicación web de aprendizaje de vocabulario en inglés desarrollada a medida para una docente: 35 categorías temáticas con palabras por nivel, pronunciación, traducción y ejemplos.

> Desarrollo a medida de Sole Vila. El nombre de la app es el que eligió la clienta.

**Estado:** Producción
**App:** [merry-salamander-dd6650.netlify.app](https://merry-salamander-dd6650.netlify.app)

## Qué hace

- 35 categorías de vocabulario con niveles A1 a C2
- Cada palabra con transcripción IPA, traducción, definición y ejemplo
- Inicio de sesión y datos de uso con Firebase

## Stack

| Capa | Tecnología |
| --- | --- |
| Frontend | React + Vite |
| Datos | Vocabulario en JSON (`english-hub/src/data/vocabulary/`); Firebase Auth y Firestore |
| Hosting | Netlify (carpeta base `english-hub/`) |

## Configuración

La configuración de Firebase se lee de variables de entorno cargadas en Netlify (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`); nunca van escritas en el repo.

Cómo agregar palabras o categorías: ver [`english-hub/README.md`](./english-hub/README.md).

## Licencia

© 2026 María Soledad Vila. Todos los derechos reservados.

---

**Sole Vila** · Vibe Coder & Arquitecta Digital · [mariasoledadvila.com.ar](https://mariasoledadvila.com.ar)
hola@mariasoledadvila.com.ar
