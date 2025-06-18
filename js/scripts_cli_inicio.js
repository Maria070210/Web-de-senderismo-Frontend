//Seguir a un usuario
function seguirUsuario() {
    const botonSeguir = document.getElementById('botonSeguir');
    const contadorSeguidores = document.getElementById('contadorSeguidores');
    
    if (botonSeguir.textContent.trim() === 'Seguir') {
        // Incrementar seguidores
        contadorSeguidores.textContent = parseInt(contadorSeguidores.textContent) + 1;
        botonSeguir.textContent = 'Dejar de seguir';
        botonSeguir.style.backgroundColor = 'gray';
    } else {
        // Decrementar seguidores
        contadorSeguidores.textContent = parseInt(contadorSeguidores.textContent) - 1;
        botonSeguir.textContent = 'Seguir';
        botonSeguir.style.backgroundColor = 'green';
    }
}



// Objeto con las rutas de imágenes para cada tipo
const imagenesRutas = {
    'lago': [
        './img/Lago1.jpg',
        './img/Lago2.jpg',
        './img/Lago3.jpg',
        './img/Lago4.jpg',
        './img/Lago5.jpg',
        './img/Lago6.jpg',
        './img/Lago7.jpg',
        './img/Lago8.jpg',
        './img/Lago9.jpg'
    ],
    'rocas': [
        './img/Rocas1.jpg',
        './img/Rocas2.png',
        './img/Rocas3.jpg',
        './img/Rocas4.png',
        './img/Rocas5.png',
        './img/Rocas6.png',
        './img/Rocas7.png',
        './img/Rocas8.png',
        './img/Rocas9.png'
    ],
    'nieve': [
        './img/Nieve1.jpg',
        './img/Nieve2.jpg',
        './img/Nieve3.jpg',
        './img/Nieve4.jpg',
        './img/Nieve5.png',
        './img/Nieve6.jpeg',
        './img/Nieve7.jpg',
        './img/Nieve8.jpg',
        './img/Nieve9.jpg'
    ],
    'montaña': [
        './img/Montaña1.jpg',
        './img/Montaña2.jpg',
        './img/Montaña3.jpg',
        './img/Montaña4.jpg',
        './img/Montaña5.jpg',
        './img/Montaña6.jpg',
        './img/Montaña7.jpg',
        './img/Montaña8.jpg',
        './img/Montaña9.jpg'
    ],
    'bosque': [
        './img/Bosque1.jpg',
        './img/Bosque2.jpg',
        './img/Bosque3.jpg',
        './img/Bosque4.jpg',
        './img/Bosque5.jpg',
        './img/Bosque6.jpg',
        './img/Bosque7.jpg',
        './img/Bosque8.jpg',
        './img/Bosque9.jpg'
    ],
    'default': [
        './img/Mosaico/1.png',
        './img/Mosaico/2.png',
        './img/Mosaico/3.png',
        './img/Mosaico/4.png',
        './img/Mosaico/5.png',
        './img/Mosaico/6.png',
        './img/Mosaico/7.png',
        './img/Mosaico/8.png',
        './img/Mosaico/9.png'
    ]
};

function filtrarTipo() {
    const filtro = document.getElementById('filtro-publi').value;
    const imagenes = document.querySelectorAll('#publicaciones img');
    
    // Determinar qué conjunto de imágenes usar
    let imagenesAMostrar;
    if (filtro === 'filtro') {
        imagenesAMostrar = imagenesRutas.default;
    } else {
        imagenesAMostrar = imagenesRutas[filtro] || imagenesRutas.default;
    }

    // Actualizar las imágenes
    imagenes.forEach((img, index) => {
        if (imagenesAMostrar[index]) {
            img.src = imagenesAMostrar[index];
            
            // Efecto de transición suave
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.transition = 'opacity 0.5s ease-in-out';
                img.style.opacity = '1';
            }, 100);
        }
    });
}

// Agregar estilos CSS para las imágenes
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        #publicaciones img {
            transition: opacity 0.5s ease-in-out;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
});
