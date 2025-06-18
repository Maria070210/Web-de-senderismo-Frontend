/*
  En este ejemplo, cada usuario tiene un array de 6 imágenes, 
  lo que resultará en 3 columnas (cada columna con 2 imágenes).
*/
let usuarios = [
    {
      id: 1,
      nombre: 'Juan',
      apellidos: 'Pérez López',
      genero: 'Masculino',
      nombreUsuario: 'Juan123',
      correo: 'juan@example.com',
      estado: 'activo',
      publicaciones: [
        { id: 101, urlImagen: 'img/Rutas.jpg' },
        { id: 102, urlImagen: 'img/Rutas2.jpg' },
        { id: 103, urlImagen: 'img/Rutas.jpg' },
        { id: 104, urlImagen: 'img/Rutas2.jpg' },
        { id: 105, urlImagen: 'img/Rutas.jpg' },
        { id: 106, urlImagen: 'img/Rutas2.jpg' }
      ]
    },
    {
      id: 2,
      nombre: 'María',
      apellidos: 'González Ruiz',
      genero: 'Femenino',
      nombreUsuario: 'MGonza',
      correo: 'maria@example.com',
      estado: 'bloqueado',
      publicaciones: [
        { id: 201, urlImagen: 'img/Rutas.jpg' },
        { id: 202, urlImagen: 'img/Rutas2.jpg' },
        { id: 203, urlImagen: 'img/Rutas.jpg' },
        { id: 204, urlImagen: 'img/Rutas2.jpg' },
        { id: 205, urlImagen: 'img/Rutas.jpg' },
        { id: 206, urlImagen: 'img/Rutas2.jpg' }
      ]
    }
  ];
  
  window.onload = () => {
    cargarListaUsuarios();
  };
  
  // Llena la lista de usuarios
  function cargarListaUsuarios() {
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';
    usuarios.forEach(u => {
      const div = document.createElement('div');
      div.classList.add('user-item_usuarios', 'mb-2');
      div.textContent = `${u.nombre} ${u.apellidos} (${u.nombreUsuario})`;
      div.onclick = () => mostrarDetallesUsuario(u);
      lista.appendChild(div);
    });
  }
  
  function filtrarUsuarios() {
    const filtro = document.getElementById('buscarUsuarioInput').value.toLowerCase();
    const lista = document.getElementById('listaUsuarios');
    lista.innerHTML = '';
  
    const filtrados = usuarios.filter(u =>
      u.nombre.toLowerCase().includes(filtro) ||
      u.apellidos.toLowerCase().includes(filtro) ||
      u.nombreUsuario.toLowerCase().includes(filtro)
    );
  
    if (filtrados.length === 0) {
      lista.innerHTML = '<p class="text-muted">No se encontraron usuarios.</p>';
      return;
    }
  
    filtrados.forEach(u => {
      const div = document.createElement('div');
      div.classList.add('user-item_usuarios', 'mb-2');
      div.textContent = `${u.nombre} ${u.apellidos} (${u.nombreUsuario})`;
      div.onclick = () => mostrarDetallesUsuario(u);
      lista.appendChild(div);
    });
  }
  
  function mostrarDetallesUsuario(u) {
    document.getElementById('sinUsuarioSeleccionado').style.display = 'none';
    const detalles = document.getElementById('detallesUsuario');
    detalles.style.display = 'block';
  
    // Rellenar campos
    document.getElementById('nombreUsuario').textContent = `${u.nombre} ${u.apellidos}`;
    document.getElementById('correoUsuario').textContent = u.correo;
    
    const badge = document.getElementById('estadoCuentaBadge');
    const btnToggle = document.getElementById('botonToggleBloqueo');
  
    if (u.estado === 'bloqueado') {
      badge.className = 'badge bg-danger';
      badge.textContent = 'Bloqueado';
      btnToggle.className = 'btn btn-success ms-3';
      btnToggle.textContent = 'Desbloquear Usuario';
    } else {
      badge.className = 'badge bg-success';
      badge.textContent = 'Activo';
      btnToggle.className = 'btn btn-danger ms-3';
      btnToggle.textContent = 'Bloquear Usuario';
    }
  
    // InfoTab
    document.getElementById('infoNombre').textContent = u.nombre;
    document.getElementById('infoApellidos').textContent = u.apellidos;
    document.getElementById('infoNombreUsuario').textContent = u.nombreUsuario;
    document.getElementById('infoCorreo').textContent = u.correo;
    document.getElementById('infoGenero').textContent = u.genero;
  
    // Publicaciones => Columnas con 2 imágenes cada una
    generarColumnasPublicaciones(u.publicaciones);
  
    // Guardamos el usuario seleccionado globalmente, por si hace falta
    window.usuarioSeleccionado = u;
  }
  
  // Agrupa las publicaciones en pares y las muestra como “columnas”
  function generarColumnasPublicaciones(publicaciones) {
    const listaPub = document.getElementById('listaPublicacionesUsuario');
    listaPub.innerHTML = '';
  
    if (!publicaciones || publicaciones.length === 0) {
      listaPub.innerHTML = '<li>No hay publicaciones.</li>';
      return;
    }
  
    // Agrupamos de 2 en 2
    const columnas = agruparEnPares(publicaciones, 2);
  
    columnas.forEach(columna => {
      // Cada “columna” es un <li> con 2 (o 1) imágenes apiladas
      const liColumna = document.createElement('li');
      liColumna.classList.add('columna-publicaciones');
  
      columna.forEach(pub => {
        const img = document.createElement('img');
        img.src = pub.urlImagen;
        img.classList.add('post-image-thumbnail');
        img.alt = `Publicación ${pub.id}`;
        img.onclick = () => verPublicacion(pub);
        liColumna.appendChild(img);
      });
  
      listaPub.appendChild(liColumna);
    });
  }
  
  // Agrupa el array “arr” en sub-arrays de tamaño “tamaño”
  function agruparEnPares(arr, tamaño) {
    const resultado = [];
    for (let i = 0; i < arr.length; i += tamaño) {
      resultado.push(arr.slice(i, i + tamaño));
    }
    return resultado;
  }
  
  // Botón para bloquear/desbloquear
  function toggleBloqueoUsuario() {
    if (!window.usuarioSeleccionado) return;
  
    if (window.usuarioSeleccionado.estado === 'bloqueado') {
      window.usuarioSeleccionado.estado = 'activo';
      alert('Usuario desbloqueado (simulación).');
    } else {
      window.usuarioSeleccionado.estado = 'bloqueado';
      alert('Usuario bloqueado (simulación).');
    }
  
    // Aquí podrías llamar a tu Servlet real:
    /*
    fetch('/ToggleBloqueoUsuarioServlet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        nombreUsuario: window.usuarioSeleccionado.nombreUsuario,
        nuevoEstado: window.usuarioSeleccionado.estado
      })
    })
    .then(resp => resp.json())
    .then(data => {
      console.log('Respuesta del servidor:', data);
      mostrarDetallesUsuario(window.usuarioSeleccionado);
    })
    .catch(err => console.error(err));
    */
  
    // Actualiza la vista local
    mostrarDetallesUsuario(window.usuarioSeleccionado);
  }
  
  function verPublicacion(pub) {
    alert(`Vista previa de la publicación ID: ${pub.id}`);
    console.log('Clic en imagen de publicación:', pub);
  }
  