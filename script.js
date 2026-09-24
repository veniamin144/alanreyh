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

// === Кнопка пожеланий и конфетти ===
(function initWishes() {
    const btn = document.getElementById('wishBtn');
    const counterEl = document.getElementById('wishCount');
    const confettiContainer = document.getElementById('confetti');

    // Загружаем сохранённое количество из localStorage
    let count = parseInt(localStorage.getItem('alanWishes') || '0', 10);
    counterEl.textContent = count;

    const colors = [
        '#009246', '#ffffff', '#ce2b37',
        '#ffe08a', '#f7b733', '#ff6b6b', '#4ecdc4'
    ];

    function launchConfetti(amount = 60) {
        for (let i = 0; i < amount; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');

            const size = 6 + Math.random() * 10;
            piece.style.width = size + 'px';
            piece.style.height = size + 'px';
            piece.style.left = Math.random() * 100 + 'vw';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            piece.style.animationDuration = (2.5 + Math.random() * 2) + 's';
            piece.style.animationDelay = (Math.random() * 0.6) + 's';

            confettiContainer.appendChild(piece);

            // Удаляем элемент после завершения анимации
            setTimeout(() => piece.remove(), 5000);
        }
    }

    btn.addEventListener('click', () => {
        count++;
        counterEl.textContent = count;
        localStorage.setItem('alanWishes', count);

        launchConfetti(80);

        // Анимация кнопки
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);

        // Меняем текст кнопки на время
        const originalText = btn.textContent;
        btn.textContent = 'Buon viaggio! 🇮🇹';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 1200);
    });

    // Приветственное конфетти через 1 секунду после загрузки
    setTimeout(() => launchConfetti(40), 1000);
})();

// === Плавное появление карточки при скролле (для мобильных) ===
(function smoothReveal() {
    const card = document.getElementById('card');
    if (!card) return;

    card.addEventListener('animationend', () => {
        card.style.willChange = 'auto';
    });
})();

// === Переход на страницу с поздравлениями ===
(function initNextPage() {
    const nextBtn = document.getElementById('nextPageBtn');
    if (!nextBtn) return;

    nextBtn.addEventListener('click', () => {
        // Небольшая анимация перед переходом
        nextBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'index2.html';
        }, 200);
    });
})();