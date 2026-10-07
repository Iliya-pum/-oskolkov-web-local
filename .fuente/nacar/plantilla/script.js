/* Script de la web. Textos y datos: <script id="datos"> (se genera desde contenido.json). */
(function () {
  "use strict";

  var dataEl = document.getElementById("datos");
  var D = dataEl ? JSON.parse(dataEl.textContent) : {};
  var T = D.t || {};
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function fmt(s, o) { return String(s || "").replace(/\{(\w+)\}/g, function (m, k) { return o[k] != null ? o[k] : m; }); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- Cabecera: fondo al bajar ---------- */
  var hdr = $("[data-hdr]");
  if (hdr) {
    var solid = function () { hdr.classList.toggle("is-solid", window.scrollY > 8); };
    requestAnimationFrame(solid); // sin forzar el primer cálculo de la página
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
    };
    var closeMenu = function (focusBurger) {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", burger.getAttribute("data-open"));
      root.classList.remove("menu-open");
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

  /* ---------- Aparición al bajar: bloques, títulos por palabras, fotos con máscara, cifras ---------- */
  var counters = $$("[data-count]");
  var countUp = function (el) {
    var end = parseFloat(el.getAttribute("data-count")), dec = +el.getAttribute("data-dec") || 0;
    var nf = new Intl.NumberFormat(D.lang || "es", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    if (reduce) { el.textContent = nf.format(end); return; }
    var t0 = performance.now(), dur = 1700;
    var step = function (now) {
      var t = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - t, 3);
      el.textContent = nf.format(end * e);
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = nf.format(0);
    requestAnimationFrame(step);
  };
  // la clase «rv» (bloques ocultos hasta aparecer) la pone ya el <head>, antes de pintar:
  // así no hay transiciones de «desaparecer» al cargar. Si este script no llega, el <head> la quita.
  var animated = $$(".reveal, .split:not(.split--hero)");
  if (root.classList.contains("rv")) root.classList.add("rv-ok");
  if (hasIO && !reduce && animated.length && root.classList.contains("rv")) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-in");
        $$("[data-count]", en.target).forEach(countUp);
        rio.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.06 });
    animated.forEach(function (el) { rio.observe(el); });
  }

  /* ---------- Parallax suave de los adornos ---------- */
  var pars = $$("[data-par]");
  if (pars.length && !reduce && hasIO) {
    var visible = new Set(), ticking = false;
    var paint = function () {
      ticking = false;
      var vh = window.innerHeight;
      visible.forEach(function (el) {
        var r = el.getBoundingClientRect();
        var shift = (r.top + r.height / 2 - vh / 2) * parseFloat(el.getAttribute("data-par"));
        el.style.translate = "0 " + shift.toFixed(1) + "px";
      });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
    var pio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.isIntersecting ? visible.add(en.target) : visible.delete(en.target); });
      onScroll();
    }, { rootMargin: "120px 0px" });
    pars.forEach(function (el) { pio.observe(el); });
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Al abrir con #sección (p. ej. tras cambiar de idioma): ajuste final tras cargar ---------- */
  var userMoved = false;
  var moved = function () { userMoved = true; };
  window.addEventListener("wheel", moved, { passive: true, once: true });
  window.addEventListener("touchmove", moved, { passive: true, once: true });
  var settle = function () {
    var id = decodeURIComponent(location.hash.slice(1));
    var target = id && document.getElementById(id);
    if (target && !userMoved) {
      var want = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      var top = target.getBoundingClientRect().top;
      if (Math.abs(top - want) > 4) window.scrollTo({ top: window.scrollY + top - want, behavior: "instant" });
    }
  };
  var whenLoaded = function () {
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    // varios ajustes: las secciones de arriba toman su altura real poco a poco (content-visibility)
    fonts.then(function () {
      [0, 250, 700, 1400].forEach(function (ms) { setTimeout(settle, ms); });
      setTimeout(function () { root.classList.add("ss"); }, 1500); // desde aquí, desplazamiento suave en el menú
    });
  };
  if (document.readyState === "complete") whenLoaded(); else window.addEventListener("load", whenLoaded);

  /* ---------- Sección actual: menú marcado y cambio de idioma en el mismo sitio ---------- */
  var spied = $$("main section[id], main [data-spy]");
  var sectionAt = function () { // la sección que cruza el 45 % de la pantalla
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

  /* ---------- Pestañas de precios ---------- */
  $$("[data-tabs]").forEach(function (box) {
    var tabs = $$("[role=tab]", box);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    var ink = $(".tabs__ink", box);
    var cur = 0;
    var moveInk = function () {
      if (!ink) return;
      ink.style.setProperty("--x", tabs[cur].offsetLeft + "px");
      ink.style.setProperty("--w", tabs[cur].offsetWidth + "px");
    };
    var select = function (i, focus) {
      cur = i;
      tabs.forEach(function (t, j) {
        var on = i === j;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        panels[j].classList.toggle("is-on", on);
      });
      moveInk();
      if (focus) tabs[i].focus();
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
    box.classList.add("is-tabs");
    requestAnimationFrame(moveInk); // el estado inicial ya viene en el HTML
    window.addEventListener("resize", moveInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);
    box.selectTab = function (id) {
      for (var i = 0; i < tabs.length; i++) if (tabs[i].getAttribute("data-tab") === id) select(i);
    };
  });
  $$("[data-tab-link]").forEach(function (a) {
    a.addEventListener("click", function () {
      var box = $("[data-tabs]");
      if (box && box.selectTab) box.selectTab(a.getAttribute("data-tab-link"));
    });
  });

  /* ---------- Antes / después ---------- */
  $$("[data-ba]").forEach(function (ba) {
    var range = $("[data-ba-range]", ba);
    var touched = false, down = null, dragging = false;
    var set = function (p) {
      p = Math.max(0, Math.min(100, p));
      ba.style.setProperty("--pos", p + "%");
      if (range) range.value = Math.round(p);
    };
    var fromX = function (x) { var r = ba.getBoundingClientRect(); set((x - r.left) / r.width * 100); };
    ba.addEventListener("pointerdown", function (e) {
      if (e.button > 0) return;
      touched = true;
      down = { x: e.clientX, y: e.clientY, id: e.pointerId };
      dragging = false;
    });
    ba.addEventListener("pointermove", function (e) {
      if (!down || e.pointerId !== down.id) return;
      if (!dragging && Math.abs(e.clientX - down.x) > 4) {
        dragging = true;
        ba.classList.add("is-drag");
        try { ba.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
      }
      if (dragging) fromX(e.clientX);
    });
    var end = function (e) {
      if (down && !dragging && e.type === "pointerup") fromX(e.clientX);
      down = null; dragging = false;
      ba.classList.remove("is-drag");
    };
    ba.addEventListener("pointerup", end);
    ba.addEventListener("pointercancel", end);
    if (range) range.addEventListener("input", function () { touched = true; set(+range.value); });

    // pista: el divisor se mueve solo una vez para que se note que se puede arrastrar
    if (!reduce && hasIO) {
      var hio = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        hio.disconnect();
        setTimeout(function () {
          var pts = [50, 26, 74, 50], dur = 2300, t0 = performance.now();
          var step = function (now) {
            if (touched) return;
            var t = Math.min(1, (now - t0) / dur), seg = t * (pts.length - 1);
            var i = Math.min(pts.length - 2, Math.floor(seg)), f = seg - i;
            var e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
            set(pts[i] + (pts[i + 1] - pts[i]) * e);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }, 600);
      }, { threshold: 0.5 });
      hio.observe(ba);
    }
  });

  /* ---------- Visor de fotos ---------- */
  var lb = $("[data-lb-dialog]");
  var shots = $$("[data-lb]");
  if (lb && shots.length && typeof lb.showModal === "function") {
    var box = $("[data-lb-img]", lb), cap = $("[data-lb-cap]", lb), num = $("[data-lb-n]", lb);
    var cur = 0, opener = null, sx = null, swiped = false;
    var show = function (i) {
      cur = (i + shots.length) % shots.length;
      var b = shots[cur], img = $("img", b), node;
      if (img) {
        node = new Image();
        node.src = img.src;
        node.alt = img.alt;
        node.decoding = "async";
      } else {
        node = $(".ph", b).cloneNode(true);
        node.style.aspectRatio = b.getAttribute("data-w") + " / " + b.getAttribute("data-h");
      }
      box.replaceChildren(node);
      cap.textContent = b.getAttribute("data-cap") || "";
      num.textContent = fmt(T.de, { n: cur + 1, total: shots.length });
    };
    shots.forEach(function (b, i) {
      b.addEventListener("click", function () {
        opener = b;
        show(i);
        lb.showModal();
        root.classList.add("menu-open");
      });
    });
    lb.addEventListener("close", function () {
      root.classList.remove("menu-open");
      if (opener) opener.focus();
    });
    $("[data-lb-close]", lb).addEventListener("click", function () { lb.close(); });
    $("[data-lb-prev]", lb).addEventListener("click", function () { show(cur - 1); });
    $("[data-lb-next]", lb).addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(cur - 1);
      else if (e.key === "ArrowRight") show(cur + 1);
    });
    lb.addEventListener("pointerdown", function (e) { sx = e.clientX; swiped = false; });
    lb.addEventListener("pointerup", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 50) { swiped = true; show(cur + (dx < 0 ? 1 : -1)); }
    });
    lb.addEventListener("click", function (e) {
      if (swiped) { swiped = false; return; }
      if (e.target === lb || e.target === box) lb.close();
    });
  }

  /* ---------- Opiniones: tira con flechas y barra de progreso ---------- */
  $$("[data-rev]").forEach(function (rev) {
    var track = $("[data-rev-track]", rev);
    var prev = $("[data-rev-prev]", rev), next = $("[data-rev-next]", rev), bar = $("[data-rev-bar]", rev);
    var stepW = function () {
      var s = $(".rev__slide", track);
      return s ? s.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 20) : track.clientWidth;
    };
    var go = function (dir) { track.scrollBy({ left: dir * stepW(), behavior: reduce ? "auto" : "smooth" }); };
    var paintBar = function () {
      var max = track.scrollWidth - track.clientWidth;
      var ratio = track.clientWidth / track.scrollWidth;
      if (bar) {
        var bw = bar.parentNode.clientWidth;
        bar.style.setProperty("--w", (ratio * 100).toFixed(2) + "%");
        bar.style.setProperty("--x", (max > 0 ? (track.scrollLeft / max) * (bw - ratio * bw) : 0).toFixed(1) + "px");
      }
      if (prev) prev.disabled = track.scrollLeft < 4;
      if (next) next.disabled = track.scrollLeft > max - 4;
    };
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    var raf = 0;
    track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(paintBar); }, { passive: true });
    window.addEventListener("resize", paintBar);
    requestAnimationFrame(paintBar); // sin forzar el cálculo de la página al cargar
  });

  /* ---------- Tarjeta regalo: importe elegido e inclinación 3D ---------- */
  var giftCta = $("[data-gift-cta]"), giftVal = $("[data-gift-value]");
  $$("[data-gift-opt]").forEach(function (opt) {
    opt.addEventListener("change", function () {
      if (!opt.checked) return;
      if (giftVal) giftVal.textContent = opt.value;
      if (giftCta) {
        var msg = fmt(giftCta.getAttribute("data-msg"), { opcion: opt.value });
        giftCta.setAttribute("data-wa", msg);
        giftCta.href = (D.wa_base || "https://wa.me/") + "?text=" + encodeURIComponent(msg);
      }
    });
  });
  $$("[data-tilt]").forEach(function (card) {
    if (reduce || !fine) return;
    card.addEventListener("pointermove", function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--ry", (x * 18).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-y * 14).toFixed(2) + "deg");
    });
    card.addEventListener("pointerleave", function () {
      card.style.removeProperty("--ry");
      card.style.removeProperty("--rx");
    });
  });

  /* ---------- Horario: hoy y «abierto ahora» (hora del salón) ---------- */
  var nowParts = function () {
    var p = {};
    new Intl.DateTimeFormat("en-GB", {
      timeZone: D.tz || "Europe/Madrid", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return {
      dow: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(p.weekday),
      min: (+p.hour) * 60 + (+p.minute),
      ymd: p.year + "-" + p.month + "-" + p.day
    };
  };
  var addDays = function (ymd, n) {
    var a = ymd.split("-");
    return new Date(Date.UTC(+a[0], +a[1] - 1, +a[2] + n)).toISOString().slice(0, 10);
  };
  var toMin = function (s) { var a = s.split(":"); return (+a[0]) * 60 + (+a[1]); };
  var hoursOn = function (dow, ymd) {
    if ((D.festivos || []).indexOf(ymd) >= 0) return [];
    return (D.horario || {})[String(dow)] || [];
  };
  var status = function () {
    var n = nowParts(), today = hoursOn(n.dow, n.ymd), i;
    for (i = 0; i < today.length; i++) {
      if (n.min >= toMin(today[i][0]) && n.min < toMin(today[i][1])) {
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
      var map = L.map(mapEl, {
        scrollWheelZoom: false, dragging: !L.Browser.mobile, tap: false, zoomControl: true
      }).setView([m.lat, m.lon], m.zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      var icon = L.divIcon({ className: "pin", iconSize: [48, 56], iconAnchor: [24, 50], popupAnchor: [0, -44] });
      L.marker([m.lat, m.lon], { icon: icon, title: m.nombre, alt: m.nombre })
        .addTo(map)
        .bindPopup("<strong>" + esc(m.nombre) + "</strong><br>" + esc(m.dir));
      mapEl.classList.add("is-ready");
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

  /* ---------- WhatsApp, llamada e Instagram: en la demo, ventana de ejemplo ---------- */
  var modal = $("[data-modal]");
  var openDemo = function (kind, msg) {
    if (!modal || typeof modal.showModal !== "function") return false;
    var wa = kind === "wa";
    var titles = { wa: T.demo_wa_titulo, tel: T.demo_tel_titulo, ig: T.demo_ig_titulo };
    var texts = { wa: T.demo_wa_texto, tel: T.demo_tel_texto, ig: T.demo_ig_texto };
    $("[data-modal-t]", modal).textContent = titles[kind];
    $("[data-modal-p]", modal).textContent = texts[kind];
    $("[data-modal-msg]", modal).textContent = msg || "";
    $("[data-modal-bubble]", modal).hidden = !wa;
    $("[data-modal-note]", modal).hidden = !wa;
    var tryBtn = $("[data-modal-try]", modal);
    tryBtn.hidden = !wa;
    tryBtn.href = "https://wa.me/?text=" + encodeURIComponent(msg || "");
    modal.showModal();
    return true;
  };
  if (D.demo && modal) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-wa], [data-demo-tel], [data-demo-ig]");
      if (!a || a.closest("[data-modal]") || a.hasAttribute("data-estudio")) return;
      var kind = a.hasAttribute("data-wa") ? "wa" : (a.hasAttribute("data-demo-ig") ? "ig" : "tel");
      if (openDemo(kind, a.getAttribute("data-wa"))) e.preventDefault();
    });
    $("[data-modal-close]", modal).addEventListener("click", function () { modal.close(); });
    $("[data-modal-try]", modal).addEventListener("click", function () { setTimeout(function () { modal.close(); }, 50); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  }

  /* ---------- Formulario de cita → WhatsApp ---------- */
  var form = $("[data-form]");
  if (form) {
    var el = form.elements;
    if (el.dia) el.dia.min = nowParts().ymd;
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

      var sel = el.servicio;
      var lines = [
        T.msg_form, "",
        T.l_nombre + ": " + name,
        T.l_tel + ": " + el.telefono.value.trim(),
        T.l_servicio + ": " + (sel.value || sel.options[sel.selectedIndex].text)
      ];
      if (el.dia.value) lines.push(T.l_dia + ": " + longDate(el.dia.value));
      lines.push(T.l_franja + ": " + el.franja.value);
      var note = el.comentario.value.trim();
      if (note) lines.push(T.l_coment + ": " + note);
      var msg = lines.join("\n");
      if (!(D.demo && openDemo("wa", msg))) {
        window.open((D.wa_base || "https://wa.me/") + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      }
    });
  }

  /* ---------- Botón fijo «Reservar cita» (móvil) ---------- */
  var bar = $("[data-bookbar]");
  var heroCta = $("#hero-cta");
  if (bar && heroCta && hasIO) {
    var heroGone = false, formOn = false;
    var paintBar = function () { bar.classList.toggle("is-on", heroGone && !formOn); };
    new IntersectionObserver(function (en) {
      heroGone = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      paintBar();
    }).observe(heroCta);
    if (form) {
      new IntersectionObserver(function (en) { formOn = en[0].isIntersecting; paintBar(); }, { threshold: 0.15 }).observe(form);
    }
  }
})();
