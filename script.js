const accordionItems = document.querySelectorAll(".accordion-item");

function updateArrow(item, isOpen) {
    const arrow = item.querySelector(".arrow");
    arrow.textContent = isOpen ? "↘" : "↗";
}

function updateOpenHeight(item) {
    const content = item.querySelector(".accordion-content");

    if (item.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = null;
    }
}

accordionItems.forEach((item) => {
    const button = item.querySelector(".accordion-button");

    updateArrow(item, item.classList.contains("active"));
    updateOpenHeight(item);

    button.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        accordionItems.forEach((otherItem) => {
            otherItem.classList.remove("active");
            updateArrow(otherItem, false);
            updateOpenHeight(otherItem);
        });

        if (!isActive) {
            item.classList.add("active");
            updateArrow(item, true);
            updateOpenHeight(item);
        }
    });
});

window.addEventListener("resize", () => {
    const activeItem = document.querySelector(".accordion-item.active");
    if (activeItem) {
        updateOpenHeight(activeItem);
    }
});


/* =========================
   MOBILE MENU
========================= */
const navRight = document.querySelector(".navbar-right");
const menuToggle = document.querySelector(".menu-toggle");

function setMenu(open) {
    navRight.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
}

if (navRight && menuToggle) {
    menuToggle.addEventListener("click", () => {
        setMenu(!navRight.classList.contains("open"));
    });

    // close after choosing a link, pressing Escape, tapping outside, or growing to desktop
    navRight.querySelectorAll(".nav-links a").forEach((a) =>
        a.addEventListener("click", () => setMenu(false))
    );
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") setMenu(false);
    });
    document.addEventListener("click", (e) => {
        if (!navRight.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) setMenu(false);
    });
}

/* =========================
   COACH CARDS SLIDER (← →)
   Scrolls the row on tablet/phone, where the cards swipe sideways
========================= */
const coachTrack = document.querySelector(".coach-cards");
const prevBtn = document.querySelector(".slider-buttons .previous");
const nextBtn = document.querySelector(".slider-buttons .next");

function slideCoaches(direction) {
    const card = coachTrack.querySelector(".coach-card");
    if (!card) return;
    const gap = parseFloat(getComputedStyle(coachTrack).columnGap) || 0;
    coachTrack.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
}

if (coachTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => slideCoaches(-1));
    nextBtn.addEventListener("click", () => slideCoaches(1));
}