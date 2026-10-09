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
