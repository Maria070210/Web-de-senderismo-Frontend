/**
 * scripts_inicioUser.js
 * Lógica para cargar 9 publicaciones (3x3) cada 30s,
 * según el filtro seleccionado y mostrar la lista de
 * seguidos y recomendados.
 */

// --- SIMULACIÓN DE DATOS DE USUARIOS ---
const SIM_USERS_FOLLOWED = [
    { username: "Ricardit0_69", foto: "./img/perfilPersona2.png" },
    { username: "JulioPerales", foto: "./img/perfil.png" },
    { username: "Josefa",       foto: "./img/perfil.png" },
    { username: "Maur1cio",     foto: "./img/perfil.png" },
    { username: "Angustas_p4Tos", foto: "./img/perfil.png" }
  ];
  
  const SIM_USERS_RECOMMENDED = [
    { username: "Filipa",   foto: "./img/perfilPersona3.png" },
    { username: "Rodolfo",  foto: "./img/perfil.png" },
    { username: "Dolores",  foto: "./img/perfil.png" },
    { username: "Eustaquio", foto: "./img/perfil.png" },
    { username: "eL_m0Zo",  foto: "./img/perfil.png" }
  ];
  
  // --- SIMULACIÓN DE URLs POR CATEGORÍA ---
  const IMG_SIMULADAS = {
    lago: [
      "./img/Lago1.jpg", "./img/Lago2.jpg", "./img/Lago3.jpg",
      "./img/Lago4.jpg", "./img/Lago5.jpg", "./img/Lago6.jpg", "./img/Lago7.jpg"
    ],
    rocas: [
      "./img/Rocas1.jpg", "./img/Rocas2.jpg", "./img/Rocas3.jpg",
      "./img/Rocas4.jpg", "./img/Rocas5.jpg", "./img/Rocas6.jpg", "./img/Rocas7.jpg"
    ],
    nieve: [
      "./img/Nieve1.jpg", "./img/Nieve2.jpg", "./img/Nieve3.jpg",
      "./img/Nieve4.jpg", "./img/Nieve5.jpg", "./img/Nieve6.jpg", "./img/Nieve7.jpg"
    ],
    montaña: [
      "./img/Montana1.jpg", "./img/Montana2.jpg", "./img/Montana3.jpg",
      "./img/Montana4.jpg", "./img/Montana5.jpg", "./img/Montana6.jpg", "./img/Montana7.jpg"
    ],
    bosque: [
      "./img/Bosque1.jpg", "./img/Bosque2.jpg", "./img/Bosque3.jpg",
      "./img/Bosque4.jpg", "./img/Bosque5.jpg", "./img/Bosque6.jpg", "./img/Bosque7.jpg"
    ],
    mosaico: [
      "./img/Mosaico/1.png", "./img/Mosaico/2.png", "./img/Mosaico/3.png",
      "./img/Mosaico/4.png", "./img/Mosaico/5.png", "./img/Mosaico/6.png",
      "./img/Mosaico/7.png"
    ]
};

  // "all" une todo
  IMG_SIMULADAS.all = [
    ...IMG_SIMULADAS.lago,
    ...IMG_SIMULADAS.rocas,
    ...IMG_SIMULADAS.nieve,
    ...IMG_SIMULADAS.montaña,
    ...IMG_SIMULADAS.bosque,
    ...IMG_SIMULADAS.mosaico
  ];
  
  // Variable global del filtro
  let filtroSeleccionado = "all";
  let intervaloRefresco = null;
  let yaCargueListasUsuarios = false; // Para no repintar seguidos/sugeridos cada 30s si no quieres
  
  document.addEventListener("DOMContentLoaded", () => {
    // Al iniciar, carga todo y arranca refresco
    cargarInicio(filtroSeleccionado);
    iniciarRefresco();
  
    // Cambio en select
    document.getElementById("filtro-publi").addEventListener("change", filtrarTipo);
  });
  
  /**
   * Llama (o simula) al servidor para traer:
   *  - Publicaciones: 9 imágenes aleatorias según el filtro
   *  - Lista de seguidos y recomendados (solo una vez si quieres)
   */
  function cargarInicio(categoria) {
    /* ------ EJEMPLO FETCH REAL -------
    fetch('/TuServletInicio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accion: 'obtenerInicio',
        tipo: categoria
      })
    })
    .then(resp => resp.json())
    .then(data => {
      // data = { publicaciones: [...9...], seguidos: [...], recomendados: [...] }
      pintarPublicaciones(data.publicaciones);
      pintarUsuariosSeguidos(data.seguidos);
      pintarUsuariosRecomendados(data.recomendados);
    })
    .catch(err => console.error(err));
    */
  
    // --- Simulación local ---
    const publicaciones = getRandomUrls(
      categoria in IMG_SIMULADAS ? IMG_SIMULADAS[categoria] : IMG_SIMULADAS.all,
      9
    );
    pintarPublicaciones(publicaciones);
  
    // Si no hemos cargado las listas, las pintamos (simulamos fetch)
    if (!yaCargueListasUsuarios) {
      pintarUsuariosSeguidos(SIM_USERS_FOLLOWED);
      pintarUsuariosRecomendados(SIM_USERS_RECOMMENDED);
      yaCargueListasUsuarios = true;
    }
  }
  
  /**
   * Toma un array y devuelve 'count' elementos aleatorios.
   * Si no hay suficientes, rellena con placeholders.
   */
  function getRandomUrls(arr, count) {
    const baraja = [...arr];
    const resultado = [];
    const n = Math.min(count, baraja.length);
    for (let i = 0; i < n; i++) {
      const idx = Math.floor(Math.random() * baraja.length);
      resultado.push(baraja[idx]);
      baraja.splice(idx, 1);
    }
    while (resultado.length < count) {
      resultado.push("./img/Mosaico/placeholder.png");
    }
    return resultado;
  }
  
  /**
   * Inserta las URLs en los 9 <img> (imagen-inicio1..9)
   */
  function pintarPublicaciones(urls) {
    for (let i = 1; i <= 9; i++) {
      const img = document.getElementById(`imagen-inicio${i}`);
      if (img) {
        img.src = urls[i - 1] || "./img/Mosaico/placeholder.png";
      }
    }
  }
  
  /**
   * Inicia un intervalo que recarga SÓLO publicaciones cada 30s
   */
  function iniciarRefresco() {
    intervaloRefresco = setInterval(() => {
      cargarInicio(filtroSeleccionado);
    }, 30000);
  }
  
  /**
   * Si se cambia el filtro, paramos y volvemos a iniciar el refresco.
   */
  function filtrarTipo() {
    const val = document.getElementById("filtro-publi").value;
    filtroSeleccionado = val === "filtro" ? "all" : val;
    cargarInicio(filtroSeleccionado);
    reiniciarRefresco();
  }
  
  function reiniciarRefresco() {
    if (intervaloRefresco) clearInterval(intervaloRefresco);
    iniciarRefresco();
  }
  
  /**
   * Pinta la lista de usuarios seguidos en el primer bloque "profile-list"
   */
  function pintarUsuariosSeguidos(users) {
    // Primer contenedor de perfiles
    const profileLists = document.querySelectorAll(".profile-list");
    // Con la estructura actual, el primero es seguidos, el segundo sugeridos
    if (!profileLists[0]) return;
    profileLists[0].innerHTML = ""; // Limpiar
  
    users.forEach(u => {
      const div = document.createElement("div");
      div.className = "profile-item";
      div.innerHTML = `
        <img type="button" src="${u.foto}" alt="perfil" width="50" height="50" onclick="visitarPerfil('${u.username}')">
        <span>${u.username}</span>
      `;
      profileLists[0].appendChild(div);
    });
  }
  
  /**
   * Pinta la lista de usuarios recomendados en el segundo bloque "profile-list"
   */
  function pintarUsuariosRecomendados(users) {
    const profileLists = document.querySelectorAll(".profile-list");
    if (!profileLists[1]) return;
    profileLists[1].innerHTML = ""; // Limpiar
  
    users.forEach(u => {
      const div = document.createElement("div");
      div.className = "profile-item";
      div.innerHTML = `
        <img type="button" src="${u.foto}" alt="perfil" width="50" height="50" onclick="visitarPerfil('${u.username}')">
        <span>${u.username}</span>
      `;
      profileLists[1].appendChild(div);
    });
  }
  
  /**
   * Ir al perfil: usarías fetch/otra lógica para redirigir, etc.
   */
  function visitarPerfil(username) {
    // En un caso real, harías location.href a "./perfilOtro.html?user=" + username
    alert("Ir al perfil de " + username);
  }
  