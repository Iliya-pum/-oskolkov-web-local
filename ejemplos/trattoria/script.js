/* Script de la web. Textos y datos: <script id="datos"> (se genera desde contenido.json).
   Movimiento: GSAP + ScrollTrigger + Lenis (lib/). No frenan la carga: se piden al primer gesto
   (rueda, dedo, tecla) o cuando la página ya está tranquila; hasta entonces todo se ve, quieto.
   Con prefers-reduced-motion no se cargan nunca. */
(function () {
  "use strict";

  var dataEl = document.getElementById("datos");
  var D = dataEl ? JSON.parse(dataEl.textContent) : {};
  var T = D.t || {};
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var G = null, ST = null;
  var motion = false;       // true cuando GSAP + ScrollTrigger ya están listos
  var lenis = null;
  var hooks = [];           // lo que se activa al llegar las librerías
  var onMotion = function (fn) { hooks.push(fn); };
  // solo se anima lo que aún no se ha visto (lo que ya está en pantalla no parpadea)
  var below = function (el) { return el.getBoundingClientRect().top > window.innerHeight * 0.92; };

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function fmt(s, o) { return String(s || "").replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var hdrH = function () { var h = $("[data-hdr]") || $(".hdr"); return h ? h.offsetHeight : 0; };

  var scrollToEl = function (el, instant) {
    var off = -(hdrH() + 12);
    if (lenis) { lenis.scrollTo(el, { offset: off, immediate: !!instant, duration: 1.3 }); return; }
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + off, behavior: instant || reduce ? "instant" : "smooth" });
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented) return;
    var id = a.getAttribute("href").slice(1);
    var el = id === "top" ? document.body : (id && document.getElementById(id));
    if (!el) return;
    e.preventDefault();
    if (id === "top") { lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" }); }
    else scrollToEl(el);
    history.pushState(null, "", "#" + id);
  });

  /* ---------- Cabecera: fondo al bajar ---------- */
  var hdr = $("[data-hdr]");
  if (hdr) {
    var solid = function () { hdr.classList.toggle("is-solid", window.scrollY > 8); };
    requestAnimationFrame(solid);
    window.addEventListener("scroll", solid, { passive: true });
  }

  /* ---------- Menú móvil ---------- */
  var burger = $("[data-burger]");
  var menu = $("[data-menu]");
  if (burger && menu) {
    var focusables = function () { return [burger].concat($$("a, button", menu)); };
    var openMenu = function () {
      menu.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add("is-open"); }); });
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", burger.getAttribute("data-close"));
      root.classList.add("menu-open");
      if (lenis) lenis.stop();
    };
    var closeMenu = function (focusBurger) {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", burger.getAttribute("data-open"));
      root.classList.remove("menu-open");
      if (lenis) lenis.start();
      setTimeout(function () { if (!menu.classList.contains("is-open")) menu.hidden = true; }, reduce ? 0 : 420);
      if (focusBurger) burger.focus();
    };
    var isOpen = function () { return burger.getAttribute("aria-expanded") === "true"; };
    burger.addEventListener("click", function () { isOpen() ? closeMenu(false) : openMenu(); });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { closeMenu(true); return; }
      if (e.key !== "Tab") return;
      var f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    window.matchMedia("(min-width: 1080px)").addEventListener("change", function (m) { if (m.matches && isOpen()) closeMenu(false); });
  }

  /* ---------- Cifras que cuentan ---------- */
  var countUp = function (el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = +el.getAttribute("data-dec") || 0;
    var nf = new Intl.NumberFormat(D.lang || "es", { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: end >= 10000 });
    if (!motion) { el.textContent = nf.format(end); return; }
    var o = { v: 0 };
    el.textContent = nf.format(0);
    G.to(o, { v: end, duration: 1.8, ease: "power3.out", onUpdate: function () { el.textContent = nf.format(o.v); } });
  };

  /* ---------- Movimiento al bajar (GSAP + ScrollTrigger) ---------- */
  onMotion(function () {
    // bloques que suben y aparecen, en tandas (solo los que aún están por debajo)
    var rev = $$(".reveal").filter(below);
    G.set(rev, { opacity: 0, y: 36 });
    ST.batch(rev, {
      start: "top 90%", once: true,
      onEnter: function (els) {
        G.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.09, overwrite: true });
        els.forEach(function (el) { $$("[data-count]", el).forEach(countUp); });
      }
    });
    // títulos que suben palabra a palabra
    $$(".split").filter(below).forEach(function (t) {
      G.fromTo($$(".wi", t), { yPercent: 110 }, {
        yPercent: 0, duration: 1.15, ease: "expo.out", stagger: 0.07,
        scrollTrigger: { trigger: t, start: "top 90%", once: true }
      });
    });
    // parallax: adornos y fondos
    $$("[data-par]").forEach(function (el) {
      var k = parseFloat(el.getAttribute("data-par")) * 100;
      G.fromTo(el, { yPercent: -k }, { yPercent: k, ease: "none", scrollTrigger: { trigger: el.parentNode, start: "top bottom", end: "bottom top", scrub: true } });
    });
    var heroPar = $("[data-hero-par]");
    if (heroPar) G.to(heroPar, { yPercent: 9, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    var resPar = $("[data-par-bg]");
    if (resPar) G.fromTo(resPar, { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".reserva", start: "top bottom", end: "bottom top", scrub: true } });
  });

  /* ---------- Platos de la casa: la rueda mueve la cinta en horizontal ---------- */
  var hpin = $("[data-hpin]"), track = $("[data-htrack]"), vp = $("[data-hvp]");
  if (hpin && track && vp) {
    var dishes = $$("[data-dish]", track);
    var bar = $("[data-hbar]"), num = $("[data-hnum]");
    var paintRibbon = function (p) {
      if (bar) bar.style.setProperty("--p", Math.max(0.16, p).toFixed(3));
      if (num) {
        var i = Math.min(dishes.length, Math.max(1, Math.round(p * (dishes.length - 1)) + 1));
        num.textContent = (i < 10 ? "0" : "") + i;
      }
    };
    // sin librerías: la cinta se desliza con el dedo / la rueda horizontal
    var paintNative = function () {
      if (motion) return;
      var max = vp.scrollWidth - vp.clientWidth;
      paintRibbon(max > 0 ? vp.scrollLeft / max : 0);
    };
    vp.addEventListener("scroll", function () { requestAnimationFrame(paintNative); }, { passive: true });
    onMotion(function () {
      vp.scrollLeft = 0;
      var dist = function () { return Math.max(0, track.scrollWidth - vp.clientWidth); };
      // los platos entran uno a uno antes de fijarse
      if (below(hpin)) {
        G.fromTo(dishes, { opacity: 0, x: 120, rotate: 2 }, {
          opacity: 1, x: 0, rotate: 0, duration: 1.1, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: hpin, start: "top 75%", once: true }
        });
      }
      var ribbon = G.to(track, {
        x: function () { return -dist(); }, ease: "none",
        scrollTrigger: {
          trigger: hpin, start: "top top", end: function () { return "+=" + dist(); },
          pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: function (self) { paintRibbon(self.progress); }
        }
      });
      // la foto de cada plato se desliza un poco dentro de su marco
      dishes.forEach(function (d) {
        var m = $(".dish__media > *", d);
        if (!m) return;
        G.fromTo(m, { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: d, containerAnimation: ribbon, start: "left right", end: "right left", scrub: true } });
      });
    });
  }

  /* ---------- La casa: la foto cambia según el capítulo que se lee ---------- */
  var casa = $("[data-casa]");
  if (casa) {
    var steps = $$("[data-casa-step]", casa), imgs = $$("[data-casa-img]", casa);
    var cnum = $("[data-casa-num]", casa), cbar = $("[data-casa-bar]", casa);
    var curStep = 0;
    var setStep = function (i) {
      if (i === curStep) return;
      imgs.forEach(function (im, j) {
        im.classList.toggle("was-on", j === curStep);
        im.classList.toggle("is-on", j === i);
      });
      steps.forEach(function (s, j) { s.classList.toggle("is-on", j === i); });
      curStep = i;
      if (cnum) cnum.textContent = "0" + (i + 1);
      if (cbar) cbar.style.setProperty("--p", ((i + 1) / steps.length).toFixed(3));
    };
    if (hasIO) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setStep(steps.indexOf(en.target)); });
      }, { rootMargin: "-48% 0px -48% 0px" });
      steps.forEach(function (s) { cio.observe(s); });
    }
    onMotion(function () {
      // el marco de la foto se abre como una cortina al llegar
      if (!below(casa)) return;
      G.fromTo($(".casa__frame", casa), { clipPath: "inset(18% 12% 18% 12% round 18px)" }, {
        clipPath: "inset(0% 0% 0% 0% round 18px)", ease: "none",
        scrollTrigger: { trigger: casa, start: "top 90%", end: "top 35%", scrub: true }
      });
    });
  }

  /* ---------- Al abrir con #sección (p. ej. tras cambiar de idioma): ajuste final tras cargar ---------- */
  var userMoved = false;
  var moved = function () { userMoved = true; };
  window.addEventListener("wheel", moved, { passive: true, once: true });
  window.addEventListener("touchmove", moved, { passive: true, once: true });
  var settle = function () {
    var id = decodeURIComponent(location.hash.slice(1));
    var target = id && document.getElementById(id);
    if (!target || userMoved) return;
    var top = target.getBoundingClientRect().top;
    if (Math.abs(top - (hdrH() + 12)) > 4) scrollToEl(target, true);
  };
  var whenLoaded = function () {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fonts.then(function () {
      [0, 250, 700, 1400].forEach(function (ms) { setTimeout(settle, ms); });
    });
  };
  if (document.readyState === "complete") whenLoaded(); else window.addEventListener("load", whenLoaded);

  /* ---------- Sección actual: menú marcado y cambio de idioma en el mismo sitio ---------- */
  var spied = $$("main section[id], main [data-spy]");
  var sectionAt = function () {
    var line = window.innerHeight * 0.45;
    for (var i = 0; i < spied.length; i++) {
      var r = spied[i].getBoundingClientRect();
      if (r.top <= line && r.bottom > line) return spied[i].id || "";
    }
    return "";
  };
  if (hasIO && spied.length) {
    var navLinks = $$(".nav__list a");
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id || "";
        navLinks.forEach(function (a) { a.classList.toggle("is-on", id !== "" && a.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    spied.forEach(function (s) { sio.observe(s); });
  }
  $$("[data-lang-link]").forEach(function (a) {
    var base = a.href.split("#")[0];
    a.addEventListener("click", function () {
      var id = spied.length ? sectionAt() : location.hash.slice(1);
      a.href = base + (id ? "#" + id : "");
    });
    var pre = function () {
      if (a.getAttribute("aria-current") || a.dataset.pre) return;
      a.dataset.pre = "1";
      var l = document.createElement("link");
      l.rel = "prefetch"; l.href = base;
      document.head.appendChild(l);
    };
    a.addEventListener("pointerenter", pre);
    a.addEventListener("touchstart", pre, { passive: true });
  });

  /* ---------- La carta: pestañas con cambio suave; los platos entran uno a uno ---------- */
  $$("[data-tabs]").forEach(function (tabsBox) {
    var tabs = $$("[role=tab]", tabsBox);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    var ink = $(".tabs__ink", tabsBox), panelBox = $("[data-tabs-box]", tabsBox);
    var cur = 0, busy = false;
    var moveInk = function () {
      if (!ink) return;
      ink.style.setProperty("--x", tabs[cur].offsetLeft + "px");
      ink.style.setProperty("--w", tabs[cur].offsetWidth + "px");
    };
    var itemsIn = function (panel) {
      if (!motion) return;
      G.fromTo($$("[data-mi]", panel), { opacity: 0, x: -34 }, { opacity: 1, x: 0, duration: 0.7, ease: "expo.out", stagger: 0.06, overwrite: true });
    };
    var select = function (i, focus) {
      if (i === cur || busy) { if (focus) tabs[i].focus(); return; }
      var from = panels[cur], to = panels[i];
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
      });
      cur = i;
      moveInk();
      if (focus) tabs[i].focus();
      tabs[i].scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" });
      if (!motion) { from.classList.remove("is-on"); to.classList.add("is-on"); return; }
      busy = true;
      var h0 = panelBox.offsetHeight;
      G.to($$("[data-mi], .menu__sub", from), {
        opacity: 0, y: -10, duration: 0.22, ease: "power2.in", stagger: 0.015,
        onComplete: function () {
          G.set($$("[data-mi], .menu__sub", from), { clearProps: "all" });
          from.classList.remove("is-on");
          to.classList.add("is-on");
          var h1 = panelBox.offsetHeight;
          G.fromTo(panelBox, { height: h0 }, { height: h1, duration: 0.45, ease: "power2.inOut", clearProps: "height", onComplete: function () { busy = false; ST.refresh(); } });
          G.fromTo($(".menu__sub", to), { opacity: 0 }, { opacity: 1, duration: 0.5 });
          itemsIn(to);
        }
      });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(i); });
      t.addEventListener("keydown", function (e) {
        var n = tabs.length, j;
        if (e.key === "ArrowRight") j = (i + 1) % n;
        else if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
        else if (e.key === "Home") j = 0;
        else if (e.key === "End") j = n - 1;
        else return;
        e.preventDefault();
        select(j, true);
      });
    });
    tabsBox.classList.add("is-tabs");
    requestAnimationFrame(moveInk);
    window.addEventListener("resize", moveInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
    onMotion(function () {
      if (below(panelBox)) ST.create({ trigger: panelBox, start: "top 85%", once: true, onEnter: function () { itemsIn(panels[cur]); } });
    });
  });

  /* ---------- Inclinación 3D ligera (platos y opiniones), solo con ratón ---------- */
  if (fine) onMotion(function () {
    $$("[data-tilt]").forEach(function (card) {
      G.set(card, { transformPerspective: 900 });
      var rx = G.quickTo(card, "rotationX", { duration: 0.5, ease: "power3.out" });
      var ry = G.quickTo(card, "rotationY", { duration: 0.5, ease: "power3.out" });
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
      });
      card.addEventListener("pointerleave", function () { rx(0); ry(0); });
    });
  });

  /* ---------- Vídeo de portada (si hay): solo con movimiento y pantalla visible ---------- */
  var video = $("[data-hero-video]");
  if (video) {
    var pausa = $("[data-video-pausa]");
    if (!reduce) {
      video.preload = "auto";
      video.addEventListener("playing", function () { video.classList.add("is-on"); if (pausa) pausa.hidden = false; }, { once: true });
      var tryPlay = function () { var p = video.play(); if (p && p.catch) p.catch(function () {}); };
      if (hasIO) new IntersectionObserver(function (en) { en[0].isIntersecting ? tryPlay() : video.pause(); }).observe(video);
      else tryPlay();
      if (pausa) pausa.addEventListener("click", function () { video.pause(); video.classList.remove("is-on"); pausa.hidden = true; });
    }
  }

  /* ---------- Horario: hoy y «abierto ahora» (hora de Girona) ---------- */
  var nowParts = function () {
    var p = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: D.tz || "Europe/Madrid", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday), min: (+p.hour) * 60 + (+p.minute), ymd: p.year + "-" + p.month + "-" + p.day };
  };
  var addDays = function (ymd, n) {
    var a = ymd.split("-");
    return new Date(Date.UTC(+a[0], +a[1] - 1, +a[2] + n)).toISOString().slice(0, 10);
  };
  var toMin = function (s) { var a = s.split(":"); return (+a[0]) * 60 + (+a[1]); };
  var endMin = function (s) { return toMin(s) || 1440; }; // «00:00» al cerrar = medianoche
  var hoursOn = function (dow, ymd) {
    if ((D.festivos || []).indexOf(ymd) >= 0) return [];
    return (D.horario || {})[String(dow)] || [];
  };
  var status = function () {
    var n = nowParts(), today = hoursOn(n.dow, n.ymd), i;
    for (i = 0; i < today.length; i++) {
      if (n.min >= toMin(today[i][0]) && n.min < endMin(today[i][1])) {
        return { open: true, dow: n.dow, short: T.abierto, text: T.abierto + " · " + fmt(T.hasta, { h: today[i][1] }) };
      }
    }
    for (i = 0; i < today.length; i++) {
      if (toMin(today[i][0]) > n.min) return { open: false, dow: n.dow, short: T.cerrado, text: T.cerrado + " · " + fmt(T.abre_hoy, { h: today[i][0] }) };
    }
    for (var d = 1; d <= 14; d++) {
      var dow = (n.dow + d) % 7, hs = hoursOn(dow, addDays(n.ymd, d));
      if (hs.length) {
        var when = d === 1 ? fmt(T.abre_manana, { h: hs[0][0] }) : fmt(T.abre_dia, { dia: (D.dias || [])[dow], h: hs[0][0] });
        return { open: false, dow: n.dow, short: T.cerrado, text: T.cerrado + " · " + when };
      }
    }
    return { open: false, dow: n.dow, short: T.cerrado, text: T.cerrado };
  };
  var paintStatus = function () {
    if (!D.horario) return;
    var s = status();
    $$("[data-estado-txt]").forEach(function (el) { el.textContent = s.text; });
    $$("[data-estado-corto]").forEach(function (el) { el.textContent = s.short; });
    $$("[data-estado-dot]").forEach(function (el) { el.classList.toggle("is-open", s.open); el.classList.toggle("is-closed", !s.open); });
    $$("[data-estado-pill]").forEach(function (el) { el.hidden = false; });
    $$("tr[data-dia]").forEach(function (tr) { tr.classList.toggle("is-today", +tr.getAttribute("data-dia") === s.dow); });
  };
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- Mapa: se carga al acercarse (OpenStreetMap, sin cookies) ---------- */
  var mapEl = $("[data-map]");
  if (mapEl && D.mapa && hasIO) {
    var mapMsg = $("[data-map-msg]", mapEl);
    var initMap = function () {
      var L = window.L, m = D.mapa;
      var map = L.map(mapEl, { scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, zoomControl: true }).setView([m.lat, m.lon], m.zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var icon = L.divIcon({ className: "pin", iconSize: [48, 56], iconAnchor: [24, 50], popupAnchor: [0, -44] });
      L.marker([m.lat, m.lon], { icon: icon, title: m.nombre, alt: m.nombre }).addTo(map)
        .bindPopup("<strong>" + esc(m.nombre) + "</strong><br>" + esc(m.dir));
      mapEl.classList.add("is-ready");
      mapEl.setAttribute("data-lenis-prevent", "");
    };
    var loadMap = function () {
      if (mapMsg) mapMsg.textContent = T.mapa_cargando;
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      css.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      css.crossOrigin = "";
      document.head.appendChild(css);
      var js = document.createElement("script");
      js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      js.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
      js.crossOrigin = "";
      js.onload = function () { try { initMap(); } catch (e) { if (mapMsg) mapMsg.textContent = T.mapa_error; } };
      js.onerror = function () { if (mapMsg) mapMsg.textContent = T.mapa_error; };
      document.head.appendChild(js);
    };
    var mio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { mio.disconnect(); loadMap(); }
    }, { rootMargin: "500px 0px" });
    mio.observe(mapEl);
  }

  /* ---------- WhatsApp y llamada: en la demo, ventana de ejemplo ---------- */
  var modal = $("[data-modal]");
  var openDemo = function (kind, msg) {
    if (!modal || typeof modal.showModal !== "function") return false;
    var wa = kind === "wa";
    $("[data-modal-t]", modal).textContent = wa ? T.demo_wa_titulo : T.demo_tel_titulo;
    $("[data-modal-p]", modal).textContent = wa ? T.demo_wa_texto : T.demo_tel_texto;
    $("[data-modal-msg]", modal).textContent = msg || "";
    $("[data-modal-bubble]", modal).hidden = !wa;
    $("[data-modal-note]", modal).hidden = !wa;
    var tryBtn = $("[data-modal-try]", modal);
    tryBtn.hidden = !wa;
    tryBtn.href = "https://wa.me/?text=" + encodeURIComponent(msg || "");
    modal.showModal();
    if (lenis) lenis.stop();
    return true;
  };
  if (D.demo && modal) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-wa], [data-demo-tel]");
      if (!a || a.closest("[data-modal]") || a.hasAttribute("data-estudio")) return;
      if (openDemo(a.hasAttribute("data-wa") ? "wa" : "tel", a.getAttribute("data-wa"))) e.preventDefault();
    });
    $("[data-modal-close]", modal).addEventListener("click", function () { modal.close(); });
    $("[data-modal-try]", modal).addEventListener("click", function () { setTimeout(function () { modal.close(); }, 50); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
    modal.addEventListener("close", function () { if (lenis) lenis.start(); });
  }

  /* ---------- Reserva de mesa → WhatsApp ---------- */
  var form = $("[data-form]");
  if (form) {
    var el = form.elements;
    if (el.fecha) el.fecha.min = nowParts().ymd;
    var setErr = function (input, msg) {
      var field = input.closest(".field");
      var out = document.getElementById(input.getAttribute("aria-describedby"));
      if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
      if (field) field.classList.toggle("is-err", !!msg);
      if (out) out.textContent = msg || "";
    };
    [el.nombre, el.telefono].forEach(function (i) { i.addEventListener("input", function () { setErr(i, ""); }); });
    el.acepto.addEventListener("change", function () { setErr(el.acepto, ""); });
    var longDate = function (ymd) {
      try {
        var a = ymd.split("-");
        return new Intl.DateTimeFormat(D.lang || "es", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })
          .format(new Date(Date.UTC(+a[0], +a[1] - 1, +a[2])));
      } catch (e) { return ymd; }
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = [];
      var name = el.nombre.value.trim(), digits = el.telefono.value.replace(/\D/g, "");
      setErr(el.nombre, name ? "" : T.err_nombre);
      if (!name) bad.push(el.nombre);
      var telMsg = !digits ? T.err_tel : (digits.length < 9 ? T.err_tel_corto : "");
      setErr(el.telefono, telMsg);
      if (telMsg) bad.push(el.telefono);
      setErr(el.acepto, el.acepto.checked ? "" : T.err_acepto);
      if (!el.acepto.checked) bad.push(el.acepto);
      if (bad.length) { bad[0].focus(); return; }

      var pax = form.querySelector("input[name=personas]:checked");
      var lines = [T.msg_form, "", T.l_nombre + ": " + name, T.l_tel + ": " + el.telefono.value.trim()];
      if (el.fecha.value) lines.push(T.l_fecha + ": " + longDate(el.fecha.value));
      lines.push(T.l_hora + ": " + el.hora.value);
      if (pax) lines.push(T.l_personas + ": " + pax.value);
      var note = el.comentario.value.trim();
      if (note) lines.push(T.l_coment + ": " + note);
      var msg = lines.join("\n");
      if (!(D.demo && openDemo("wa", msg))) {
        window.open((D.wa_base || "https://wa.me/") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      }
    });
  }

  /* ---------- Botón fijo «Reservar mesa» (móvil) ---------- */
  var bookbar = $("[data-bookbar]");
  var heroCta = $("#hero-cta");
  if (bookbar && heroCta && hasIO) {
    var heroGone = false, formOn = false, endOn = false;
    var paintBook = function () { bookbar.classList.toggle("is-on", heroGone && !formOn && !endOn); };
    var seen = new Set();
    var eio = new IntersectionObserver(function (en) {
      en.forEach(function (x) { x.isIntersecting ? seen.add(x.target) : seen.delete(x.target); });
      endOn = seen.size > 0;
      paintBook();
    });
    $$(".ftr, [data-oskal], .platos").forEach(function (x) { eio.observe(x); });
    new IntersectionObserver(function (en) {
      heroGone = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      paintBook();
    }).observe(heroCta);
    var resv = $("#reservar");
    if (resv) new IntersectionObserver(function (en) { formOn = en[0].isIntersecting; paintBook(); }, { threshold: 0.1 }).observe(resv);
  }

  /* ---------- Librerías de movimiento: al primer gesto o con la página ya tranquila ---------- */
  var startMotion = function () {
    G = window.gsap; ST = window.ScrollTrigger;
    if (!G || !ST) return;
    G.registerPlugin(ST);
    ST.config({ ignoreMobileResize: true });
    var hp = $("[data-hpin]");
    var pastRibbon = hp && hp.getBoundingClientRect().bottom < 0; // ya pasó la cinta: compensar su espacio
    var y0 = window.scrollY;
    motion = true;
    root.classList.add("rv-ok");
    if (window.Lenis) {
      // en pantallas táctiles Lenis deja el desplazamiento nativo del dedo (60 fps, sin retrasos)
      lenis = new window.Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: false });
      lenis.on("scroll", ST.update);
      G.ticker.add(function (t) { lenis.raf(t * 1000); });
      G.ticker.lagSmoothing(0);
    }
    hooks.forEach(function (fn) { fn(); });
    ST.refresh();
    if (pastRibbon) {
      var spacer = hp.parentNode;
      var extra = spacer && spacer.classList.contains("pin-spacer") ? spacer.offsetHeight - hp.offsetHeight : 0;
      window.scrollTo(0, y0 + extra);
      if (lenis) lenis.scrollTo(y0 + extra, { immediate: true });
    }
    settle();
  };
  var libs = (document.body.getAttribute("data-libs") || "").split(",").filter(Boolean);
  if (!reduce && libs.length) {
    var requested = false;
    var load = function (src) {
      return new Promise(function (ok, ko) {
        var s = document.createElement("script");
        s.src = src; s.onload = ok; s.onerror = ko;
        document.head.appendChild(s);
      });
    };
    var request = function () {
      if (requested) return;
      requested = true;
      libs.reduce(function (p, src) { return p.then(function () { return load(src); }); }, Promise.resolve())
        .then(startMotion, function () { /* sin librerías la web sigue igual, quieta */ });
    };
    ["wheel", "touchstart", "pointerdown", "keydown", "scroll"].forEach(function (ev) {
      window.addEventListener(ev, request, { passive: true, once: true });
    });
    var idle = function () { setTimeout(function () { (window.requestIdleCallback || setTimeout)(request); }, 2500); };
    if (location.hash) request();
    else if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle);
  }
})();
