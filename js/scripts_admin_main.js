/* scripts_admin_main.js */

// SIMULACIÓN: Lista de publicaciones en memoria
const publicacionesSimuladas = [
    { id: 1, titulo: 'Ruta Montañosa', urlImagen: 'img/Rutas.jpg' },
    { id: 2, titulo: 'Atardecer en la Playa', urlImagen: 'img/Rutas2.jpg' },
    { id: 3, titulo: 'Paseo Urbano', urlImagen: 'img/Rutas.jpg' },
    { id: 4, titulo: 'Desierto Extremo', urlImagen: 'img/Rutas2.jpg' },
    { id: 5, titulo: 'Visita al Castillo', urlImagen: 'img/Rutas.jpg' },
    { id: 6, titulo: 'Panorámica de la Ciudad', urlImagen: 'img/Rutas2.jpg' },
    { id: 7, titulo: 'Sendero en el Bosque', urlImagen: 'img/Rutas.jpg' },
    { id: 8, titulo: 'Cascada Oculta', urlImagen: 'img/Rutas2.jpg' },
    { id: 9, titulo: 'Camino Rural', urlImagen: 'img/Rutas.jpg' },
    { id: 10, titulo: 'Aventura en la Jungla', urlImagen: 'img/Rutas2.jpg' },
    { id: 11, titulo: 'Ciudad Nocturna', urlImagen: 'img/Rutas.jpg' },
    { id: 12, titulo: 'Ruta en Bicicleta', urlImagen: 'img/Rutas2.jpg' },
    { id: 13, titulo: 'Paisaje Nevado', urlImagen: 'img/Rutas.jpg' },
    { id: 14, titulo: 'Viaje Cultural', urlImagen: 'img/Rutas2.jpg' },
    { id: 15, titulo: 'Bosque Encantado', urlImagen: 'img/Rutas.jpg' },
    { id: 16, titulo: 'Volcán Activo', urlImagen: 'img/Rutas2.jpg' },
    { id: 17, titulo: 'Faro Lejano', urlImagen: 'img/Rutas.jpg' },
    { id: 18, titulo: 'Ruta Histórica', urlImagen: 'img/Rutas2.jpg' },
    { id: 19, titulo: 'Parque Nacional', urlImagen: 'img/Rutas.jpg' },
    { id: 20, titulo: 'Viñedos al Amanecer', urlImagen: 'img/Rutas2.jpg' },
  ];
  
  window.onload = function() {
    cargarPublicacionesAleatorias();
  };
  
  // Función principal que carga las 12 publicaciones (simulación o fetch)
  function cargarPublicacionesAleatorias() {
    /* 
    // 1. OPCIÓN REAL: (DESCOMENTAR CUANDO LLEGUE EL BACKEND)
    fetch('/MiServletPublicaciones?limit=12')
      .then(resp => resp.json())
      .then(data => {
        mostrarEnGrid(data);
      })
      .catch(err => console.error('Error fetch publicaciones:', err));
  
    // 2. OPCIÓN SIMULADA: (BLOQUEAR O COMENTAR CUANDO USES LA OPCIÓN REAL)
    */
    const mezcladas = shuffleArray(publicacionesSimuladas);
    const seleccionadas = mezcladas.slice(0, 12);
    mostrarEnGrid(seleccionadas);
  }
  
  // Renderiza las publicaciones
  function mostrarEnGrid(lista) {
    const grid = document.getElementById('gridPublicaciones');
    grid.innerHTML = '';
  
    lista.forEach(pub => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col');
  
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'h-100');
  
      const img = document.createElement('img');
      img.src = pub.urlImagen;
      img.classList.add('card-img-top');
      img.alt = pub.titulo;
      img.onclick = () => verPublicacion(pub);
  
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
  
      const h5 = document.createElement('h5');
      h5.classList.add('card-title');
      h5.textContent = pub.titulo;
  
      cardBody.appendChild(h5);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBody);
      colDiv.appendChild(cardDiv);
      grid.appendChild(colDiv);
    });
  }
  
  // Al pinchar en una publicación (por ejemplo, abrir un modal)
  function verPublicacion(pub) {
    alert(`Viendo publicación ID: ${pub.id}\nTítulo: ${pub.titulo}`);
  }
  
  // Mezcla un array (Fisher-Yates)
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  