// --- CONFIGURACIÓN ---
// Configura aquí la fecha exacta del inicio de su relación: Año, Mes (0-11), Día, Hora, Minutos
// NOTA: Los meses en JavaScript van de 0 a 11 (Enero es 0, Febrero es 1, etc.)
const anniversaryDate = new Date(2025, 5, 13, 17, 52, 10); 

// --- APERTURA DE LA CARTA ---
function openGift() {
  // 1. Iniciar la música de fondo
  const music = document.getElementById('bg-music');
  if (music){
  music.play().catch(error =>{
    console.log("el navegador bloqueo el audio:", error);
  });
  }
  // 2. Disparar efecto de confeti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // 3. Transición visual: Ocultar sobre y mostrar el contenido
  const envelope = document.getElementById('envelope-screen');
  const mainContent = document.getElementById('main-content');

  envelope.style.opacity = '0';
  setTimeout(() => {
    envelope.style.display = 'none';
    mainContent.classList.remove('hidden');
  }, 1000);
}

// --- CONTADOR DE TIEMPO EN VIVO ---
function updateCounter() {
  const now = new Date();
  const diff = now - anniversaryDate;

  if (diff < 0) {
    document.getElementById('counter').innerText = "¡El gran día está por comenzar!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('counter').innerHTML = 
    `<strong>${days}</strong> días, <strong>${hours}</strong>h <strong>${minutes}</strong>m <strong>${seconds}</strong>s`;
}

setInterval(updateCounter, 1000);
updateCounter();

// --- LÓGICA DE VALES DE AMOR ---
function redeemCoupon(button) {
  button.innerText = "✓ Canjeado";
  button.classList.add('done');
  button.disabled = true;
  button.parentElement.classList.add('redeemed');

  // Confeti al canjear cada vale
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 }
    });
  }
}

// Inicializar el mapa centrado en Guatemala
function initMap() {
  // Coordenadas iniciales para centrar el mapa (promedio entre la capital, Retalhuleu y Jutiapa)
  const map = L.map('map').setView([14.4500, -90.3000], 8);

  // Cargar mapa en estilo oscuro (CartoDB Dark Matter)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // Lista de tus 6 lugares con sus coordenadas y mensajes
  const lugares = [
    {
      titulo: "Edificio WTC",
      descripcion: "Tu trabajo y el lugar donde te fui a recoger el día que nos conocimos.",
      lat: 14.5947, 
      lng: -90.5132
    },
    {
      titulo: "Parque Berlín",
      descripcion: "Donde fuimos a caminar, platicar y compartir nuestros primeros momentos.",
      lat: 14.5878, 
      lng: -90.5269
    },
    {
      titulo: "Zoológico La Aurora",
      descripcion: "El escenario inolvidable de nuestra primera cita.",
      lat: 14.5872, 
      lng: -90.5286
    },
    {
      titulo: "Turicentro Valle Escondido",
      descripcion: "Un rincón especial en Jocote Dulce, Jutiapa.",
      lat: 14.2850, 
      lng: -89.8900
    },
    {
      titulo: "Irtra de Retalhuleu",
      descripcion: "Uno de los primeros y mejores viajes que hicimos juntos.",
      lat: 14.6015, 
      lng: -91.6885
    },
    {
      titulo: "Cuevas de Andamira",
      descripcion: "El primer viaje increíble con tu familia en Jutiapa.",
      lat: 14.1950, 
      lng: -89.7750
    }
  ];

  // Agregar cada marcador al mapa
  lugares.forEach(lugar => {
    const popupHTML = `
      <div class="popup-content">
        <h4>${lugar.titulo}</h4>
        <p>${lugar.descripcion}</p>
      </div>
    `;

    L.marker([lugar.lat, lugar.lng])
      .addTo(map)
      .bindPopup(popupHTML);
  });
}

// Llamar a la función del mapa cuando se abra la página
window.addEventListener('load', initMap);

