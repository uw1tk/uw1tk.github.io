const quizForm = document.getElementById('quizForm');
const resultsGrid = document.getElementById('resultsGrid');
const resultHint = document.getElementById('resultHint');
const scorePill = document.getElementById('scorePill');
const cityInput = document.getElementById('cityInput');
const dateInput = document.getElementById('dateInput');
const timeInput = document.getElementById('timeInput');
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
        id: 'kugulu-park',
        title: 'Kuğulu Park',
        icon: '🦢',
        summary: 'Çankaya’da sakin yürüyüş ve sohbet için klasik bir Ankara date noktası.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'romantic', 'cozy', 'talk'],
        tips: ['Kahveyle gidin', 'Akşamüstü ışığı güzel olur', 'Kısa ve rahat planlar için ideal'],
    },
    {
        id: 'segmenler-parki',
        title: 'Seğmenler Parkı',
        icon: '🌳',
        summary: 'Sakin atmosferiyle yürüyüş, bankta sohbet ve piknik tadında date için uygun.',
        tags: ['low', 'short', 'walk', 'outdoor', 'romantic', 'cozy', 'talk'],
        tips: ['Yanınıza içecek alın', 'Kalabalık olmayan saatleri seçin', 'Fotoğraf için güzel köşeler var'],
    },
    {
        id: 'botanik-park',
        title: 'Botanik Parkı',
        icon: '🌸',
        summary: 'Yürüyüş ve açık hava isteyen çiftler için Ankara’nın bilinen romantik alanlarından biri.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'romantic', 'adventure', 'cozy'],
        tips: ['Hava durumuna bakın', 'Kısa yürüyüş + kahve kombinasyonu iyi gider', 'Hafta sonu erken saatler daha sakin olur'],
    },
    {
        id: 'atakule',
        title: 'Atakule',
        icon: '🏙️',
        summary: 'Manzara, yeme-içme ve şehir içinde daha özel bir akşam planı için güçlü bir seçenek.',
        tags: ['mid', 'high', 'long', 'eat', 'romantic', 'indoor', 'mix'],
        tips: ['Rezervasyon düşünün', 'Gün batımı saatleri iyi olur', 'Manzara için erken gidin'],
    },
    {
        id: 'cermodern',
        title: 'CerModern',
        icon: '🖼️',
        summary: 'Sergi, kültür ve sonrasında kahveyle uzatılabilecek şık bir date noktası.',
        tags: ['mid', 'long', 'talk', 'activity', 'indoor', 'mix', 'cozy'],
        tips: ['Güncel sergi programını kontrol edin', 'Sonra yakınlarda kahve planlayın', 'Sessiz ve sohbeti açan bir ortam sunar'],
    },
    {
        id: 'hamamonu',
        title: 'Hamamönü',
        icon: '🏛️',
        summary: 'Tarihi sokaklar, çay-kahve molası ve yürüyüş için Ankara’nın popüler buluşma alanlarından.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'talk', 'romantic'],
        tips: ['Akşam ışıklarını yakalayın', 'Sokak aralarında dolaşın', 'Tatlı molası ekleyin'],
    },
    {
        id: 'eymir-golu',
        title: 'Eymir Gölü',
        icon: '🚴',
        summary: 'Bisiklet, yürüyüş ve uzun sohbet için Ankara’da en bilinen açık hava date noktalarından biri.',
        tags: ['low', 'long', 'walk', 'outdoor', 'adventure', 'romantic', 'talk'],
        tips: ['Bisiklet kiralama düşünün', 'Gün batımına kalın', 'Hafif bir atıştırmalık alın'],
    },
    {
        id: 'mogan-golu',
        title: 'Mogan Gölü',
        icon: '🌊',
        summary: 'Göl kenarında yürüyüş ve sakin bir akşam isteyenler için uygun bir Gölbaşı seçeneği.',
        tags: ['low', 'long', 'walk', 'outdoor', 'romantic', 'cozy', 'talk'],
        tips: ['Hava uygunsa en keyiflisi akşamüstü', 'Kenar yürüyüşünü planlayın', 'Fotoğraf ve oturma molası iyi olur'],
    },
    {
        id: 'altinpark',
        title: 'Altınpark',
        icon: '🎡',
        summary: 'Açık alan, yürüyüş ve rahat tempo isteyen çiftler için geniş bir seçenek.',
        tags: ['low', 'medium', 'walk', 'outdoor', 'mix', 'fun'],
        tips: ['Kalabalık olmayan saatleri seçin', 'Kısa bir aktivite ekleyin', 'Ulaşımı önceden planlayın'],
    },
    {
        id: 'goksu-park',
        title: 'Göksu Parkı',
        icon: '🌿',
        summary: 'Su kenarı, yürüyüş ve oturup konuşmak için Batıkent tarafında bilinen bir alan.',
        tags: ['low', 'long', 'walk', 'outdoor', 'talk', 'cozy', 'romantic'],
        tips: ['Gün batımı saatleri güzel olur', 'Daha sakin köşeleri tercih edin', 'Kahve molası ekleyin'],
    },
    {
        id: 'ahlatlibel',
        title: 'Ahlatlıbel Atatürk Parkı',
        icon: '🧺',
        summary: 'Piknik, yürüyüş ve rahat bir açık hava date’i için güzel bir alternatif.',
        tags: ['low', 'long', 'walk', 'outdoor', 'mix', 'cozy', 'activity'],
        tips: ['Yanınıza küçük bir piknik alın', 'Hafta içi daha sakindir', 'Gün boyu uzatılabilir'],
    },
    {
        id: 'cso-ada',
        title: 'CSO Ada Ankara',
        icon: '🎼',
        summary: 'Konser, etkinlik ve sonrasında yemek/kahveyle tamamlanan daha özel bir date için uygun.',
        tags: ['high', 'long', 'activity', 'indoor', 'romantic', 'mix'],
        tips: ['Etkinlik takvimine bakın', 'Biletleri erken alın', 'Sonrasında yürüyüş ya da tatlı planlayın'],
    },
    {
        id: 'ankara-kalesi',
        title: 'Ankara Kalesi ve çevresi',
        icon: '🏰',
        summary: 'Manzara, gezi ve tarih seven çiftler için şehir merkezinde karakterli bir rota.',
        tags: ['mid', 'long', 'walk', 'outdoor', 'adventure', 'talk', 'mix'],
        tips: ['Dar sokaklarda rahat ayakkabı giyin', 'Gün batımını yakalamaya çalışın', 'Kale çevresinde kahve molası verin'],
    },
    {
        id: 'ataturk-orman-ciftligi',
        title: 'Atatürk Orman Çiftliği',
        icon: '🌾',
        summary: 'Geniş alanı sayesinde rahat yürüyüş, kahve ve uzun sohbet için iyi bir seçenek.',
        tags: ['low', 'long', 'walk', 'outdoor', 'mix', 'cozy', 'talk'],
        tips: ['Hafta sonu erken gidin', 'Yürüyüş sonrası bir şeyler için uygun', 'Açık hava planı için güzel'],
    },
    {
        id: 'genclik-parki',
        title: 'Gençlik Parkı',
        icon: '🎠',
        summary: 'Klasik bir Ankara buluşması; gezme, oturma ve kısa etkinliklerle rahat ilerler.',
        tags: ['low', 'short', 'medium', 'walk', 'outdoor', 'fun', 'mix'],
        tips: ['Akşam kalabalığına dikkat edin', 'Kısa date için iyi', 'Ulaşımı kolay bir merkez noktadır'],
    },
    {
        id: 'dikmen-vadisi',
        title: 'Dikmen Vadisi',
        icon: '🌉',
        summary: 'Yürüyüş ve sakin konuşma için uzun rota isteyen çiftlere uygun bir açık alan.',
        tags: ['low', 'long', 'walk', 'outdoor', 'romantic', 'talk'],
        tips: ['Rahat ayakkabı giyin', 'Akşamüstü daha keyifli olur', 'Kısa molalar verecek yerler seçin'],
    },
    {
        id: 'mavi-gol',
        title: 'Mavi Göl',
        icon: '💙',
        summary: 'Piknik, yürüyüş ve göl kenarında sakin bir date için Ankara’nın bilinen alanlarından biri.',
        tags: ['low', 'long', 'walk', 'outdoor', 'cozy', 'romantic', 'adventure'],
        tips: ['Piknik için küçük hazırlık yapın', 'Gün içinde hava durumunu kontrol edin', 'Fotoğraf için güzel manzaralar sunar'],
    },
    {
        id: 'rahmi-koc-muzesi',
        title: 'Rahmi M. Koç Müzesi Ankara',
        icon: '🚂',
        summary: 'Sohbeti kolaylaştıran, gezerken vakit akıtan kültür ve aktivite odaklı bir seçenek.',
        tags: ['mid', 'long', 'activity', 'indoor', 'talk', 'mix'],
        tips: ['Sergileri rahat gezmek için zaman ayırın', 'Sonra kahve planlayın', 'Farklı bir date havası verir'],
    },
    {
        id: 'anadolu-medeniyetleri',
        title: 'Anadolu Medeniyetleri Müzesi',
        icon: '🏺',
        summary: 'Tarih ve kültür seven çiftler için konuşma açan, keyifli bir kapalı alan alternatifi.',
        tags: ['mid', 'long', 'activity', 'indoor', 'talk', 'mix'],
        tips: ['Sessiz ve rahat gezilir', 'Sonrasında kısa yürüyüş ekleyin', 'Kültür date’i için güçlü bir aday'],
    },
    {
        id: 'resim-heykel-muzesi',
        title: 'Ankara Resim ve Heykel Müzesi',
        icon: '🎨',
        summary: 'Sanat odaklı, sakin ve birbirinizi daha iyi tanıyabileceğiniz bir buluşma noktası.',
        tags: ['mid', 'long', 'activity', 'indoor', 'talk', 'romantic'],
        tips: ['Sergi akışına göre gezmeyi planlayın', 'Sonrasında kahve molası iyi gider', 'Daha sakin bir tempo sunar'],
    },
    {
        id: 'haci-bayram',
        title: 'Hacı Bayram Veli çevresi',
        icon: '🕌',
        summary: 'Tarihi atmosfer, yürüyüş ve çevrede çay/kahve molasıyla farklı bir rota sunar.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'talk'],
        tips: ['Kalabalığa göre saati ayarlayın', 'Yakındaki tarihi noktaları gezebilirsiniz', 'Kısa gezi için uygun'],
    },
    {
        id: 'bahcelievler-7-cadde',
        title: 'Bahçelievler 7. Cadde',
        icon: '🛍️',
        summary: 'Kafe, yemek ve kısa yürüyüş için Ankara’da en bilinen canlı akslardan biri.',
        tags: ['mid', 'short', 'walk', 'eat', 'indoor', 'mix', 'fun'],
        tips: ['Kafe seçeneği bol', 'Akşam saatlerinde hareketlidir', 'Spontane planlar için iyi'],
    },
    {
        id: 'tunali-hilmi',
        title: 'Tunalı Hilmi Caddesi',
        icon: '☕',
        summary: 'Kahve, yemek ve şehir içi kısa date planları için çok kullanılan bir Ankara klasiği.',
        tags: ['mid', 'short', 'walk', 'eat', 'indoor', 'mix', 'talk'],
        tips: ['Kafe ve restoran seçeneği çok', 'Kısa buluşmalar için uygun', 'Ulaşım açısından avantajlı'],
    },
    {
        id: 'armada',
        title: 'Armada AVM',
        icon: '🏬',
        summary: 'Hava durumundan bağımsız, yemek ve sinema gibi planlar için pratik bir seçenek.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix', 'fun'],
        tips: ['Sinema + yemek planı yapılabilir', 'Kapalı alan gerektiğinde iyi olur', 'Kolay ulaşılabilir'],
    },
    {
        id: 'panora',
        title: 'Panora AVM',
        icon: '✨',
        summary: 'Rahat yemek, kahve ve alışverişe uzatılabilen modern bir buluşma ortamı.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix'],
        tips: ['Özellikle yağmurlu günlerde iyi', 'Kafe ve restoran seçeneği var', 'Planı uzatmak kolay'],
    },
    {
        id: 'next-level',
        title: 'Next Level AVM',
        icon: '🏙️',
        summary: 'Şehir içinde yemek, kahve ve etkinlik odaklı daha modern bir date alanı.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix', 'high'],
        tips: ['Akşam planı için uygun', 'Kapalı alan konforu sağlar', 'Kolay kombinlenebilir bir nokta'],
    },
    {
        id: 'cukurambar',
        title: 'Çukurambar kafe ve restoran bölgesi',
        icon: '🍽️',
        summary: 'Yemek, kahve ve uzun sohbet için çok sayıda seçenek sunan popüler bir semt.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Rezervasyon işinizi kolaylaştırır', 'Geniş menü seçenekleri var', 'Daha rahat bir akşam için uygun'],
    },
    {
        id: 'kocatepe',
        title: 'Kocatepe çevresi',
        icon: '🕊️',
        summary: 'Merkezde kısa yürüyüş, çevre keşfi ve kahve molasıyla sakin bir rota sunar.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'talk'],
        tips: ['Kısa bir durak olarak düşünün', 'Yakında kahve molası eklenebilir', 'Merkezde buluşmak için uygun'],
    },
    {
        id: 'karum-avm',
        title: 'Karum AVM',
        icon: '🛒',
        summary: 'Tunalı’ya yakın, kahve ve yemek için merkezi bir kapalı mekan alternatifi.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk', 'cozy'],
        tips: ['Merkezde buluşmak için rahat', 'Kafe ve restoran seçenekleri var', 'Yağmurlu günlerde iyi gider'],
    },
    {
        id: 'tunus-caddesi',
        title: 'Tunus Caddesi',
        icon: '☕',
        summary: 'Kafe, bar ve küçük restoranlarıyla Tunalı hattında en canlı merkezlerden biri.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk', 'fun'],
        tips: ['Akşam saatlerinde hareketlidir', 'Kafe seçeneği çoktur', 'Kısa date için uygundur'],
    },
    {
        id: 'filistin-caddesi',
        title: 'Filistin Caddesi',
        icon: '🍸',
        summary: 'Kavaklıdere tarafında daha sakin ama şık kafe ve bar seçenekleri sunar.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy', 'talk'],
        tips: ['Rezervasyon yararlı olabilir', 'Akşam planı için güzel', 'Daha sakin bir atmosfer arayanlara uygun'],
    },
    {
        id: 'bestekar-sokak',
        title: 'Bestekar Sokak',
        icon: '🍷',
        summary: 'Tunalı çevresinde yemek, içecek ve sohbet odaklı kapalı mekanların yoğun olduğu sokak.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'romantic'],
        tips: ['Akşam yemeği için güçlü seçenek', 'Sakin masa bulunabilir', 'Merkezi ulaşım avantajı var'],
    },
    {
        id: 'karanfil-sokak',
        title: 'Karanfil Sokak',
        icon: '🌙',
        summary: 'Kızılay’a yakın, kafe ve restoran ağırlıklı merkezi bir buluşma rotası.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk'],
        tips: ['Kısa bir kahve buluşması için uygun', 'Merkezde buluşmayı kolaylaştırır', 'Yemek sonrası yürüyüş eklenebilir'],
    },
    {
        id: 'konur-sokak',
        title: 'Konur Sokak',
        icon: '🎯',
        summary: 'Kızılay merkezinde yemek, tatlı ve kahve için çok seçenek sunan canlı bir sokak.',
        tags: ['mid', 'short', 'eat', 'indoor', 'fun', 'mix', 'talk'],
        tips: ['Spontane planlar için iyi', 'Kısa date’lerde pratik', 'Merkeze ulaşım kolay'],
    },
    {
        id: 'sakarya-caddesi',
        title: 'Sakarya Caddesi',
        icon: '🍽️',
        summary: 'Kızılay’da yemek, tatlı ve kahve için bilinen kapalı mekan koridorlarından biri.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'cozy', 'talk'],
        tips: ['Akşam kalabalığına göre saat seçin', 'Tatlı turu için uygun', 'Yemek planı kolay yapılır'],
    },
    {
        id: 'guvenpark',
        title: 'Güvenpark çevresi',
        icon: '🚇',
        summary: 'Merkezde kısa buluşma ve devamında kafe/restoran planı için pratik bir nokta.',
        tags: ['low', 'short', 'walk', 'outdoor', 'mix', 'talk'],
        tips: ['Kısa buluşma noktası olarak iyi', 'Sonrasında Kızılay içi plan yapın', 'Ulaşımı çok kolaydır'],
    },
    {
        id: 'kizilay-avm',
        title: 'Kızılay AVM',
        icon: '🏬',
        summary: 'Merkezde kapalı mekan, yemek ve kahve için en pratik buluşma alanlarından biri.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk'],
        tips: ['Hava durumundan bağımsız', 'Buluşma noktası olarak kolay', 'Sonrasında Kızılay’a bağlanabilir'],
    },
    {
        id: 'cepa-avm',
        title: 'Cepa AVM',
        icon: '🛍️',
        summary: 'Yemek, sinema ve kahveyle rahat akacak kapalı mekan date’i için iyi bir merkez.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix', 'fun'],
        tips: ['Film + yemek kombosu yapılabilir', 'Kalabalık saatleri kontrol edin', 'Kolay ve konforlu bir seçenek'],
    },
    {
        id: 'kentpark-avm',
        title: 'Kentpark AVM',
        icon: '✨',
        summary: 'Yemek, kahve ve alışverişi tek çatı altında toplamak isteyenler için merkezi bir seçenek.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix'],
        tips: ['Uzun oturmalı date için uygun', 'Kapalı mekan arayanlara iyi', 'Akşamı rahat uzatır'],
    },
    {
        id: 'gordion-avm',
        title: 'Gordion AVM',
        icon: '🏙️',
        summary: 'Bilkent tarafında yemek ve kahve için rahat, kapalı ve güvenli bir seçenek.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk'],
        tips: ['Bilkent çevresine yakın', 'Kapalı alanda rahat buluşma', 'Planı uzatmak kolay'],
    },
    {
        id: 'bilkent-center',
        title: 'Bilkent Center',
        icon: '☕',
        summary: 'Yemek, kahve ve rahat oturum için şehir içindeki popüler kapalı buluşma noktalarından.',
        tags: ['mid', 'high', 'eat', 'indoor', 'cozy', 'talk'],
        tips: ['Daha sakin masa bulunabilir', 'Akşam yemeği için uygun', 'Bilkent tarafında merkezî sayılır'],
    },
    {
        id: 'kuzu-effect',
        title: 'Kuzu Effect AVM',
        icon: '💎',
        summary: 'Modern restoranlar ve kafelerle kapalı date planı için iyi bir Söğütözü seçeneği.',
        tags: ['mid', 'high', 'eat', 'indoor', 'mix', 'romantic'],
        tips: ['Akşam yemeği için uygun', 'Rezervasyon düşünebilirsiniz', 'Şık bir ortam sunar'],
    },
    {
        id: 'one-tower',
        title: 'One Tower AVM',
        icon: '🌆',
        summary: 'Restoran ve kahve seçenekleriyle özellikle akşam planlarında işe yarayan kapalı mekan.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Söğütözü aksında iyi bir seçenek', 'Kaliteli restoranlar bulunabilir', 'Akşam için hoş bir rota'],
    },
    {
        id: 'metromall',
        title: 'Metromall AVM',
        icon: '🏬',
        summary: 'Sinema, yemek ve kahve odaklı rahat bir kapalı mekan seçeneği.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix', 'fun'],
        tips: ['Film sonrası kahve iyi olur', 'Hava şartlarından bağımsız', 'Rahat ve planlı bir date sağlar'],
    },
    {
        id: 'ankamall',
        title: 'AnkaMall',
        icon: '🎬',
        summary: 'Sinema, yemek ve alışverişi birleştirmek isteyenler için büyük ve pratik bir kapalı alan.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix'],
        tips: ['Ulaşımı kolaydır', 'Geniş seçenek sunar', 'Kötü havada güvenli plan'],
    },
    {
        id: 'taurus-avm',
        title: 'Taurus AVM',
        icon: '🛍️',
        summary: 'Yemek ve sinema için bir başka kapalı, kolay planlanabilen merkez.',
        tags: ['mid', 'short', 'eat', 'activity', 'indoor', 'mix'],
        tips: ['Pratik buluşma noktası', 'Kısa date’te iş görür', 'Kapalı alan arayanlara uygun'],
    },
    {
        id: 'sogutozu-plaza',
        title: 'Söğütözü plaza kafe-restoranları',
        icon: '🏢',
        summary: 'Merkezi iş bölgesinde, özellikle akşam yemeği ve kahve için çok sayıda kapalı seçenek sunar.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Rezervasyon avantaj sağlar', 'İş çıkışı sonrası uygun', 'Sakin oturumlu yerler bulunabilir'],
    },
    {
        id: 'kavaklidere-kafe',
        title: 'Kavaklıdere kafe ve bar rotası',
        icon: '🍷',
        summary: 'Merkezde, daha şık ve çoğunlukla kapalı mekan ağırlıklı date için güçlü bir bölge.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy', 'talk'],
        tips: ['Akşam planı için ideal', 'Butik mekanlar bulunur', 'Tunalı hattına kolay bağlanır'],
    },
    {
        id: 'tunalı-cafe',
        title: 'Tunalı Hilmi kafe rotası',
        icon: '☕',
        summary: 'Tunalı çevresinde kahve, tatlı ve uzun sohbet için çok sayıda kapalı seçenek sunar.',
        tags: ['mid', 'short', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['İlk buluşma için güvenli', 'Kahve sonrası yürüyüş eklenebilir', 'Merkezde kalmak isteyenlere uygun'],
    },
    {
        id: 'bahceli-kafe',
        title: 'Bahçelievler kafe ve restoran rotası',
        icon: '🍔',
        summary: 'Bahçeli tarafında yemek, tatlı ve kapalı mekanda rahat sohbet için çok seçenek var.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk', 'fun'],
        tips: ['7. Cadde çevresiyle birlikte düşünülebilir', 'Akşamları canlıdır', 'Spontane planlar için iyidir'],
    },
    {
        id: 'bahceli-sinema',
        title: 'Bahçelievler sinema ve kafe planı',
        icon: '🎟️',
        summary: 'Sinema sonrası kahveyle tamamlanan klasik ve kapalı mekan ağırlıklı bir date akışı.',
        tags: ['mid', 'short', 'activity', 'indoor', 'eat', 'mix'],
        tips: ['Film + kahve kombosu iyi gider', 'Biletleri önceden alın', 'Yağmurlu günlerde güçlü seçenek'],
    },
    {
        id: 'cankaya-restoran',
        title: 'Çankaya restoran ve meyhane rotası',
        icon: '🍽️',
        summary: 'Merkezde akşam yemeği, sohbet ve daha özel bir atmosfer arayanlar için iyi bir bölge.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'talk'],
        tips: ['Rezervasyon düşünün', 'Akşam için ideal', 'Daha sakin masa seçimi önemlidir'],
    },
    {
        id: 'ayranci-kafe',
        title: 'Ayrancı kafe ve restoran rotası',
        icon: '☕',
        summary: 'Merkezde, özellikle akşam yemeği ve kahve için güvenli ve şık kapalı mekanlar sunar.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Tunalı ve Kavaklıdere’ye yakın', 'Uzun sohbet için uygun', 'Butik mekanlar bulabilirsiniz'],
    },
    {
        id: 'nenehatun',
        title: 'Nenehatun Caddesi',
        icon: '🌙',
        summary: 'Kavaklıdere’de merkezî, şık ve çoğunlukla kapalı mekanlarla dolu bir akşam rotası.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy', 'talk'],
        tips: ['Şık akşam planı için iyi', 'Kafe ve restoran seçenekleri var', 'Tunalı’ya da bağlanır'],
    },
    {
        id: 'cankaya-butik',
        title: 'Çankaya butik kafe ve şarap barları',
        icon: '🍷',
        summary: 'Daha sakin, kapalı ve samimi atmosfer isteyen çiftler için merkezî seçenekler.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy', 'talk'],
        tips: ['Uzun sohbet için ideal', 'Rezervasyon önerilir', 'Merkezden çok uzaklaşmaz'],
    },
    {
        id: 'kizilay-kahve',
        title: 'Kızılay kahve ve tatlı rotası',
        icon: '🍰',
        summary: 'Kısa, kapalı ve uygun fiyatlı bir date için Kızılay merkezinde çok seçenek sunar.',
        tags: ['low', 'short', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Tatlı molası için iyi', 'Toplu taşımaya yakın', 'Spontane planlar için uygun'],
    },
    {
        id: 'sogutozu-restaurant',
        title: 'Söğütözü restoranları',
        icon: '🥂',
        summary: 'Akşam yemeği ve özel buluşmalar için kapalı mekan ağırlıklı, merkezi bir bölge.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'talk'],
        tips: ['Rezervasyon iyi olur', 'Şehir içi ulaşım kolay', 'Özel akşamlar için uygun'],
    },
    {
        id: 'kavaklidere-kokteyl',
        title: 'Kavaklıdere kokteyl ve lounge rotası',
        icon: '🍸',
        summary: 'Loş ışık, sessiz sohbet ve akşam planı için merkezî kapalı mekan önerisi.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy'],
        tips: ['Geç saat planı için uygun', 'Daha sakin bir atmosfer sunar', 'Özel günler için iyi'],
    },
    {
        id: 'bahceli-pastane',
        title: 'Bahçelievler pastane ve kafe hattı',
        icon: '🧁',
        summary: 'Tatlı, kahve ve kısa buluşmalar için en kolay merkezi kapalı planlardan biri.',
        tags: ['low', 'short', 'eat', 'indoor', 'cozy', 'talk'],
        tips: ['Kısa ve risksiz bir seçenek', 'Fiyat/performans iyi olabilir', 'Hızlı planlar için uygun'],
    },
    {
        id: 'tunalı-restoran',
        title: 'Tunalı Hilmi restoran ve meyhane rotası',
        icon: '🍽️',
        summary: 'Uzun akşam yemeği ve sohbet için Tunalı’nın kapalı mekan tarafı güçlü bir seçenek.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'romantic'],
        tips: ['Akşam yemeği için planlayın', 'Rezervasyon avantaj sağlar', 'Merkezî ve ulaşımı kolay'],
    },
    {
        id: 'bahceli-kokteyl',
        title: 'Bahçeli kokteyl barları',
        icon: '🍹',
        summary: 'Daha yetişkin, kapalı ve şık bir akşam için Bahçeli tarafında kullanılabilir.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy'],
        tips: ['Gece planı için uygundur', 'Sakin masa seçmeye çalışın', 'Özel bir akşam hissi verir'],
    },
    {
        id: 'kizilay-lounge',
        title: 'Kızılay lounge ve rooftop barlar',
        icon: '🌆',
        summary: 'Şehir merkezinde daha özel, çoğunlukla kapalı ve akşam odaklı bir date alternatifi.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'talk'],
        tips: ['Akşam saatlerine uygun', 'Manzara veya loş ışık arayanlara uygun', 'Rezervasyon iyi fikir'],
    },
    {
        id: 'filistin-kafe',
        title: 'Filistin Caddesi kafe rotası',
        icon: '☕',
        summary: 'Kavaklıdere’de kahve, tatlı ve kapalı oturum için merkezi bir rota daha.',
        tags: ['mid', 'short', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Kısa sohbet planı için iyi', 'Kavaklıdere hattına bağlı', 'Rahat ve şık mekanlar bulunur'],
    },
    {
        id: 'bestekar-restoran',
        title: 'Bestekar Sokak restoranları',
        icon: '🍷',
        summary: 'Yemek, içecek ve uzun sohbet için Tunalı çevresindeki kapalı mekan ağı.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'romantic'],
        tips: ['Akşam yemeği için çok iyi', 'Mekan çeşitliliği yüksek', 'Merkezî planlama kolay'],
    },
    {
        id: 'karum-tunali',
        title: 'Karum - Tunalı kapalı mekan hattı',
        icon: '🏬',
        summary: 'Tunalı’ya yakın, kahve ve yemek için bir arada kullanılabilecek kapalı merkez.',
        tags: ['mid', 'short', 'eat', 'indoor', 'mix', 'talk'],
        tips: ['Kısa buluşma için uygun', 'Merkezî konum avantajı sağlar', 'Yağmurda güvenli plan'],
    },
    {
        id: 'cukurambar-restoran',
        title: 'Çukurambar restoranları',
        icon: '🥗',
        summary: 'Daha modern ve düzenli bir akşam yemeği için merkezi kapalı seçenekler sunar.',
        tags: ['mid', 'high', 'eat', 'indoor', 'talk', 'cozy'],
        tips: ['Akşam yemeği için uygun', 'Rezervasyon işinizi kolaylaştırır', 'Merkezde ama daha sakin olabilir'],
    },
    {
        id: 'sogutozu-cafe',
        title: 'Söğütözü kahve ve brunch noktaları',
        icon: '🥐',
        summary: 'Gündüz date’i için kahve, brunch ve kapalı rahat oturum imkanı sunan bölge.',
        tags: ['mid', 'short', 'eat', 'indoor', 'cozy', 'talk'],
        tips: ['Gündüz buluşmasına uygun', 'Kahvaltı/brunch için güzel', 'Hafta sonu erken gidin'],
    },
    {
        id: 'bahceli-brunch',
        title: 'Bahçelievler brunch kafeleri',
        icon: '🥞',
        summary: 'Kısa ve sıcak bir gündüz date’i için kapalı mekan ağırlıklı rahat seçenekler.',
        tags: ['low', 'short', 'eat', 'indoor', 'cozy', 'talk'],
        tips: ['Tatlı ve kahve iyi gider', 'Gündüz date’i için ideal', 'Rahat ve samimi ortam bulunur'],
    },
    {
        id: 'kizilay-bar',
        title: 'Kızılay bar ve pub rotası',
        icon: '🍻',
        summary: 'Daha canlı, kapalı ve akşam odaklı bir merkez planı arayanlar için.',
        tags: ['mid', 'high', 'eat', 'indoor', 'fun', 'talk'],
        tips: ['Gece planı için daha uygun', 'Yemek öncesi/sonrası iyi olur', 'Kalabalık saatlere dikkat edin'],
    },
    {
        id: 'bahceli-lounge',
        title: 'Bahçelievler lounge ve şarap barları',
        icon: '🍾',
        summary: 'Çiftler için şık, loş ışıklı ve çoğunlukla kapalı bir akşam deneyimi sunar.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'cozy'],
        tips: ['Özel günlerde iyi tercih', 'Rezervasyon önerilir', 'Sohbet odaklıdır'],
    },
    {
        id: 'kavaklidere-dinner',
        title: 'Kavaklıdere akşam yemeği rotası',
        icon: '🍽️',
        summary: 'Merkezde, şık ve rahat bir akşam yemeği için güçlü kapalı mekan seçeneği.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'talk'],
        tips: ['Akşamı uzatmak için uygun', 'Merkezde kalmayı kolaylaştırır', 'Sakin ve kaliteli mekanlar bulunabilir'],
    },
    {
        id: 'tunali-night',
        title: 'Tunalı gece rotası',
        icon: '🌃',
        summary: 'Kahve, yemek ve lounge karışımıyla tam bir merkezî gece date planı.',
        tags: ['mid', 'high', 'eat', 'indoor', 'romantic', 'fun'],
        tips: ['Geceyi tek bölgede geçirmek isteyenlere uygun', 'Mekan seçenekleri çoktur', 'Planı esnek tutmak kolay'],
    },
    {
        id: 'bahceli-night',
        title: 'Bahçeli gece rotası',
        icon: '🌙',
        summary: 'Bahçelievler’de kapalı mekanlar, kafe ve restoranlarla dolu rahat bir akşam alternatifi.',
        tags: ['mid', 'high', 'eat', 'indoor', 'cozy', 'talk'],
        tips: ['Yürüyüş + yemek kombinasyonu yapılabilir', 'Merkezi ve canlıdır', 'Çiftler için kolay planlanır'],
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

function pad2(value) {
    return String(value).padStart(2, '0');
}

function setDefaultSchedule() {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 2);

    dateInput.value = `${defaultDate.getFullYear()}-${pad2(defaultDate.getMonth() + 1)}-${pad2(defaultDate.getDate())}`;
    timeInput.value = '19:00';
}

function getSelectedSchedule() {
    const dateValue = dateInput.value;
    const timeValue = timeInput.value || '19:00';
    const [hours, minutes] = timeValue.split(':').map(Number);

    if (!dateValue) {
        const fallback = new Date();
        fallback.setDate(fallback.getDate() + 2);
        fallback.setHours(19, 0, 0, 0);
        return fallback;
    }

    const [year, month, day] = dateValue.split('-').map(Number);
    return new Date(year, month - 1, day, hours || 19, minutes || 0, 0, 0);
}

function formatScheduleText(date) {
    return new Intl.DateTimeFormat('tr-TR', {
        dateStyle: 'full',
        timeStyle: 'short',
    }).format(date);
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
    const scheduleText = formatScheduleText(getSelectedSchedule());
    const top = results.map((result, index) => `${index + 1}. ${result.title}`).join('\n');

    return [
        'Date önerilerimiz:',
        city ? `Konum: ${city}` : null,
        `Tarih/Saat: ${scheduleText}`,
        top,
        'İstersen takvime ekleyip planlayalım.',
    ]
        .filter(Boolean)
        .join('\n');
}

function createIcsFile(results) {
    const top = results[0];
    const city = normalizeCity();
    const start = getSelectedSchedule();

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
    setDefaultSchedule();
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

setDefaultSchedule();
setActionState(false);
renderQuestions();