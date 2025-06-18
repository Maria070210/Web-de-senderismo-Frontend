
/**
 * Envía la nueva publicación al servlet con fetch.
 */
function añadirPublicacion() {
    // 1. Tomar referencias a los elementos
    const imagenPrincipalFile = document.getElementById('imagenPrincipalInput').files[0];
    const imagenRutaFile = document.getElementById('imagenRutaInput').files[0];
    const titulo = document.getElementById('tituloInput').value.trim();
    const tipoRuta = document.getElementById('tipoRutaSelect').value;
    const urlMaps = document.getElementById('urlMapsInput').value.trim();
    const mensaje = document.getElementById('mensajeInput').value.trim();
    const carruselFiles = document.getElementById('carruselInput').files; // FileList

    // 2. Validar campos básicos
    if (!titulo || tipoRuta === 'filtro' || !urlMaps || !mensaje) {
        alert('Por favor, completa todos los campos requeridos (título, tipo, URL Maps, mensaje).');
        return;
    }
    if (!imagenPrincipalFile || !imagenRutaFile) {
        alert('Debes seleccionar la imagen principal y la imagen de la ruta (seguimiento).');
        return;
    }

    // 3. Construir objeto FormData para subir archivos + texto
    const formData = new FormData();

    // Campos tipo "texto"
    formData.append('titulo', titulo);
    formData.append('tipoRuta', tipoRuta);
    formData.append('urlMaps', urlMaps);
    formData.append('mensaje', mensaje);

    // Imagen principal (solo 1)
    formData.append('imagenPrincipal', imagenPrincipalFile);

    // Imagen seguimiento (solo 1)
    formData.append('imagenRuta', imagenRutaFile);

    // Múltiples imágenes para el carrusel
    // Podrías limitar a 6 en front-end o back-end
    for (let i = 0; i < carruselFiles.length; i++) {
        formData.append('carrusel[]', carruselFiles[i]);
    }

    // 4. Enviar al servlet con fetch usando método POST
    fetch('/NuevaPublicacionServlet', {
        method: 'POST',
        body: formData // multipart/form-data automáticamente
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear la publicación en el servidor.');
        }
        return response.json(); 
    })
    .then(data => {
        // data podría ser { exito: boolean, mensaje: string, ...}
        if (data.exito) {
            alert('Publicación creada con éxito.');
            window.location.href = './perfil.html'; 
        } else {
            alert('No se pudo crear la publicación: ' + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error en añadirPublicacion:', error);
        alert('Ocurrió un error al crear la publicación.');
    });
}

//Botón de añadir imagenes (Icono carpeta)

document.getElementById('imagenPrincipalInput').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('imagenPrincipalNombre').textContent = fileName;
  });
  document.getElementById('imagenRutaInput').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : 'Ningún archivo seleccionado';
    document.getElementById('imagenRutaNombre').textContent = fileName;
  });
  document.getElementById('carruselInput').addEventListener('change', function() {
    const fileCount = this.files.length;
    document.getElementById('carruselNombre').textContent = fileCount
      ? fileCount + ' archivo(s) seleccionado(s)'
      : 'Ningún archivo seleccionado';
  });