/* scripts_chat.js */

// Simulación de usuarios
const usuariosSimulados = [
    { id: 101, nombre: 'Manolo', avatar: './img/perfil.png' },
    { id: 102, nombre: 'Ricardo', avatar: './img/perfilPersona2.png' },
    { id: 103, nombre: 'Francisca', avatar: './img/perfil.png' },
    { id: 104, nombre: 'Augusto', avatar: './img/perfilPersona.png' },
  ];
  
  // Diccionario de conversaciones (simulación)
  let conversaciones = {
    101: [
      { sender: 101, text: 'Hola, soy Manolo', timestamp: new Date().toISOString() },
      { sender: 'me', text: 'Hola Manolo, ¿qué tal?', timestamp: new Date().toISOString() },
    ],
    102: [
      { sender: 102, text: 'Holaaa, q tal?', timestamp: new Date().toISOString() },
      { sender: 'me', text: 'Holiii, bien y tu?', timestamp: new Date().toISOString() },
      { sender: 102, text: 'Genial. Mañana quedamos?', timestamp: new Date().toISOString() },
      { sender: 'me', text: 'Valeee', timestamp: new Date().toISOString() },
    ],
    103: [
      { sender: 103, text: 'Francisca al habla', timestamp: new Date().toISOString() },
    ],
    104: [
      { sender: 104, text: 'Augusto presente', timestamp: new Date().toISOString() },
    ]
  };
  
  let usuarioActual = null;
  let ws = null;
  
  window.onload = function() {
    cargarUsuarios();
  
    // Inicializar WebSocket
    initWebSocket();
  
    // Detectar Enter en el input para enviar mensajes
    document.getElementById('msgInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault(); // Evita salto de línea
        enviarMensaje();
      }
    });
  };
  
  // Carga la lista de usuarios (izquierda)
  function cargarUsuarios() {
    const usersListDiv = document.getElementById('usersList');
    usersListDiv.innerHTML = '';
  
    usuariosSimulados.forEach(u => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('media', 'mb-4');
      userDiv.style.display = 'flex';
      userDiv.style.alignItems = 'center';
      userDiv.style.gap = '10px';
      userDiv.style.cursor = 'pointer';
  
      const img = document.createElement('img');
      img.src = u.avatar;
      img.style.width = '50px';
      img.style.height = '50px';
      img.classList.add('mr-3', 'rounded-circle');
  
      const span = document.createElement('span');
      span.textContent = u.nombre;
  
      userDiv.appendChild(img);
      userDiv.appendChild(span);
      userDiv.onclick = () => abrirChatConUsuario(u);
  
      usersListDiv.appendChild(userDiv);
    });
  }
  
  // Inicializa la conexión WebSocket
  function initWebSocket() {
    // Ajusta la URL según tu configuración de servidor
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const contextPath = ''; // Si tu aplicación tiene un contexto, agrégalo aquí, por ejemplo '/MiApp'
  
    ws = new WebSocket(`${protocol}//${host}${contextPath}/chat`);
  
    ws.onopen = function(evt) {
      console.log("Conectado al servidor WebSocket");
      // Puedes enviar un mensaje de bienvenida o autenticar aquí
    };
  
    ws.onmessage = function(evt) {
      console.log("Mensaje recibido:", evt.data);
      const msg = JSON.parse(evt.data);
      recibirMensaje(msg);
    };
  
    ws.onclose = function(evt) {
      console.log("Conexión cerrada", evt);
      // Opcional: intentar reconectar
    };
  
    ws.onerror = function(err) {
      console.error("Error en WebSocket:", err);
    };
  }
  
  // Maneja la recepción de un mensaje
  function recibirMensaje(msg) {
    const destinatarioId = msg.destinatarioId;
    const remitenteId = msg.remitenteId;
    const texto = msg.texto;
    const timestamp = msg.timestamp;
  
    // Verifica si el mensaje es para la conversación actual
    if (usuarioActual && ((remitenteId === usuarioActual.id) || (destinatarioId === usuarioActual.id))) {
      // Agregar el mensaje a la conversación
      agregarMensajeAlChat({ sender: remitenteId, text: texto, timestamp }, usuariosSimulados.find(u => u.id === remitenteId));
    }
  
    // Opcional: Notificar al usuario si está en otra conversación
  }
  
  // Muestra la conversación con el usuario seleccionado
  function abrirChatConUsuario(usuario) {
    usuarioActual = usuario;
    document.getElementById('chatTitle').textContent = 'Chat con ' + usuario.nombre;
  
    const chatMessagesDiv = document.getElementById('chatMessages');
    chatMessagesDiv.innerHTML = '';
  
    const mensajes = conversaciones[usuario.id] || [];
    mensajes.forEach(msg => {
      agregarMensajeAlChat(msg, usuario);
    });
    
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  }
  
  // Formato de fecha y hora
  function formatearFechaHora(timestamp) {
    const date = new Date(timestamp);
    
    // Formato: DD/MM/YYYY
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Enero es 0
    const año = date.getFullYear();
    
    // Formato de hora: HH:MM (24 horas)
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    
    return {
      fecha: `${dia}/${mes}/${año}`,
      hora: `${horas}:${minutos}`
    };
  }
  
  // Agrega un mensaje al contenedor de chat
  function agregarMensajeAlChat(msg, usuarioObj) {
    const chatMessagesDiv = document.getElementById('chatMessages');
    
    const { fecha, hora } = formatearFechaHora(msg.timestamp);
  
    // Contenedor de fecha y hora
    const timestampDiv = document.createElement('div');
    timestampDiv.classList.add('message-timestamp');
    timestampDiv.textContent = fecha;
  
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('message-time');
    timeDiv.textContent = hora;
  
    // Contenedor del mensaje
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('message-row');
  
    if (msg.sender === 'me') {
      rowDiv.classList.add('message-row-right');
    } else {
      rowDiv.classList.add('message-row-left');
    }
  
    let avatarUrl = '';
    let bubbleClass = '';
  
    if (msg.sender === 'me') {
      bubbleClass = 'message-bubble message-right';
      avatarUrl = './img/perfilPersona.png'; // Tu avatar local
    } else {
      bubbleClass = 'message-bubble message-left';
      avatarUrl = usuarioObj.avatar || './img/perfil.png';
    }
  
    // Creamos imagen avatar
    const img = document.createElement('img');
    img.src = avatarUrl;
    img.classList.add('message-avatar');
  
    // El texto del mensaje
    const bubbleSpan = document.createElement('span');
    bubbleSpan.className = bubbleClass;
    bubbleSpan.textContent = msg.text;
  
    // Orden: Avatar + Bubble o Bubble + Avatar
    if (msg.sender === 'me') {
      rowDiv.appendChild(bubbleSpan);
      rowDiv.appendChild(img);
    } else {
      rowDiv.appendChild(img);
      rowDiv.appendChild(bubbleSpan);
    }
  
    // Agrupar timestamp y mensaje
    const messageContainer = document.createElement('div');
    
    if (msg.sender === 'me') {
      messageContainer.classList.add('message-container-right');
    }
  
    messageContainer.appendChild(timestampDiv);
    messageContainer.appendChild(timeDiv);
    messageContainer.appendChild(rowDiv);
  
    chatMessagesDiv.appendChild(messageContainer);
  }
  
  // Envía mensaje al usuario actual
  function enviarMensaje() {
    const input = document.getElementById('msgInput');
    const text = input.value.trim();
    if (!text || !usuarioActual) return;
  
    const timestamp = new Date().toISOString();
  
    // En un caso real:
    /*
    const payload = {
      tipo: "mensaje",
      remitenteId: /* Tu ID de usuario aquí * /,
      destinatarioId: usuarioActual.id,
      texto: text,
      timestamp: timestamp
    };
  
    ws.send(JSON.stringify(payload));
    */
  
    // SIMULACIÓN
    guardarMensajeLocal(usuarioActual.id, 'me', text, timestamp);
    agregarMensajeAlChat({ sender: 'me', text, timestamp }, usuarioActual);
  
    // Hacemos scroll al final
    const chatMessagesDiv = document.getElementById('chatMessages');
    chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
  
    input.value = '';
  }
  
  // Guarda el mensaje localmente en nuestro "diccionario"
  function guardarMensajeLocal(userId, sender, text, timestamp) {
    if (!conversaciones[userId]) {
      conversaciones[userId] = [];
    }
    conversaciones[userId].push({ sender, text, timestamp });
  }
  