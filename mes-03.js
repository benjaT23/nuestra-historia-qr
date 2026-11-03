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

    const revealButton = document.getElementById('revealPuzzlePromise');
    const puzzlePromise = document.getElementById('puzzlePromise');
    if (revealButton && puzzlePromise) {
        revealButton.addEventListener('click', () => {
            puzzlePromise.hidden = false;
            revealButton.classList.add('is-revealed');
            revealButton.querySelector('strong').textContent = 'Nuestra próxima pieza está colocada';
            revealButton.querySelector('small').textContent = 'Lo que falta lo vamos a terminar juntos';
            puzzlePromise.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    const photoButton = document.getElementById('openPuzzlePhoto');
    const puzzleLightbox = document.getElementById('puzzleLightbox');
    const closePuzzle = document.getElementById('closePuzzlePhoto');
    if (photoButton && puzzleLightbox && closePuzzle) {
        photoButton.addEventListener('click', () => puzzleLightbox.showModal());
        closePuzzle.addEventListener('click', () => puzzleLightbox.close());
        puzzleLightbox.addEventListener('click', event => {
            if (event.target === puzzleLightbox) puzzleLightbox.close();
        });
    }

    const photoLightbox = document.getElementById('monthThreePhotoLightbox');
    const lightboxImage = document.getElementById('monthThreeLightboxImage');
    const lightboxCaption = document.getElementById('monthThreeLightboxCaption');
    const closePhotoLightbox = document.getElementById('closeMonthThreePhoto');
    document.querySelectorAll('.month-three-photo').forEach(photo => {
        photo.addEventListener('click', () => {
            if (!photoLightbox || !lightboxImage || !lightboxCaption) return;
            lightboxImage.src = photo.dataset.photo;
            lightboxImage.alt = photo.querySelector('img')?.alt || 'Recuerdo ampliado del tercer mes';
            lightboxCaption.textContent = photo.dataset.caption || '';
            photoLightbox.showModal();
        });
    });
    if (photoLightbox && closePhotoLightbox) {
        closePhotoLightbox.addEventListener('click', () => photoLightbox.close());
        photoLightbox.addEventListener('click', event => {
            if (event.target === photoLightbox) photoLightbox.close();
        });
    }
})();
