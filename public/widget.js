(function () {
  const botId = document.currentScript?.getAttribute("data-bot-id");
  if (!botId) return;

  const BASE_URL = "https://chatbase-theta.vercel.app";

  // Estilos
  const style = document.createElement("style");
  style.textContent = `
    #cb-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #7c3aed;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 24px rgba(124,58,237,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: transform 0.2s, background 0.2s;
    }
    #cb-widget-btn:hover { background: #6d28d9; transform: scale(1.08); }
    #cb-widget-btn svg { width: 26px; height: 26px; fill: white; }
    #cb-widget-box {
      position: fixed;
      bottom: 90px;
      right: 24px;
      width: 370px;
      height: 520px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(0,0,0,0.18);
      z-index: 9998;
      display: none;
      flex-direction: column;
      background: #0f0f13;
      border: 1px solid rgba(255,255,255,0.08);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    #cb-widget-box.open { display: flex; }
    #cb-widget-header {
      padding: 14px 16px;
      background: #18181f;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      display: flex;
      align-items: center;
      gap: 10px;
    }
    #cb-widget-avatar {
      width: 34px; height: 34px; border-radius: 50%;
      background: rgba(124,58,237,0.2);
      border: 1px solid rgba(124,58,237,0.3);
      display: flex; align-items: center; justify-content: center;
    }
    #cb-widget-avatar svg { width: 18px; height: 18px; fill: #a78bfa; }
    #cb-widget-name { font-size: 14px; font-weight: 600; color: #fff; }
    #cb-widget-status { font-size: 11px; color: #4ade80; display: flex; align-items: center; gap: 4px; }
    #cb-widget-status span { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; display: inline-block; }
    #cb-widget-messages {
      flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px;
    }
    #cb-widget-messages::-webkit-scrollbar { width: 4px; }
    #cb-widget-messages::-webkit-scrollbar-track { background: transparent; }
    #cb-widget-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
    .cb-msg {
      max-width: 80%; padding: 10px 14px; border-radius: 14px;
      font-size: 13px; line-height: 1.5; color: #fff;
    }
    .cb-msg.bot { background: rgba(255,255,255,0.08); border-radius: 14px 14px 14px 2px; align-self: flex-start; }
    .cb-msg.user { background: #7c3aed; border-radius: 14px 14px 2px 14px; align-self: flex-end; }
    .cb-typing { display: flex; gap: 4px; align-items: center; padding: 10px 14px; background: rgba(255,255,255,0.08); border-radius: 14px 14px 14px 2px; align-self: flex-start; }
    .cb-typing span { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.4); animation: cb-bounce 1.2s infinite; }
    .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
    .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes cb-bounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }
    #cb-widget-input-area {
      padding: 12px; border-top: 1px solid rgba(255,255,255,0.07);
      display: flex; gap: 8px; background: #18181f;
    }
    #cb-widget-input {
      flex: 1; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; padding: 8px 12px; color: #fff; font-size: 13px; outline: none;
    }
    #cb-widget-input::placeholder { color: rgba(255,255,255,0.3); }
    #cb-widget-send {
      width: 36px; height: 36px; border-radius: 10px; background: #7c3aed;
      border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    #cb-widget-send:hover { background: #6d28d9; }
    #cb-widget-send svg { width: 16px; height: 16px; fill: white; }
    #cb-widget-branding {
      text-align: center; padding: 6px; font-size: 10px;
      color: rgba(255,255,255,0.2); background: #18181f;
    }
    #cb-widget-branding a { color: rgba(255,255,255,0.3); text-decoration: none; }
  `;
  document.head.appendChild(style);

  // HTML
  const box = document.createElement("div");
  box.id = "cb-widget-box";
  box.innerHTML = `
    <div id="cb-widget-header">
      <div id="cb-widget-avatar">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
      </div>
      <div>
        <div id="cb-widget-name">Asistente</div>
        <div id="cb-widget-status"><span></span> En línea</div>
      </div>
    </div>
    <div id="cb-widget-messages"></div>
    <div id="cb-widget-input-area">
      <input id="cb-widget-input" placeholder="Escribe un mensaje..." />
      <button id="cb-widget-send">
        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
      </button>
    </div>
    <div id="cb-widget-branding">Powered by <a href="https://chatbase-theta.vercel.app" target="_blank">ChatBase</a></div>
  `;
  document.body.appendChild(box);

  const btn = document.createElement("button");
  btn.id = "cb-widget-btn";
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`;
  document.body.appendChild(btn);

  const messagesEl = document.getElementById("cb-widget-messages");
  const inputEl = document.getElementById("cb-widget-input");
  const nameEl = document.getElementById("cb-widget-name");

  const history = [];
  let botName = "Asistente";
  let initialized = false;

  // Cargar nombre del bot
  fetch(`${BASE_URL}/api/bots/${botId}`)
    .then(r => r.json())
    .then(data => {
      if (data.name) {
        botName = data.name;
        nameEl.textContent = botName;
      }
    }).catch(() => {});

  function addMessage(content, role) {
    const div = document.createElement("div");
    div.className = `cb-msg ${role}`;
    div.textContent = content;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function showTyping() {
    const div = document.createElement("div");
    div.className = "cb-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    div.id = "cb-typing";
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById("cb-typing");
    if (t) t.remove();
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = "";

    addMessage(text, "user");
    history.push({ role: "user", content: text });
    showTyping();

    try {
      const res = await fetch(`${BASE_URL}/api/chat/${botId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      hideTyping();
      const reply = data.reply || "Lo siento, no pude responder.";
      addMessage(reply, "bot");
      history.push({ role: "assistant", content: reply });
    } catch {
      hideTyping();
      addMessage("Error de conexión. Inténtalo de nuevo.", "bot");
    }
  }

  btn.addEventListener("click", () => {
    box.classList.toggle("open");
    if (box.classList.contains("open") && !initialized) {
      initialized = true;
      addMessage(`¡Hola! Soy ${botName}. ¿En qué puedo ayudarte?`, "bot");
    }
  });

  inputEl.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });

  document.getElementById("cb-widget-send").addEventListener("click", sendMessage);
})();