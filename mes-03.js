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

    const releaseVideoButterflies = button => {
        button.classList.add('is-transforming');
        const paths = [
            ['-95px,-115px','-28deg'], ['105px,-90px','32deg'], ['-125px,20px','-18deg'],
            ['120px,35px','24deg'], ['-55px,110px','-35deg'], ['70px,125px','30deg']
        ];
        paths.forEach(([path, rotation], index) => {
            const butterfly = document.createElement('span');
            butterfly.className = 'heart-butterfly';
            butterfly.textContent = index % 2 ? '🦋' : '♡';
            butterfly.style.setProperty('--fly-x', path.split(',')[0]);
            butterfly.style.setProperty('--fly-y', path.split(',')[1]);
            butterfly.style.setProperty('--fly-r', rotation);
            button.appendChild(butterfly);
        });
        window.setTimeout(() => button.classList.add('is-playing'), 480);
        window.setTimeout(() => button.querySelectorAll('.heart-butterfly').forEach(item => item.remove()), 1100);
    };

    playButton.addEventListener('click', () => {
        releaseVideoButterflies(playButton);
        toggleVideo();
    });
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

    const newVideo = document.getElementById('monthThreeNewVideo');
    const newVideoFrame = newVideo?.closest('.month-three-new-video');
    const newVideoButton = document.getElementById('playMonthThreeNewVideo');
    if (newVideo && newVideoFrame) {
        newVideoButton?.addEventListener('click', () => {
            releaseVideoButterflies(newVideoButton);
            if (newVideo.paused) newVideo.play().catch(() => {});
        });
        newVideo.addEventListener('click', () => {
            if (newVideo.paused) newVideo.play().catch(() => {});
            else newVideo.pause();
        });
        newVideo.addEventListener('play', () => {
            newVideoFrame.classList.add('is-playing');
            newVideoButton?.classList.add('is-playing');
        });
        newVideo.addEventListener('pause', () => {
            newVideoFrame.classList.remove('is-playing');
            newVideoButton?.classList.remove('is-playing');
        });
        newVideo.addEventListener('ended', () => {
            newVideoFrame.classList.remove('is-playing');
            newVideoButton?.classList.remove('is-playing');
        });
    }

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
