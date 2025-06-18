document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nombreInput = form.querySelector('input[placeholder=" Nombre"]');
    const apellidosInput = form.querySelector('input[placeholder=" Apellidos"]');
    const usuarioInput = form.querySelector('input[placeholder=" Nombre de usuario"]');
    const correoInput = form.querySelector('input[placeholder=" Correo"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const generoCheckboxes = form.querySelectorAll('input[name="generos"]');
    const botonRegistro = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Validación de campos
        if (!validarCampos()) {
            alert("Por favor, complete todos los campos correctamente.");
            return;
        }

        // Obtener datos del formulario
        const datos = {
            nombre: nombreInput.value.trim(),
            apellidos: apellidosInput.value.trim(),
            username: usuarioInput.value.trim(),
            correo: correoInput.value.trim(),
            password: passwordInput.value.trim(),
            genero: obtenerGeneroSeleccionado()
        };

        try {
            // Enviar datos al servlet
            const response = await fetch("http://localhost:8080/SenderismoWeb/RegistroServlet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams(datos).toString()
            });

            const resultado = await response.json();

            if (response.ok) {
                alert("Registro exitoso. Redirigiendo al inicio de sesión...");
                window.location.href = "./acceso.html";
            } else {
                alert(resultado.message || "Hubo un error en el registro.");
            }
        } catch (error) {
            console.error("Error en el registro: ", error);
            alert("Error de conexión con el servidor.");
        }
    });

    // Validación básica de campos
    function validarCampos() {
        if (
            nombreInput.value.trim() === "" ||
            apellidosInput.value.trim() === "" ||
            usuarioInput.value.trim() === "" ||
            correoInput.value.trim() === "" ||
            passwordInput.value.trim() === ""
        ) {
            return false;
        }

        if (!correoInput.value.includes("@")) {
            alert("El correo electrónico no es válido.");
            return false;
        }

        return true;
    }

    // Obtener género seleccionado
    function obtenerGeneroSeleccionado() {
        let generoSeleccionado = "";
        generoCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                generoSeleccionado = checkbox.value;
            }
        });
        return generoSeleccionado;
    }
});
