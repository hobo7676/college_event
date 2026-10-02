const defaultEvents = [
    {
        id: 1,
        name: "CodeChef CP Challenge",
        date: "2026-10-10",
        time: "11:00",
        venue: "Lab 3",
        category: "Competitive Programming",
        description: "A competitive programming contest for students."
    },
    {
        id: 2,
        name: "Web Development Workshop",
        date: "2026-10-15",
        time: "12:00",
        venue: "Lab 2",
        category: "Web Development",
        description: "Learn the basics of building websites."
    },
    {
        id: 3,
        name: "CodeChef Hackathon",
        date: "2026-10-20",
        time: "10:00",
        venue: "Auditorium",
        category: "Hackathon",
        description: "Build a project and solve a real-world problem."
    }
];

function getEvents() {
    const saved = localStorage.getItem("clubEvents");

    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem(
        "clubEvents",
        JSON.stringify(defaultEvents)
    );

    return defaultEvents;
}

function saveEvents(events) {
    localStorage.setItem(
        "clubEvents",
        JSON.stringify(events)
    );
}

function getRegistrations() {
    const saved = localStorage.getItem("clubRegistrations");

    return saved ? JSON.parse(saved) : [];
}

function formatDate(date, time) {
    const d = new Date(`${date}T${time}`);

    return d.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

function eventCard(event) {
    return `
        <article class="event-card">
            <span class="tag">${event.category}</span>

            <h3>${event.name}</h3>

            <p class="event-meta">
                ${formatDate(event.date, event.time)}
                • ${event.venue}
            </p>

            <p>${event.description}</p>

            <a
                class="btn primary"
                href="register.html?id=${event.id}">
                Register
            </a>
        </article>
    `;
}


function renderHomePage() {
    const events = getEvents();

    const upcomingEvents =
        document.getElementById("upcoming-events");

    const featuredName =
        document.getElementById("featured-name");

    const featuredMeta =
        document.getElementById("featured-meta");

    const featuredDescription =
        document.getElementById("featured-description");

    if (!upcomingEvents) return;

    upcomingEvents.innerHTML =
        events.map(eventCard).join("");

    if (events.length > 0) {
        const featured = events[0];

        featuredName.textContent = featured.name;

        featuredMeta.textContent =
            `${formatDate(featured.date, featured.time)} • ${featured.venue}`;

        featuredDescription.textContent =
            featured.description;
    }
}


renderHomePage();