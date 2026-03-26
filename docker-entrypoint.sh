#!/usr/bin/env sh
set -e
cd /app

echo ">>> npm ci"
npm ci

echo ">>> npm run build"
npm run build

echo ">>> npm run dev (http://localhost:5173)"
exec npm run dev
