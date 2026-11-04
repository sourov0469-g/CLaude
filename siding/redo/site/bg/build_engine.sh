#!/bin/sh
# Rebuild src/bg2/engine.bundle.js from src/bg2/engine.js (Three.js r150 bundled, as Immersive Garden's engine generation).
# Needs: npm install three@0.150.1 esbuild@0.24.0 in a work folder; run from that folder.
#   cp <site>/src/bg2/engine.js ./engine.js
#   npx esbuild engine.js --bundle --minify --format=iife --target=es2019 --outfile=<site>/src/bg2/engine.bundle.js
