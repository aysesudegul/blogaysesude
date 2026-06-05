const cards = Array.from(document.querySelectorAll(".article-card"));
const title = document.querySelector("[data-reading-title]");
const category = document.querySelector("[data-reading-category]");
const summary = document.querySelector("[data-reading-summary]");
const panelIcon = document.querySelector(".reading-panel-top .icon");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    title.textContent = card.dataset.title;
    category.textContent = card.dataset.category;
    summary.textContent = card.dataset.summary;
    panelIcon.textContent = card.querySelector(".article-icon").textContent;
  });
});
