const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const eventsList = document.getElementById("events-list");

function renderEvents() {
    const q = searchInput.value.toLowerCase().trim();
    const c = categorySelect.value;

    const f = getEvents().filter(e =>
        e.name.toLowerCase().includes(q) &&
        (c === "all" || e.category === c)
    );

    eventsList.innerHTML = f.length
        ? f.map(eventCard).join("")
        : '<p class="empty">No events found.</p>';
}

searchInput.addEventListener(
    "input",
    renderEvents
);

categorySelect.addEventListener(
    "change",
    renderEvents
);

renderEvents();