#!/usr/bin/env bash
# Sync the shared front-end assets from their canonical copies out to every
# Carino site. Each site keeps its OWN local copy — there is no CDN and no
# cross-site runtime dependency, so every site works standalone/offline.
# Run this after editing a canonical file.
#
#   canonical carino-clock.js  = Carino-Systems/carino-clock.js  (this repo)
#   canonical carino-navbar.js = ../CVE/carino-navbar.js
#   canonical carino-diag.js   = ../NetworkTopology/carino-diag.js
set -euo pipefail
cd "$(dirname "$0")/.."          # -> the folder holding all the sibling repos

CLOCK_SRC="Carino-Systems/carino-clock.js"
NAV_SRC="CVE/carino-navbar.js"
DIAG_SRC="NetworkTopology/carino-diag.js"

# Sites whose navbar IS the shared carino-navbar.js (it injects carino-clock.js).
GROUPA="Branding CVE GeneralQuotation Graphy Hardware Hash ISO-27001 Metadata-editor \
NetplanConfig NetworkTopology pdf2img-gui PlanetDayum PoliticalCompass SignatureEditor \
SimpleCountdown SimpleDeskSupport SimpleOCR Simple-Kanban SimplePasswordGenerator \
Simple-Resume SimpleSetup SoftwareCatalog SyncSubsStudio Time"

# Sites with bespoke navbars that pull in carino-clock.js via a <script> tag.
BESPOKE="Asobi Carino-Ophthalmology DICOM-editor LearningTopics MultiWeb MusicGrid \
StreamMultiviewer"

# Network-oriented sites that also carry the opt-in Sys. Status panel
# (public IPv4/IPv6, ISP, connection type, RTT). This is the in-navbar
# replacement for the retired ip.carino.systems, so a network tool no longer
# needs its own subdomain for it. Add a site here ONLY after adding
# <script src="carino-diag.js" defer></script> after its navbar tag.
DIAG="NetworkTopology NetplanConfig Hardware"

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
for d in $DIAG; do
  [ -d "$d" ] || { echo "  skip $d (missing)"; continue; }
  [ "$d/carino-diag.js" -ef "$DIAG_SRC" ] || cp "$DIAG_SRC" "$d/carino-diag.js"
  echo "  $d  (diag)"
done

# Carino-Systems (this repo) already holds the canonical carino-clock.js, and
# its navbar is inline (it owns the full Sys. Status dropdown, hardware rows
# included — carino-diag.js is the trimmed network-only port of it).
# Carino-PACS ships a deliberately self-contained inline navbar — left untouched.
#
# Retired, deliberately absent: pentarch, AssemblyRoadmap and MetadataViewer
# never existed under those names; ip, Multisearch-index, ProcessFlow and
# SimpleTranscoding were removed from GitHub.
echo "Done. ($(echo $GROUPA | wc -w) group-A + $(echo $BESPOKE | wc -w) bespoke + $(echo $DIAG | wc -w) diag)"
