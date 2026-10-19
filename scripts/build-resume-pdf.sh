#!/usr/bin/env bash
# Renders resume.html to a PDF with headless Chromium using src/css/resume-print.css.
# Usage: scripts/build-resume-pdf.sh [output.pdf]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${1:-$ROOT/assets/Cory-Kratz-Resume.pdf}"
PORT="${PORT:-8766}"

if [[ -z "${CHROME:-}" ]]; then
  CHROME="$(command -v google-chrome || command -v google-chrome-stable || command -v chromium || command -v chromium-browser || true)"
fi
if [[ -z "$CHROME" ]]; then
  CHROME="$(ls -d "$HOME"/.cache/ms-playwright/chromium-*/chrome-linux64/chrome 2>/dev/null | sort | tail -1 || true)"
fi
if [[ -z "$CHROME" || ! -x "$CHROME" ]]; then
  echo "No Chromium binary found. Set CHROME=/path/to/chrome and retry." >&2
  exit 1
fi

# The site uses root-relative asset paths, so serve the project over HTTP.
python3 -m http.server "$PORT" --bind 127.0.0.1 --directory "$ROOT" >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
sleep 1

mkdir -p "$(dirname "$OUT")"
"$CHROME" --headless=new --no-sandbox --disable-gpu \
  --no-pdf-header-footer --virtual-time-budget=5000 \
  --print-to-pdf="$OUT" "http://127.0.0.1:$PORT/resume.html" 2>/dev/null

echo "Wrote $OUT"
