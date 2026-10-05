// Doka Rotterdam — shared script (loaded with `defer` on every page)

// Mobile navigation toggle
(function () {
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    if (!header || !toggle) return;

    toggle.addEventListener('click', function () {
        var open = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();

// Course dates: hide dates that have passed, highlight the next one and
// copy it into any [data-next-course] element. Dates come from the
// <time datetime="YYYY-MM-DD"> inside each .date-card in cursus.html.
(function () {
    var cards = document.querySelectorAll('.date-card');
    if (!cards.length) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var next = null;

    cards.forEach(function (card) {
        var time = card.querySelector('time');
        var date = new Date(time.getAttribute('datetime') + 'T00:00:00');
        if (date < today) {
            card.classList.add('is-past');
        } else if (!next) {
            next = card;
            card.classList.add('is-next');
        }
    });

    var label = next ? next.getAttribute('data-label') : 'Nieuwe data volgen binnenkort';
    document.querySelectorAll('[data-next-course]').forEach(function (el) {
        el.textContent = label;
    });

    var empty = document.querySelector('[data-dates-empty]');
    if (empty && !next) empty.hidden = false;
})();
