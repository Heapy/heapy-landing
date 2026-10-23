const tablist = document.querySelector('[role="tablist"]');
const tabs = [...tablist.querySelectorAll('[role="tab"]')];

function selectTab(selected) {
    for (const tab of tabs) {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    }
}

for (const tab of tabs) {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
        const index = tabs.indexOf(tab);
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectTab(tabs[next]);
        tabs[next].focus();
    });
}

selectTab(tabs[0]);
tablist.hidden = false;

const clock = document.getElementById('local-time');
const updateClock = () => {
    clock.textContent = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(new Date());
};
updateClock();
window.setInterval(updateClock, 60_000);

const chapters = [...document.querySelectorAll('[data-moment]')];
const railLinks = [...document.querySelectorAll('[data-rail-link]')];
if ('IntersectionObserver' in window) {
    const chapterObserver = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        for (const link of railLinks) {
            const active = link.dataset.railLink === visible.target.id;
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
            link.closest('li').classList.toggle('is-active', active);
        }
        visible.target.classList.add('is-current');
    }, { rootMargin: '-180px 0px -180px 0px', threshold: [0, .15, .35, .6] });
    chapters.forEach(chapter => chapterObserver.observe(chapter));
} else if (railLinks[0]) {
    railLinks[0].setAttribute('aria-current', 'location');
}

for (const hotspot of document.querySelectorAll('.hotspot')) {
    hotspot.addEventListener('click', () => {
        const opening = hotspot.getAttribute('aria-expanded') !== 'true';
        hotspot.closest('.screen-window').querySelectorAll('.hotspot').forEach(item => item.setAttribute('aria-expanded', 'false'));
        hotspot.setAttribute('aria-expanded', String(opening));
    });
}
