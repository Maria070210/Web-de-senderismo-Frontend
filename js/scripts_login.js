const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function (event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario

    const username = document.querySelector("input[type='text']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();

    if (username === "admin" && password === "admin") {
        window.location.href = "administrador_main.html";
    } else if (username === "user" && password === "user") {
        window.location.href = "inicioUser.html";
    } else {
        alert("Nombre de usuario o contraseña incorrectos");
    }
});
