#!/usr/bin/env bash
# Sync the shared front-end assets from their canonical copies out to every
# Carino site. Each site keeps its OWN local copy — there is no CDN and no
# cross-site runtime dependency, so every site works standalone/offline.
# Run this after editing a canonical file.
#
#   canonical carino-clock.js  = Carino-Systems/carino-clock.js  (this repo)
#   canonical carino-navbar.js = ../CVE/carino-navbar.js
#   canonical carino-diag.js   = ../Topo/carino-diag.js
#   canonical carino-anim.*    = ../Branding/carino-anim.{css,js}
#   canonical carino-lang.js   = Carino-Systems/carino-lang.js  (this repo)
set -euo pipefail
cd "$(dirname "$0")/.."          # -> the folder holding all the sibling repos

CLOCK_SRC="Carino-Systems/carino-clock.js"
NAV_SRC="CVE/carino-navbar.js"
DIAG_SRC="Topo/carino-diag.js"
ANIM_CSS_SRC="Branding/carino-anim.css"
ANIM_JS_SRC="Branding/carino-anim.js"
LANG_SRC="Carino-Systems/carino-lang.js"

# Sites whose navbar IS the shared carino-navbar.js (it injects carino-clock.js).
GROUPA="Branding CVE Quote Hardware Hash Metadata \
NetplanConfig Topo PlanetDayum Compass \
SimpleCountdown Desk Kanban Password \
Vitae SimpleSetup SoftwareCatalog SyncSubsStudio Time Currency \
Media Fonts"

# Project pages that live in a subfolder of a non-web repo but still run the
# shared navbar. Same treatment as GROUPA — they were drifting because nothing
# copied to them.
SUBSITES="Carino-PACS/docs Custom-Images/docs"

# Sites with bespoke navbars that pull in carino-clock.js via a <script> tag.
BESPOKE="Asobi Retina DICOM-editor Learn MultiWeb MusicGrid TV"

# Network-oriented sites that also carry the opt-in Sys. Status panel
# (public IPv4/IPv6, ISP, connection type, RTT). This is the in-navbar
# replacement for the retired standalone IP-lookup site, so a network tool no longer
# needs its own subdomain for it. Add a site here ONLY after adding
# <script src="carino-diag.js" defer></script> after its navbar tag.
DIAG="Topo NetplanConfig Hardware"

# Sites carrying the per-section animations (carino-anim.css + carino-anim.js).
# Branding is the canonical source and documents them; the hub uses one under
# each section's cards. Add a site here only once it actually renders one.
ANIM="Branding Carino-Systems"

# Sites carrying the language switcher. It was hand-copied until now, which is
# why it is discovered rather than listed: any site that already has the file
# gets the current one.

echo "Propagating shared navbar assets (local copies, no CDN)…"
# -ef guards skip copying a canonical file onto itself (CVE is the navbar source
# but also carries the shared navbar; a plain cp of a file onto itself errors).
for d in $GROUPA $SUBSITES; do
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
for f in */carino-lang.js */*/carino-lang.js; do
  [ -e "$f" ] || continue
  [ "$f" -ef "$LANG_SRC" ] || cp "$LANG_SRC" "$f"
  echo "  ${f%/carino-lang.js}  (lang)"
done
for d in $ANIM; do
  [ -d "$d" ] || { echo "  skip $d (missing)"; continue; }
  [ "$d/carino-anim.css" -ef "$ANIM_CSS_SRC" ] || cp "$ANIM_CSS_SRC" "$d/carino-anim.css"
  [ "$d/carino-anim.js" -ef "$ANIM_JS_SRC" ] || cp "$ANIM_JS_SRC" "$d/carino-anim.js"
  echo "  $d  (anim)"
done

# Carino-Systems (this repo) already holds the canonical carino-clock.js, and
# its navbar is inline (it owns the full Sys. Status dropdown, hardware rows
# included — carino-diag.js is the trimmed network-only port of it).
# Carino-PACS/pacs/web ships a deliberately self-contained navbar (it runs
# offline, so the clock is inlined) — hand-maintained, left untouched here.
#
# Retired, deliberately absent: pentarch, AssemblyRoadmap and MetadataViewer
# never existed under those names; ip, Multisearch-index, ProcessFlow and
# SimpleTranscoding were removed from GitHub.
echo "Done. ($(echo $GROUPA $SUBSITES | wc -w) group-A + $(echo $BESPOKE | wc -w) bespoke + $(echo $DIAG | wc -w) diag + $(echo $ANIM | wc -w) anim)"
