```js
(() => {
    const photos = window.monthTwoPhotos || [];
    const mosaic = document.getElementById('memoryMosaic');
    const filters = document.getElementById('memoryFilters');
    const moreButton = document.getElementById('showMoreMemories');
    const dialog = document.getElementById('photoLightbox');
    const image = document.getElementById('lightboxPhoto');
    const caption = document.getElementById('lightboxCaption');
    const counter = document.getElementById('lightboxCounter');
    const previous = document.getElementById('previousMemory');
    const next = document.getElementById('nextMemory');
    const favorite = document.getElementById('favoriteMemory');
    const closeButton = document.getElementById('closeLightbox');

    if (!photos.length || !mosaic || !filters || !moreButton || !dialog || !image || !closeButton) {
        if (mosaic) mosaic.textContent = 'No se encontraron fotos para este capítulo.';
        return;
    }

    const pageSize = 24;
    let selectedDate = 'all';
    let visibleCount = pageSize;
    let current = 0;
    const favorites = new Set();
    let touchStartX = null;

    function filteredPhotos() {
        return selectedDate === 'all'
            ? photos
            : photos.filter(photo => photo.dateKey === selectedDate);
    }

    function dateLabel(photo) {
        if (!photo.dateKey) return 'Fecha sin identificar';

        const [year, month, day] = photo.dateKey.split('-').map(Number);

        return new Date(year, month - 1, day).toLocaleDateString('es-MX', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    function renderFilters() {
        const dates = [...new Set(photos.map(photo => photo.dateKey).filter(Boolean))];
        filters.replaceChildren();

        function addFilter(label, value, count) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `memory-filter${selectedDate === value ? ' is-selected' : ''}`;
            button.textContent = `${label} · ${count}`;
            button.setAttribute('aria-pressed', String(selectedDate === value));

            button.addEventListener('click', () => {
                selectedDate = value;
                visibleCount = pageSize;
                renderFilters();
                renderMosaic();
            });

            filters.append(button);
        }

        addFilter('Todos los recuerdos', 'all', photos.length);

        dates.forEach(date => {
            const group = photos.filter(photo => photo.dateKey === date);
            addFilter(dateLabel(group[0]), date, group.length);
        });
    }

    function openPhoto(index) {
        const activePhotos = filteredPhotos();
        const photo = activePhotos[index];

        if (!photo) return;

        current = index;
        image.style.opacity = '.35';
        image.src = photo.url;

        // La fecha ya no aparece visualmente.
        image.alt = 'Un instante de nuestro segundo mes';

        // Sin fecha en la fotografía ampliada.
        caption.textContent = 'Un recuerdo de nuestro segundo mes';

        counter.textContent = `${current + 1} de ${activePhotos.length}`;

        favorite.textContent = favorites.has(photo.url)
            ? '♥ Guardado en mis favoritos'
            : '♡ Guardar este instante';

        favorite.setAttribute(
            'aria-pressed',
            String(favorites.has(photo.url))
        );

        if (!dialog.open) dialog.showModal();
    }

    function move(amount) {
        const count = filteredPhotos().length;

        if (!count) return;

        current = (current + amount + count) % count;
        openPhoto(current);
    }

    function renderMosaic() {
        const activePhotos = filteredPhotos();
        const visible = activePhotos.slice(0, visibleCount);

        mosaic.replaceChildren();

        visible.forEach((photo, index) => {
            const button = document.createElement('button');

            button.type = 'button';
            button.className = 'memory-card';

            // Sin fecha en el texto accesible.
            button.setAttribute(
                'aria-label',
                'Abrir un recuerdo de nuestro segundo mes'
            );

            const thumbnail = document.createElement('img');

            thumbnail.src = photo.thumbnail || photo.url;
            thumbnail.alt = '';
            thumbnail.loading = 'lazy';
            thumbnail.decoding = 'async';

            thumbnail.addEventListener('error', () => {
                if (thumbnail.src !== photo.url) {
                    thumbnail.src = photo.url;
                }
            }, { once: true });

            const label = document.createElement('span');

            label.className = 'memory-card-label';

            // Texto de la foto sin fecha.
            label.textContent = 'Un instante nuestro';

            button.append(thumbnail, label);

            button.addEventListener('click', () => openPhoto(index));

            mosaic.append(button);
        });

        moreButton.hidden = visible.length >= activePhotos.length;

        moreButton.textContent =
            `Descubrir más recuerdos (${activePhotos.length - visible.length} restantes)`;
    }

    previous.addEventListener('click', () => move(-1));

    next.addEventListener('click', () => move(1));

    closeButton.addEventListener('click', () => dialog.close());

    moreButton.addEventListener('click', () => {
        visibleCount += pageSize;
        renderMosaic();
    });

    favorite.addEventListener('click', () => {
        const photo = filteredPhotos()[current];

        if (!photo) return;

        favorites.has(photo.url)
            ? favorites.delete(photo.url)
            : favorites.add(photo.url);

        favorite.textContent = favorites.has(photo.url)
            ? '♥ Guardado en mis favoritos'
            : '♡ Guardar este instante';

        favorite.setAttribute(
            'aria-pressed',
            String(favorites.has(photo.url))
        );
    });

    image.addEventListener('load', () => {
        image.style.opacity = '1';
    });

    image.addEventListener('error', () => {
        image.style.opacity = '1';
        image.alt = 'No se pudo abrir esta foto. Comprueba que ABRIR HISTORIA.bat siga ejecutándose.';
        caption.textContent = 'No pudimos abrir esta foto. Inicia el álbum con ABRIR HISTORIA.bat.';
    });

    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') move(-1);
        if (event.key === 'ArrowRight') move(1);
    });

    dialog.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    dialog.addEventListener('touchend', event => {
        if (touchStartX === null) return;

        const delta = event.changedTouches[0].clientX - touchStartX;

        touchStartX = null;

        if (Math.abs(delta) > 45) {
            move(delta > 0 ? -1 : 1);
        }
    }, { passive: true });

    renderFilters();
    renderMosaic();
})();
```

