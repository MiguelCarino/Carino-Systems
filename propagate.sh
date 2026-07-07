#!/usr/bin/env bash
# Sync the two shared navbar assets from their canonical copies out to every
# Carino site. Each site keeps its OWN local copy — there is no CDN and no
# cross-site runtime dependency, so every site works standalone/offline.
# Run this after editing a canonical file.
#
#   canonical carino-clock.js  = Carino-Systems/carino-clock.js  (this repo)
#   canonical carino-navbar.js = ../CVE/carino-navbar.js
set -euo pipefail
cd "$(dirname "$0")/.."          # -> the folder holding all the sibling repos

CLOCK_SRC="Carino-Systems/carino-clock.js"
NAV_SRC="CVE/carino-navbar.js"

# Sites whose navbar IS the shared carino-navbar.js (it injects carino-clock.js).
GROUPA="CVE Graphy SoftwareCatalog pentarch ProcessFlow Time PlanetDayum ISO-27001 \
MetadataViewer Multisearch-index NetplanConfig NetworkTopology PoliticalCompass \
SignatureEditor SimpleCountdown SimpleDeskSupport SimplePasswordGenerator Simple-Kanban"

# Sites with bespoke navbars that pull in carino-clock.js via a <script> tag.
BESPOKE="DICOM-editor StreamMultiviewer MusicGrid AssemblyRoadmap Asobi"

echo "Propagating shared navbar assets (local copies, no CDN)…"
# -ef guards skip copying a canonical file onto itself (CVE is the navbar source
# but also carries the shared navbar; a plain cp of a file onto itself errors).
for d in $GROUPA; do
  [ -d "$d" ] || { echo "  skip $d (missing)"; continue; }
  [ "$d/carino-navbar.js" -ef "$NAV_SRC" ] || cp "$NAV_SRC" "$d/carino-navbar.js"
  [ "$d/carino-clock.js" -ef "$CLOCK_SRC" ] || cp "$CLOCK_SRC" "$d/carino-clock.js"
  echo "  $d  (navbar + clock)"
done
for d in $BESPOKE; do
  [ -d "$d" ] || { echo "  skip $d (missing)"; continue; }
  [ "$d/carino-clock.js" -ef "$CLOCK_SRC" ] || cp "$CLOCK_SRC" "$d/carino-clock.js"
  echo "  $d  (clock)"
done

# Carino-Systems (this repo) already holds the canonical carino-clock.js.
# SimplePACS uses a deliberately self-contained inline navbar — left untouched.
echo "Done. ($(echo $GROUPA | wc -w) group-A + $(echo $BESPOKE | wc -w) bespoke)"
