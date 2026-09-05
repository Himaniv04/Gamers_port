// TailwindCSS v4 in the Frontend uses the @tailwindcss/vite plugin directly.
// PostCSS is NOT needed here — leave it empty so the root-level postcss.config.js
// (which is for the Next.js TailwindCSS v3 setup) doesn't leak into this project.
export default {
  plugins: {},
};
