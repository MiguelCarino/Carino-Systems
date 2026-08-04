/* ============================================================
   carino-anim.js — geometry for the section animations.
   ------------------------------------------------------------
   The companion to carino-anim.css: that file owns the motion,
   this one owns the shapes. Both ship as LOCAL copies in every
   site that uses them — no CDN, no cross-site dependency.

     <link rel="stylesheet" href="carino-anim.css">
     <script src="carino-anim.js" defer></script>
     …
     el.innerHTML = CarinoAnim.svg('medical');

   or, without any JS at all, copy the rendered <svg> out of the
   Animations section on branding.carino.systems and paste it in.

   Every dash-animated shape carries pathLength, so the CSS can
   write real numbers (`stroke-dasharray: 26 300`) instead of
   guessing at the length of a polyline. Change the geometry and
   the animation still lands, because the length is declared.

   Ids match the tag ids in the hub's registry (assets/json/
   tools.json), so a section gets its animation by name.
   ============================================================ */
(function () {
  'use strict';

  var VB = 'viewBox="0 0 240 48" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"';

  // The EKG trace from the Carino PACS splash: flat line, a small
  // deflection, then the spike. Drawn twice — dim underneath, bright on top.
  var EKG = '0,24 68,24 76,24 82,17 88,24 98,24 105,7 113,42 120,24 132,24 142,19 152,24 240,24';

  var LINK = '20,34 70,14 120,34 170,14 220,34';   // network: the run between nodes
  var NODES = [[20, 34], [70, 14], [120, 34], [170, 14], [220, 34]];

  // The shield sits centre-band with the perimeter closing on it from both
  // edges — a single 50-unit glyph in a 240-unit band reads as lost.
  var SHIELD = 'M120,3 L92,12 L92,27 C92,38 106,44 120,46 C134,44 148,38 148,27 L148,12 Z';

  var BARS = [14, 24, 11, 30, 21, 36];             // business: bar heights
  var TREND = [];                                  // filled below, through the bar tops

  var STOPS = [[24, 34], [88, 15], [152, 34], [216, 15]];   // learn: the four stops

  function rep(n, fn) {
    var out = '';
    for (var i = 0; i < n; i++) out += fn(i);
    return out;
  }

  var BUILD = {

    medical: function () {
      return '<polyline class="dim" points="' + EKG + '"/>'
           + '<polyline class="lit" pathLength="300" points="' + EKG + '"/>';
    },

    files: function () {
      // Five sheets, each with three ruled lines, under a bar that sweeps past.
      return rep(5, function (i) {
        var x = 16 + i * 44;
        return '<g class="sheet">'
             + '<rect x="' + x + '" y="11" width="30" height="27" rx="3"/>'
             + '<line x1="' + (x + 7) + '" y1="19" x2="' + (x + 23) + '" y2="19"/>'
             + '<line x1="' + (x + 7) + '" y1="25" x2="' + (x + 23) + '" y2="25"/>'
             + '<line x1="' + (x + 7) + '" y1="31" x2="' + (x + 17) + '" y2="31"/>'
             + '</g>';
      }) + '<line class="scan lit" x1="12" y1="4" x2="12" y2="45"/>';
    },

    network: function () {
      return '<polyline class="dim" points="' + LINK + '"/>'
           + '<polyline class="lit" pathLength="400" points="' + LINK + '"/>'
           + NODES.map(function (n) {
               return '<circle class="node" cx="' + n[0] + '" cy="' + n[1] + '" r="5"/>';
             }).join('');
    },

    security: function () {
      return '<g class="dim"><line x1="6" y1="24" x2="86" y2="24"/>'
           + '<line x1="234" y1="24" x2="154" y2="24"/>'
           + '<path d="' + SHIELD + '"/></g>'
           + '<line class="perim lit" pathLength="80" x1="6" y1="24" x2="86" y2="24"/>'
           + '<line class="perim lit" pathLength="80" x1="234" y1="24" x2="154" y2="24"/>'
           + '<path class="lit" pathLength="200" d="' + SHIELD + '"/>'
           + '<path class="tick lit" pathLength="26" d="M108,25 L117,34 L133,16"/>';
    },

    systems: function () {
      // A die with four traces leaving it, two per side.
      var t = [
        'M100,20 L62,20 L62,9 L22,9',
        'M100,29 L62,29 L62,40 L22,40',
        'M140,20 L178,20 L178,9 L218,9',
        'M140,29 L178,29 L178,40 L218,40'
      ];
      return '<g class="dim">'
             + t.map(function (d) { return '<path d="' + d + '"/>'; }).join('')
             + '<rect x="100" y="14" width="40" height="21" rx="3"/></g>'
           + '<g>' + t.map(function (d) {
               return '<path class="trace" pathLength="90" d="' + d + '"/>';
             }).join('') + '</g>'
           + '<rect class="die lit" x="100" y="14" width="40" height="21" rx="3"/>';
    },

    business: function () {
      return rep(6, function (i) {
        var h = BARS[i], x = 18 + i * 36;
        return '<rect class="bar" x="' + x + '" y="' + (42 - h) + '" width="18" height="' + h + '" rx="2"/>';
      })
      + '<polyline class="dim" points="' + TREND + '"/>'
      + '<polyline class="lit" pathLength="220" points="' + TREND + '"/>';
    },

    media: function () {
      // Twenty-one bars across the band, each a short vertical rule.
      return rep(21, function (i) {
        return '<rect class="wb" x="' + (14 + i * 10.6).toFixed(1) + '" y="10" width="1" height="28" rx="0.5"/>';
      });
    },

    learn: function () {
      var pts = STOPS.map(function (s) { return s[0] + ',' + s[1]; }).join(' ');
      return '<polyline class="dim" points="' + pts + '"/>'
           + '<polyline class="lit" pathLength="190" points="' + pts + '"/>'
           + STOPS.map(function (s) {
               return '<circle class="stop" cx="' + s[0] + '" cy="' + s[1] + '" r="5"/>';
             }).join('');
    }
  };

  // The trend line runs through the top of each bar.
  TREND = BARS.map(function (h, i) { return (18 + i * 36 + 9) + ',' + (42 - h); }).join(' ');

  var IDS = Object.keys(BUILD);

  /* svg(id) returns a complete, standalone <svg> for one section. Unknown ids
     return '' rather than throwing: the hub reads them from a registry it does
     not control, and a new category should get no animation, not a broken page. */
  function svg(id, label) {
    if (!BUILD[id]) return '';
    var title = label ? '<title>' + String(label).replace(/[&<>]/g, '') + '</title>' : '';
    return '<svg class="canim canim-' + id + '" ' + VB + ' role="img">' + title + BUILD[id]() + '</svg>';
  }

  window.CarinoAnim = { svg: svg, ids: IDS, has: function (id) { return !!BUILD[id]; } };
})();
