#!/usr/bin/env bash
# Download SilverBullet's real CSS/JS from a running instance and extract what a theme needs.
#
#   fetch-core.sh <base-url> [out-dir]      e.g. fetch-core.sh http://127.0.0.1:3399/notes ./sb-core
#
# /.client/* is served without auth, so this works even on instances you can't log into.
# Writes: main.css, main.pretty.css, client.js, variables.txt, line-classes.txt, sb-classes.txt, token-classes.txt
set -euo pipefail

base=${1:?usage: fetch-core.sh <base-url> [out-dir]}
base=${base%/}
out=${2:-./sb-core}
mkdir -p "$out"

curl -fsS "$base/.client/main.css" -o "$out/main.css"
curl -fsS "$base/.client/client.js" -o "$out/client.js"
npx --yes prettier@3.3.3 --parser css "$out/main.css" >"$out/main.pretty.css"

# Every custom property core defines (theme blocks: grep -n '^html' main.pretty.css)
grep -oE '^[[:space:]]*--[a-z0-9-]+:' "$out/main.pretty.css" | tr -d ' :' | sort -u >"$out/variables.txt"
# Editor line classes and every sb-* class the client or CSS mentions
cat "$out/client.js" "$out/main.pretty.css" | grep -oE 'sb-line-[a-z0-9-]+' | sort -u >"$out/line-classes.txt"
cat "$out/client.js" "$out/main.pretty.css" | grep -oE 'sb-[a-z][a-z0-9-]+' | sort -u >"$out/sb-classes.txt"
# CodeMirror highlight tag -> class map
grep -oE '\{tag:[^{}]{1,120}class:"sb-[a-zA-Z0-9-]+"\}' "$out/client.js" | sort -u >"$out/token-classes.txt"

grep -n '^html' "$out/main.pretty.css" | head -20
wc -l "$out"/*.txt
