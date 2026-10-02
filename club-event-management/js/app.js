const eventForm = document.getElementById("event-form");
const adminEvents = document.getElementById("admin-events");
const registrationTable = document.getElementById("registration-table");
const adminSearch = document.getElementById("admin-event-search");
const registrationSearch = document.getElementById("registration-search");

function renderAdminEvents() {
    const q = adminSearch.value.toLowerCase().trim();

    const events = getEvents().filter(e =>
        e.name.toLowerCase().includes(q)
    );

    adminEvents.innerHTML = events.length
        ? events.map(e => `
            <div class="admin-item">
                <div>
                    <strong>${e.name}</strong>
                    <p>${e.category} • ${formatDate(e.date, e.time)}</p>
                </div>

                <div class="item-actions">
                    <button onclick="editEvent(${e.id})">Edit</button>
                    <button onclick="deleteEvent(${e.id})">Delete</button>
                </div>
            </div>
        `).join("")
        : '<p class="empty">No events found.</p>';

    document.getElementById("event-count").textContent =
        getEvents().length;
}

function renderRegistrations() {
    const q = registrationSearch.value.toLowerCase().trim();

    const rows = getRegistrations().filter(r =>
        `${r.name} ${r.email} ${r.collegeYear} ${r.eventName}`
            .toLowerCase()
            .includes(q)
    );

    registrationTable.innerHTML = rows.length
        ? rows.map(r => `
            <tr>
                <td>${r.name}</td>
                <td>${r.email}</td>
                <td>${r.collegeYear}</td>
                <td>${r.phone}</td>
                <td>${r.eventName}</td>
            </tr>
        `).join("")
        : '<tr><td colspan="5">No registrations found.</td></tr>';

    document.getElementById("registration-count").textContent =
        getRegistrations().length;
}

eventForm.addEventListener("submit", e => {
    e.preventDefault();

    const id = Number(
        document.getElementById("edit-id").value
    );

    const data = {
        id: id || Date.now(),
        name: document.getElementById("event-name").value.trim(),
        date: document.getElementById("event-date").value,
        time: document.getElementById("event-time").value,
        venue: document.getElementById("event-venue").value.trim(),
        category: document.getElementById("event-category").value,
        description: document
            .getElementById("event-description")
            .value.trim()
    };

    let events = getEvents();

    events = id
        ? events.map(e => e.id === id ? data : e)
        : [...events, data];

    saveEvents(events);
    resetForm();
    renderAdminEvents();
});

function editEvent(id) {
    const e = getEvents().find(x => x.id === id);

    if (!e) return;

    document.getElementById("edit-id").value = e.id;
    document.getElementById("event-name").value = e.name;
    document.getElementById("event-date").value = e.date;
    document.getElementById("event-time").value = e.time;
    document.getElementById("event-venue").value = e.venue;
    document.getElementById("event-category").value = e.category;
    document.getElementById("event-description").value =
        e.description;

    document.getElementById("form-title").textContent =
        "Edit Event";

    document.getElementById("save-event").textContent =
        "Update Event";

    document.getElementById("cancel-edit").hidden = false;

    scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    saveEvents(
        getEvents().filter(e => e.id !== id)
    );

    renderAdminEvents();
}

function resetForm() {
    eventForm.reset();

    document.getElementById("edit-id").value = "";

    document.getElementById("form-title").textContent =
        "Add Event";

    document.getElementById("save-event").textContent =
        "Add Event";

    document.getElementById("cancel-edit").hidden = true;
}

document
    .getElementById("cancel-edit")
    .addEventListener("click", resetForm);

document
    .getElementById("clear-data")
    .addEventListener("click", () => {

        if (!confirm(
            "Reset all demo events and registrations?"
        )) return;

        localStorage.removeItem("clubEvents");
        localStorage.removeItem("clubRegistrations");

        renderAdminEvents();
        renderRegistrations();
    });

adminSearch.addEventListener(
    "input",
    renderAdminEvents
);

registrationSearch.addEventListener(
    "input",
    renderRegistrations
);

renderAdminEvents();
renderRegistrations();