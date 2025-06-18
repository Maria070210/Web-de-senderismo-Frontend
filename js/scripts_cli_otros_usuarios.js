//Cambiar la ruta dependiendo de donde hagas click en perfil
const rutas = [
        {
                id: "bosque",
                principal: "./img/Ruta1.png",
                img1: "./img/Bosque1.jpg",
                img2: "./img/Bosque2.jpg",
                img3: "./img/Bosque3.jpg"
        },
        {
                id: "lago",
                principal: "./img/Ruta5.png",
                img1: "./img/Lago1.jpg",
                img2: "./img/Lago2.jpg",
                img3: "./img/Lago3.jpg"
        },
        {
                id: "montaña",
                principal: "./img/Ruta2.png",
                img1: "./img/Montaña1.jpg",
                img2: "./img/Montaña2.jpg",
                img3: "./img/Montaña3.jpg"
        },
        {
                id: "nieve",
                principal: "./img/Ruta4.png",
                img1: "./img/Nieve1.jpg",
                img2: "./img/Nieve2.jpg",
                img3: "./img/Nieve3.jpg"
        },
        {
                id: "rocas",
                principal: "./img/Ruta3.png",
                img1: "./img/Rocas3.jpg",
                img2: "./img/Rocas1.jpg",
                img3: "./img/Rocas2.png"
        }

]

// Función para guardar la ruta seleccionada en localStorage
function seleccionarRuta(idRuta) {
    const rutaSeleccionada = rutas.findIndex(ruta => ruta.id === idRuta);
    
    if (rutaSeleccionada !== -1) {
        localStorage.setItem('rutaSeleccionada', rutaSeleccionada);
        window.location.href = 'rutaPerfil.html';
    } else {
        console.error('No se encontró la ruta con ID:', idRuta);
    }
}

function seleccionarRutaPubli(index) {
    const filtro = document.getElementById('filtro-publi').value;
    let tipoRuta;

    // Guardar en sessionStorage el tipo de ruta y el índice
    sessionStorage.setItem('indiceImagen', index);
    
    // Determinar el tipo de ruta según el filtro
    switch(filtro) {
        case 'lago':
            tipoRuta = 'Ruta de lagos';
            sessionStorage.setItem('tipoRuta', 'lago');
            break;
        case 'rocas':
            tipoRuta = 'Ruta de rocas';
            sessionStorage.setItem('tipoRuta', 'rocas');
            break;
        case 'nieve':
            tipoRuta = 'Ruta de nieve';
            sessionStorage.setItem('tipoRuta', 'nieve');
            break;
        case 'montaña':
            tipoRuta = 'Ruta de montaña';
            sessionStorage.setItem('tipoRuta', 'montaña');
            break;
        case 'bosque':
            tipoRuta = 'Ruta de bosque';
            sessionStorage.setItem('tipoRuta', 'bosque');
            break;
        default:
            tipoRuta = 'Ruta general';
            sessionStorage.setItem('tipoRuta', 'default');
    }

    // Guardar información adicional que pueda ser necesaria
    sessionStorage.setItem('nombreRuta', `${tipoRuta} #${index + 1}`);
    sessionStorage.setItem('imagenRuta', imagenesRutas[filtro === 'filtro' ? 'default' : filtro][index]);

    // Redirigir a la página de la ruta
    window.location.href = './rutaPubli.html';
}

// Función para cargar la ruta seleccionada en pruebas2.html
function cargarRutaSeleccionada() {
    const tituloPubli = document.getElementById('titulo');
    const rutaIndex = localStorage.getItem('rutaSeleccionada');

    if (rutaIndex !== null) {
        const rutaSeleccionada = rutas[parseInt(rutaIndex)];
        //Titulos predefinidos según el tipo de ruta
        if (rutaSeleccionada.id === 'bosque'){
            tituloPubli.textContent = "Perdidos en el bosque";
        } else if (rutaSeleccionada.id === 'montaña') {
            tituloPubli.textContent = "Las montañas cuestan subirlas";
        } else if (rutaSeleccionada.id === 'lago') {
            tituloPubli.textContent = "¿Un chapuzón?";
        } else if (rutaSeleccionada.id === 'nieve') {
            tituloPubli.textContent = "Que frioooooo";
        } else if (rutaSeleccionada.id === 'rocas') {
            tituloPubli.textContent = "Roquitas a mi";
        }
        
        // Actualizar imagen principal
        const imagenPrincipal = document.querySelector('.imagen-principal');
        const nombreRuta = document.querySelector('.nombre-ruta');
        if (imagenPrincipal) {
            imagenPrincipal.src = rutaSeleccionada.principal;
            document.title = "Ruta " + rutaSeleccionada.id;
        } else {
            console.error('No se encontró el elemento de imagen principal');
        }
        if (nombreRuta) {
                nombreRuta.textContent = " Ruta de " + rutaSeleccionada.id;
        } else {
            console.error('No se encontró el elemento de imagen principal');
        }

        // Actualizar carousel
        const carouselImg = document.querySelector('.carousel-item.active img');
        const carousel = document.getElementById('carousel');
        carousel.innerHTML = '';
        if (carouselImg) {
            // Crear y añadir las tres imágenes al carrusel
            const imagenes = [rutaSeleccionada.img1, rutaSeleccionada.img2, rutaSeleccionada.img3];
            //carouselImg.src = rutaSeleccionada.img1;
            imagenes.forEach((src, index) => {
                const nuevaImagen = document.createElement('img');
                nuevaImagen.src = src;
                nuevaImagen.alt = `Imagen ${index + 1} de la ruta`;
                nuevaImagen.classList.add('d-block', 'w-100');
                
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                if (index === 0) carouselItem.classList.add('active');
                
                carouselItem.appendChild(nuevaImagen);
                carousel.appendChild(carouselItem);
            });
        } else {
        console.error('No se encontró el elemento del carrusel');
        }
    }
}

// Función para inicializar la página perfil.html
function inicializarPerfil() {
    console.log('Inicializando perfil');
    const rutasContainer = document.querySelector('.rutas-container');
    if (rutasContainer) {
        rutas.forEach(ruta => {
            const rutaElement = document.querySelector(`[onclick="seleccionarRuta('${ruta.id}')"]`);
            if (rutaElement) {
                rutaElement.addEventListener('click', () => seleccionarRuta(ruta.id));
            }
        });
    }
}

// Función para inicializar la página 
function inicializarRuta() {
    cargarRutaSeleccionada();
    iniciarCarousel();
}

// Inicialización general
document.addEventListener('DOMContentLoaded', () => {
    
    // Detectar en qué página estamos
    const currentPage = window.location.pathname;

    if (currentPage.includes('perfil.html')) {
        inicializarPerfil();
    } else if (currentPage.includes('rutaPerfil.html')) {
        inicializarRuta();
    }
});

// Función para comentar
function resetearComentario() {
    event.preventDefault(); 
    
    const commentText = document.getElementById('commentText').value;
    
    // Obtener el nombre de usuario del elemento en el DOM
    const nombreUsuarioElement = document.getElementById('nombre-user');
    const usuario = nombreUsuarioElement ? nombreUsuarioElement.textContent : 'Usuario';

    if (!commentText.trim()) return; // Don't add empty comments
    
    // Crear estructura HTML
    const newComment = `
        <div class="media mb-4">   
            <img src="./img/perfilPersona.png"  style="width: 50px; height: 50px;" class="mr-3 rounded-circle" alt="Usuario">
            <div class="media-body">
                <h6 class="mt-0"><b>@${usuario}</b></h6>
                <p>${commentText}</p>
            </div>
            <div class="mg gap-2 d-md-flex justify-content-md-end">
                <img src="./img/Mg1.png" width="30" height="30" id="botonMeGustaNuevo"
                    style="margin-left: 20px;" onclick="darMg('Nuevo')" alt="Imagen">
                <span class="mg" id="contadorMgNuevo">0</span>
            </div>
        </div>
    `;

    // Contenedor de comentarios recientes
    const commentsContainer = document.querySelector('.card-body .media').parentElement;
    
    // Añadir comentario al principio
    commentsContainer.insertAdjacentHTML('afterbegin', newComment);
    
    // Resetear el espacio de comentario
    document.getElementById('commentText').value = '';
}

// Dar like a un comentario
function darMg(numeroComentario) {
    const contador = document.getElementById(`contadorMg${numeroComentario}`);
    const boton = document.getElementById(`botonMeGusta${numeroComentario}`);
    
    let likes = parseInt(contador.textContent);
    
    if (boton.src.includes('Mg1.png')) {
        likes++;
        boton.src = './img/Mg2.png';
    } else {
        likes--;
        boton.src = './img/Mg1.png';
    }
    
    contador.textContent = likes;
}

function enviarReporte() {
    // Aquí iría la lógica para enviar el reporte
    alert('Reporte enviado correctamente');
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('reportModal'));
    modal.hide();
    // Resetear el formulario
    document.getElementById('reportForm').reset();
}

function enviarReporteComentario() {
    // Aquí iría la lógica para enviar el reporte del comentario
    alert('Reporte de comentario enviado correctamente');
    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('reportComentarioModal'));
    modal.hide();
    // Resetear el formulario
    document.getElementById('reportComentarioForm').reset();
}


