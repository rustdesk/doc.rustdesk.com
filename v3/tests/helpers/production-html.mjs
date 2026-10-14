import { createRequire } from 'node:module';

// Resolve each transitive dependency from the production package that owns it,
// so tests do not depend on npm hoisting or add another copy of the compressor.
const compressor = createRequire(import.meta.resolve('astro-compress'));
export const { minify } = compressor('html-minifier-terser');
export const { default: compressionDefaults } = await import(
  new URL('../Variable/HTML/html-minifier-terser.js', import.meta.resolve('astro-compress'))
);

const icons = createRequire(import.meta.resolve('astro-icon'));
const iconify = createRequire(icons.resolve('@iconify/tools'));
export const { load } = iconify('cheerio');
