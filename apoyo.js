(() => {
    const library = window.comfortLibrary || [];
    const photos = (window.memoryPhotos || []).filter(photo => photo.thumbnail);
    const message = document.getElementById('comfortMessage');
    const collage = document.getElementById('supportCollage');
    const categoryButtons = Array.from(document.querySelectorAll('[data-mood]'));
    const stepButtons = Array.from(document.querySelectorAll('[data-step-nav]'));
    const stepPanels = Array.from(document.querySelectorAll('[data-support-step]'));
    const stepIndicators = Array.from(document.querySelectorAll('.support-progress-step'));
    const messageCount = document.getElementById('messageCount');
    const nextButton = document.getElementById('nextMessage');
    const startButton = document.getElementById('startSupportJourney');
    const chooseAnotherMoodButton = document.getElementById('chooseAnotherMood');
    const openLetterButton = document.getElementById('openSupportLetter');
    const restartButton = document.getElementById('restartSupportJourney');
    const moodPicker = document.getElementById('moodPicker');
    const response = document.getElementById('supportResponse');
    const memoryPair = document.getElementById('supportMemoryPair');
    const musicPhoto = document.getElementById('supportMusicPhoto');
    const musicPhotoButton = document.getElementById('supportMusicPhotoButton');
    const letterStepHeading = document.getElementById('letterStepHeading');
    const videoButton = document.getElementById('openSupportVideos');
    const videoGrid = document.getElementById('supportVideoGrid');
    const videoCount = document.getElementById('supportVideoCount');
    const videoDialog = document.getElementById('supportVideoDialog');
    const videoPlayer = document.getElementById('supportVideoPlayer');
    const videoCaption = document.getElementById('supportVideoCaption');
    const closeVideo = document.getElementById('closeSupportVideo');
    const restartFromVideosButton = document.getElementById('restartSupportFromVideos');
    const shuffleButton = document.getElementById('shuffleCollage');
    const caption = document.getElementById('collageCaption');
    const dialog = document.getElementById('supportLightbox');
    const fullPhoto = document.getElementById('supportPhotoLarge');
    const photoCounter = document.getElementById('supportPhotoCounter');
    const closePhoto = document.getElementById('closeSupportPhoto');
    const previousPhoto = document.getElementById('previousSupportPhoto');
    const nextPhoto = document.getElementById('nextSupportPhoto');
    const messageCategory = document.getElementById('messageCategory');
    const longLetterMood = document.getElementById('longLetterMood');
    const longLetterTitle = document.getElementById('longLetterTitle');
    const longLetterBody = document.getElementById('longLetterBody');

    if (!message || !collage || !messageCount || !nextButton || !startButton ||
        !chooseAnotherMoodButton || !openLetterButton || !restartButton || !moodPicker ||
        !response || !memoryPair || !musicPhoto || !musicPhotoButton || !letterStepHeading ||
        !videoButton || !videoGrid || !videoCount || !videoDialog || !videoPlayer ||
        !videoCaption || !closeVideo || !restartFromVideosButton ||
        !stepButtons.length || !stepPanels.length || !stepIndicators.length ||
        !shuffleButton || !dialog || !fullPhoto || !closePhoto || !previousPhoto ||
        !nextPhoto || !messageCategory || !longLetterMood || !longLetterTitle || !longLetterBody) {
        throw new Error('Faltan elementos del recorrido de apoyo.');
    }

    const longLetters = [
        {
            title: 'Si hoy el corazón te pesa',
            paragraphs: [
                'Mi amor, si abriste esta carta porque el día se te hizo demasiado grande, quiero que por un momento dejes todo a un lado y respires. No tienes que encontrar ahora mismo una explicación para cada cosa ni resolverlo todo antes de dormir. Puedes llegar aquí cansada, triste, confundida o en silencio. Nada de eso hace que te quiera menos; yo te quiero entera, también en los días en que no te reconoces del todo.',
                'Ojalá pudiera acercarme, sentarme junto a ti y tomar tu mano sin pedirte que sonrías. Me quedaría contigo mientras pasa la ola, recordándote que un mal momento no es toda tu vida y que no tienes que atravesarlo fingiendo que estás bien. Si quieres hablar, te escucho. Si prefieres llorar, no te apuro. Si solo necesitas compañía, puedo estar a tu lado sin llenar el silencio.',
                'Mira alrededor de esta carta: cada fotografía guarda un instante verdadero que vivimos y que todavía me hace sentir cerca de ti. Ya hemos encontrado risas en días normales, calma en un abrazo y motivos para seguir eligiéndonos. No tienes que poder con todo hoy. Por ahora, déjame acompañarte con este cariño, una respiración a la vez. Estoy aquí, mi vida, y me importas muchísimo.'
            ]
        },
        {
            title: 'Si lo que necesitas es un abrazo',
            paragraphs: [
                'Ven, preciosa. Imagina que acabo de abrirte los brazos y que no tienes que explicar por qué llegaste así. Te acomodo cerquita, apoyo la mejilla sobre tu cabello y dejo que el abrazo dure todo lo que haga falta. No hay reloj ni prisa en este lugar; solo estamos tú y yo, y esa tranquilidad que aparece cuando no tenemos que ser fuertes por un momento.',
                'Te abrazaría por la espalda, te daría un beso suave en la frente y te preguntaría bajito si quieres que te escuche, que te haga reír o que simplemente me quede aquí. No tienes que escoger las palabras perfectas. Con mirarme o apretarme un poquito la mano me bastaría para entender que quieres que me quede.',
                'Mientras llega el próximo abrazo de verdad, deja que estas fotos te acerquen a algunos de los que ya nos dimos. Cada imagen es una pequeña prueba de que nuestros caminos se encontraron y de que entre los dos hemos ido construyendo un sitio cálido. Guárdate este abrazo imaginario alrededor de los hombros; lo hice pensando en ti y te lo mando con todo mi amor.'
            ]
        },
        {
            title: 'Si me estás extrañando',
            paragraphs: [
                'Yo también te encuentro en cosas pequeñas: en una canción que quisiera compartir contigo, en un lugar al que me gustaría llevarte, en una tontería que sé que te haría reír. Extrañarte no vuelve menos real lo nuestro; al contrario, me recuerda lo bonito que es tener a alguien cuya presencia puede cambiarle el color a un día entero.',
                'Elige una de estas fotos y vuelve a nuestro instante. No hace falta que sea la más perfecta ni la más bonita: a veces la que más guarda es una en la que apenas estábamos haciendo algo común. Ese día fue nuestro, ocurrió de verdad, y todavía tenemos muchos momentos por delante que un día se convertirán en recuerdos favoritos.',
                'Mientras vuelve a llegar el momento de vernos, te mando un beso lento en la frente y otro que te saque una sonrisa. Estoy aquí pensando en ti, guardándote un espacio en mis días y contando con cariño las historias que todavía nos faltan. La distancia puede alargar el camino, pero no cambia el lugar que tienes conmigo.'
            ]
        },
        {
            title: 'Si hoy dudas de ti',
            paragraphs: [
                'Quisiera prestarte mis ojos un ratito para que pudieras verte como te veo yo. Verías a una mujer llena de detalles irrepetibles: tu manera de preocuparte por quienes amas, tu risa cuando algo de verdad te divierte, tu carácter, tu ternura y esa fuerza que aparece incluso cuando dices que ya no puedes más.',
                'No tienes que demostrar nada ni compararte con nadie para merecer amor. No necesitas tener el día resuelto, sentirte bonita cada segundo ni acertar siempre. Yo no me enamoré de una versión perfecta; me enamoré de ti, de tu manera real de sentir, de hablar, de intentarlo y de volver a empezar cuando lo necesitas.',
                'Mira las imágenes de alrededor y recuerda que cada instante lo compartí contigo porque te elegí a ti. Me siento afortunado de conocerte de cerca, con tus ganas y tus dudas, con tus días ligeros y los difíciles. Si hoy no puedes reconocer todo lo que vales, déjame recordártelo yo: eres importante, eres querida y haces que mi vida sea más bonita.'
            ]
        },
        {
            title: 'Si estás agotada',
            paragraphs: [
                'Amor, puedes parar. No tienes que ganarte el descanso terminando cada pendiente ni seguir dando cuando ya sientes que no te queda nada. Me gustaría prepararte algo rico, acercarte una mantita y ayudarte a dejar por un ratito el peso del día en el suelo.',
                'Estoy orgulloso de ti por todo lo que haces, pero también quiero que sepas que no tienes que producir ni resolver para que yo te admire. Me gusta estar contigo cuando estás llena de energía y cuando solo quieres recostarte y cerrar los ojos. Tu compañía me basta; no tienes que entretenerme ni cuidar de mí ahora.',
                'Ojalá estas fotos te hagan compañía mientras tomas aire. Elige la que te dé paz, deja el teléfono un momento si lo necesitas y permite que tu cuerpo descanse. Mañana se verá con más calma. Por ahora, quédate con esta idea: no estás decepcionándome por estar cansada, mi amor; quisiera cuidarte y recordarte que también mereces recibir.'
            ]
        },
        {
            title: 'Si necesitas volver a reír',
            paragraphs: [
                'Tengo una misión importante para esta carta: conseguirte aunque sea una sonrisa chiquita. Si yo estuviera a tu lado, seguramente empezaría con uno de mis chistes dudosos, pondría una cara dramática y después fingiría que no estaba esperando tu risa con todas mis ganas.',
                'Busca una foto en el collage. Apuesto a que alguna tiene un detalle que solo nosotros entendemos: una expresión, un lugar, algo que pasó un segundo antes o después. Esos pequeños códigos nuestros me hacen feliz porque no necesitan explicación para el resto del mundo; basta con que tú y yo los recordemos.',
                'No te pido que dejes de sentir lo que sientes ni que te rías por compromiso. Solo quiero dejar una ventanita abierta para algo más ligero cuando te nazca. Si hoy aparece una sonrisa, aunque dure poquito, la celebro. Y si todavía no llega, también me quedo aquí: tus días difíciles no me espantan, mi vida.'
            ]
        },
        {
            title: 'Si necesitas sentirme cerca',
            paragraphs: [
                'Cierra los ojos un instante e imagina que estoy a tu lado, con mi mano buscando la tuya como tantas veces. No te digo nada extraordinario: solo te cuento que pensé en ti, que me haces falta y que me gusta muchísimo poder compartir contigo las cosas pequeñas de la vida.',
                'En las fotos hay lugares, gestos y pedacitos de nosotros. Puedes recorrerlos a tu ritmo y detenerte en el que hoy te haga sentir más acompañada. No son solo imágenes: son momentos que alguna vez vivimos juntos, con nuestras voces, nuestras bromas y todo ese cariño que no siempre se ve en la pantalla pero que sí estuvo ahí.',
                'Aunque hoy estemos en lugares distintos, sigo de tu lado. Me importa cómo estás, qué te preocupa y qué te haría sentir mejor. Si necesitas acercarte, aquí estoy; si necesitas contarme todo, te escucho; y si solo querías comprobar que tienes un lugar conmigo, aquí está mi respuesta: siempre guardo ese lugar para ti.'
            ]
        },
        {
            title: 'Si lo que necesitas es que te escuche',
            paragraphs: [
                'Te prometo que no tienes que ordenar la historia antes de contármela. Puedes empezar por donde sea, cambiar de tema, quedarte pensando o repetir la parte que más te dolió. Quiero conocerte también a través de lo que te cuesta decir, no para corregirte, sino para poder acercarme de la manera que te haga bien.',
                'No voy a medir tu emoción ni decirte que deberías sentir otra cosa. Lo que te pasa merece espacio porque te está pasando a ti, y tú eres alguien muy importante para mí. Si lo que necesitas es una pregunta, una opinión o simplemente que me quede escuchando hasta el final, podemos hacerlo a tu manera.',
                'Mientras encuentras tus palabras, quédate en esta página el tiempo que necesites. Puedes mirar las fotos y dejar que los recuerdos te den un poquito de calma. Cuando estés lista, aquí estoy para ti con atención, paciencia y cariño; no tienes que pedir permiso para apoyarte en mí.'
            ]
        },
        {
            title: 'Si ahora te sientes sola',
            paragraphs: [
                'Mi amor, sentirte sola en un momento no significa que no seas profundamente querida. A veces el silencio de una habitación o un día complicado hace que todo parezca más lejos, pero aquí tienes un pedacito mío que viene a sentarse a tu lado y a recordarte que tu existencia importa muchísimo para mí.',
                'Me gustaría estar ahí para prepararte un té, preguntarte cómo estuvo tu día y escuchar hasta los detalles que piensas que no son importantes. Me interesas tú, lo que te hizo sonreír, lo que te preocupó y también esas pequeñas historias que te dan vueltas en la cabeza. No tienes que tener un motivo urgente para buscarme.',
                'Mira las fotos alrededor como si fueran ventanas a momentos en que estuvimos juntos. Cada una guarda compañía, cercanía y un poquito de nuestro camino. Elige una, quédate con ella y piensa que en algún lugar estoy deseando darte un abrazo. No tienes que atravesar este rato sin cariño: aquí estoy, pensando en ti.'
            ]
        },
        {
            title: 'Si solo querías venir porque sí',
            paragraphs: [
                'Me encanta que también vengas sin una razón especial. No hace falta que algo salga mal, que me extrañes demasiado o que tengas una petición para que yo quiera recordarte cuánto te amo. A veces basta con que aparezcas por aquí y te lleves una palabra bonita para continuar tu día.',
                'Quiero que este pequeño rincón se parezca a nosotros: un poco de ternura, recuerdos que nos hacen sonreír y espacio para ser exactamente como somos. Cambia las fotos, encuentra una favorita, lee otra frase o quédate unos segundos mirando la carta. Todo lo que hay aquí lo hice pensando en ti.',
                'Gracias por existir en mi vida y por dejarme construir contigo una colección de instantes que puedo volver a visitar. Ojalá hoy encuentres algo que te alegre, aunque sea un poquito. Y si no, aquí queda esta certeza sencilla: me gusta quererte, me alegra que seas tú y puedes volver cuando quieras.'
            ]
        }
    ];

    const seenMessages = new Set();
    const seenPhotos = new Set();
    const photoHistoryKey = 'nuestra-historia-support-photo-history';
    try {
        const recentPhotos = JSON.parse(localStorage.getItem(photoHistoryKey) || '[]');
        if (Array.isArray(recentPhotos)) {
            recentPhotos.slice(-96).forEach(url => {
                if (typeof url === 'string') seenPhotos.add(url);
            });
        }
    } catch (error) {
        console.warn('No se pudo restaurar el historial de recuerdos.', error);
    }
    let selectedMood = 0;
    let stepTwoUnlocked = false;
    let stepThreeUnlocked = false;
    let musicMemory = null;
    let collagePhotos = [];
    let lightboxPhotos = [];
    let currentPhoto = 0;
    let touchStartX = null;
    let activeVideo = null;

    function updateMessageCount() {
        const total = library.reduce((count, category) => count + category.messages.length, 0);
        messageCount.textContent = `${seenMessages.size} de ${total} mensajes leídos`;
    }

    function showLongLetter(index) {
        const letter = longLetters[index];
        const category = library[index];
        longLetterMood.textContent = category ? category.name : 'Una carta para ti';
        longLetterTitle.textContent = letter.title;
        longLetterBody.replaceChildren();
        letter.paragraphs.forEach(text => {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            longLetterBody.append(paragraph);
        });
    }

    function showMessage() {
        if (!library.length) throw new Error('No hay mensajes de apoyo cargados.');
        const category = library[selectedMood];
        if (!category || !category.messages.length) throw new Error(`La categoría ${selectedMood} no tiene mensajes.`);

        let candidates = category.messages
            .map((text, index) => ({ text, key: `${selectedMood}:${index}` }))
            .filter(item => !seenMessages.has(item.key));

        if (!candidates.length) {
            candidates = category.messages.map((text, index) => ({ text, key: `${selectedMood}:${index}` }));
        }

        const chosen = candidates[Math.floor(Math.random() * candidates.length)];
        seenMessages.add(chosen.key);
        categoryButtons.forEach((button, index) => {
            button.setAttribute('aria-pressed', String(index === selectedMood));
        });
        message.textContent = chosen.text;
        messageCategory.textContent = category.name;
        showLongLetter(selectedMood);
        updateMessageCount();
    }

    function showStep(step, scroll = true) {
        if (step === 2 && !stepTwoUnlocked) return;
        if (step === 3 && !stepThreeUnlocked) return;

        stepPanels.forEach(panel => {
            panel.hidden = Number(panel.dataset.supportStep) !== step;
        });
        stepIndicators.forEach(indicator => {
            const isCurrent = Number(indicator.dataset.stepNav) === step;
            indicator.classList.toggle('is-current', isCurrent);
            if (isCurrent) indicator.setAttribute('aria-current', 'step');
            else indicator.removeAttribute('aria-current');
        });
        if (step === 3) letterStepHeading.textContent = longLetters[selectedMood].title;
        if (scroll) {
            document.getElementById(`supportStep${step}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function renderSupportMemoryPair() {
        memoryPair.replaceChildren();
        collagePhotos.slice(0, 2).forEach((photo, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'support-memory-photo';
            button.setAttribute('aria-label', `Abrir el recuerdo ${index + 1}`);

            const image = document.createElement('img');
            image.src = photo.thumbnail;
            image.alt = index === 0 ? 'Un recuerdo bonito de los dos' : 'Otro instante especial de nuestra historia';
            image.loading = 'eager';
            image.decoding = 'async';
            image.addEventListener('error', () => {
                button.hidden = true;
            }, { once: true });

            button.append(image);
            button.addEventListener('click', () => openLightbox(index));
            memoryPair.append(button);
        });
    }

    function setMusicMemory() {
        if (!photos.length) {
            musicPhotoButton.hidden = true;
            return;
        }

        const available = photos.filter(photo => !seenPhotos.has(photo.url));
        if (!available.length) seenPhotos.clear();
        musicMemory = (available.length ? available : photos)[Math.floor(Math.random() * (available.length || photos.length))];
        seenPhotos.add(musicMemory.url);
        musicPhoto.src = musicMemory.thumbnail;
        savePhotoHistory();
        musicPhoto.addEventListener('error', () => {
            musicPhotoButton.hidden = true;
        }, { once: true });
    }

    function shuffledPhotos() {
        const available = photos.filter(photo => !seenPhotos.has(photo.url));
        if (!available.length) {
            seenPhotos.clear();
            available.push(...photos);
        }

        for (let index = available.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [available[index], available[swapIndex]] = [available[swapIndex], available[index]];
        }
        return available;
    }

    function savePhotoHistory() {
        try {
            localStorage.setItem(photoHistoryKey, JSON.stringify(Array.from(seenPhotos).slice(-96)));
        } catch (error) {
            console.warn('No se pudo guardar el historial de recuerdos.', error);
        }
    }

    function renderVideos() {
        const videos = window.supportVideos || [];
        videoGrid.replaceChildren();
        videoCount.textContent = `${videos.length} recuerdos en video`;
        videos.forEach((video, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'support-video-card';
            button.setAttribute('aria-label', `Reproducir video ${index + 1}: ${video.title}`);

            const image = document.createElement('span');
            image.className = 'support-video-art';
            image.setAttribute('aria-hidden', 'true');
            image.style.setProperty('--video-hue', `${(index * 47) % 360}`);
            const play = document.createElement('span');
            play.className = 'support-video-play';
            play.textContent = '▶';
            image.append(play);

            const details = document.createElement('span');
            details.className = 'support-video-details';
            const title = document.createElement('strong');
            title.textContent = video.title;
            const collection = document.createElement('small');
            collection.textContent = `Un momento de nuestra historia · ${index + 1}`;
            details.append(title, collection);
            button.append(image, details);
            button.addEventListener('click', () => openVideo(video));
            videoGrid.append(button);
        });
    }

    function openVideo(video) {
        activeVideo = video;
        videoPlayer.pause();
        videoPlayer.src = video.url;
        videoCaption.textContent = `${video.title} · Un momento nuestro`;
        videoDialog.showModal();
        videoPlayer.play().catch(error => {
            if (error.name === 'NotAllowedError') {
                videoCaption.textContent = `${video.title} · Toca reproducir para ver este recuerdo.`;
                return;
            }
            videoCaption.textContent = 'Este video no está disponible en este momento.';
            console.error('No se pudo reproducir el recuerdo en video.', error);
        });
    }

    function closeActiveVideo() {
        videoPlayer.pause();
        videoPlayer.removeAttribute('src');
        videoPlayer.load();
        activeVideo = null;
        videoDialog.close();
    }

    function openLightbox(index) {
        if (!lightboxPhotos.length) return;
        currentPhoto = (index + lightboxPhotos.length) % lightboxPhotos.length;
        const photo = lightboxPhotos[currentPhoto];
        fullPhoto.src = photo.url;
        fullPhoto.alt = 'Un instante de nuestra historia';
        photoCounter.textContent = `${currentPhoto + 1} de ${lightboxPhotos.length} recuerdos`;
        if (!dialog.open) dialog.showModal();
    }

    function renderCollage() {
        if (!photos.length) {
            caption.textContent = 'Nuestros recuerdos esperan aquí.';
            return;
        }

        collagePhotos = shuffledPhotos().slice(0, 16);
        lightboxPhotos = collagePhotos;
        collage.replaceChildren();
        renderSupportMemoryPair();

        collagePhotos.forEach((photo, index) => {
            seenPhotos.add(photo.url);
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `floating-memory memory-position-${index + 1}`;
            button.setAttribute('aria-label', `Abrir el recuerdo ${index + 1}`);

            const image = document.createElement('img');
            image.src = photo.thumbnail;
            image.alt = '';
            image.loading = index < 8 ? 'eager' : 'lazy';
            image.decoding = 'async';
            image.addEventListener('error', () => {
                button.hidden = true;
            }, { once: true });

            const label = document.createElement('span');
            label.textContent = index % 3 === 0 ? 'Un instante nuestro' : index % 3 === 1 ? 'Contigo ♡' : 'De nuestra historia';
            button.append(image, label);
            button.addEventListener('click', () => openLightbox(index));
            collage.append(button);
        });

        savePhotoHistory();
        const categoryName = library[selectedMood] ? library[selectedMood].name : 'este momento';
        caption.textContent = `16 recuerdos distintos que acompañan tu carta: ${categoryName}.`;
    }

    startButton.addEventListener('click', () => {
        stepTwoUnlocked = true;
        stepIndicators.find(button => Number(button.dataset.stepNav) === 2).disabled = false;
        showStep(2);
    });

    categoryButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            selectedMood = index;
            showMessage();
            renderCollage();
            moodPicker.hidden = true;
            response.hidden = false;
            stepTwoUnlocked = true;
            stepThreeUnlocked = true;
            stepIndicators.forEach(indicator => {
                if (Number(indicator.dataset.stepNav) > 1) indicator.disabled = false;
            });
            showStep(2);
            message.focus({ preventScroll: true });
        });
    });

    stepButtons.forEach(button => {
        button.addEventListener('click', () => showStep(Number(button.dataset.stepNav)));
    });
    nextButton.addEventListener('click', () => {
        showMessage();
        renderCollage();
    });
    chooseAnotherMoodButton.addEventListener('click', () => {
        response.hidden = true;
        moodPicker.hidden = false;
        showStep(2);
        categoryButtons[0].focus({ preventScroll: true });
    });
    openLetterButton.addEventListener('click', () => showStep(3));
    videoButton.addEventListener('click', () => {
        stepThreeUnlocked = true;
        stepIndicators.find(button => Number(button.dataset.stepNav) === 4).disabled = false;
        showStep(4);
    });
    restartButton.addEventListener('click', () => showStep(1));
    restartFromVideosButton.addEventListener('click', () => showStep(1));
    musicPhotoButton.addEventListener('click', () => {
        if (!musicMemory) return;
        lightboxPhotos = [musicMemory];
        openLightbox(0);
    });
    shuffleButton.addEventListener('click', renderCollage);
    closePhoto.addEventListener('click', () => dialog.close());
    previousPhoto.addEventListener('click', () => openLightbox(currentPhoto - 1));
    nextPhoto.addEventListener('click', () => openLightbox(currentPhoto + 1));
    closeVideo.addEventListener('click', closeActiveVideo);
    videoDialog.addEventListener('click', event => {
        if (event.target === videoDialog) closeActiveVideo();
    });
    videoDialog.addEventListener('close', () => {
        if (activeVideo) {
            videoPlayer.pause();
            videoPlayer.removeAttribute('src');
            videoPlayer.load();
            activeVideo = null;
        }
    });
    videoPlayer.addEventListener('error', () => {
        if (videoDialog.open) videoCaption.textContent = 'Este video no está disponible en este momento.';
    });
    fullPhoto.addEventListener('error', () => {
        fullPhoto.alt = 'Este recuerdo no está disponible.';
    });
    dialog.addEventListener('click', event => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') openLightbox(currentPhoto - 1);
        if (event.key === 'ArrowRight') openLightbox(currentPhoto + 1);
    });
    dialog.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    dialog.addEventListener('touchend', event => {
        if (touchStartX === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(delta) > 45) openLightbox(currentPhoto + (delta > 0 ? -1 : 1));
    }, { passive: true });

    updateMessageCount();
    setMusicMemory();
    renderVideos();
    showStep(1, false);
})();
