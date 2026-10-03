(() => {
    const audio = document.querySelector('[data-autoplay-section]');
    if (audio) {
        const status = document.getElementById('audioStatus');
        const toggle = document.getElementById('toggleMusic');
        const playLabel = toggle ? toggle.dataset.playLabel : '▶ Reproducir música';
        const pauseLabel = toggle ? toggle.dataset.pauseLabel : '❚❚ Pausar música';
        const openedAsFile = location.protocol === 'file:';

        function updateMusicControl() {
            if (toggle) {
                toggle.textContent = audio.paused ? playLabel : pauseLabel;
                toggle.setAttribute('aria-pressed', String(!audio.paused));
            }
        }

        if (toggle) {
            toggle.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play().catch(error => {
                        if (status) status.textContent = 'La música no está disponible ahora.';
                        if (error.name !== 'NotAllowedError') console.error('No se pudo reproducir la música del capítulo.', error);
                    });
                } else {
                    audio.pause();
                }
            });
        }

        if (openedAsFile) {
            audio.pause();
            audio.preload = 'none';
            audio.controls = false;
            if (toggle) {
                toggle.disabled = true;
                toggle.textContent = 'Música pausada';
            }
            if (status) status.textContent = 'Música pausada.';
        } else {
            audio.addEventListener('playing', () => {
                if (status) status.textContent = 'La música está sonando.';
                updateMusicControl();
            });
            audio.addEventListener('pause', updateMusicControl);
            audio.addEventListener('error', () => {
                if (status) status.textContent = 'La música no está disponible ahora.';
            });

            audio.play().catch(error => {
                if (error.name === 'AbortError' || error.name === 'NotAllowedError') return;
                if (status) status.textContent = 'La música no está disponible ahora.';
            });
            updateMusicControl();
        }
    }

    const envelope = document.getElementById('openLoveNote');
    const note = document.getElementById('welcomeNote');
    const monthTimeline = document.getElementById('monthTimeline');

    if (envelope && note) {
        envelope.addEventListener('click', () => {
            const open = note.classList.toggle('is-open');
            envelope.setAttribute('aria-expanded', String(open));
            if (monthTimeline) monthTimeline.hidden = !open;
            if (open) note.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    const hearts = document.querySelector('.floating-hearts');
    if (!hearts || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = Math.random() > 0.5 ? '♡' : '♥';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${6 + Math.random() * 5}s`;
        heart.style.fontSize = `${12 + Math.random() * 16}px`;
        heart.style.color = Math.random() > 0.5 ? '#df7188' : '#80344e';
        hearts.append(heart);
        heart.addEventListener('animationend', () => heart.remove(), { once: true });
    }, 1600);
})();
