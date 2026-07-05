const audio = document.getElementById('localAudio');
const btn = document.getElementById('playBtn');
const lyricsContainer = document.getElementById('lyrics-container');
let isPlaying = false;
let lyricsInterval;

const lyrics = [
  { text: "✨ Para ti, con mucho cariño... ✨", time: 0 },
  { text: "✨ Flowers ✨", time: 7 },
  { text: "En aquel momento...", time: 15 },
  { text: "El susurro de los pájaros...", time: 18 },
  { text: "Solitario antes de que el sol llorara...", time: 27 },
  { text: "Cayó del cielo...", time: 32 },
  { text: "Como gotas de agua...", time: 33 },
  { text: "¿Dónde estoy ahora? No sé por qué...", time: 41 },
  { text: "Lindas mariposas en mis manos...", time: 47 },
  { text: "Demasiada luz para el crepúsculo...", time: 54 },
  { text: "Con ganas del amor de las flores...", time: 59 },
  { text: "Esa visión...", time: 67 },
  { text: "Me voló la cabeza...", time: 72 },
  { text: "El silencio. Me dejó ver lo que era...", time: 78 },
  { text: "Solo quiero vivir en las nubes...", time: 83 },
  { text: "¿Dónde estoy ahora? No sé por qué...", time: 91 },
  { text: "Lindas mariposas en mis manos...", time: 97 },
  { text: "Demasiada luz para el crepúsculo...", time: 104 },
  { text: "Con ganas del amor de las flores...", time: 108 },
  { text: "En aquel momento...", time: 144 },
  { text: "El susurro de los pájaros...", time: 148 },
  { text: "Solitario antes de que el sol llorara...", time: 153 },
  { text: "Cayó del cielo...", time: 158 },
  { text: "Como gotas de agua...", time: 164 },
  { text: "¿Dónde estoy ahora? No sé por qué...", time: 169 },
  { text: "Lindas mariposas en mis manos...", time: 176 },
  { text: "Demasiada luz para el crepúsculo...", time: 183 },
  { text: "Con ganas del amor de las flores...", time: 188 },
  { text: "Amor.", time: 191 }
];

audio.onended = function() {
    isPlaying = false;
    btn.innerHTML = "🎵 Reproducir Música";
    clearInterval(lyricsInterval);
    lyricsContainer.innerHTML = "";
};

function createSparkles() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 25; i++) {
        let sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        // Random position around the rose
        sparkle.style.left = (Math.random() * 120 - 10) + '%';
        sparkle.style.top = (Math.random() * 100 + 20) + '%';
        sparkle.style.animationDelay = (Math.random() * 4) + 's';
        sparkle.style.animationDuration = (3 + Math.random() * 4) + 's';
        container.appendChild(sparkle);
    }
}
// Initialize sparkles
createSparkles();

function toggleMusic() {
    if (!isPlaying) {
        audio.play();
        btn.innerHTML = "⏸ Pausar Música";
        isPlaying = true;
        startLyrics();
    } else {
        audio.pause();
        btn.innerHTML = "🎵 Reproducir Música";
        isPlaying = false;
        clearInterval(lyricsInterval);
    }
}

function typeWriter(text, element, speed = 50) {
    element.innerHTML = "";
    element.style.opacity = 1;
    let i = 0;
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                let closingIndex = text.indexOf('>', i);
                if (closingIndex !== -1) {
                    element.innerHTML += text.substring(i, closingIndex + 1);
                    i = closingIndex + 1;
                    setTimeout(type, speed);
                    return;
                }
            }
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

function startLyrics() {
    clearInterval(lyricsInterval);
    let currentLine = -1;

    lyricsInterval = setInterval(() => {
        if(!isPlaying) return;
        
        let currentTime = audio.currentTime; // en segundos
        
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
                
                if (currentLine !== i) {
                    currentLine = i;
                    typeWriter(lyrics[i].text, lyricsContainer, 70);
                }
                
                // Limpiar la pantalla si hay una pausa larga sin cantar (más de 6 segundos)
                if (currentTime > lyrics[i].time + 6) {
                    lyricsContainer.innerHTML = "";
                }
                break;
            }
        }
    }, 100);
}

// Intentar autoreproducir cuando carga la página
window.addEventListener('load', () => {
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Si el navegador permite autoplay
            btn.innerHTML = "⏸ Pausar Música";
            isPlaying = true;
            startLyrics();
        }).catch(error => {
            // El navegador bloqueó el autoplay (común en Chrome/Edge)
            console.log("Autoplay bloqueado. Esperando interacción.");
        });
    }
});

// Respaldo: Iniciar con cualquier clic en la pantalla si fue bloqueado
document.body.addEventListener('click', (e) => {
    if (!isPlaying && e.target.id !== 'playBtn') {
        toggleMusic();
    }
}, { once: true });
