// Mobile navigation
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(open));
    });
}

// Navigation links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (nav) {
            nav.classList.remove('open');
        }

        if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'false');
        }

        document.querySelectorAll('.nav a').forEach(item => {
            item.classList.remove('selected');
        });

        link.classList.add('selected');
    });
});

// News filtering
const category = document.getElementById('category');
const search = document.getElementById('search');
const clear = document.getElementById('clear');
const cards = [...document.querySelectorAll('.news-card')];
const empty = document.getElementById('empty');

function filterNews() {
    let shown = 0;

    cards.forEach(card => {
        const matchesCategory =
            !category ||
            category.value === 'all' ||
            card.dataset.category === category.value;

        const matchesSearch =
            !search ||
            card.innerText.toLowerCase().includes(search.value.toLowerCase());

        card.hidden = !(matchesCategory && matchesSearch);

        if (!card.hidden) {
            shown++;
        }
    });

    if (empty) {
        empty.hidden = shown !== 0;
    }
}

if (category) {
    category.addEventListener('change', filterNews);
}

if (search) {
    search.addEventListener('input', filterNews);
}

if (clear) {
    clear.addEventListener('click', () => {
        if (category) category.value = 'all';
        if (search) search.value = '';

        filterNews();
    });
}
