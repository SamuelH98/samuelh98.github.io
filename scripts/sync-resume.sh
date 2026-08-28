#!/usr/bin/env bash
# Sync the portfolio resume from a public Typst share link.
#
# Typst exposes project files anonymously for documents shared via a
# read-only link. This script pulls the latest source, writes it into the
# repo, and recompiles the PDF with the Typst CLI — no auth, no cost.
#
# Env overrides:
#   TYPST_SHARE_TOKEN   read-only share link id (default below)
#   TYPST_API_URL       Typst API base (default https://api.typst.app)
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SHARE_TOKEN="${TYPST_SHARE_TOKEN:-rFi461t6tLvtN4FW6RvEj0}"
API_URL="${TYPST_API_URL:-https://api.typst.app}"
RESUME_SOURCE="${TYPST_RESUME_SOURCE:-Resume - Samuel Hale.typ}"
RESUME_PDF="${TYPST_RESUME_PDF:-Resume - Samuel Hale.pdf}"
GRAPHQL_QLIENT="typst-app"

cd "$REPO_DIR"

echo "== Fetching project files from Typst share link ..."
FILES_JSON="$(curl -fsS -X POST "$API_URL/v1/graphql" \
  -H 'Content-Type: application/json' \
  -H "apollographql-client-name: $GRAPHQL_QLIENT" \
  -d "{ \"query\": \"query SyncResume(\$p: ID!){ project(id: \$p){ id previewed files { id name } } }\", \
       \"variables\": { \"p\": \"$SHARE_TOKEN\" } }")"

PREVIEWED="$(printf '%s' "$FILES_JSON" | python3 -c 'import json,sys; print(json.load(sys.stdin)["data"]["project"]["previewed"])')"
FILE_COUNT="$(printf '%s' "$FILES_JSON" | python3 -c 'import json,sys; print(len(json.load(sys.stdin)["data"]["project"]["files"]))')"
echo "   main file id: $PREVIEWED ($FILE_COUNT total file(s))"

TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
SYNCED=""

while IFS=$'\t' read -r FILE_ID FILE_NAME; do
  [ -z "$FILE_ID" ] && continue

  if [ "$FILE_ID" = "$PREVIEWED" ]; then
    DEST="$RESUME_SOURCE"
  else
    DEST="$FILE_NAME"
    # Never clobber an existing repo file (e.g. index.html) with an asset.
    if git ls-files --error-unmatch "$DEST" >/dev/null 2>&1; then
      echo "   ! skipped $FILE_NAME — would overwrite an existing repo file"
      continue
    fi
  fi

  echo "   downloading $FILE_NAME -> $DEST"
  curl -fsS "$API_URL/v1/files/$SHARE_TOKEN/$FILE_ID" \
    -H "apollographql-client-name: $GRAPHQL_QLIENT" \
    -o "$DEST"

  if [ "$FILE_ID" = "$PREVIEWED" ] && [ "${DEST##*.}" = "typ" ]; then
    # GitHub runners ship the "Linux Libertine O" family, not the bare
    # "Linux Libertine" name the share link uses. Same design, same glyphs.
    sed -i 's/font: "Linux Libertine"/font: "Linux Libertine O"/g' "$DEST"
  fi
  SYNCED=1
done < <(printf '%s' "$FILES_JSON" | python3 -c '
import json, sys
d = json.load(sys.stdin)["data"]["project"]
for f in d["files"]:
    print(f["id"] + "\t" + f["name"])
')

if [ -z "${SYNCED:-}" ]; then
  echo "== Nothing to sync. No files in project."
  exit 0
fi

echo "== Compiling resume PDF ..."
typst compile "$RESUME_SOURCE" "$RESUME_PDF"

echo "== Done. $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git status --short -- "Resume - Samuel Hale.typ" "Resume - Samuel Hale.pdf" 2>/dev/null || true