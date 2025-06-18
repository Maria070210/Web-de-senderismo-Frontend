
/**
 * Carga los datos del usuario desde el servidor
 * usando fetch a /CargarDatosServlet (por ejemplo).
 * Ajusta la URL.
 */
function cargarDatos() {
    fetch('/CargarDatosServlet')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar datos del usuario');
            }
            return response.json();
        })
        .then(data => {
            // data debería contener { nombre, apellidos, genero, usuario, email, fotoUrl, ...}
            document.getElementById('nombreInput').value = data.nombre || '';
            document.getElementById('apellidosInput').value = data.apellidos || '';

            // Ajustar género
            if (data.genero === 'mujer') {
                document.getElementById('generoMujer').checked = true;
            } else if (data.genero === 'hombre') {
                document.getElementById('generoHombre').checked = true;
            } else if (data.genero === 'otro') {
                document.getElementById('generoOtro').checked = true;
            }

            document.getElementById('usuarioInput').value = data.usuario || '';
            document.getElementById('emailInput').value = data.email || '';

            // No se suele devolver la contraseña por seguridad, 
            // así que no lo cargamos aquí
            // document.getElementById('passwordInput').value = data.password;

            // Ajustar foto de perfil si existe
            const fotoPerfil = document.getElementById('fotoPerfil');
            if (data.fotoUrl) {
                fotoPerfil.src = data.fotoUrl;
            }
        })
        .catch(error => {
            console.error('Error cargando datos:', error);
            alert('No se pudo cargar la información del usuario.');
        });
}

/**
 * Toma los valores del formulario y los envía al servidor
 * usando fetch a /ActualizarDatosServlet (por ejemplo).
 */
function actualizarDatos() {
    const nombre = document.getElementById('nombreInput').value.trim();
    const apellidos = document.getElementById('apellidosInput').value.trim();
    const genero = obtenerGeneroSeleccionado();
    const usuario = document.getElementById('usuarioInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    // Validar campos básicos
    if (!nombre || !apellidos || !usuario || !email || !password) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Construir objeto de datos
    const payload = {
        nombre: nombre,
        apellidos: apellidos,
        genero: genero,
        usuario: usuario,
        email: email,
        password: password
    };

    // Enviar datos al servlet
    fetch('/ActualizarDatosServlet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        if (data.exito) {
            alert('Datos actualizados correctamente.');
            // Redirigir, recargar o hacer otra acción
            window.location.href = './configuracion.html';
        } else {
            alert('No se pudieron actualizar los datos: ' + data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error al actualizar datos:', error);
        alert('Ocurrió un error al actualizar los datos.');
    });
}

/**
 * Determina qué género se seleccionó.
 * Como usamos radio buttons, solo uno estará checked.
 */
function obtenerGeneroSeleccionado() {
    if (document.getElementById('generoMujer').checked) return 'mujer';
    if (document.getElementById('generoHombre').checked) return 'hombre';
    if (document.getElementById('generoOtro').checked) return 'otro';
    return '';
}
