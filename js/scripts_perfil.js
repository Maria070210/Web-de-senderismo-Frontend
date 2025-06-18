/**
 * DATOS de ejemplo (orden antiguo->nuevo).
 * Invertimos para que index 0 sea la publicación más nueva y “crezca” hacia abajo.
 */
const profileDataSimulada = {
    nombreUsuario: "consuelo.garcia",
    fotoUrl: "./img/perfilPersona.png",
    seguidores: 150,
    seguidos: 1,
    publicaciones: 14,
    posts: [
      { id: 1,  titulo: "Ruta Bosque",     urlImagenPrincipal: "./img/Ruta1.png" },
      { id: 2,  titulo: "Ruta Montaña",    urlImagenPrincipal: "./img/Ruta2.png" },
      { id: 3,  titulo: "Ruta Rocas",      urlImagenPrincipal: "./img/Ruta3.png" },
      { id: 4,  titulo: "Ruta Nieve",      urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 5,  titulo: "Ruta Lagos",      urlImagenPrincipal: "./img/Ruta5.png" },
      { id: 6,  titulo: "Ruta Secreta",    urlImagenPrincipal: "./img/Ruta2.png" },
      { id: 7,  titulo: "Ruta Oculta",     urlImagenPrincipal: "./img/Ruta3.png" },
      { id: 8,  titulo: "Ruta Extrema",    urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 9,  titulo: "Desierto Feroz",  urlImagenPrincipal: "./img/Ruta1.png" },
      { id: 10, titulo: "Valle Encantado", urlImagenPrincipal: "./img/Ruta2.png" },
      { id: 11, titulo: "Sierra Nevada",   urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 12, titulo: "Bosque frondoso", urlImagenPrincipal: "./img/Ruta1.png" },
      { id: 13, titulo: "Camino rural",    urlImagenPrincipal: "./img/Ruta3.png" },
      { id: 14, titulo: "Colinas suaves",  urlImagenPrincipal: "./img/Ruta5.png" }
    ]
  };
  // Invertimos para que la index 0 sea la publicación más nueva
  profileDataSimulada.posts.reverse();


  // Variables para paginación
  let offset = 0;
  const limit = 4;  // Cargamos 4 publicaciones cada vez
  let cargando = false;
  
  function cargarPerfil() {
    /* ========== BLOQUE FETCH POST (COMENTADO) ========== 
    fetch('/TuServletPerfil', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({accion: 'obtenerPerfil'}) 
    })
      .then(resp => {
        if(!resp.ok) throw new Error('Error al obtener perfil');
        return resp.json();
      })
      .then(data => {
        // data => {nombreUsuario, fotoUrl, seguidores, seguidos, publicaciones, posts: [...]}
        document.getElementById('nombreUsuario').textContent = data.nombreUsuario;
        document.getElementById('fotoPerfil').src = data.fotoUrl;
        document.getElementById('followersCount').textContent = data.seguidores;
        document.getElementById('followingCount').textContent = data.seguidos;
        document.getElementById('postsCount').textContent = data.publicaciones;
        
        // Suponiendo que data.posts ya esté en orden de más nuevo a más viejo:
        // offset = 0;
        mostrarPrimerLote(data.posts);
        document.getElementById('publicacionesContainer')
                .addEventListener('scroll', () => handleScrollPublicaciones(data.posts));
      })
      .catch(err => console.error(err));
    */
  
    // ========== SIMULACIÓN ==========
    document.getElementById('nombreUsuario').textContent = profileDataSimulada.nombreUsuario;
    document.getElementById('fotoPerfil').src = profileDataSimulada.fotoUrl;
    document.getElementById('followersCount').textContent = profileDataSimulada.seguidores;
    document.getElementById('followingCount').textContent = profileDataSimulada.seguidos;
    document.getElementById('postsCount').textContent = profileDataSimulada.publicaciones;
  
    mostrarPrimerLote(profileDataSimulada.posts);
    document.getElementById('publicacionesContainer')
            .addEventListener('scroll', () => handleScrollPublicaciones(profileDataSimulada.posts));
  }
  
  function mostrarPrimerLote(posts) {
    offset = 0; // Reiniciamos por si
    cargarMasPublicaciones(posts);
  }
  
  function handleScrollPublicaciones(posts) {
    const contenedor = document.getElementById('publicacionesContainer');
    // Si estamos cerca del final, cargamos más
    if (!cargando && (contenedor.scrollTop + contenedor.clientHeight + 50 >= contenedor.scrollHeight)) {
      cargarMasPublicaciones(posts);
    }
  }
  
  /**
   * Carga un lote (hasta 4) y lo muestra en una fila “.row” con 4 columnas “.col-3”.
   */
  function cargarMasPublicaciones(posts) {
    cargando = true;
  
    /* ========== BLOQUE FETCH POST PARA MÁS PUBLICACIONES (COMENTADO) ========== 
    fetch('/TuServletPerfil', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({accion: 'obtenerMasPublicaciones', offset, limit})
    })
    .then(resp => {
      if(!resp.ok) throw new Error('Error al obtener más publicaciones');
      return resp.json();
    })
    .then(morePosts => {
      if(!morePosts.length) {
        console.log("No hay más publicaciones");
        cargando = false;
        return;
      }
      crearFilaConPublicaciones(morePosts);
      offset += morePosts.length;
      cargando = false;
    })
    .catch(err => {
      console.error(err);
      cargando = false;
    });
    */
  
    // ========== SIMULACIÓN ASÍNCRONA ==========
    setTimeout(() => {
      if (offset >= posts.length) {
        console.log("No hay más publicaciones");
        cargando = false;
        return;
      }
      // Escogemos el “lote” que sigue
      const lote = posts.slice(offset, offset + limit);
      offset += lote.length;
  
      // Creamos una fila para este lote
      crearFilaConPublicaciones(lote);
      cargando = false;
    }, 300);
  }
  
  /**
   * Crea la fila con 4 publicaciones.
   */
  function crearFilaConPublicaciones(lote) {
    // Creamos una fila Bootstrap
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'mb-3');
  
    lote.forEach(pub => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('col-3', 'rutas-item', 'text-center', 'mb-3');
      colDiv.onclick = () => seleccionarPublicacion(pub.id);
  
      const img = document.createElement('img');
      img.src = pub.urlImagenPrincipal;
      img.alt = pub.titulo;
      img.width = 200;
      img.height = 200;
  
      const span = document.createElement('span');
      span.textContent = pub.titulo;
  
      colDiv.appendChild(img);
      colDiv.appendChild(document.createElement('br'));
      colDiv.appendChild(span);
      rowDiv.appendChild(colDiv);
    });
  
    document.getElementById('publicacionesContainer').appendChild(rowDiv);
  }
  
  function seleccionarPublicacion(id) {
    alert("Has seleccionado la publicación ID: " + id);
    // location.href = `./rutaPerfil.html?id=${id}`;
  }
  
  // Cargar al iniciar
  document.addEventListener("DOMContentLoaded", cargarPerfil);
  