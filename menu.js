// Menú lateral (tres rayitas) compartido por todas las páginas.
(function () {
  var WA = "https://wa.me/573052742623?text=" + encodeURIComponent("Hola Dr. Camilo, vengo de su página web y quiero agendar una cita.");
  var MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Edificio Access Point, Carrera 22 17-325, Medellín, Colombia");
  var groups = [
    ["Inicio", [
      ["Inicio", "/"],
      ["Conóceme", "/#medico"],
      ["Especialidades", "/#especialidades"],
      ["Tu consulta", "/#historias"]
    ]],
    ["Servicios", [
      ["Chequeo Ejecutivo Cardiovascular", "/chequeo-cardiovascular-medellin"],
      ["Ecocardiograma Doppler Color", "/ecocardiograma-medellin"],
      ["Electrocardiograma", "/electrocardiograma-medellin"],
      ["Monitoreo de Presión Arterial (MAPA)", "/mapa-medellin"],
      ["Valoración Preparticipativa Deportiva", "/valoracion-preparticipativa-medellin"],
      ["Consulta de Obesidad y Riesgo Cardiometabólico", "/consulta-obesidad-medellin"],
      ["Colesterol en 2 minutos", "/colesterol-en-2-minutos-medellin"]
    ]],
    ["Gratis", [
      ["¿Qué edad tiene tu corazón? Test de 60 segundos", "/corazon"]
    ]]
  ];

  // Estilos del menú incluidos aquí para que funcione aunque el navegador tenga guardada una versión vieja de styles.css.
  var st = document.createElement("style");
  st.textContent = '/* ===== Menú lateral (tres rayitas) ===== */\n.menu-toggle {\n  width: 44px; height: 44px;\n  display: inline-flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px;\n  border: 1px solid var(--line); border-radius: 999px;\n  background: rgba(255,255,255,.7); cursor: pointer; padding: 0;\n}\n.menu-toggle span { display: block; width: 18px; height: 1.6px; background: var(--graphite); border-radius: 2px; }\n.menu-toggle:hover { background: #fff; }\n.menu-toggle:focus-visible, .menu-close:focus-visible, .menu-sheet a:focus-visible { outline: 2px solid var(--teal); outline-offset: 3px; }\n.menu-lock, .menu-lock body { overflow: hidden; }\n.menu-panel { position: fixed; inset: 0; z-index: 100; }\n.menu-backdrop { position: absolute; inset: 0; background: rgba(38,38,38,.28); opacity: 0; transition: opacity .25s ease; }\n.menu-sheet {\n  position: absolute; top: 0; right: 0; bottom: 0;\n  width: min(420px, 100%); overflow-y: auto;\n  padding: 22px 28px 32px;\n  background: var(--ivory);\n  box-shadow: -30px 0 80px rgba(38,38,38,.14);\n  transform: translateX(100%); transition: transform .25s ease;\n  display: flex; flex-direction: column;\n}\n.menu-panel.is-open .menu-backdrop { opacity: 1; }\n.menu-panel.is-open .menu-sheet { transform: translateX(0); }\n.menu-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }\n.menu-title { font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--soft); }\n.menu-close { width: 44px; height: 44px; border: 1px solid var(--line); border-radius: 999px; background: #fff; font-size: 26px; line-height: 1; color: var(--graphite); cursor: pointer; }\n.menu-group { margin: 22px 0 6px; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #127A80; }\n.menu-sheet ul { list-style: none; margin: 0; padding: 0; }\n.menu-sheet li a {\n  display: block; padding: 11px 0; border-bottom: 1px solid var(--line);\n  color: var(--graphite); text-decoration: none; font-size: 17px; line-height: 1.3;\n}\n.menu-sheet li a:hover { color: #127A80; }\n.menu-sheet li a[aria-current="page"] { font-weight: 700; }\n.menu-foot { margin-top: auto; padding-top: 28px; display: flex; flex-direction: column; gap: 10px; }\n.menu-foot .menu-wa { text-align: center; }\n.menu-foot p { margin: 6px 0 0; color: var(--soft); font-size: 14px; line-height: 1.5; }\n.menu-maps { color: var(--graphite); font-size: 14px; }\n@media (prefers-reduced-motion: reduce) { .menu-sheet, .menu-backdrop { transition: none; } }\n@media (max-width: 560px) { .desktop-nav { gap: 10px; } }';
  document.head.appendChild(st);

  var header = document.querySelector("header.nav");
  if (!header) return;
  var host = header.querySelector(".desktop-nav") || header;

  var btn = document.createElement("button");
  btn.className = "menu-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Abrir menú");
  btn.setAttribute("aria-expanded", "false");
  btn.setAttribute("aria-controls", "menu-panel");
  btn.innerHTML = "<span></span><span></span><span></span>";
  host.appendChild(btn);

  var here = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  var html = '<div class="menu-backdrop" data-close></div>' +
    '<nav class="menu-sheet" aria-label="Menú principal">' +
    '<div class="menu-top"><span class="menu-title">Menú</span>' +
    '<button type="button" class="menu-close" aria-label="Cerrar menú" data-close>&times;</button></div>';
  groups.forEach(function (g) {
    html += '<p class="menu-group">' + g[0] + '</p><ul>';
    g[1].forEach(function (l) {
      var cur = (l[1] === here) ? ' aria-current="page"' : '';
      html += '<li><a href="' + l[1] + '"' + cur + '>' + l[0] + '</a></li>';
    });
    html += '</ul>';
  });
  html += '<div class="menu-foot">' +
    '<a class="btn primary menu-wa" href="' + WA + '" target="_blank" rel="noopener">Agendar por WhatsApp</a>' +
    '<p>Carrera 22 # 17-325, consultorio 1037<br>Edificio Access Point, Medellín</p>' +
    '<a class="menu-maps" href="' + MAPS + '" target="_blank" rel="noopener">Cómo llegar</a></div></nav>';

  var panel = document.createElement("div");
  panel.id = "menu-panel";
  panel.className = "menu-panel";
  panel.hidden = true;
  panel.innerHTML = html;
  document.body.appendChild(panel);

  function open() {
    panel.hidden = false;
    requestAnimationFrame(function () { panel.classList.add("is-open"); });
    btn.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("menu-lock");
    var first = panel.querySelector(".menu-close");
    if (first) first.focus();
  }
  function close() {
    panel.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-lock");
    setTimeout(function () { panel.hidden = true; }, 250);
    btn.focus();
  }
  btn.addEventListener("click", open);
  panel.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { close(); return; }
    var a = e.target.closest("a");
    if (a && a.getAttribute("href").indexOf("#") > -1 && a.target !== "_blank") close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !panel.hidden) close();
  });
})();
