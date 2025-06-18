/**
 * scripts_perfil_otros.js
 * Muestra el perfil de otro usuario, con scroll de publicaciones y opción de seguir/dejar de seguir.
 */

// Simulación de datos
const profileDataSimulada = {
    nombreUsuario: "ricardo",
    fotoUrl: "./img/perfilPersona2.png",
    seguidores: 90,
    seguidos: 10,
    publicaciones: 3,
    posts: [
      { id: 1, titulo: "Bosque",  urlImagenPrincipal: "./img/Ruta1.png" },
      { id: 2, titulo: "Montaña", urlImagenPrincipal: "./img/Ruta2.png" },
      { id: 3, titulo: "Rocoso",  urlImagenPrincipal: "./img/Ruta3.png" },
      { id: 4, titulo: "Nevado",  urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 5, titulo: "Nevado",  urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 6, titulo: "Nevado",  urlImagenPrincipal: "./img/Ruta4.png" },
      { id: 7, titulo: "Nevado",  urlImagenPrincipal: "./img/Ruta4.png" }
    ]
  };
  
  // Variables para la carga progresiva
  let offset = 0;
  const limit = 4; 
  let cargando = false;
  
  // Al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    cargarPerfil();
  });
  
  // Carga datos de perfil y configura scroll
  function cargarPerfil() {
    /* Ejemplo de fetch real
    fetch('/TuServletPerfil', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({accion: 'obtenerPerfilOtroUsuario'})
    })
    .then(resp => {
      if(!resp.ok) throw new Error('Error');
      return resp.json();
    })
    .then(data => {
      document.getElementById('nombreUsuario').textContent = data.nombreUsuario;
      document.getElementById('fotoPerfil').src = data.fotoUrl;
      document.getElementById('contadorSeguidores').textContent = data.seguidores;
      document.getElementById('contadorSeguidos').textContent = data.seguidos;
      document.getElementById('contadorPublicaciones').textContent = data.publicaciones;
      data.posts.reverse(); // para que el index 0 sea el más nuevo
      mostrarPrimerLote(data.posts);
      document.getElementById('publicacionesContainer').addEventListener('scroll', () => {
        handleScrollPublicaciones(data.posts);
      });
    })
    .catch(err => console.error(err));
    */
  
    // Simulación
    document.getElementById('nombreUsuario').textContent = profileDataSimulada.nombreUsuario;
    document.getElementById('fotoPerfil').src = profileDataSimulada.fotoUrl;
    document.getElementById('contadorSeguidores').textContent = profileDataSimulada.seguidores;
    document.getElementById('contadorSeguidos').textContent = profileDataSimulada.seguidos;
    document.getElementById('contadorPublicaciones').textContent = profileDataSimulada.publicaciones;
    profileDataSimulada.posts.reverse();
    mostrarPrimerLote(profileDataSimulada.posts);
    document.getElementById('publicacionesContainer').addEventListener('scroll', () => {
      handleScrollPublicaciones(profileDataSimulada.posts);
    });
  }
  
  function mostrarPrimerLote(posts) {
    offset = 0;
    cargarMasPublicaciones(posts);
  }
  
  function handleScrollPublicaciones(posts) {
    const contenedor = document.getElementById('publicacionesContainer');
    if (!cargando && contenedor.scrollTop + contenedor.clientHeight + 50 >= contenedor.scrollHeight) {
      cargarMasPublicaciones(posts);
    }
  }
  
  function cargarMasPublicaciones(posts) {
    cargando = true;
    setTimeout(() => {
      if (offset >= posts.length) {
        cargando = false;
        return;
      }
      const lote = posts.slice(offset, offset + limit);
      offset += lote.length;
      crearFilaConPublicaciones(lote);
      cargando = false;
    }, 300);
  }
  
  function crearFilaConPublicaciones(lote) {
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
    alert("Publicación ID: " + id);
    // location.href = `./rutaPerfil.html?id=${id}`;
  }
  
  function seguirUsuario() {
    /* Ejemplo fetch real
    fetch('/TuServletPerfil', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({accion: 'seguirUsuario', usuario: 'ricardo'})
    })
    .then(resp => {
      if(!resp.ok) throw new Error('Error al seguir');
      // Actualizar contadores o botón...
    })
    .catch(err => console.error(err));
    */
    alert("Seguir/Dejar de seguir a Ricardo");
  }
  

