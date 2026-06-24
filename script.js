const quizForm = document.getElementById('quizForm');
const resultsGrid = document.getElementById('resultsGrid');
const resultHint = document.getElementById('resultHint');
const scorePill = document.getElementById('scorePill');
const cityInput = document.getElementById('cityInput');
const resetBtn = document.getElementById('resetBtn');
const showBtn = document.getElementById('showBtn');
const notifyBtn = document.getElementById('notifyBtn');
const calendarBtn = document.getElementById('calendarBtn');
const shareBtn = document.getElementById('shareBtn');
const randomBtn = document.getElementById('randomBtn');

const questionTemplate = document.getElementById('questionTemplate');
const resultTemplate = document.getElementById('resultTemplate');

const questions = [
    {
        id: 'budget',
        label: 'Bütçe',
        options: [
            { value: 'low', label: 'Uygun fiyatlı', weight: 3 },
            { value: 'mid', label: 'Orta', weight: 2 },
            { value: 'high', label: 'Rahat harcarız', weight: 1 },
        ],
    },
    {
        id: 'vibe',
        label: 'Ruh hali',
        options: [
            { value: 'romantic', label: 'Romantik ve sakin', weight: 3 },
            { value: 'fun', label: 'Eğlenceli ve hareketli', weight: 3 },
            { value: 'cozy', label: 'Sıcak ve rahat', weight: 2 },
            { value: 'adventure', label: 'Biraz maceralı', weight: 1 },
        ],
    },
    {
        id: 'time',
        label: 'Ne kadar zaman var?',
        options: [
            { value: 'short', label: '1-2 saat', weight: 3 },
            { value: 'medium', label: '3-4 saat', weight: 2 },
            { value: 'long', label: 'Tüm akşam', weight: 1 },
        ],
    },
    {
        id: 'weather',
        label: 'Tercih',
        options: [
            { value: 'indoor', label: 'Kapalı alan', weight: 3 },
            { value: 'outdoor', label: 'Açık hava', weight: 3 },
            { value: 'mix', label: 'İkisi de olur', weight: 2 },
        ],
    },
    {
        id: 'goal',
        label: 'Date amacı',
        options: [
            { value: 'talk', label: 'Sohbet etmek', weight: 3 },
            { value: 'eat', label: 'Güzel bir şeyler yemek', weight: 3 },
            { value: 'activity', label: 'Aktivite yapmak', weight: 2 },
            { value: 'walk', label: 'Gezmek / yürüyüş', weight: 2 },
        ],
    },
];

const places = [
    {
        id: 'wine-bar',
        title: 'Şarap barı / sakin bistro',
        icon: '🍷',
        summary: 'Loş ışık, uzun sohbet ve daha özel bir akşam için iyi gider.',
        tags: ['romantic', 'cozy', 'mid', 'high', 'long', 'talk', 'indoor'],
        tips: ['Rezervasyon yapın', 'Müzik seviyesi düşük yer seçin', 'Tatlıyı paylaşın'],
    },
    {
        id: 'coffee',
        title: 'Üçüncü dalga kahveci',
        icon: '☕',
        summary: 'Kısa süreli, rahat ve sohbet odaklı date için ideal.',
        tags: ['low', 'mid', 'short', 'talk', 'indoor', 'cozy'],
        tips: ['İyi bir kahve + tatlı kombosu seçin', 'Oturma alanı geniş olan yerleri tercih edin', 'İlk buluşmada güvenli seçim'],
    },
    {
        id: 'park-walk',
        title: 'Park / sahil yürüyüşü',
        icon: '🌿',
        summary: 'Hava güzelse rahat ve doğal bir buluşma sağlar.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'romantic', 'adventure'],
        tips: ['Kahve alıp yürüyün', 'Hava durumunu kontrol edin', 'Fotoğraf noktası seçin'],
    },
    {
        id: 'activity',
        title: 'Bowling / bilardo / oyun kafe',
        icon: '🎯',
        summary: 'Konuşmanın yanında küçük bir rekabet olsun diyorsanız.',
        tags: ['fun', 'medium', 'long', 'activity', 'indoor', 'mix'],
        tips: ['Rezervasyon önemli olabilir', 'Kalabalık saatlerden kaçının', 'Kaybeden tatlı ısmarlasın'],
    },
    {
        id: 'dinner',
        title: 'Güzel akşam yemeği',
        icon: '🍝',
        summary: 'Biraz daha ciddi, keyifli ve uzun bir date planı.',
        tags: ['mid', 'high', 'long', 'eat', 'romantic', 'cozy', 'indoor'],
        tips: ['Önceden menü bakın', 'Ulaşımı kolay bir yer seçin', 'Tatlıyı paylaşın'],
    },
    {
        id: 'museum',
        title: 'Müze / sergi',
        icon: '🖼️',
        summary: 'Konuşma başlatmak kolay, daha farklı bir deneyim sunar.',
        tags: ['mid', 'long', 'talk', 'activity', 'indoor', 'mix'],
        tips: ['Sergi takvimini kontrol edin', 'Sessiz alanları tercih edin', 'Sonra kahve planlayın'],
    },
    {
        id: 'dessert',
        title: 'Tatlı + kahve turu',
        icon: '🍰',
        summary: 'Kısa, tatlı ve risksiz bir plan; küçük kaçamaklar için iyi.',
        tags: ['low', 'short', 'cozy', 'talk', 'eat', 'indoor'],
        tips: ['İki farklı tatlı deneyin', 'Instagram yerine sohbet odaklı olun', 'Yakında yürüyüş ekleyin'],
    },
];

const state = {
    answers: {},
    results: [],
    calendarBlobUrl: null,
};

function renderQuestions() {
    quizForm.innerHTML = '';

    questions.forEach((question) => {
        const node = questionTemplate.content.cloneNode(true);
        const article = node.querySelector('.question-card');
        const title = node.querySelector('h3');
        const optionsWrap = node.querySelector('.option-list');

        title.textContent = question.label;
        article.dataset.questionId = question.id;

        question.options.forEach((option, index) => {
            const optionId = `${question.id}-${option.value}`;
            const label = document.createElement('label');
            label.className = 'option-item';
            label.innerHTML = `
                <input type="radio" name="${question.id}" id="${optionId}" value="${option.value}">
                <span>${option.label}</span>
            `;
            optionsWrap.appendChild(label);

            label.querySelector('input').addEventListener('change', () => {
                state.answers[question.id] = option.value;
            });
        });

        quizForm.appendChild(node);
    });
}

function scorePlace(place) {
    return questions.reduce((score, question) => {
        const answer = state.answers[question.id];
        if (!answer) return score;
        const selectedOption = question.options.find((item) => item.value === answer);
        if (!selectedOption) return score;

        return place.tags.includes(answer) ? score + selectedOption.weight : score;
    }, 0);
}

function getRecommendations() {
    return places
        .map((place) => ({ ...place, score: scorePlace(place) }))
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 3);
}

function normalizeCity() {
    return cityInput.value.trim();
}

function mapsQuery(placeTitle) {
    const city = normalizeCity();
    const fullQuery = city ? `${placeTitle}, ${city}` : placeTitle;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullQuery)}`;
}

function renderResults(results) {
    resultsGrid.innerHTML = '';

    results.forEach((place, index) => {
        const node = resultTemplate.content.cloneNode(true);
        const article = node.querySelector('.result-card');
        const icon = node.querySelector('.result-icon');
        const title = node.querySelector('h3');
        const summary = node.querySelector('p');
        const list = node.querySelector('ul');
        const mapLink = node.querySelector('.map-link');

        article.style.setProperty('--delay', `${index * 90}ms`);
        icon.textContent = place.icon;
        title.textContent = place.title;
        summary.textContent = place.summary;
        mapLink.href = mapsQuery(place.title);

        place.tips.forEach((tip) => {
            const li = document.createElement('li');
            li.textContent = tip;
            list.appendChild(li);
        });

        resultsGrid.appendChild(node);
    });
}

function buildShareText(results) {
    const city = normalizeCity();
    const top = results.map((result, index) => `${index + 1}. ${result.title}`).join('\n');

    return [
        'Date önerilerimiz:',
        city ? `Konum: ${city}` : null,
        top,
        'İstersen takvime ekleyip planlayalım.',
    ]
        .filter(Boolean)
        .join('\n');
}

function createIcsFile(results) {
    const top = results[0];
    const city = normalizeCity();
    const start = new Date();
    start.setDate(start.getDate() + 2);
    start.setHours(19, 0, 0, 0);

    const end = new Date(start);
    end.setHours(end.getHours() + 2);

    const pad = (value) => String(value).padStart(2, '0');
    const format = (date) => (
        `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}` +
        `T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
    );
    const eventId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `date-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const eventTitle = `Date Night - ${top.title}`;
    const location = city ? `${top.title}, ${city}` : top.title;
    const description = `Öneri: ${top.title} | ${top.summary}`;

    return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Date Finder//TR',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${eventId}`,
        `DTSTAMP:${format(new Date())}`,
        `DTSTART:${format(start)}`,
        `DTEND:${format(end)}`,
        `SUMMARY:${eventTitle}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ].join('\r\n');
}

function downloadIcs(results) {
    const ics = createIcsFile(results);
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });

    if (state.calendarBlobUrl) {
        URL.revokeObjectURL(state.calendarBlobUrl);
    }

    state.calendarBlobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = state.calendarBlobUrl;
    a.download = 'date-plan.ics';
    a.click();
}

async function shareResults(results) {
    const text = buildShareText(results);

    if (navigator.share) {
        await navigator.share({
            title: 'Date önerileri',
            text,
            url: window.location.href,
        });
        return;
    }

    await navigator.clipboard.writeText(text);
    scorePill.textContent = 'Kopyalandı';
}

function setActionState(enabled) {
    calendarBtn.disabled = !enabled;
    shareBtn.disabled = !enabled;
    randomBtn.disabled = !enabled;
}

function showRecommendations() {
    state.results = getRecommendations();

    if (!state.results.length || state.results.every((item) => item.score === 0)) {
        resultHint.textContent = 'Biraz daha bilgi gerekir. Soruları doldurunca daha net öneriler gelir.';
        scorePill.textContent = 'Bekliyor';
        resultsGrid.innerHTML = '';
        setActionState(false);
        return;
    }

    const city = normalizeCity();
    resultHint.textContent = city
        ? `${city} için öneriler hazır.`
        : 'Öneriler hazır. Şehir girerseniz harita bağlantıları daha net olur.';

    scorePill.textContent = 'Hazır';
    renderResults(state.results);
    setActionState(true);
}

function randomMatch() {
    const shuffled = [...places].sort(() => Math.random() - 0.5).slice(0, 3);
    state.results = shuffled;
    resultHint.textContent = 'Rastgele bir kombinasyon seçildi.';
    scorePill.textContent = 'Rastgele';
    renderResults(shuffled);
    setActionState(true);
}

async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        resultHint.textContent = 'Bu tarayıcı bildirim desteklemiyor.';
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        resultHint.textContent = 'Bildirim izni verildi. İstersen şimdi bir hatırlatma yollayabilirim.';
        setTimeout(() => {
            new Notification('Date Finder', {
                body: 'Date planın hazır. İstersen takvime ekleyebilirsin.',
            });
        }, 1000);
    } else {
        resultHint.textContent = 'Bildirim izni verilmedi.';
    }
}

function resetForm() {
    state.answers = {};
    state.results = [];
    quizForm.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.checked = false;
    });
    cityInput.value = '';
    resultsGrid.innerHTML = '';
    resultHint.textContent = 'Soruları cevaplayıp önerileri görün.';
    scorePill.textContent = 'Hazır';
    setActionState(false);
}

showBtn.addEventListener('click', showRecommendations);
randomBtn.addEventListener('click', randomMatch);
resetBtn.addEventListener('click', resetForm);
notifyBtn.addEventListener('click', requestNotificationPermission);
calendarBtn.addEventListener('click', () => downloadIcs(state.results));
shareBtn.addEventListener('click', () => shareResults(state.results));
cityInput.addEventListener('input', () => {
    if (state.results.length) showRecommendations();
});

setActionState(false);
renderQuestions();