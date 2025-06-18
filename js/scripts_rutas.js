/* scripts_rutas.js */

// Obtener el tipo de ruta desde la URL
const urlParams = new URLSearchParams(window.location.search);
const tipoRuta = urlParams.get('tipo') || 'bosque'; // Valor por defecto: 'bosque'

// Definir el ID de la ruta según el tipo (en una aplicación real, esto vendría del servidor)
const rutas = {
    'bosque': { id: 1, nombre: 'Ruta en el Bosque' },
    'lagos': { id: 2, nombre: 'Ruta en los Lagos' },
    'montaña': { id: 3, nombre: 'Ruta en la Montaña' },
    'nieve': { id: 4, nombre: 'Ruta en la Nieve' },
    'rocoso': { id: 5, nombre: 'Ruta Rocosa' }
};

const rutaActual = rutas[tipoRuta.toLowerCase()] || rutas['bosque'];

// Asumimos que el nombre del usuario actual se obtiene del servidor o está disponible globalmente
const currentUser = "NombreUsuario"; // Debes reemplazar esto con la lógica real de tu aplicación

// Inicializar WebSocket
let ws = null;

// Almacenar comentarios
let comentarios = [];

// Contador de likes para la publicación
let likesPublicacion = 0;
let likedPublicacion = false;

// Función para inicializar WebSocket
function initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const contextPath = ''; // Si tu aplicación tiene un contexto, agrégalo aquí, por ejemplo '/MiApp'

    ws = new WebSocket(`${protocol}//${host}${contextPath}/chat`);

    ws.onopen = function(evt) {
        console.log("Conectado al servidor WebSocket");
        // Enviar una notificación de conexión con el tipo de acción
        const payload = {
            tipo: "conectar",
            usuario: currentUser,
            rutaId: rutaActual.id
        };
        ws.send(JSON.stringify(payload));
    };

    ws.onmessage = function(evt) {
        console.log("Mensaje recibido:", evt.data);
        const msg = JSON.parse(evt.data);
        manejarMensajeRecibido(msg);
    };

    ws.onclose = function(evt) {
        console.log("Conexión cerrada", evt);
        // Opcional: intentar reconectar
    };

    ws.onerror = function(err) {
        console.error("Error en WebSocket:", err);
    };
}

// Manejar mensajes recibidos vía WebSocket
function manejarMensajeRecibido(msg) {
    if (msg.tipo === "nuevoComentario" && msg.rutaId === rutaActual.id) {
        agregarComentarioAlDOM(msg.comentario);
    } else if (msg.tipo === "likeComentario" && msg.rutaId === rutaActual.id) {
        actualizarLikeComentario(msg.comentarioId, msg.likes);
    } else if (msg.tipo === "reportComentario" && msg.rutaId === rutaActual.id) {
        alert(`Comentario ${msg.comentarioId} reportado.`);
    } else if (msg.tipo === "likePublicacion" && msg.rutaId === rutaActual.id) {
        actualizarLikePublicacion(msg.likes);
    } else if (msg.tipo === "reportPublicacion" && msg.rutaId === rutaActual.id) {
        alert(`Publicación ${msg.rutaId} reportada.`);
    }
}

// Función para manejar el envío del formulario de comentario
document.getElementById('comentarioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const comentarioText = document.getElementById('comentarioText').value.trim();
    if (comentarioText === "") return;

    const nuevoComentario = {
        id: Date.now(), // Generar un ID único para el comentario
        usuario: currentUser,
        texto: comentarioText,
        likes: 0,
        liked: false,
        reportado: false,
        timestamp: new Date().toISOString()
    };

    // Enviar comentario al servidor via WebSocket
    const payload = {
        tipo: "nuevoComentario",
        rutaId: rutaActual.id,
        comentario: nuevoComentario
    };
    ws.send(JSON.stringify(payload));

    // Limpiar el textarea
    document.getElementById('comentarioText').value = '';
});

// Función para agregar comentario al DOM
function agregarComentarioAlDOM(comentario) {
    comentarios.push(comentario);
    const comentariosRecientes = document.getElementById('comentariosRecientes');

    const comentarioDiv = document.createElement('div');
    comentarioDiv.classList.add('comentario');

    // Avatar
    const avatarImg = document.createElement('img');
    avatarImg.src = "./img/perfil.png"; // Puedes personalizar la imagen según el usuario
    avatarImg.alt = "Avatar";

    // Cuerpo del comentario
    const cuerpoComentario = document.createElement('div');
    cuerpoComentario.classList.add('comentario-body');

    // Reportar comentario
    const reportBtn = document.createElement('span');
    reportBtn.classList.add('report-comment');
    reportBtn.innerHTML = '⚠️';
    reportBtn.title = "Reportar comentario";
    reportBtn.onclick = () => reportComentario(comentario.id);
    cuerpoComentario.appendChild(reportBtn);

    // Nombre de usuario
    const nombreUsuario = document.createElement('h6');
    nombreUsuario.textContent = comentario.usuario;
    cuerpoComentario.appendChild(nombreUsuario);

    // Texto del comentario
    const textoComentario = document.createElement('p');
    textoComentario.textContent = comentario.texto;
    cuerpoComentario.appendChild(textoComentario);

    // Acciones (Like y Reporte)
    const accionesComentario = document.createElement('div');
    accionesComentario.classList.add('comentario-actions');

    // Botón de Like
    const likeBtn = document.createElement('button');
    likeBtn.innerHTML = `👍 <span>${comentario.likes}</span>`;
    likeBtn.onclick = () => toggleLikeComentario(comentario.id, likeBtn);
    accionesComentario.appendChild(likeBtn);

    // Botón de Reporte
    const reportComentarioBtn = document.createElement('button');
    reportComentarioBtn.innerHTML = `⚠️ Reportar`;
    reportComentarioBtn.onclick = () => reportComentario(comentario.id);
    accionesComentario.appendChild(reportComentarioBtn);

    cuerpoComentario.appendChild(accionesComentario);

    comentarioDiv.appendChild(avatarImg);
    comentarioDiv.appendChild(cuerpoComentario);

    // Añadir al inicio para que los comentarios más recientes estén arriba
    comentariosRecientes.prepend(comentarioDiv);
}

// Función para togglear like en un comentario
function toggleLikeComentario(comentarioId, likeBtn) {
    const comentario = comentarios.find(c => c.id === comentarioId);
    if (!comentario) return;

    // Toggle like
    if (comentario.liked) {
        comentario.likes -= 1;
        comentario.liked = false;
    } else {
        comentario.likes += 1;
        comentario.liked = true;
    }

    // Actualizar botón de like
    likeBtn.querySelector('span').textContent = comentario.likes;
    if (comentario.liked) {
        likeBtn.classList.add('liked');
    } else {
        likeBtn.classList.remove('liked');
    }

    // Enviar actualización al servidor
    const payload = {
        tipo: "likeComentario",
        rutaId: rutaActual.id,
        comentarioId: comentarioId,
        likes: comentario.likes
    };
    ws.send(JSON.stringify(payload));
}

// Función para actualizar likes de un comentario desde el servidor
function actualizarLikeComentario(comentarioId, likes) {
    const comentario = comentarios.find(c => c.id === comentarioId);
    if (!comentario) return;
    comentario.likes = likes;

    // Actualizar el DOM
    const comentariosRecientes = document.getElementById('comentariosRecientes');
    const comentarioDivs = comentariosRecientes.getElementsByClassName('comentario');
    for (let div of comentarioDivs) {
        const nombre = div.querySelector('.comentario-body h6').textContent;
        const texto = div.querySelector('.comentario-body p').textContent;
        if (comentario.usuario === nombre && comentario.texto === texto) {
            const likeSpan = div.querySelector('.comentario-actions button span');
            likeSpan.textContent = likes;
            break;
        }
    }
}

// Función para reportar un comentario
function reportComentario(comentarioId) {
    if (!confirm("¿Estás seguro de que deseas reportar este comentario?")) return;

    // Enviar reporte al servidor
    const payload = {
        tipo: "reportComentario",
        rutaId: rutaActual.id,
        comentarioId: comentarioId
    };
    ws.send(JSON.stringify(payload));

    alert("Comentario reportado. Gracias por tu colaboración.");
}

// Función para reportar la publicación
function reportPost() {
    if (!confirm("¿Estás seguro de que deseas reportar esta publicación?")) return;

    // Enviar reporte al servidor
    const payload = {
        tipo: "reportPublicacion",
        rutaId: rutaActual.id
    };
    ws.send(JSON.stringify(payload));

    alert("Publicación reportada. Gracias por tu colaboración.");
}

// Función para dar like a la publicación
function likePublicacion() {
    if (likedPublicacion) {
        likesPublicacion -= 1;
        likedPublicacion = false;
    } else {
        likesPublicacion += 1;
        likedPublicacion = true;
    }

    // Actualizar el DOM
    document.getElementById('likePublicacionCount').textContent = likesPublicacion;

    // Enviar actualización al servidor via WebSocket
    const payload = {
        tipo: "likePublicacion",
        rutaId: rutaActual.id,
        likes: likesPublicacion
    };
    ws.send(JSON.stringify(payload));
}

// Función para actualizar likes de la publicación desde el servidor
function actualizarLikePublicacion(likes) {
    likesPublicacion = likes;
    document.getElementById('likePublicacionCount').textContent = likesPublicacion;
    // Opcional: Actualizar el estado del botón de like si es necesario
}

// Inicializar WebSocket al cargar la página
window.onload = function() {
    initWebSocket();

    // Mostrar el nombre de usuario en el formulario de comentarios
    document.getElementById('usuarioNombre').textContent = currentUser;

    // Actualizar el título y otras informaciones según la ruta
    const tituloRuta = document.querySelector('h3');
    if (tituloRuta) {
        tituloRuta.textContent = rutaActual.nombre;
    }
};
