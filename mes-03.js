(() => {
    const video = document.getElementById('monthThreeVideo');
    const playButton = document.getElementById('playMonthThreeVideo');
    if (!video || !playButton) return;

    const toggleVideo = () => {
        if (video.paused) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    };

    playButton.addEventListener('click', toggleVideo);
    video.addEventListener('click', toggleVideo);
    video.addEventListener('play', () => {
        playButton.classList.add('is-playing');
        playButton.setAttribute('aria-label', 'Pausar nuestro video');
    });
    video.addEventListener('pause', () => {
        playButton.classList.remove('is-playing');
        playButton.setAttribute('aria-label', 'Reproducir nuestro video');
    });
    video.addEventListener('ended', () => playButton.classList.remove('is-playing'));
})();
