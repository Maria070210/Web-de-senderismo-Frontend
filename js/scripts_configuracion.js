document.addEventListener("DOMContentLoaded", function () {
    const nombreElemento = document.querySelector("#nombreUsuario");
    const apellidosElemento = document.querySelector("#apellidosUsuario");
    const generoElemento = document.querySelector("#generoUsuario");
    const emailElemento = document.querySelector("#emailUsuario");
    const imgPerfil = document.querySelector("#imgPerfil");

    // Función para mostrar datos del usuario en modo lectura
    function mostrarDatosUsuario(datos) {
        nombreElemento.textContent = datos.nombre || "Nombre";
        apellidosElemento.textContent = datos.apellidos || "Apellidos";
        generoElemento.textContent = datos.genero || "Género";
        emailElemento.textContent = datos.email || "Correo electrónico";
        imgPerfil.src = datos.imgPerfil || "./img/perfilPersona.png";  // Imagen por defecto
    }

    // Petición para obtener los datos del usuario desde el servlet
    fetch('/getUserData')  // Ruta del servlet que devuelve los datos
        .then(response => response.json())
        .then(data => {
            mostrarDatosUsuario(data);
        })
        .catch(error => {
            console.error("Error al cargar los datos del usuario:", error);
        });
});
