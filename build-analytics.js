/* ==========================================================================
   BUILD SCRIPT FOR VERCEL ANALYTICS
   Bundles the analytics module for browser usage
   ========================================================================== */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create a standalone analytics bundle
const analyticsCode = `
/* Vercel Web Analytics - Bundled */
(function() {
  'use strict';
  
  // Analytics injection code
  window.va = window.va || function() {
    (window.vaq = window.vaq || []).push(arguments);
  };
  
  // Inject the Vercel Analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
`;

// Write the bundled file
const outputPath = join(__dirname, 'assets', 'js', 'analytics-bundle.js');
writeFileSync(outputPath, analyticsCode);

console.log('✅ Vercel Analytics bundle created successfully at:', outputPath);
