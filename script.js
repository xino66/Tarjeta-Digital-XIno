// --- 1. MODO OSCURO ---
const botonTema = document.getElementById('boton-tema');
const iconoTema = botonTema.querySelector('i');

botonTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        iconoTema.classList.remove('fa-moon');
        iconoTema.classList.add('fa-sun');
    } else {
        iconoTema.classList.remove('fa-sun');
        iconoTema.classList.add('fa-moon');
    }
});

// --- 2. LÓGICA DE VENTANA MODAL (POP-UP) ---
const modal = document.getElementById('modal-fondo');
const imagenQR = document.getElementById('imagen-qr-modal');
const tituloModal = document.getElementById('titulo-red');
const botonIr = document.getElementById('boton-ir-enlace');

function abrirModal(nombreRed, enlace) {
    tituloModal.innerText = nombreRed;
    botonIr.href = enlace;
    // Generamos el QR
    imagenQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${enlace}`;
    modal.classList.add('activo');
}

function cerrarModal() {
    modal.classList.remove('activo');
}

// Cerrar si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarModal();
    }
}

// --- 3. NUEVO: LÓGICA DE COMPARTIR PERFIL ---
const btnCompartir = document.getElementById('btn-compartir');

btnCompartir.addEventListener('click', async () => {
    const datosCompartir = {
        title: 'Perfil de Anibal',
        text: '¡Mira mis redes sociales y contáctame!',
        url: window.location.href 
    };

    if (navigator.share) {
        try {
            await navigator.share(datosCompartir);
            console.log('¡Compartido con éxito!');
        } catch (err) {
            console.log('Error al compartir', err);
        }
    } else {
        // Si es PC, copiamos al portapapeles
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert('¡Enlace copiado al portapapeles!');
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
            });
    }
});