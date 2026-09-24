// === Генерация облаков ===
(function createClouds() {
    const cloudsContainer = document.getElementById('clouds');
    if (!cloudsContainer) return;

    const count = 8;

    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.classList.add('cloud');

        const width = 80 + Math.random() * 140;
        const height = 30 + Math.random() * 40;
        const top = Math.random() * 60;
        const duration = 25 + Math.random() * 30;
        const delay = Math.random() * 20;

        cloud.style.width = width + 'px';
        cloud.style.height = height + 'px';
        cloud.style.top = top + '%';
        cloud.style.animationDuration = duration + 's';
        cloud.style.animationDelay = '-' + delay + 's';
        cloud.style.opacity = 0.25 + Math.random() * 0.4;

        cloudsContainer.appendChild(cloud);
    }
})();

// === Модальное окно с поздравлениями ===
(function initModal() {
    const cards = Array.from(document.querySelectorAll('.wish-card'));
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const modalCounter = document.getElementById('modalCounter');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');

    if (!modal || !cards.length) return;

    let currentIndex = 0;

    // Собираем данные из карточек
   const wishes = cards.map(card => {
    const img = card.querySelector('.wish-image img');
    const title = card.querySelector('.wish-title');
    const text = card.querySelector('.wish-text');
    return {
        src: img ? img.getAttribute('src') : '',
        alt: img ? img.getAttribute('alt') : '',
        title: title ? title.textContent.trim() : '',
        // ⬇️ теперь берём HTML как есть — картинки внутри <p> сохранятся
        text: text ? text.innerHTML.trim() : ''
    };
});

    function render(index) {
        const w = wishes[index];
        if (!w) return;

        modalImg.src = w.src;
        modalImg.alt = w.alt;
        modalTitle.textContent = w.title;
        modalText.innerHTML = w.text;
        modalCounter.textContent = (index + 1) + ' / ' + wishes.length;

        modalPrev.disabled = index === 0;
        modalNext.disabled = index === wishes.length - 1;

        currentIndex = index;
    }

    function openModal(index) {
        render(index);
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    // Клик по карточке
    cards.forEach((card, i) => {
        card.addEventListener('click', () => openModal(i));
    });

    // Кнопка закрытия
    modalClose.addEventListener('click', closeModal);

    // Клик по фону
    modal.querySelector('[data-close]').addEventListener('click', closeModal);

    // Стрелки
    modalPrev.addEventListener('click', () => {
        if (currentIndex > 0) render(currentIndex - 1);
    });

    modalNext.addEventListener('click', () => {
        if (currentIndex < wishes.length - 1) render(currentIndex + 1);
    });

    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('open')) return;

        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft' && currentIndex > 0) render(currentIndex - 1);
        if (e.key === 'ArrowRight' && currentIndex < wishes.length - 1) render(currentIndex + 1);
    });
})();

// === Плавное появление карточек ===
(function revealOnScroll() {
    const cards = document.querySelectorAll('.wish-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
})();