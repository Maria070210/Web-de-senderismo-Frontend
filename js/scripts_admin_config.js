function enviarCambioContrasena(event) {
    event.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const errorDiv = document.getElementById('passwordError');

    if (newPassword !== confirmPassword) {
        errorDiv.style.display = 'block';
        return;
    } else {
        errorDiv.style.display = 'none';
    }

    // Llamada real a tu Servlet (ejemplo):
    /*
    fetch('/CambiarContrasenaServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actual: currentPassword, nueva: newPassword })
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.exito) {
            alert('Contraseña cambiada con éxito');
            // Limpia los campos
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmPassword').value = '';
        } else {
            alert('Error al cambiar contraseña: ' + data.mensaje);
        }
    })
    .catch(err => console.error('Error:', err));
    */

    // Simulación
    alert('Contraseña actualizada (simulación)');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

function actualizarPerfil(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fullName || !email) {
        alert('Completa todos los campos');
        return;
    }

    // Llamada real a Servlet:
    /*
    fetch('/ActualizarPerfilServlet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreCompleto: fullName, correo: email })
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.exito) {
            alert('Perfil actualizado correctamente');
        } else {
            alert('Error al actualizar: ' + data.mensaje);
        }
    })
    .catch(err => console.error('Error:', err));
    */

    // Simulación
    alert(`Perfil actualizado (simulación).\nNuevo nombre: ${fullName}\nNuevo email: ${email}`);
}

function borrarCuenta() {
    if (!confirm('¿Estás seguro de que deseas borrar tu cuenta? Esta acción es irreversible.')) {
        return;
    }

    // Llamada real a Servlet:
    /*
    fetch('/BorrarCuentaServlet', {
        method: 'POST'
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.exito) {
            alert('Cuenta borrada. Saliendo...');
            window.location.href = '/login';
        } else {
            alert('Error al borrar cuenta: ' + data.mensaje);
        }
    })
    .catch(err => console.error('Error:', err));
    */

    // Simulación
    alert('Cuenta borrada (simulación). Redirigiendo...');
    window.location.href = './login.html';
}
