(() => {
    const collage = document.getElementById('foreverCollage');
    const dialog = document.getElementById('foreverPhotoLightbox');
    const fullPhoto = document.getElementById('foreverPhotoFull');
    const closeButton = document.getElementById('closeForeverPhoto');
    const photos = (window.memoryPhotos || []).filter(photo => photo.thumbnail);

    if (!collage || !dialog || !fullPhoto || !closeButton) return;
    if (photos.length < 8) {
        console.error('No hay suficientes recuerdos con miniatura para decorar el capítulo infinito.');
        return;
    }

    const shuffled = [...photos];
    for (let index = shuffled.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }

    shuffled.slice(0, 8).forEach((photo, index) => {
        const button = document.createElement('button');
        button.className = `floating-memory forever-memory forever-memory-${index + 1}`;
        button.type = 'button';
        button.setAttribute('aria-label', `Abrir recuerdo ${index + 1}`);

        const image = document.createElement('img');
        image.src = photo.thumbnail;
        image.alt = `Un recuerdo nuestro, ${index + 1}`;
        image.loading = 'lazy';

        const caption = document.createElement('span');
        caption.textContent = index % 2 === 0 ? 'Un instante nuestro' : 'Contigo, siempre ♡';
        button.append(image, caption);

        button.addEventListener('click', () => {
            fullPhoto.src = photo.url;
            fullPhoto.alt = image.alt;
            dialog.showModal();
        });

        image.addEventListener('error', () => {
            button.remove();
            console.error(`No se pudo cargar la miniatura del recuerdo: ${photo.thumbnail}`);
        }, { once: true });

        collage.append(button);
    });

    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
        fullPhoto.removeAttribute('src');
    });
})();
