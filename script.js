// Mobile navigation
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// News search and category filters
const searchInput = document.getElementById("newsSearch");
const categorySelect = document.getElementById("newsCategory");
const newsCards = document.querySelectorAll(".news-card");
const noNews = document.getElementById("noNews");

function filterNews() {
  if (!searchInput || !categorySelect) return;

  const searchTerm = searchInput.value.toLowerCase().trim();
  const category = categorySelect.value;
  let visibleCount = 0;

  newsCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const cardCategory = card.dataset.category;

    const matchesSearch = text.includes(searchTerm);
    const matchesCategory = category === "all" || category === cardCategory;
    const visible = matchesSearch && matchesCategory;

    card.hidden = !visible;

    if (visible) visibleCount++;
  });

  if (noNews) {
    noNews.hidden = visibleCount !== 0;
  }
}

if (searchInput) {
  searchInput.addEventListener("input", filterNews);
}

if (categorySelect) {
  categorySelect.addEventListener("change", filterNews);
}
