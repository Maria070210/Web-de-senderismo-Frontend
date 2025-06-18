document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async function (event) {
        event.preventDefault();  // Evita el envío automático del formulario

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/SenderismoWeb/LoginServlet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `username=${username}&password=${password}`,
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inicio de sesión exitoso. Redirigiendo...");

                // Redireccionar según el rol del usuario
                if (data.role === "admin") {
                    window.location.href = "./adminDashboard.html";
                } else {
                    window.location.href = "./inicioUser.html";
                }
            } else {
                alert(data.message || "Usuario o contraseña incorrectos.");
            }
        } catch (error) {
            console.error("Error de conexión: ", error);
            alert("No se pudo conectar con el servidor.");
        }
    });

    // Validación visual durante la escritura
    usernameInput.addEventListener("input", function () {
        if (usernameInput.value.trim() !== "") {
            usernameInput.style.borderColor = "green";
        } else {
            usernameInput.style.borderColor = "red";
        }
    });

    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.trim() !== "") {
            passwordInput.style.borderColor = "green";
        } else {
            passwordInput.style.borderColor = "red";
        }
    });
});
