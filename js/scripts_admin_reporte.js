/* scripts_admin_reporte.js */

// Arrays simulados de ejemplo
let reportesMensajes = [];
let reportesPublicaciones = [];
let reportesCerrados = [];

window.onload = function() {
    const params = new URLSearchParams(location.search);
    const estado = params.get('status') || 'mensajes';
    mostrarReportes(estado);
  };
  

// Muestra la lista de reportes según el tipo
// forceCloseView (true) cierra la vista detalle si estabas en ella
function mostrarReportes(tipo, forceCloseView = false) {
  const container = document.querySelector('.container-fluid.report-status_reporte');
  container.classList.remove('mensajes', 'publicaciones', 'cerrados');
  container.classList.add(tipo);

  if (forceCloseView) cerrarVistaReporte();

  const reportTitle = document.getElementById('reportTitle');
  if (tipo === 'mensajes') {
    reportTitle.textContent = 'Reportes de Mensajes';
  } else if (tipo === 'publicaciones') {
    reportTitle.textContent = 'Reportes de Publicaciones';
  } else {
    reportTitle.textContent = 'Reportes Cerrados';
  }

  // Limpiamos la lista
  const reportsList = document.getElementById('reportsList');
  reportsList.innerHTML = '';

  // --- EJEMPLO DE DATOS SIMULADOS ---
  if (tipo === 'mensajes') {
    reportesMensajes = [
      { 
        id: 1,
        titulo: 'Mensaje Agresivo',
        usuario: 'UserA',
        fecha: '2024-12-01',
        tipo: 'mensajes',
        textoMensaje: '¡Estás haciendo todo mal, eres un desastre!'
      },
      {
        id: 2,
        titulo: 'Spam en el chat',
        usuario: 'UserB',
        fecha: '2024-12-02',
        tipo: 'mensajes',
        textoMensaje: 'Hey, visita mi web para ganar dinero fácil...'
      }
    ];
    mostrarEnLista(reportesMensajes);

  } else if (tipo === 'publicaciones') {
    reportesPublicaciones = [
      {
        id: 3,
        titulo: 'Publicación Inapropiada',
        usuario: 'UserC',
        fecha: '2024-12-03',
        tipo: 'publicaciones',
        autorPublicacion: 'UserC',
        tituloPublicacion: 'Mira mi ruta extrema',
        mensajePublicacion: 'Fotos y texto no apropiados...',
        urlPublicacion: 'https://maps.google.com/',
        imagenes: ['img/Rutas.jpg', 'img/Rutas2.jpg']
      }
    ];
    mostrarEnLista(reportesPublicaciones);

  } else {
    // Cerrados
    reportesCerrados = [
      {
        id: 99,
        titulo: 'Reporte Cerrado Ejemplo',
        usuario: 'UserX',
        fecha: '2024-11-30',
        tipo: 'cerrados'
      }
    ];
    mostrarEnLista(reportesCerrados);
  }

  /* Aqui es donde tienes que tocar segun indica nuestro amigo. 
  // --- LLAMADA REAL A SERVLET: descomenta y adapta ---
  fetch('/MiServletReportes?tipo=' + tipo)
    .then(resp => resp.json())
    .then(data => {
      mostrarEnLista(data);
    })
    .catch(err => console.error('Error:', err));
  */
}

// Rellena la lista de reportes
function mostrarEnLista(reportes) {
  const reportsList = document.getElementById('reportsList');
  if (!reportes || reportes.length === 0) {
    reportsList.innerHTML = '<p class="list-group-item">No hay reportes.</p>';
    return;
  }
  reportes.forEach(rep => {
    const btn = document.createElement('button');
    btn.classList.add('list-group-item', 'list-group-item-action');
    btn.textContent = `ID:${rep.id} - ${rep.titulo} - ${rep.usuario} - ${rep.fecha}`;
    btn.onclick = () => verReporte(rep);
    reportsList.appendChild(btn);
  });
}

// Muestra la vista detalle de un reporte
function verReporte(reporte) {
  document.getElementById('reportsView').style.display = 'none';
  document.getElementById('selectedReportView').style.display = 'block';

  // Completa los datos generales
  document.getElementById('detailReportId').textContent = reporte.id;
  document.getElementById('detailReportTitle').textContent = reporte.titulo;
  document.getElementById('detailReportUser').textContent = reporte.usuario;
  document.getElementById('detailReportDate').textContent = reporte.fecha;

  const btnSancionar = document.getElementById('btnSancionar');
  const closedInfo = document.getElementById('closedInfo');
  btnSancionar.style.display = 'none';
  closedInfo.style.display = 'none';

  // Oculta secciones específicas
  const mensajeDetails = document.getElementById('mensajeDetails');
  const publicacionDetails = document.getElementById('publicacionDetails');
  mensajeDetails.style.display = 'none';
  publicacionDetails.style.display = 'none';

  // Verificamos qué tipo de reporte es
  if (reporte.tipo === 'mensajes') {
    // MOSTRAR SECCIÓN DE MENSAJES
    mensajeDetails.style.display = 'block';
    document.getElementById('mensajeUser').textContent = reporte.usuario;
    document.getElementById('mensajeTexto').textContent = reporte.textoMensaje || '';

    // Mostrar botón sancionar en mensajes
    btnSancionar.style.display = 'inline-block';

  } else if (reporte.tipo === 'publicaciones') {
    // MOSTRAR SECCIÓN DE PUBLICACIONES
    publicacionDetails.style.display = 'block';
    document.getElementById('publicacionAutor').textContent = reporte.autorPublicacion || reporte.usuario;
    document.getElementById('publicacionTitulo').textContent = reporte.tituloPublicacion || '';
    document.getElementById('publicacionMensaje').textContent = reporte.mensajePublicacion || '';
    document.getElementById('publicacionUrl').textContent = reporte.urlPublicacion || '';

    // Cargar carrusel de imágenes
    cargarCarrusel(reporte.imagenes || []);

    // Mostrar botón sancionar
    btnSancionar.style.display = 'inline-block';
  
  } else {
    // CERRADOS
    closedInfo.style.display = 'block';
  }
}

// Cierra la vista de detalle
function cerrarVistaReporte() {
  document.getElementById('selectedReportView').style.display = 'none';
  document.getElementById('reportsView').style.display = 'block';
}

// Sanciona reporte (mueve a “cerrados”)
function sancionarReporte() {
  const idReporte = document.getElementById('detailReportId').textContent;
  alert(`Reporte ID ${idReporte} sancionado (simulación).`);
  
  /*
  // Llamada real a tu servlet para sancionar:
  fetch('/MiServletSancionar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idReporte })
  }).then(...)
  */

  // Vamos a la lista “cerrados” simulando que ya se movió
  mostrarReportes('cerrados', true);
}



// Genera el carrusel con las imágenes
function cargarCarrusel(imagenes) {
  const carouselInner = document.getElementById('carouselInner');
  carouselInner.innerHTML = '';

  // Si no hay imágenes, dejamos un "placeholder"
  if (!imagenes.length) {
    carouselInner.innerHTML = `
      <div class="carousel-item active">
        <img src="img/Rutas.jpg" class="d-block w-100" alt="Placeholder">
      </div>`;
    return;
  }

  imagenes.forEach((url, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('carousel-item');
    if (index === 0) itemDiv.classList.add('active');
    itemDiv.innerHTML = `<img src="${url}" class="d-block w-100" alt="Imagen">`;
    carouselInner.appendChild(itemDiv);
  });
}
