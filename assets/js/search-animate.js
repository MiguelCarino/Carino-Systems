document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const allTiles = document.querySelectorAll(".tile");
  const sections = document.querySelectorAll(".grid-section");

  // 1. Initial Staggered Load Animation
  allTiles.forEach((tile, index) => {
    // 40ms stagger per tile
    tile.style.setProperty("--delay", index * 0.04 + "s");
    tile.classList.add("animate-enter");
  });

  // 2. Search Logic
  if(searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      
      allTiles.forEach(tile => {
        const text = tile.innerText.toLowerCase();
        const matches = text.includes(term);

        if (matches) {
          // If was hidden, show it and restart animation
          if (tile.classList.contains("hidden")) {
            tile.classList.remove("hidden");
            void tile.offsetWidth; // Trigger reflow
            tile.classList.add("animate-enter");
          }
        } else {
          tile.classList.add("hidden");
          tile.classList.remove("animate-enter");
        }
      });

      // Hide empty sections (e.g., if no Utility tiles match)
      sections.forEach(sec => {
        const visibleTiles = sec.querySelectorAll(".tile:not(.hidden)");
        sec.style.display = visibleTiles.length > 0 ? "block" : "none";
      });
    });

    // 3. Hotkey '/'
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== searchInput) { 
        e.preventDefault(); 
        searchInput.focus(); 
      }
    });
  }
});