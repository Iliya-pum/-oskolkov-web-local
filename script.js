/* ============================================================
   Oskal Studio — lógica del sitio
   i18n (ES/CA/EN) · animaciones · menú móvil · formulario→WhatsApp
   ============================================================ */

/* ---------- Traducciones ---------- */
var I18N = {
  es: {
    nav_services:"Servicios", nav_case:"Proyecto", nav_demos:"Demos", nav_pricing:"Precios", nav_contact:"Contacto", nav_quote:"Presupuesto",

    hero_badge:"Estudio web · España",
    hero_title_1:"Webs que hacen crecer",
    hero_title_2:"tu pequeño negocio",
    hero_sub:"Diseño y desarrollo de páginas web rápidas, modernas y multilingües. Entrega en días, precio cerrado y trato directo conmigo.",
    hero_cta1:"Hablar por WhatsApp", hero_cta2:"Ver precios",
    hero_m1:"días de entrega", hero_m2:"Varios idiomas", hero_m3:"Desde 300 €",

    services_kicker:"Qué hago",
    services_title:"Webs pensadas para vender",
    services_sub:"Todo lo que un pequeño negocio necesita para tener presencia online de verdad.",
    s1_t:"Landing pages", s1_d:"Webs de una sola página, directas y orientadas a captar clientes.",
    s2_t:"Multiidioma", s2_d:"Añadimos los idiomas que necesites para llegar a muchos más clientes.",
    s3_t:"Diseño móvil", s3_d:"Perfectas en el móvil, donde te ve la mayoría de tus clientes.",
    s4_t:"SEO y velocidad", s4_d:"Rápidas y optimizadas para aparecer en Google y cargar al instante.",

    case_kicker:"Mi primer proyecto",
    case_title:"ALSISA · Construcción y reformas",
    case_desc:"Web multilingüe a medida para una empresa de construcción de Girona. Diseño propio, galería de proyectos, comparador «antes / después», mapa de la zona de trabajo y un formulario que envía la solicitud directa al WhatsApp de la empresa.",
    case_f1:"HTML · CSS · JS", case_f2:"Multilingüe", case_f3:"100% responsive", case_f4:"SEO local",
    case_cta:"Ver web en vivo",

    demos_kicker:"Míralo en acción",
    demos_title:"Lo que tu web puede hacer",
    demos_sub:"Sin tecnicismos: ejemplos reales en miniatura de lo que puedo montar en tu página.",
    demo1_t:"Tu web habla idiomas", demo1_d:"El visitante elige su idioma y toda la página cambia al instante. Más idiomas = más clientes.",
    demo2_t:"Se adapta a cualquier pantalla", demo2_d:"Ordenador, tablet o móvil: la web se reorganiza sola y siempre se ve perfecta.",
    demo3_t:"Carga en un parpadeo", demo3_d:"Cada segundo de espera son clientes que se van. Código ligero, sin plantillas pesadas.",
    demo3_slow:"Web típica", demo3_fast:"Mi web",
    demo4_t:"Detalles que enamoran", demo4_d:"Animaciones y efectos suaves que hacen que tu negocio parezca mucho más grande de lo que es.",
    demo4_try:"Pasa el ratón / toca",
    demo3_extra:"¿Ya tienes web? También la aceleramos, sin rehacerla.",

    s5_t:"Arreglamos tu web actual",
    s5_d:"¿Ya tienes web pero va lenta, no se ve bien en el móvil o está anticuada? La revisamos y la arreglamos sin empezar de cero.",
    pr_badge:"Primer paso", pr_name:"Reparación", pr_from:"desde", pr_for:"Arregla la web que ya tienes.",
    pr_f1:"Revisión completa de tu web actual", pr_f2:"Adaptación al móvil", pr_f3:"Mejora de velocidad", pr_f4:"Textos y fotos actualizados", pr_f5:"Botón de WhatsApp",
    pr_cta:"Arreglar mi web",
    form_message_hint:"¿Ya tienes web? Puedes pegar aquí su enlace.",

    pricing_kicker:"Precios", pricing_or:"o",
    pricing_title:"Claros y sin sorpresas",
    pricing_sub:"Sabes el precio final desde el primer día. Elige el plan que encaja con tu negocio.",
    p1_name:"Básica", p1_for:"Una página, lista para publicar.",
    p1_f1:"Diseño 100% a medida", p1_f2:"Adaptada a móvil", p1_f3:"Formulario de contacto", p1_f4:"Botón directo de WhatsApp",
    p2_badge:"Más popular", p2_name:"Completa", p2_for:"Todo lo de Básica, y además:",
    p2_f1:"Multiidioma (los idiomas que quieras)", p2_f2:"Galería o portfolio", p2_f3:"SEO básico para Google", p2_f4:"Mapa de Google integrado",
    p3_name:"Premium", p3_for:"Todo lo de Completa, y además:",
    p3_f1:"Animaciones avanzadas", p3_f2:"Secciones a medida extra", p3_f3:"Optimización SEO completa", p3_f4:"Soporte prioritario",
    plan_cta:"Lo quiero", plan_cta_2:"Lo quiero", plan_cta_3:"Lo quiero",
    pricing_note:"* Dominio y hosting no incluidos (unos 60–80 €/año). Te asesoro para contratarlos sin coste añadido.",

    why_kicker:"Por qué tan rápido",
    why_title:"Menos espera, más resultados",
    why1_v:"Directo", why1_t:"Sin intermediarios", why1_d:"Hablas conmigo, no con una agencia. Menos reuniones, decisiones al momento.",
    why2_v:"3–7 días", why2_t:"Entrega ágil", why2_d:"Me centro en lo esencial y en un flujo de trabajo probado, sin rodeos.",
    why3_v:"A medida", why3_t:"Código propio", why3_d:"Nada de plantillas pesadas: código limpio, ligero y hecho para tu negocio.",
    why4_v:"Cerrado", why4_t:"Precio fijo", why4_d:"Presupuesto cerrado antes de empezar. Sin sorpresas ni costes ocultos.",

    contact_kicker:"Contacto",
    contact_title:"¿Hablamos de tu web?",
    contact_sub:"Cuéntame tu idea y te respondo con un presupuesto sin compromiso.",
    form_name_l:"Nombre", form_business_l:"Negocio", form_message_l:"Tu proyecto",
    consent_text:'He leído y acepto la <a href="legal.html" target="_blank">Política de Privacidad</a>.',
    submit_text:"Enviar por WhatsApp",

    footer_tag:"Diseño y desarrollo web para pequeños negocios.",
    footer_contact_t:"Contacto",
    footer_legal:"Aviso legal · Privacidad · Cookies",
    footer_made:"Diseñado y programado por Ilia Oskolkov",

    /* --- Página legal --- */
    lg_back:"Volver al inicio",
    lg_title:"Aviso legal y privacidad",
    lg_updated:"Última actualización: julio de 2026",
    lg_h1:"1. Titular del sitio web",
    lg_p1:"En cumplimiento de la Ley 34/2002 (LSSI-CE), se informa de que este sitio web pertenece a:",
    lg_owner:'<strong>Titular:</strong> Ilia Oskolkov (Oskal Studio)',
    lg_activity:'<strong>Actividad:</strong> Diseño y desarrollo de páginas web',
    lg_email:'<strong>Correo electrónico:</strong> <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>',
    lg_phone:'<strong>Teléfono / WhatsApp:</strong> <a href="https://wa.me/34628806573" target="_blank" rel="noopener">+34 628 806 573</a>',
    lg_h2:"2. Objeto",
    lg_p2:"Este sitio web tiene carácter informativo y presenta los servicios de diseño y desarrollo web ofrecidos por el titular. El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de las condiciones recogidas en este aviso legal.",
    lg_h3:"3. Política de privacidad",
    lg_p3:"Respetamos tu privacidad. Los datos que nos facilites a través del formulario de contacto o de WhatsApp (nombre, negocio y mensaje) se utilizan <strong>únicamente</strong> para responder a tu solicitud y elaborar un presupuesto.",
    lg_resp:'<strong>Responsable:</strong> Ilia Oskolkov.',
    lg_purpose:'<strong>Finalidad:</strong> atender consultas y solicitudes de presupuesto.',
    lg_legit:'<strong>Legitimación:</strong> tu consentimiento al enviar el formulario.',
    lg_keep:'<strong>Conservación:</strong> los datos se conservan el tiempo necesario para gestionar tu solicitud.',
    lg_share:'<strong>Cesión:</strong> no se ceden datos a terceros, salvo obligación legal.',
    lg_rights:'<strong>Derechos:</strong> puedes ejercer tus derechos de acceso, rectificación, supresión y oposición escribiendo a <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>.',
    lg_p3b:"Ten en cuenta que el formulario de contacto abre una conversación en <strong>WhatsApp</strong>, cuyo tratamiento de datos se rige por la política de privacidad de Meta Platforms, Inc.",
    lg_h4:"4. Política de cookies",
    lg_p4:"Este sitio web <strong>no utiliza cookies de seguimiento ni de publicidad</strong>. Únicamente puede emplear el almacenamiento local del navegador (localStorage) para recordar el idioma que has elegido, un dato técnico que no identifica personalmente al usuario y que puedes borrar desde tu navegador.",
    lg_h5:"5. Propiedad intelectual",
    lg_p5:"Los contenidos, el diseño y el código de este sitio son propiedad de Ilia Oskolkov, salvo los logotipos e imágenes de terceros (como el proyecto ALSISA), que pertenecen a sus respectivos titulares y se muestran a modo de portfolio con su conocimiento.",
    lg_h6:"6. Legislación aplicable",
    lg_p6:"Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a derecho.",

    ph_name:"Ej. María García", ph_business:"Ej. Peluquería, restaurante...", ph_message:"Cuéntame qué necesitas...",
    alert_consent:"Por favor, acepta la Política de Privacidad.",
    wa_hi:"Hola Ilia! Quiero una web para mi negocio."
  },

  ca: {
    nav_services:"Serveis", nav_case:"Projecte", nav_demos:"Demos", nav_pricing:"Preus", nav_contact:"Contacte", nav_quote:"Pressupost",

    hero_badge:"Estudi web · Espanya",
    hero_title_1:"Webs que fan créixer",
    hero_title_2:"el teu petit negoci",
    hero_sub:"Disseny i desenvolupament de pàgines web ràpides, modernes i multilingües. Entrega en dies, preu tancat i tracte directe amb mi.",
    hero_cta1:"Parlar per WhatsApp", hero_cta2:"Veure preus",
    hero_m1:"dies d'entrega", hero_m2:"Diversos idiomes", hero_m3:"Des de 300 €",

    services_kicker:"Què faig",
    services_title:"Webs pensades per vendre",
    services_sub:"Tot el que un petit negoci necessita per tenir presència online de veritat.",
    s1_t:"Landing pages", s1_d:"Webs d'una sola pàgina, directes i orientades a captar clients.",
    s2_t:"Multiidioma", s2_d:"Afegim els idiomes que necessitis per arribar a molts més clients.",
    s3_t:"Disseny mòbil", s3_d:"Perfectes al mòbil, on et veu la majoria dels teus clients.",
    s4_t:"SEO i velocitat", s4_d:"Ràpides i optimitzades per aparèixer a Google i carregar a l'instant.",

    case_kicker:"El meu primer projecte",
    case_title:"ALSISA · Construcció i reformes",
    case_desc:"Web multilingüe a mida per a una empresa de construcció de Girona. Disseny propi, galeria de projectes, comparador «abans / després», mapa de la zona de treball i un formulari que envia la sol·licitud directa al WhatsApp de l'empresa.",
    case_f1:"HTML · CSS · JS", case_f2:"Multilingüe", case_f3:"100% responsive", case_f4:"SEO local",
    case_cta:"Veure web en viu",

    demos_kicker:"Mira-ho en acció",
    demos_title:"El que la teva web pot fer",
    demos_sub:"Sense tecnicismes: exemples reals en miniatura del que puc muntar a la teva pàgina.",
    demo1_t:"La teva web parla idiomes", demo1_d:"El visitant tria el seu idioma i tota la pàgina canvia a l'instant. Més idiomes = més clients.",
    demo2_t:"S'adapta a qualsevol pantalla", demo2_d:"Ordinador, tauleta o mòbil: la web es reorganitza sola i sempre es veu perfecta.",
    demo3_t:"Carrega en un parpelleig", demo3_d:"Cada segon d'espera són clients que marxen. Codi lleuger, sense plantilles pesades.",
    demo3_slow:"Web típica", demo3_fast:"La meva web",
    demo4_t:"Detalls que enamoren", demo4_d:"Animacions i efectes suaus que fan que el teu negoci sembli molt més gran del que és.",
    demo4_try:"Passa el ratolí / toca",
    demo3_extra:"Ja tens web? També l'accelerem, sense refer-la.",

    s5_t:"Arreglem la teva web actual",
    s5_d:"Ja tens web però va lenta, no es veu bé al mòbil o està antiquada? La revisem i l'arreglem sense començar de zero.",
    pr_badge:"Primer pas", pr_name:"Reparació", pr_from:"des de", pr_for:"Arregla la web que ja tens.",
    pr_f1:"Revisió completa de la teva web actual", pr_f2:"Adaptació al mòbil", pr_f3:"Millora de velocitat", pr_f4:"Textos i fotos actualitzats", pr_f5:"Botó de WhatsApp",
    pr_cta:"Arreglar la meva web",
    form_message_hint:"Ja tens web? Pots enganxar aquí el seu enllaç.",

    pricing_kicker:"Preus", pricing_or:"o",
    pricing_title:"Clars i sense sorpreses",
    pricing_sub:"Saps el preu final des del primer dia. Tria el pla que encaixa amb el teu negoci.",
    p1_name:"Bàsica", p1_for:"Una pàgina, llesta per publicar.",
    p1_f1:"Disseny 100% a mida", p1_f2:"Adaptada a mòbil", p1_f3:"Formulari de contacte", p1_f4:"Botó directe de WhatsApp",
    p2_badge:"Més popular", p2_name:"Completa", p2_for:"Tot el de Bàsica, i a més:",
    p2_f1:"Multiidioma (els idiomes que vulguis)", p2_f2:"Galeria o portfolio", p2_f3:"SEO bàsic per a Google", p2_f4:"Mapa de Google integrat",
    p3_name:"Premium", p3_for:"Tot el de Completa, i a més:",
    p3_f1:"Animacions avançades", p3_f2:"Seccions a mida extra", p3_f3:"Optimització SEO completa", p3_f4:"Suport prioritari",
    plan_cta:"El vull", plan_cta_2:"El vull", plan_cta_3:"El vull",
    pricing_note:"* Domini i allotjament no inclosos (uns 60–80 €/any). T'assessoro per contractar-los sense cost afegit.",

    why_kicker:"Per què tan ràpid",
    why_title:"Menys espera, més resultats",
    why1_v:"Directe", why1_t:"Sense intermediaris", why1_d:"Parles amb mi, no amb una agència. Menys reunions, decisions al moment.",
    why2_v:"3–7 dies", why2_t:"Entrega àgil", why2_d:"Em centro en l'essencial i en un flux de treball provat, sense giragonses.",
    why3_v:"A mida", why3_t:"Codi propi", why3_d:"Res de plantilles pesades: codi net, lleuger i fet per al teu negoci.",
    why4_v:"Tancat", why4_t:"Preu fix", why4_d:"Pressupost tancat abans de començar. Sense sorpreses ni costos ocults.",

    contact_kicker:"Contacte",
    contact_title:"Parlem de la teva web?",
    contact_sub:"Explica'm la teva idea i et responc amb un pressupost sense compromís.",
    form_name_l:"Nom", form_business_l:"Negoci", form_message_l:"El teu projecte",
    consent_text:'He llegit i accepto la <a href="legal.html" target="_blank">Política de Privacitat</a>.',
    submit_text:"Enviar per WhatsApp",

    footer_tag:"Disseny i desenvolupament web per a petits negocis.",
    footer_contact_t:"Contacte",
    footer_legal:"Avís legal · Privacitat · Cookies",
    footer_made:"Dissenyat i programat per Ilia Oskolkov",

    /* --- Pàgina legal --- */
    lg_back:"Tornar a l'inici",
    lg_title:"Avís legal i privacitat",
    lg_updated:"Última actualització: juliol de 2026",
    lg_h1:"1. Titular del lloc web",
    lg_p1:"En compliment de la Llei 34/2002 (LSSI-CE), s'informa que aquest lloc web pertany a:",
    lg_owner:'<strong>Titular:</strong> Ilia Oskolkov (Oskal Studio)',
    lg_activity:'<strong>Activitat:</strong> Disseny i desenvolupament de pàgines web',
    lg_email:'<strong>Correu electrònic:</strong> <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>',
    lg_phone:'<strong>Telèfon / WhatsApp:</strong> <a href="https://wa.me/34628806573" target="_blank" rel="noopener">+34 628 806 573</a>',
    lg_h2:"2. Objecte",
    lg_p2:"Aquest lloc web té caràcter informatiu i presenta els serveis de disseny i desenvolupament web oferts pel titular. L'accés i l'ús del lloc atribueix la condició d'usuari i implica l'acceptació de les condicions recollides en aquest avís legal.",
    lg_h3:"3. Política de privacitat",
    lg_p3:"Respectem la teva privacitat. Les dades que ens facilitis a través del formulari de contacte o de WhatsApp (nom, negoci i missatge) s'utilitzen <strong>únicament</strong> per respondre la teva sol·licitud i elaborar un pressupost.",
    lg_resp:'<strong>Responsable:</strong> Ilia Oskolkov.',
    lg_purpose:'<strong>Finalitat:</strong> atendre consultes i sol·licituds de pressupost.',
    lg_legit:'<strong>Legitimació:</strong> el teu consentiment en enviar el formulari.',
    lg_keep:'<strong>Conservació:</strong> les dades es conserven el temps necessari per gestionar la teva sol·licitud.',
    lg_share:'<strong>Cessió:</strong> no se cedeixen dades a tercers, excepte obligació legal.',
    lg_rights:'<strong>Drets:</strong> pots exercir els teus drets d\'accés, rectificació, supressió i oposició escrivint a <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>.',
    lg_p3b:"Tingues en compte que el formulari de contacte obre una conversa a <strong>WhatsApp</strong>, el tractament de dades del qual es regeix per la política de privacitat de Meta Platforms, Inc.",
    lg_h4:"4. Política de galetes",
    lg_p4:"Aquest lloc web <strong>no utilitza galetes de seguiment ni de publicitat</strong>. Únicament pot emprar l'emmagatzematge local del navegador (localStorage) per recordar l'idioma que has triat, una dada tècnica que no identifica personalment l'usuari i que pots esborrar des del teu navegador.",
    lg_h5:"5. Propietat intel·lectual",
    lg_p5:"Els continguts, el disseny i el codi d'aquest lloc són propietat d'Ilia Oskolkov, excepte els logotips i imatges de tercers (com el projecte ALSISA), que pertanyen als seus respectius titulars i es mostren a mode de portfolio amb el seu coneixement.",
    lg_h6:"6. Legislació aplicable",
    lg_p6:"Aquest avís legal es regeix per la legislació espanyola. Per a qualsevol controvèrsia, les parts se sotmeten als jutjats i tribunals que correspongui conforme a dret.",

    ph_name:"Ex. Maria García", ph_business:"Ex. Perruqueria, restaurant...", ph_message:"Explica'm què necessites...",
    alert_consent:"Si us plau, accepta la Política de Privacitat.",
    wa_hi:"Hola Ilia! Vull una web per al meu negoci."
  },

  en: {
    nav_services:"Services", nav_case:"Project", nav_demos:"Demos", nav_pricing:"Pricing", nav_contact:"Contact", nav_quote:"Get a quote",

    hero_badge:"Web studio · Spain",
    hero_title_1:"Websites that grow",
    hero_title_2:"your small business",
    hero_sub:"Design and development of fast, modern and multilingual websites. Delivered in days, fixed price and you deal directly with me.",
    hero_cta1:"Chat on WhatsApp", hero_cta2:"See pricing",
    hero_m1:"days to deliver", hero_m2:"Many languages", hero_m3:"From €300",

    services_kicker:"What I do",
    services_title:"Websites built to sell",
    services_sub:"Everything a small business needs to have a real online presence.",
    s1_t:"Landing pages", s1_d:"Single-page sites, focused and built to win customers.",
    s2_t:"Multi-language", s2_d:"We add whatever languages you need to reach many more customers.",
    s3_t:"Mobile design", s3_d:"Perfect on mobile, where most of your customers see you.",
    s4_t:"SEO & speed", s4_d:"Fast and optimized to rank on Google and load instantly.",

    case_kicker:"My first project",
    case_title:"ALSISA · Construction & renovation",
    case_desc:"Custom multilingual website for a construction company in Girona. Bespoke design, project gallery, before/after slider, work-area map and a form that sends the request straight to the company's WhatsApp.",
    case_f1:"HTML · CSS · JS", case_f2:"Multilingual", case_f3:"100% responsive", case_f4:"Local SEO",
    case_cta:"View live site",

    demos_kicker:"See it in action",
    demos_title:"What your website can do",
    demos_sub:"No tech talk: real miniature examples of what I can build into your page.",
    demo1_t:"Your website speaks languages", demo1_d:"Visitors pick their language and the whole page changes instantly. More languages = more customers.",
    demo2_t:"Fits any screen", demo2_d:"Desktop, tablet or phone: the site reorganizes itself and always looks perfect.",
    demo3_t:"Loads in a blink", demo3_d:"Every second of waiting is customers walking away. Lightweight code, no heavy templates.",
    demo3_slow:"Typical site", demo3_fast:"My site",
    demo4_t:"Details people love", demo4_d:"Smooth animations and effects that make your business look much bigger than it is.",
    demo4_try:"Hover / touch me",
    demo3_extra:"Already have a site? We speed it up too, without rebuilding it.",

    s5_t:"We fix your current site",
    s5_d:"Already have a website but it's slow, looks bad on mobile or feels outdated? We review it and fix it without starting from scratch.",
    pr_badge:"First step", pr_name:"Repair", pr_from:"from", pr_for:"Fix the website you already have.",
    pr_f1:"Full review of your current site", pr_f2:"Mobile adaptation", pr_f3:"Speed improvement", pr_f4:"Updated texts and photos", pr_f5:"WhatsApp button",
    pr_cta:"Fix my website",
    form_message_hint:"Already have a website? You can paste its link here.",

    pricing_kicker:"Pricing", pricing_or:"or",
    pricing_title:"Clear, no surprises",
    pricing_sub:"You know the final price from day one. Choose the plan that fits your business.",
    p1_name:"Basic", p1_for:"One page, ready to publish.",
    p1_f1:"100% custom design", p1_f2:"Mobile ready", p1_f3:"Contact form", p1_f4:"Direct WhatsApp button",
    p2_badge:"Most popular", p2_name:"Complete", p2_for:"Everything in Basic, plus:",
    p2_f1:"Multi-language (any languages you want)", p2_f2:"Gallery or portfolio", p2_f3:"Basic SEO for Google", p2_f4:"Google Maps embedded",
    p3_name:"Premium", p3_for:"Everything in Complete, plus:",
    p3_f1:"Advanced animations", p3_f2:"Extra custom sections", p3_f3:"Full SEO optimization", p3_f4:"Priority support",
    plan_cta:"I want it", plan_cta_2:"I want it", plan_cta_3:"I want it",
    pricing_note:"* Domain and hosting not included (around €60–80/year). I'll guide you to set them up at no extra cost.",

    why_kicker:"Why so fast",
    why_title:"Less waiting, more results",
    why1_v:"Direct", why1_t:"No middlemen", why1_d:"You talk to me, not an agency. Fewer meetings, decisions on the spot.",
    why2_v:"3–7 days", why2_t:"Fast delivery", why2_d:"I focus on the essentials and a proven workflow, no detours.",
    why3_v:"Custom", why3_t:"My own code", why3_d:"No heavy templates: clean, lightweight code made for your business.",
    why4_v:"Fixed", why4_t:"Fixed price", why4_d:"Closed budget before we start. No surprises or hidden costs.",

    contact_kicker:"Contact",
    contact_title:"Let's talk about your website",
    contact_sub:"Tell me your idea and I'll get back to you with a no-commitment quote.",
    form_name_l:"Name", form_business_l:"Business", form_message_l:"Your project",
    consent_text:'I have read and accept the <a href="legal.html" target="_blank">Privacy Policy</a>.',
    submit_text:"Send via WhatsApp",

    footer_tag:"Web design & development for small businesses.",
    footer_contact_t:"Contact",
    footer_legal:"Legal notice · Privacy · Cookies",
    footer_made:"Designed & coded by Ilia Oskolkov",

    /* --- Legal page --- */
    lg_back:"Back to home",
    lg_title:"Legal notice & privacy",
    lg_updated:"Last updated: July 2026",
    lg_h1:"1. Website owner",
    lg_p1:"In compliance with Spanish Law 34/2002 (LSSI-CE), please note that this website belongs to:",
    lg_owner:'<strong>Owner:</strong> Ilia Oskolkov (Oskal Studio)',
    lg_activity:'<strong>Activity:</strong> Web design and development',
    lg_email:'<strong>Email:</strong> <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>',
    lg_phone:'<strong>Phone / WhatsApp:</strong> <a href="https://wa.me/34628806573" target="_blank" rel="noopener">+34 628 806 573</a>',
    lg_h2:"2. Purpose",
    lg_p2:"This website is informative in nature and presents the web design and development services offered by the owner. Accessing and using the site grants you the status of user and implies acceptance of the terms set out in this legal notice.",
    lg_h3:"3. Privacy policy",
    lg_p3:"We respect your privacy. The data you provide through the contact form or WhatsApp (name, business and message) is used <strong>solely</strong> to answer your enquiry and prepare a quote.",
    lg_resp:'<strong>Controller:</strong> Ilia Oskolkov.',
    lg_purpose:'<strong>Purpose:</strong> handling enquiries and quote requests.',
    lg_legit:'<strong>Legal basis:</strong> your consent when submitting the form.',
    lg_keep:'<strong>Retention:</strong> data is kept only as long as needed to handle your request.',
    lg_share:'<strong>Sharing:</strong> data is not shared with third parties, except where legally required.',
    lg_rights:'<strong>Your rights:</strong> you may exercise your rights of access, rectification, erasure and objection by writing to <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>.',
    lg_p3b:"Please note that the contact form opens a conversation in <strong>WhatsApp</strong>, whose data processing is governed by the privacy policy of Meta Platforms, Inc.",
    lg_h4:"4. Cookie policy",
    lg_p4:"This website <strong>does not use tracking or advertising cookies</strong>. It may only use the browser's local storage (localStorage) to remember the language you selected — a technical value that does not personally identify the user and that you can clear from your browser.",
    lg_h5:"5. Intellectual property",
    lg_p5:"The content, design and code of this site are the property of Ilia Oskolkov, except for third-party logos and images (such as the ALSISA project), which belong to their respective owners and are shown as portfolio work with their knowledge.",
    lg_h6:"6. Applicable law",
    lg_p6:"This legal notice is governed by Spanish law. For any dispute, the parties submit to the courts and tribunals that apply under the law.",

    ph_name:"e.g. Maria Garcia", ph_business:"e.g. Hair salon, restaurant...", ph_message:"Tell me what you need...",
    alert_consent:"Please accept the Privacy Policy.",
    wa_hi:"Hi Ilia! I'd like a website for my business."
  }
};

var WHATSAPP = "34628806573";
var currentLang = "es";

/* ---------- Aplicar idioma ---------- */
function changeLanguage(lang){
  if(!I18N[lang]) return;
  currentLang = lang;
  var dict = I18N[lang];

  document.documentElement.lang = (lang === "ca") ? "ca" : lang;

  // Texto por data-i18n (usa innerHTML solo si la cadena lleva etiquetas)
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var key = el.getAttribute("data-i18n");
    var val = dict[key];
    if(val == null) return;
    if(val.indexOf("<") > -1){ el.innerHTML = val; }
    else { el.textContent = val; }
  });

  // Placeholders
  setPlaceholder("input-name", dict.ph_name);
  setPlaceholder("input-business", dict.ph_business);
  setPlaceholder("input-message", dict.ph_message);

  // Bandera + etiqueta del selector
  var flags = { es:"images/es.png", ca:"images/cat.png", en:"images/en.png" };
  var labels = { es:"ESP", ca:"CAT", en:"ENG" };
  var flagEl = document.getElementById("current-flag");
  var langEl = document.getElementById("current-lang");
  if(flagEl) flagEl.src = flags[lang];
  if(langEl) langEl.textContent = labels[lang];

  // Marcar la opción activa en el menú
  document.querySelectorAll(".lang-opt").forEach(function(opt){
    opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
  });

  try { localStorage.setItem("ow_lang", lang); } catch(e){}

  // Re-animar el titular
  animateHeroTitle();
}

function setPlaceholder(id, value){
  var el = document.getElementById(id);
  if(el && value != null) el.placeholder = value;
}

/* ---------- Titular animado (palabra a palabra) ---------- */
function animateHeroTitle(){
  var lines = [document.getElementById("hero-title-1"), document.getElementById("hero-title-2")];
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var wi = 0;
  lines.forEach(function(line){
    if(!line) return;
    var text = line.textContent.trim();
    if(reduce){ line.textContent = text; return; }
    line.innerHTML = "";
    text.split(" ").forEach(function(word){
      var span = document.createElement("span");
      span.className = "word";
      span.style.setProperty("--wi", wi++);
      span.textContent = word;
      line.appendChild(span);
      line.appendChild(document.createTextNode(" "));
    });
  });
}

/* ---------- Reveal al hacer scroll (con stagger por grupo) ---------- */
function initReveal(){
  var els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  if(!("IntersectionObserver" in window)){
    els.forEach(function(e){ e.classList.add("visible"); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add("visible");
        io.unobserve(en.target);
      }
    });
  }, { threshold:0.14, rootMargin:"0px 0px -50px 0px" });

  // Índice para el retardo escalonado dentro de cada contenedor
  document.querySelectorAll(".cards, .plans, .why-grid").forEach(function(group){
    group.querySelectorAll(".reveal").forEach(function(el, i){
      el.style.setProperty("--ri", i);
    });
  });

  els.forEach(function(e){ io.observe(e); });
}

/* ---------- Botones magnéticos ---------- */
function initMagnetic(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  document.querySelectorAll(".magnetic").forEach(function(btn){
    btn.addEventListener("mousemove", function(e){
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width/2;
      var y = e.clientY - r.top - r.height/2;
      btn.style.transform = "translate(" + (x*0.22) + "px," + (y*0.30) + "px)";
    });
    btn.addEventListener("mouseleave", function(){
      btn.style.transform = "";
    });
  });
}

/* ---------- Arte animado de fondo: constelación ---------- */
function initBackgroundArt(){
  var canvas = document.getElementById("bg-art");
  if(!canvas || !canvas.getContext) return;
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var ctx = canvas.getContext("2d");
  var w = 0, h = 0, dpr = 1;
  var dots = [], raf = null, running = false;
  var mouse = { x:-9999, y:-9999 };

  var LINK_DIST  = 140;   // distancia máxima para unir dos puntos
  var MOUSE_DIST = 170;   // distancia máxima para unir con el cursor

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Fallback al viewport: en la primera pasada el layout puede no estar listo
    w = canvas.clientWidth  || window.innerWidth  || 0;
    h = canvas.clientHeight || window.innerHeight || 0;
    if(!w || !h) return;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build(){
    // Densidad adaptada a la pantalla (menos puntos en móvil)
    var count = Math.round((w * h) / 20000);
    count = Math.max(22, Math.min(count, w < 700 ? 34 : 78));
    dots = [];
    for(var i = 0; i < count; i++){
      dots.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx:(Math.random() - 0.5) * 0.26,
        vy:(Math.random() - 0.5) * 0.26,
        r: Math.random() * 1.8 + 1.0,
        accent: Math.random() < 0.20,
        // Parpadeo tipo estrella
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.1
      });
    }
  }

  var t = 0;

  function frame(){
    ctx.clearRect(0, 0, w, h);
    t += 0.016;

    var i, j, p, q, dx, dy, d2, alpha, tw;

    // Mover y enlazar
    for(i = 0; i < dots.length; i++){
      p = dots[i];
      p.x += p.vx; p.y += p.vy;
      if(p.x < -30) p.x = w + 30; else if(p.x > w + 30) p.x = -30;
      if(p.y < -30) p.y = h + 30; else if(p.y > h + 30) p.y = -30;

      for(j = i + 1; j < dots.length; j++){
        q = dots[j];
        dx = p.x - q.x; dy = p.y - q.y;
        d2 = dx*dx + dy*dy;
        if(d2 < LINK_DIST * LINK_DIST){
          alpha = (1 - d2 / (LINK_DIST * LINK_DIST)) * 0.32;
          ctx.strokeStyle = "rgba(148,163,184," + alpha.toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Enlace con el cursor (acento rojo)
      dx = p.x - mouse.x; dy = p.y - mouse.y;
      d2 = dx*dx + dy*dy;
      if(d2 < MOUSE_DIST * MOUSE_DIST){
        alpha = (1 - d2 / (MOUSE_DIST * MOUSE_DIST)) * 0.6;
        ctx.strokeStyle = "rgba(239,68,68," + alpha.toFixed(3) + ")";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    // Puntos: brillo pulsante + halo suave
    for(i = 0; i < dots.length; i++){
      p = dots[i];
      tw = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase);   // 0.1 … 1

      // Halo (resplandor exterior)
      alpha = (p.accent ? 0.16 : 0.10) * tw;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3.4, 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? "rgba(239,68,68," + alpha.toFixed(3) + ")"
        : "rgba(186,204,228," + alpha.toFixed(3) + ")";
      ctx.fill();

      // Núcleo
      alpha = p.accent ? (0.5 + 0.4 * tw) : (0.35 + 0.4 * tw);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.85 + 0.3 * tw), 0, Math.PI * 2);
      ctx.fillStyle = p.accent
        ? "rgba(248,113,113," + alpha.toFixed(3) + ")"
        : "rgba(203,213,225," + alpha.toFixed(3) + ")";
      ctx.fill();
    }

    raf = requestAnimationFrame(frame);
  }

  function start(){ if(!running){ running = true; raf = requestAnimationFrame(frame); } }
  function stop(){ running = false; if(raf) cancelAnimationFrame(raf); raf = null; }

  // Eventos
  var resizeTimer;
  window.addEventListener("resize", function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
  // Recalcular cuando todo (CSS/fuentes) ha cargado
  window.addEventListener("load", resize);
  window.addEventListener("mousemove", function(e){ mouse.x = e.clientX; mouse.y = e.clientY; }, { passive:true });
  window.addEventListener("mouseout", function(){ mouse.x = -9999; mouse.y = -9999; });
  document.addEventListener("visibilitychange", function(){
    if(document.hidden) stop(); else start();
  });

  resize();
  start();
}

/* ---------- Demos en vivo (sección "capacidades") ---------- */
function initDemos(){
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Demo 1: saludo que rota de idioma */
  var word = document.getElementById("demo-lang-word");
  if(word && !reduce){
    var greetings = ["¡Hola!", "Hello!", "Bonjour !", "Hallo!", "Ciao!"];
    var flags = document.querySelectorAll(".demo-flag");
    var gi = 0;
    var mark = function(){
      flags.forEach(function(f){ f.classList.toggle("on", +f.getAttribute("data-di") === gi); });
    };
    mark();
    setInterval(function(){
      word.classList.add("swap");
      setTimeout(function(){
        gi = (gi + 1) % greetings.length;
        word.textContent = greetings[gi];
        mark();
        word.classList.remove("swap");
      }, 300);
    }, 2200);
  }

  /* Demo 4: tarjeta 3D que sigue el cursor */
  var tilt = document.getElementById("demo-tilt");
  if(tilt && !reduce){
    var inner = tilt.querySelector(".demo-tilt-inner");
    var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    function move(x, y){
      var r = tilt.getBoundingClientRect();
      var px = (x - r.left) / r.width  - 0.5;
      var py = (y - r.top)  / r.height - 0.5;
      inner.style.transform = "rotateX(" + (-py * 22) + "deg) rotateY(" + (px * 26) + "deg)";
      inner.style.setProperty("--sx", ((px + 0.5) * 100) + "%");
      inner.style.setProperty("--sy", ((py + 0.5) * 100) + "%");
    }
    function leave(){
      tilt.classList.remove("live");
      inner.style.transform = "";
    }

    if(fine){
      tilt.addEventListener("mouseenter", function(){ tilt.classList.add("live"); });
      tilt.addEventListener("mousemove", function(e){ move(e.clientX, e.clientY); });
      tilt.addEventListener("mouseleave", leave);
    }
    // Táctil: seguir el dedo
    tilt.addEventListener("touchstart", function(){ tilt.classList.add("live"); }, { passive:true });
    tilt.addEventListener("touchmove", function(e){
      var t = e.touches[0];
      if(t) move(t.clientX, t.clientY);
    }, { passive:true });
    tilt.addEventListener("touchend", leave);
  }
}

/* ---------- Selector de idioma (desplegable con clic) ---------- */
function initLangDropdown(){
  var dd = document.getElementById("lang-dropdown");
  var btn = document.getElementById("lang-btn");
  if(!dd || !btn) return;

  function close(){ dd.classList.remove("open"); btn.setAttribute("aria-expanded","false"); }

  btn.addEventListener("click", function(e){
    e.stopPropagation();
    var open = dd.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  dd.querySelectorAll(".lang-opt").forEach(function(opt){
    opt.addEventListener("click", function(){
      changeLanguage(opt.getAttribute("data-lang"));
      close();
    });
  });

  // Cerrar al hacer clic fuera o pulsar Escape
  document.addEventListener("click", function(e){
    if(!dd.contains(e.target)) close();
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") close();
  });
}

/* ---------- Menú móvil ---------- */
function initMobileMenu(){
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");
  if(!toggle || !nav) return;

  toggle.addEventListener("click", function(){
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function(link){
    link.addEventListener("click", function(){
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Header con blur al hacer scroll ---------- */
function initHeaderScroll(){
  var header = document.getElementById("site-header");
  if(!header) return;
  var onScroll = function(){
    if(window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

/* ---------- Formulario → WhatsApp ---------- */
function initForm(){
  var form = document.getElementById("quote-form");
  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    var dict = I18N[currentLang];

    if(!document.getElementById("consent-check").checked){
      alert(dict.alert_consent);
      return;
    }

    var name = document.getElementById("input-name").value.trim();
    var business = document.getElementById("input-business").value.trim();
    var message = document.getElementById("input-message").value.trim();

    var lines = [dict.wa_hi];
    if(name)     lines.push((dict.form_name_l || "Nombre") + ": " + name);
    if(business) lines.push((dict.form_business_l || "Negocio") + ": " + business);
    if(message)  lines.push((dict.form_message_l || "Proyecto") + ": " + message);

    var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank");
  });
}

/* ---------- Inicio ---------- */
document.addEventListener("DOMContentLoaded", function(){
  var saved = null;
  try { saved = localStorage.getItem("ow_lang"); } catch(e){}
  changeLanguage(saved && I18N[saved] ? saved : "es");

  var yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  initBackgroundArt();
  initReveal();
  initMagnetic();
  initDemos();
  initLangDropdown();
  initMobileMenu();
  initHeaderScroll();
  initForm();
});
