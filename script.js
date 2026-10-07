/* ============================================================
   Oskal Studio — lógica del sitio
   i18n (ES/CA/EN/RU) · animaciones · menú móvil · formulario→WhatsApp
   ============================================================ */

/* ---------- Traducciones ---------- */
var I18N = {
  es: {
    nav_services:"Servicios", nav_pricing:"Precios", nav_contact:"Contacto", nav_quote:"Presupuesto",
    seo_title:"Oskal Studio · Diseño y desarrollo de páginas web en España",
    seo_desc:"Diseño y desarrollo de páginas web rápidas, modernas y multiidioma para pequeños negocios en España. Entrega en días, precio cerrado y mantenimiento mensual. Desde 300 €.",

    hero_badge:"Estudio web · España",
    hero_title_1:"Webs que hacen crecer",
    hero_title_2:"tu pequeño negocio",
    hero_sub:"Diseño y desarrollo de páginas web rápidas, modernas y multilingües. Entrega en días, precio cerrado y trato directo, sin agencias.",
    hero_cta1:"Hablar por WhatsApp", hero_cta2:"Ver trabajos",
    hero_m1:"días de entrega", hero_m2:"Multiidioma", hero_m3:"Desde 300 €",

    services_kicker:"Qué hago",
    services_title:"Webs pensadas para vender",
    services_sub:"Todo lo que un pequeño negocio necesita para tener presencia online de verdad.",
    s1_t:"Landing pages", s1_d:"Webs de una sola página, directas y orientadas a captar clientes.",
    s2_t:"Multiidioma", s2_d:"Añadimos los idiomas que necesites para llegar a muchos más clientes.",
    s3_t:"Diseño móvil", s3_d:"Perfectas en el móvil, donde te ve la mayoría de tus clientes.",
    s4_t:"SEO y velocidad", s4_d:"Rápidas y optimizadas para aparecer en Google y cargar al instante.",

    demos_title:"Lo que tu web puede hacer",

    demo1_t:"Tu web habla idiomas", demo1_d:"El visitante elige su idioma y toda la página cambia al instante. Más idiomas = más clientes.",
    demo2_t:"Se adapta a cualquier pantalla", demo2_d:"Ordenador, tablet o móvil: la web se reorganiza sola y siempre se ve perfecta.",
    demo3_t:"Carga en un parpadeo", demo3_d:"Cada segundo de espera son clientes que se van. Código ligero, sin plantillas pesadas.",
    demo3_slow:"Web típica", demo3_fast:"Mi web",
    demo4_t:"Detalles que enamoran", demo4_d:"Animaciones y efectos suaves que hacen que tu negocio parezca mucho más grande de lo que es.",
    demo4_try:"Pasa el ratón / toca",

    s5_t:"Arreglamos tu web actual",
    s5_d:"¿Ya tienes web pero va lenta, no se ve bien en el móvil o está anticuada? La revisamos y la arreglamos sin empezar de cero.",

    pr_cta:"Arreglar mi web",
    form_message_hint:"¿Ya tienes web? Puedes pegar aquí su enlace.",

    rep_kicker:"¿Ya tienes web?",

    faq_kicker:"Dudas frecuentes",
    faq_title:"Lo que todo el mundo pregunta",
    faq_q1:"¿La web es mía?",
    faq_a1:"Sí, completamente. El diseño, los textos y el código son tuyos desde el día de la entrega.",
    faq_q2:"¿A nombre de quién está el dominio?",
    faq_a2:"El dominio es tuyo. Si contratas mantenimiento lo registro en mi cuenta para gestionarlo por ti y que no tengas que preocuparte de renovaciones. Te lo transfiero gratis y sin condiciones cuando lo pidas.",
    faq_q3:"¿Qué pasa si dejo el mantenimiento?",
    faq_a3:"Nada le pasa a tu web. Simplemente pasas a encargarte tú de renovar el dominio y el hosting y de cualquier cambio que quieras hacer. Sin permanencia ni penalización.",
    faq_q4:"¿Cuánto se tarda?",
    faq_a4:"Entre 3 y 7 días. El plazo empieza cuando recibo el pago inicial. Si falta algún material, empieza cuando lo tengo completo.",
    faq_q5:"¿Y si no me gusta el diseño?",
    faq_a5:"Antes de publicar nada te enseño un borrador y lo ajustamos juntos. No se publica hasta que estés conforme.",
    faq_q6:"¿Cómo se paga?",
    faq_a6:"Un 40 % al empezar y el resto al entregar, por Bizum o transferencia. El precio se cierra en el presupuesto y no cambia.",
    faq_q7:"¿Puedo cambiar cosas yo mismo después?",
    faq_a7:"Si quieres, te explico cómo hacer los cambios sencillos. Y si prefieres no tocar nada, para eso está el mantenimiento: me escribes por WhatsApp y lo cambio yo.",
    faq_q8:"¿Solo trabajas en Girona?",
    faq_a8:"Trabajo en toda España a distancia: todo el proceso se hace por WhatsApp. En la zona de Girona también nos podemos ver en persona.",

    pricing_kicker:"Precios",
    pricing_title:"Claros y sin sorpresas",
    pricing_sub:"Sabes el precio final desde el primer día. Elige el plan que encaja con tu negocio.",
    p1_name:"Básica", p1_for:"Una página, lista para publicar.",
    p1_f1:"Diseño 100% a medida", p1_f2:"Adaptada a móvil", p1_f3:"Formulario de contacto", p1_f4:"Botón directo de WhatsApp",
    p2_badge:"Más popular", p2_name:"Completa", p2_for:"Todo lo de Básica, y además:",
    p2_f1:"Multiidioma (los idiomas que quieras)", p2_f2:"Galería o portfolio", p2_f3:"SEO básico para Google", p2_f4:"Mapa de Google integrado",
    p3_name:"Premium", p3_for:"Todo lo de Completa, y además:",
    p3_f1:"Motion design: animaciones de cine al hacer scroll", p3_f2:"Secciones a medida extra", p3_f3:"Optimización SEO completa", p3_f4:"Soporte prioritario",
    plan_cta:"Lo quiero", plan_cta_2:"Lo quiero", plan_cta_3:"Lo quiero",
    pricing_note:"* Dominio y hosting aparte (unos 60–80 € al año) o incluidos en cualquier plan de mantenimiento.",

    maint_cta:"Quiero mantenimiento",
    maint_note:"Opcional y sin permanencia. Puedes cambiar de plan o darte de baja cuando quieras.",
    mp1_name:"Base", mp1_price:"25 € / mes", mp1_for:"Que todo siga funcionando.",
    mp1_f1:"Dominio y hosting incluidos y renovados a tiempo", mp1_f2:"SSL y copias de seguridad", mp1_f3:"Si algo falla, lo arreglo yo", mp1_f4:"Cambios de datos básicos: horario, teléfono, dirección",
    mp2_name:"Activo", mp2_price:"60 € / mes", mp2_for:"Tu web se mantiene al día.",
    mp2_f1:"Todo lo del plan Base", mp2_f2:"Cambios de textos y fotos cuando los necesites", mp2_f3:"Gestión de tu ficha de Google", mp2_f4:"Respuesta en menos de 24 h",
    mp3_name:"Pro", mp3_price:"120 € / mes", mp3_for:"Tu web crece contigo.",
    mp3_f1:"Todo lo del plan Activo", mp3_f2:"Secciones nuevas y campañas de temporada", mp3_f3:"Trabajo continuo de SEO", mp3_f4:"Prioridad absoluta",

    contact_kicker:"Contacto",
    contact_title:"¿Hablamos de tu web?",
    contact_sub:"Cuéntame tu idea y te respondo con un presupuesto sin compromiso.",
    form_name_l:"Nombre", form_business_l:"Negocio", form_message_l:"Tu proyecto",
    consent_text:'He leído y acepto la <a href="legal.html" target="_blank">Política de Privacidad</a>.',
    submit_text:"Enviar por WhatsApp",

    footer_tag:"Diseño y desarrollo web para pequeños negocios.",
    footer_contact_t:"Contacto",
    footer_legal:"Aviso legal · Privacidad · Cookies",

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

    /* --- Главная v2 (10.2026) --- */
    nav_work:"Trabajos",
    nav_faq:"FAQ",
    trust_label:"Por qué trabajar con nosotros",
    tr1_v:"Directo",
    tr1_t:"Trato directo, sin agencias",
    tr2_v:"3–7 días",
    tr2_t:"De la idea a la web publicada",
    tr3_v:"A medida",
    tr3_t:"Código propio, sin plantillas",
    tr4_v:"Precio fijo",
    tr4_t:"Presupuesto cerrado, sin sorpresas",
    work_kicker:"Trabajos",
    work_title:"Webs reales y diseños de ejemplo",
    work_sub:"Un proyecto real y dos diseños de ejemplo. Ábrelos: funcionan como una web de verdad.",
    tag_real:"Proyecto real",
    tag_demo:"Diseño de ejemplo",
    w1_niche:"Construcción y reformas · Girona",
    w2_niche:"Salón de belleza",
    w3_niche:"Trattoria italiana",
    w_plan_c:"Plan Completa · 450 €",
    w_plan_p:"Plan Premium · 700 €",
    w_cta_web:"Ver web",
    w_cta_demo:"Ver demo",
    w1_alt:"Web de ALSISA Construcciones",
    w2_alt:"Diseño de ejemplo: salón de belleza Nácar",
    w3_alt:"Diseño de ejemplo: trattoria Da Livia",
    w_open:"abre en una pestaña nueva",
    op_kicker:"Opiniones",
    op_title:"Lo que dicen los clientes",
    how_kicker:"Cómo trabajo",
    how_title:"Cuatro pasos, sin complicaciones",
    st1_t:"Me escribes por WhatsApp",
    st1_d:"Me cuentas qué necesitas, sin compromiso.",
    st2_t:"Presupuesto cerrado",
    st2_d:"El precio final por escrito antes de empezar.",
    st3_t:"Borrador para aprobar",
    st3_d:"Lo revisas y lo ajustamos juntos.",
    st4_t:"Web publicada",
    st4_d:"En 3–7 días, lista para recibir clientes.",
    ex_pl:"Ejemplos:",
    ex_one:"Ejemplo:",
    rp_price:"Reparación desde 150 €",
    rp_d:"La revisamos y la ponemos al día sin empezar de cero: móvil, velocidad, textos y WhatsApp.",
    mt_title:"Mantenimiento después de la entrega",

    ph_name:"Ej. María García", ph_business:"Ej. Peluquería, restaurante...", ph_message:"Cuéntame qué necesitas...",
    alert_consent:"Por favor, acepta la Política de Privacidad.",
    wa_hi:"Hola Ilia! Quiero una web para mi negocio."
  },

  ca: {
    nav_services:"Serveis", nav_pricing:"Preus", nav_contact:"Contacte", nav_quote:"Pressupost",
    seo_title:"Oskal Studio · Disseny i desenvolupament de pàgines web a Espanya",
    seo_desc:"Disseny i desenvolupament de pàgines web ràpides, modernes i multiidioma per a petits negocis a Espanya. Entrega en dies, preu tancat i manteniment mensual. Des de 300 €.",

    hero_badge:"Estudi web · Espanya",
    hero_title_1:"Webs que fan créixer",
    hero_title_2:"el teu petit negoci",
    hero_sub:"Disseny i desenvolupament de pàgines web ràpides, modernes i multilingües. Entrega en dies, preu tancat i tracte directe, sense agències.",
    hero_cta1:"Parlar per WhatsApp", hero_cta2:"Veure treballs",
    hero_m1:"dies d'entrega", hero_m2:"Multiidioma", hero_m3:"Des de 300 €",

    services_kicker:"Què faig",
    services_title:"Webs pensades per vendre",
    services_sub:"Tot el que un petit negoci necessita per tenir presència online de veritat.",
    s1_t:"Landing pages", s1_d:"Webs d'una sola pàgina, directes i orientades a captar clients.",
    s2_t:"Multiidioma", s2_d:"Afegim els idiomes que necessitis per arribar a molts més clients.",
    s3_t:"Disseny mòbil", s3_d:"Perfectes al mòbil, on et veu la majoria dels teus clients.",
    s4_t:"SEO i velocitat", s4_d:"Ràpides i optimitzades per aparèixer a Google i carregar a l'instant.",

    demos_title:"El que la teva web pot fer",

    demo1_t:"La teva web parla idiomes", demo1_d:"El visitant tria el seu idioma i tota la pàgina canvia a l'instant. Més idiomes = més clients.",
    demo2_t:"S'adapta a qualsevol pantalla", demo2_d:"Ordinador, tauleta o mòbil: la web es reorganitza sola i sempre es veu perfecta.",
    demo3_t:"Carrega en un parpelleig", demo3_d:"Cada segon d'espera són clients que marxen. Codi lleuger, sense plantilles pesades.",
    demo3_slow:"Web típica", demo3_fast:"La meva web",
    demo4_t:"Detalls que enamoren", demo4_d:"Animacions i efectes suaus que fan que el teu negoci sembli molt més gran del que és.",
    demo4_try:"Passa el ratolí / toca",

    s5_t:"Arreglem la teva web actual",
    s5_d:"Ja tens web però va lenta, no es veu bé al mòbil o està antiquada? La revisem i l'arreglem sense començar de zero.",

    pr_cta:"Arreglar la meva web",
    form_message_hint:"Ja tens web? Pots enganxar aquí el seu enllaç.",

    rep_kicker:"Ja tens web?",

    faq_kicker:"Dubtes freqüents",
    faq_title:"El que tothom pregunta",
    faq_q1:"La web és meva?",
    faq_a1:"Sí, completament. El disseny, els textos i el codi són teus des del dia de l'entrega.",
    faq_q2:"A nom de qui està el domini?",
    faq_a2:"El domini és teu. Si contractes manteniment el registro al meu compte per gestionar-lo per tu i que no t'hagis de preocupar de renovacions. Te'l transfereixo gratis i sense condicions quan ho demanis.",
    faq_q3:"Què passa si deixo el manteniment?",
    faq_a3:"No li passa res a la teva web. Simplement passes a encarregar-te tu de renovar el domini i l'allotjament i de qualsevol canvi que vulguis fer. Sense permanència ni penalització.",
    faq_q4:"Quant es triga?",
    faq_a4:"Entre 3 i 7 dies. El termini comença quan rebo el pagament inicial. Si falta algun material, comença quan el tinc complet.",
    faq_q5:"I si no m'agrada el disseny?",
    faq_a5:"Abans de publicar res t'ensenyo un esborrany i l'ajustem junts. No es publica fins que estiguis conforme.",
    faq_q6:"Com es paga?",
    faq_a6:"Un 40 % en començar i la resta en entregar, per Bizum o transferència. El preu es tanca al pressupost i no canvia.",
    faq_q7:"Puc canviar coses jo mateix després?",
    faq_a7:"Si vols, t'explico com fer els canvis senzills. I si prefereixes no tocar res, per això hi ha el manteniment: m'escrius per WhatsApp i ho canvio jo.",
    faq_q8:"Només treballes a Girona?",
    faq_a8:"Treballo a tota Espanya a distància: tot el procés es fa per WhatsApp. A la zona de Girona també ens podem veure en persona.",

    pricing_kicker:"Preus",
    pricing_title:"Clars i sense sorpreses",
    pricing_sub:"Saps el preu final des del primer dia. Tria el pla que encaixa amb el teu negoci.",
    p1_name:"Bàsica", p1_for:"Una pàgina, llesta per publicar.",
    p1_f1:"Disseny 100% a mida", p1_f2:"Adaptada a mòbil", p1_f3:"Formulari de contacte", p1_f4:"Botó directe de WhatsApp",
    p2_badge:"Més popular", p2_name:"Completa", p2_for:"Tot el de Bàsica, i a més:",
    p2_f1:"Multiidioma (els idiomes que vulguis)", p2_f2:"Galeria o portfolio", p2_f3:"SEO bàsic per a Google", p2_f4:"Mapa de Google integrat",
    p3_name:"Premium", p3_for:"Tot el de Completa, i a més:",
    p3_f1:"Motion design: animacions de cinema en fer scroll", p3_f2:"Seccions a mida extra", p3_f3:"Optimització SEO completa", p3_f4:"Suport prioritari",
    plan_cta:"El vull", plan_cta_2:"El vull", plan_cta_3:"El vull",
    pricing_note:"* Domini i allotjament a part (uns 60–80 € l'any) o inclosos en qualsevol pla de manteniment.",

    maint_cta:"Vull manteniment",
    maint_note:"Opcional i sense permanència. Pots canviar de pla o donar-te de baixa quan vulguis.",
    mp1_name:"Base", mp1_price:"25 € / mes", mp1_for:"Que tot segueixi funcionant.",
    mp1_f1:"Domini i allotjament inclosos i renovats a temps", mp1_f2:"SSL i còpies de seguretat", mp1_f3:"Si alguna cosa falla, ho arreglo jo", mp1_f4:"Canvis de dades bàsiques: horari, telèfon, adreça",
    mp2_name:"Activo", mp2_price:"60 € / mes", mp2_for:"La teva web es manté al dia.",
    mp2_f1:"Tot el del pla Base", mp2_f2:"Canvis de textos i fotos quan els necessitis", mp2_f3:"Gestió de la teva fitxa de Google", mp2_f4:"Resposta en menys de 24 h",
    mp3_name:"Pro", mp3_price:"120 € / mes", mp3_for:"La teva web creix amb tu.",
    mp3_f1:"Tot el del pla Activo", mp3_f2:"Seccions noves i campanyes de temporada", mp3_f3:"Treball continu de SEO", mp3_f4:"Prioritat absoluta",

    contact_kicker:"Contacte",
    contact_title:"Parlem de la teva web?",
    contact_sub:"Explica'm la teva idea i et responc amb un pressupost sense compromís.",
    form_name_l:"Nom", form_business_l:"Negoci", form_message_l:"El teu projecte",
    consent_text:'He llegit i accepto la <a href="legal.html" target="_blank">Política de Privacitat</a>.',
    submit_text:"Enviar per WhatsApp",

    footer_tag:"Disseny i desenvolupament web per a petits negocis.",
    footer_contact_t:"Contacte",
    footer_legal:"Avís legal · Privacitat · Cookies",

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

    /* --- Главная v2 (10.2026) --- */
    nav_work:"Treballs",
    nav_faq:"FAQ",
    trust_label:"Per què treballar amb nosaltres",
    tr1_v:"Directe",
    tr1_t:"Tracte directe, sense agències",
    tr2_v:"3–7 dies",
    tr2_t:"De la idea a la web publicada",
    tr3_v:"A mida",
    tr3_t:"Codi propi, sense plantilles",
    tr4_v:"Preu fix",
    tr4_t:"Pressupost tancat, sense sorpreses",
    work_kicker:"Treballs",
    work_title:"Webs reals i dissenys d'exemple",
    work_sub:"Un projecte real i dos dissenys d'exemple. Obre'ls: funcionen com una web de veritat.",
    tag_real:"Projecte real",
    tag_demo:"Disseny d'exemple",
    w1_niche:"Construcció i reformes · Girona",
    w2_niche:"Saló de bellesa",
    w3_niche:"Trattoria italiana",
    w_plan_c:"Pla Completa · 450 €",
    w_plan_p:"Pla Premium · 700 €",
    w_cta_web:"Veure web",
    w_cta_demo:"Veure demo",
    w1_alt:"Web d'ALSISA Construccions",
    w2_alt:"Disseny d'exemple: saló de bellesa Nácar",
    w3_alt:"Disseny d'exemple: trattoria Da Livia",
    w_open:"s'obre en una pestanya nova",
    op_kicker:"Opinions",
    op_title:"El que diuen els clients",
    how_kicker:"Com treballo",
    how_title:"Quatre passos, sense complicacions",
    st1_t:"M'escrius per WhatsApp",
    st1_d:"M'expliques què necessites, sense compromís.",
    st2_t:"Pressupost tancat",
    st2_d:"El preu final per escrit abans de començar.",
    st3_t:"Esborrany per aprovar",
    st3_d:"El revises i l'ajustem junts.",
    st4_t:"Web publicada",
    st4_d:"En 3–7 dies, llesta per rebre clients.",
    ex_pl:"Exemples:",
    ex_one:"Exemple:",
    rp_price:"Reparació des de 150 €",
    rp_d:"La revisem i la posem al dia sense començar de zero: mòbil, velocitat, textos i WhatsApp.",
    mt_title:"Manteniment després de l'entrega",

    ph_name:"Ex. Maria García", ph_business:"Ex. Perruqueria, restaurant...", ph_message:"Explica'm què necessites...",
    alert_consent:"Si us plau, accepta la Política de Privacitat.",
    wa_hi:"Hola Ilia! Vull una web per al meu negoci."
  },

  en: {
    nav_services:"Services", nav_pricing:"Pricing", nav_contact:"Contact", nav_quote:"Get a quote",
    seo_title:"Oskal Studio · Web design and development in Spain",
    seo_desc:"Design and development of fast, modern, multilingual websites for small businesses in Spain. Delivered in days, fixed price and monthly maintenance. From €300.",

    hero_badge:"Web studio · Spain",
    hero_title_1:"Websites that grow",
    hero_title_2:"your small business",
    hero_sub:"Design and development of fast, modern, multilingual websites. Delivered in days, at a fixed price, with direct contact — no agencies.",
    hero_cta1:"Chat on WhatsApp", hero_cta2:"See our work",
    hero_m1:"days to deliver", hero_m2:"Multilingual", hero_m3:"From €300",

    services_kicker:"What I do",
    services_title:"Websites built to sell",
    services_sub:"Everything a small business needs to have a real online presence.",
    s1_t:"Landing pages", s1_d:"Single-page sites, focused and built to win customers.",
    s2_t:"Multi-language", s2_d:"We add whatever languages you need to reach many more customers.",
    s3_t:"Mobile design", s3_d:"Perfect on mobile, where most of your customers see you.",
    s4_t:"SEO & speed", s4_d:"Fast and optimized to rank on Google and load instantly.",

    demos_title:"What your website can do",

    demo1_t:"Your website speaks languages", demo1_d:"Visitors pick their language and the whole page changes instantly. More languages = more customers.",
    demo2_t:"Fits any screen", demo2_d:"Desktop, tablet or phone: the site reorganizes itself and always looks perfect.",
    demo3_t:"Loads in a blink", demo3_d:"Every second of waiting is customers walking away. Lightweight code, no heavy templates.",
    demo3_slow:"Typical site", demo3_fast:"My site",
    demo4_t:"Details people love", demo4_d:"Smooth animations and effects that make your business look much bigger than it is.",
    demo4_try:"Hover / touch me",

    s5_t:"We fix your current site",
    s5_d:"Already have a website but it's slow, looks bad on mobile or feels outdated? We review it and fix it without starting from scratch.",

    pr_cta:"Fix my website",
    form_message_hint:"Already have a website? You can paste its link here.",

    rep_kicker:"Already have a website?",

    faq_kicker:"Frequent questions",
    faq_title:"What everyone asks",
    faq_q1:"Is the website mine?",
    faq_a1:"Yes, completely. The design, the texts and the code are yours from the day of delivery.",
    faq_q2:"Whose name is the domain in?",
    faq_a2:"The domain is yours. If you take out maintenance I register it in my account to manage it for you so you don't have to worry about renewals. I transfer it to you free and with no conditions whenever you ask.",
    faq_q3:"What happens if I stop the maintenance?",
    faq_a3:"Nothing happens to your website. You simply take over renewing the domain and hosting and making any changes you want. No lock-in, no penalty.",
    faq_q4:"How long does it take?",
    faq_a4:"Between 3 and 7 days. The timeline starts when I receive the initial payment. If any material is missing, it starts once I have everything.",
    faq_q5:"What if I don't like the design?",
    faq_a5:"Before publishing anything I show you a draft and we adjust it together. Nothing goes live until you're happy with it.",
    faq_q6:"How is payment handled?",
    faq_a6:"40 % to start and the rest on delivery, by Bizum or bank transfer. The price is fixed in the quote and does not change.",
    faq_q7:"Can I change things myself afterwards?",
    faq_a7:"If you want, I'll show you how to make the simple changes. And if you'd rather not touch anything, that's what maintenance is for: you message me on WhatsApp and I change it.",
    faq_q8:"Do you only work in Girona?",
    faq_a8:"I work remotely across all of Spain: the whole process is done over WhatsApp. Around Girona we can also meet in person.",

    pricing_kicker:"Pricing",
    pricing_title:"Clear, no surprises",
    pricing_sub:"You know the final price from day one. Choose the plan that fits your business.",
    p1_name:"Basic", p1_for:"One page, ready to publish.",
    p1_f1:"100% custom design", p1_f2:"Mobile ready", p1_f3:"Contact form", p1_f4:"Direct WhatsApp button",
    p2_badge:"Most popular", p2_name:"Complete", p2_for:"Everything in Basic, plus:",
    p2_f1:"Multi-language (any languages you want)", p2_f2:"Gallery or portfolio", p2_f3:"Basic SEO for Google", p2_f4:"Google Maps embedded",
    p3_name:"Premium", p3_for:"Everything in Complete, plus:",
    p3_f1:"Motion design: cinematic scroll animations", p3_f2:"Extra custom sections", p3_f3:"Full SEO optimization", p3_f4:"Priority support",
    plan_cta:"I want it", plan_cta_2:"I want it", plan_cta_3:"I want it",
    pricing_note:"* Domain and hosting are separate (around €60–80 a year), or included in any maintenance plan.",

    maint_cta:"I want maintenance",
    maint_note:"Optional, no lock-in. Change plan or cancel whenever you want.",
    mp1_name:"Base", mp1_price:"€25 / month", mp1_for:"Keep everything running.",
    mp1_f1:"Domain and hosting included and renewed on time", mp1_f2:"SSL and backups", mp1_f3:"If something breaks, I fix it", mp1_f4:"Basic detail changes: hours, phone, address",
    mp2_name:"Activo", mp2_price:"€60 / month", mp2_for:"Your website stays up to date.",
    mp2_f1:"Everything in the Base plan", mp2_f2:"Text and photo changes whenever you need", mp2_f3:"Management of your Google listing", mp2_f4:"Reply in under 24 h",
    mp3_name:"Pro", mp3_price:"€120 / month", mp3_for:"Your website grows with you.",
    mp3_f1:"Everything in the Activo plan", mp3_f2:"New sections and seasonal campaigns", mp3_f3:"Ongoing SEO work", mp3_f4:"Absolute priority",

    contact_kicker:"Contact",
    contact_title:"Let's talk about your website",
    contact_sub:"Tell me your idea and I'll get back to you with a no-commitment quote.",
    form_name_l:"Name", form_business_l:"Business", form_message_l:"Your project",
    consent_text:'I have read and accept the <a href="legal.html" target="_blank">Privacy Policy</a>.',
    submit_text:"Send via WhatsApp",

    footer_tag:"Web design & development for small businesses.",
    footer_contact_t:"Contact",
    footer_legal:"Legal notice · Privacy · Cookies",

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

    /* --- Главная v2 (10.2026) --- */
    nav_work:"Work",
    nav_faq:"FAQ",
    trust_label:"Why work with us",
    tr1_v:"Direct",
    tr1_t:"Direct contact, no agencies",
    tr2_v:"3–7 days",
    tr2_t:"From idea to live website",
    tr3_v:"Custom",
    tr3_t:"Hand-written code, no templates",
    tr4_v:"Fixed price",
    tr4_t:"Closed quote, no surprises",
    work_kicker:"Our work",
    work_title:"Real websites and sample designs",
    work_sub:"One real project and two sample designs. Open them — they work just like a real website.",
    tag_real:"Real project",
    tag_demo:"Sample design",
    w1_niche:"Construction & renovation · Girona",
    w2_niche:"Beauty salon",
    w3_niche:"Italian trattoria",
    w_plan_c:"Complete plan · €450",
    w_plan_p:"Premium plan · €700",
    w_cta_web:"View website",
    w_cta_demo:"View demo",
    w1_alt:"ALSISA Construcciones website",
    w2_alt:"Sample design: Nácar beauty salon",
    w3_alt:"Sample design: Da Livia trattoria",
    w_open:"opens in a new tab",
    op_kicker:"Reviews",
    op_title:"What clients say",
    how_kicker:"How it works",
    how_title:"Four steps, no hassle",
    st1_t:"You message me on WhatsApp",
    st1_d:"Tell me what you need, no commitment.",
    st2_t:"Fixed quote",
    st2_d:"The final price in writing before we start.",
    st3_t:"Draft for your approval",
    st3_d:"You review it and we fine-tune it together.",
    st4_t:"Website live",
    st4_d:"In 3–7 days, ready for customers.",
    ex_pl:"Examples:",
    ex_one:"Example:",
    rp_price:"Repair from €150",
    rp_d:"We review it and bring it up to date without starting over: mobile, speed, texts and WhatsApp.",
    mt_title:"Maintenance after delivery",

    ph_name:"e.g. Maria Garcia", ph_business:"e.g. Hair salon, restaurant...", ph_message:"Tell me what you need...",
    alert_consent:"Please accept the Privacy Policy.",
    wa_hi:"Hi Ilia! I'd like a website for my business."
  },

  ru: {
    nav_services:"Услуги", nav_pricing:"Цены", nav_contact:"Контакт", nav_quote:"Смета",
    seo_title:"Oskal Studio · Разработка и дизайн сайтов в Испании",
    seo_desc:"Разработка быстрых, современных и многоязычных сайтов для малого бизнеса в Испании. Сдача за несколько дней, фиксированная цена и ежемесячное обслуживание. От 300 €.",

    hero_badge:"Веб-студия · Испания",
    hero_title_1:"Сайты, которые растят",
    hero_title_2:"твой малый бизнес",
    hero_sub:"Разработка и дизайн быстрых, современных и многоязычных сайтов. Сдача за несколько дней, фиксированная цена и общение напрямую, без агентств.",
    hero_cta1:"Написать в WhatsApp", hero_cta2:"Смотреть работы",
    hero_m1:"дней на сдачу", hero_m2:"Многоязычные", hero_m3:"От 300 €",

    services_kicker:"Что я делаю",
    services_title:"Сайты, которые продают",
    services_sub:"Всё, что нужно малому бизнесу для настоящего присутствия в интернете.",
    s1_t:"Лендинги", s1_d:"Одностраничные сайты — прямые и нацеленные на привлечение клиентов.",
    s2_t:"Много языков", s2_d:"Добавляем нужные языки, чтобы охватить гораздо больше клиентов.",
    s3_t:"Мобильный дизайн", s3_d:"Идеально на телефоне, где тебя видит большинство клиентов.",
    s4_t:"SEO и скорость", s4_d:"Быстрые и оптимизированные — чтобы попадать в Google и грузиться мгновенно.",

    demos_title:"Что умеет твой сайт",

    demo1_t:"Твой сайт говорит на языках", demo1_d:"Посетитель выбирает язык, и вся страница меняется мгновенно. Больше языков — больше клиентов.",
    demo2_t:"Подстраивается под любой экран", demo2_d:"Компьютер, планшет или телефон: сайт перестраивается сам и всегда выглядит идеально.",
    demo3_t:"Грузится за мгновение", demo3_d:"Каждая секунда ожидания — уходящие клиенты. Лёгкий код, без тяжёлых шаблонов.",
    demo3_slow:"Обычный сайт", demo3_fast:"Мой сайт",
    demo4_t:"Детали, в которые влюбляются", demo4_d:"Плавные анимации и эффекты, которые делают твой бизнес намного солиднее.",
    demo4_try:"Наведи / коснись",

    s5_t:"Чиним твой текущий сайт",
    s5_d:"Уже есть сайт, но он медленный, плохо выглядит на телефоне или устарел? Проверяем и чиним, не начиная с нуля.",

    pr_cta:"Починить мой сайт",
    form_message_hint:"Уже есть сайт? Можешь вставить сюда его адрес.",

    rep_kicker:"Уже есть сайт?",

    faq_kicker:"Частые вопросы",
    faq_title:"О чём спрашивают все",
    faq_q1:"Сайт принадлежит мне?",
    faq_a1:"Да, полностью. Дизайн, тексты и код твои со дня сдачи.",
    faq_q2:"На кого зарегистрирован домен?",
    faq_a2:"Домен твой. Если берёшь обслуживание, я регистрирую его на свой аккаунт, чтобы вести его за тебя и чтобы ты не думал о продлениях. Передам его тебе бесплатно и без условий, как только попросишь.",
    faq_q3:"Что будет, если я откажусь от обслуживания?",
    faq_a3:"С сайтом ничего не случится. Просто продлевать домен с хостингом и вносить любые изменения ты будешь сам. Без обязательств и штрафов.",
    faq_q4:"Сколько это занимает?",
    faq_a4:"От 3 до 7 дней. Срок начинается, когда я получаю предоплату. Если каких-то материалов не хватает — когда всё собрано.",
    faq_q5:"А если мне не понравится дизайн?",
    faq_a5:"Перед публикацией я показываю черновик, и мы правим его вместе. Ничего не публикуется, пока тебя всё не устроит.",
    faq_q6:"Как происходит оплата?",
    faq_a6:"40 % при старте, остальное — при сдаче, через Bizum или банковский перевод. Цена фиксируется в смете и не меняется.",
    faq_q7:"Смогу ли я потом менять что-то сам?",
    faq_a7:"Если хочешь, объясню, как делать простые правки. А если предпочитаешь ничего не трогать — для этого есть обслуживание: пишешь мне в WhatsApp, и я меняю сам.",
    faq_q8:"Ты работаешь только в Жироне?",
    faq_a8:"Работаю по всей Испании удалённо: весь процесс идёт через WhatsApp. В районе Жироны можем встретиться и лично.",

    pricing_kicker:"Цены",
    pricing_title:"Прозрачные, без сюрпризов",
    pricing_sub:"Ты знаешь итоговую цену с первого дня. Выбери тариф под свой бизнес.",
    p1_name:"Базовый", p1_for:"Одна страница, готовая к публикации.",
    p1_f1:"Дизайн на 100% под тебя", p1_f2:"Адаптация под мобильные", p1_f3:"Форма обратной связи", p1_f4:"Прямая кнопка WhatsApp",
    p2_badge:"Популярный", p2_name:"Полный", p2_for:"Всё из Базового, плюс:",
    p2_f1:"Многоязычность (любые языки)", p2_f2:"Галерея или портфолио", p2_f3:"Базовое SEO для Google", p2_f4:"Встроенная карта Google",
    p3_name:"Премиум", p3_for:"Всё из Полного, плюс:",
    p3_f1:"Моушен-дизайн: кинематографичные анимации при прокрутке", p3_f2:"Дополнительные секции на заказ", p3_f3:"Полная SEO-оптимизация", p3_f4:"Приоритетная поддержка",
    plan_cta:"Хочу", plan_cta_2:"Хочу", plan_cta_3:"Хочу",
    pricing_note:"* Домен и хостинг оплачиваются отдельно (около 60–80 € в год) или входят в любой тариф обслуживания.",

    maint_cta:"Хочу обслуживание",
    maint_note:"Необязательно и без обязательств. Меняй тариф или отключайся когда захочешь.",
    mp1_name:"Base", mp1_price:"25 € / месяц", mp1_for:"Чтобы всё продолжало работать.",
    mp1_f1:"Домен и хостинг включены и продлеваются вовремя", mp1_f2:"SSL и резервные копии", mp1_f3:"Если что-то ломается — чиню я", mp1_f4:"Правки базовых данных: часы, телефон, адрес",
    mp2_name:"Activo", mp2_price:"60 € / месяц", mp2_for:"Твой сайт остаётся актуальным.",
    mp2_f1:"Всё из тарифа Base", mp2_f2:"Правки текстов и фото по мере необходимости", mp2_f3:"Ведение профиля в Google", mp2_f4:"Ответ в течение 24 часов",
    mp3_name:"Pro", mp3_price:"120 € / месяц", mp3_for:"Твой сайт растёт вместе с тобой.",
    mp3_f1:"Всё из тарифа Activo", mp3_f2:"Новые секции и сезонные кампании", mp3_f3:"Постоянная работа над SEO", mp3_f4:"Абсолютный приоритет",

    contact_kicker:"Контакт",
    contact_title:"Обсудим твой сайт?",
    contact_sub:"Расскажи свою идею — я отвечу со сметой без обязательств.",
    form_name_l:"Имя", form_business_l:"Бизнес", form_message_l:"Твой проект",
    consent_text:'Я прочитал(а) и принимаю <a href="legal.html" target="_blank">Политику конфиденциальности</a>.',
    submit_text:"Отправить в WhatsApp",

    footer_tag:"Разработка и дизайн сайтов для малого бизнеса.",
    footer_contact_t:"Контакт",
    footer_legal:"Правовая информация · Конфиденциальность · Cookies",

    /* --- Правовая страница --- */
    lg_back:"Вернуться на главную",
    lg_title:"Правовая информация и конфиденциальность",
    lg_updated:"Последнее обновление: июль 2026",
    lg_h1:"1. Владелец сайта",
    lg_p1:"В соответствии с законом Испании 34/2002 (LSSI-CE) сообщаем, что этот сайт принадлежит:",
    lg_owner:'<strong>Владелец:</strong> Ilia Oskolkov (Oskal Studio)',
    lg_activity:'<strong>Деятельность:</strong> разработка и дизайн сайтов',
    lg_email:'<strong>Эл. почта:</strong> <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>',
    lg_phone:'<strong>Телефон / WhatsApp:</strong> <a href="https://wa.me/34628806573" target="_blank" rel="noopener">+34 628 806 573</a>',
    lg_h2:"2. Назначение",
    lg_p2:"Этот сайт носит информационный характер и представляет услуги по разработке и дизайну сайтов, оказываемые владельцем. Доступ к сайту и его использование придают статус пользователя и означают принятие условий, изложенных в этой правовой информации.",
    lg_h3:"3. Политика конфиденциальности",
    lg_p3:"Мы уважаем твою приватность. Данные, которые ты передаёшь через форму или WhatsApp (имя, бизнес и сообщение), используются <strong>только</strong> для ответа на твой запрос и подготовки сметы.",
    lg_resp:'<strong>Ответственный:</strong> Ilia Oskolkov.',
    lg_purpose:'<strong>Цель:</strong> ответы на запросы и подготовка смет.',
    lg_legit:'<strong>Основание:</strong> твоё согласие при отправке формы.',
    lg_keep:'<strong>Хранение:</strong> данные хранятся столько, сколько нужно для обработки запроса.',
    lg_share:'<strong>Передача:</strong> данные не передаются третьим лицам, кроме случаев, предусмотренных законом.',
    lg_rights:'<strong>Права:</strong> ты можешь реализовать права на доступ, исправление, удаление и возражение, написав на <a href="mailto:iliaoskolkov2004@gmail.com">iliaoskolkov2004@gmail.com</a>.',
    lg_p3b:"Учти, что форма контакта открывает переписку в <strong>WhatsApp</strong>, обработка данных в котором регулируется политикой конфиденциальности Meta Platforms, Inc.",
    lg_h4:"4. Политика cookies",
    lg_p4:"Этот сайт <strong>не использует отслеживающие или рекламные cookies</strong>. Он может использовать только локальное хранилище браузера (localStorage), чтобы запомнить выбранный тобой язык — технические данные, которые не идентифицируют пользователя лично и которые можно удалить в браузере.",
    lg_h5:"5. Интеллектуальная собственность",
    lg_p5:"Контент, дизайн и код этого сайта принадлежат Ilia Oskolkov, кроме логотипов и изображений третьих лиц (например, проекта ALSISA), которые принадлежат их владельцам и показаны как портфолио с их ведома.",
    lg_h6:"6. Применимое право",
    lg_p6:"Эта правовая информация регулируется законодательством Испании. По любым спорам стороны обращаются в компетентные суды согласно закону.",

    /* --- Главная v2 (10.2026) --- */
    nav_work:"Работы",
    nav_faq:"Вопросы",
    trust_label:"Почему с нами удобно",
    tr1_v:"Напрямую",
    tr1_t:"Общение напрямую, без агентств",
    tr2_v:"3–7 дней",
    tr2_t:"От идеи до готового сайта",
    tr3_v:"На заказ",
    tr3_t:"Свой код, без шаблонов",
    tr4_v:"Цена фикс.",
    tr4_t:"Смета закрыта, без сюрпризов",
    work_kicker:"Работы",
    work_title:"Реальный сайт и примеры дизайна",
    work_sub:"Один реальный проект и два примера дизайна. Открой их — они работают как настоящие сайты.",
    tag_real:"Реальный проект",
    tag_demo:"Пример дизайна",
    w1_niche:"Строительство и ремонт · Жирона",
    w2_niche:"Салон красоты",
    w3_niche:"Итальянская траттория",
    w_plan_c:"Тариф «Полный» · 450 €",
    w_plan_p:"Тариф «Премиум» · 700 €",
    w_cta_web:"Открыть сайт",
    w_cta_demo:"Открыть демо",
    w1_alt:"Сайт ALSISA Construcciones",
    w2_alt:"Пример дизайна: салон красоты Nácar",
    w3_alt:"Пример дизайна: траттория Da Livia",
    w_open:"откроется в новой вкладке",
    op_kicker:"Отзывы",
    op_title:"Что говорят клиенты",
    how_kicker:"Как это работает",
    how_title:"Четыре шага, без сложностей",
    st1_t:"Пишешь мне в WhatsApp",
    st1_d:"Рассказываешь, что нужно, без обязательств.",
    st2_t:"Фиксированная смета",
    st2_d:"Итоговая цена письменно до начала работ.",
    st3_t:"Черновик на согласование",
    st3_d:"Смотришь, и мы правим вместе.",
    st4_t:"Сайт опубликован",
    st4_d:"За 3–7 дней, готов принимать клиентов.",
    ex_pl:"Примеры:",
    ex_one:"Пример:",
    rp_price:"Ремонт от 150 €",
    rp_d:"Проверим и приведём в порядок без переделки с нуля: телефон, скорость, тексты и WhatsApp.",
    mt_title:"Обслуживание после сдачи",

    ph_name:"Напр. María García", ph_business:"Напр. парикмахерская, ресторан...", ph_message:"Расскажи, что нужно...",
    alert_consent:"Пожалуйста, прими Политику конфиденциальности.",
    wa_hi:"Привет, Ilia! Хочу сайт для своего бизнеса."
  }
};

var WHATSAPP = "34628806573";
var currentLang = "es";

/* ---------- Aplicar idioma ---------- */
function changeLanguage(lang, initial){
  if(!I18N[lang]) return;
  currentLang = lang;
  var dict = I18N[lang];

  document.documentElement.lang = (lang === "ca") ? "ca" : lang;

  // Título y meta description por idioma (SEO)
  if(dict.seo_title) document.title = dict.seo_title;
  var metaDesc = document.querySelector('meta[name="description"]');
  if(metaDesc && dict.seo_desc) metaDesc.setAttribute("content", dict.seo_desc);

  // Al abrir en español no se reescribe nada: el HTML ya viene en español (menos trabajo al cargar)
  if(!(initial && lang === "es")) applyTexts(dict);

  // Bandera + etiqueta del selector
  var flags = { es:"images/es.png", ca:"images/cat.png", en:"images/en.png", ru:"images/ru.svg" };
  var labels = { es:"ESP", ca:"CAT", en:"ENG", ru:"RUS" };
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

function applyTexts(dict){
  // Texto por data-i18n (usa innerHTML solo si la cadena lleva etiquetas)
  document.querySelectorAll("[data-i18n]").forEach(function(el){
    var key = el.getAttribute("data-i18n");
    var val = dict[key];
    if(val == null) return;
    if(val.indexOf("<") > -1){ el.innerHTML = val; }
    else { el.textContent = val; }
  });

  // Textos alternativos de imágenes y etiquetas para lectores de pantalla
  document.querySelectorAll("[data-i18n-alt]").forEach(function(el){
    var v = dict[el.getAttribute("data-i18n-alt")];
    if(v != null) el.alt = v;
  });
  document.querySelectorAll("[data-i18n-label]").forEach(function(el){
    var v = dict[el.getAttribute("data-i18n-label")];
    if(v != null) el.setAttribute("aria-label", v);
  });

  // Placeholders
  setPlaceholder("input-name", dict.ph_name);
  setPlaceholder("input-business", dict.ph_business);
  setPlaceholder("input-message", dict.ph_message);
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
  }, { threshold:0, rootMargin:"0px 0px 15% 0px" }); // empieza un 15 % antes de llegar a la pantalla

  // Índice para el retardo escalonado dentro de cada contenedor
  document.querySelectorAll(".cards, .plans-main, .trust-list, .work-grid, .caps-row, .steps, .maint-plans").forEach(function(group){
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
    // El lienzo ocupa siempre toda la ventana (position:fixed; inset:0): se toma su tamaño de la
    // ventana y no de canvas.clientWidth, que obligaba a calcular toda la página de golpe.
    w = window.innerWidth  || 0;
    h = window.innerHeight || 0;
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

    if(!still) raf = requestAnimationFrame(frame);
  }

  // En pantallas táctiles la constelación se dibuja una vez y se queda quieta: el mismo dibujo,
  // sin trabajo continuo para el teléfono.
  var still = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function start(){
    if(still){ requestAnimationFrame(frame); return; }
    if(!running){ running = true; raf = requestAnimationFrame(frame); }
  }
  function stop(){ running = false; if(raf) cancelAnimationFrame(raf); raf = null; }

  // Eventos
  var resizeTimer, lastW = window.innerWidth;
  window.addEventListener("resize", function(){
    // en el móvil la barra de direcciones cambia solo el alto: no redibujar (los puntos «saltarían»)
    if(still && window.innerWidth === lastW) return;
    lastW = window.innerWidth;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){ resize(); if(still) start(); }, 200);
  });
  // Recalcular cuando todo (CSS/fuentes) ha cargado (en el móvil ya está dibujada: no se toca)
  if(!still) window.addEventListener("load", resize);
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

/* ---------- FAQ (acordeón: solo una respuesta abierta) ---------- */
function initFaq(){
  var items = document.querySelectorAll(".faq-item");
  if(!items.length) return;

  items.forEach(function(item){
    var btn = item.querySelector(".faq-q");
    if(!btn) return;
    btn.addEventListener("click", function(){
      var willOpen = !item.classList.contains("open");
      // Cerrar todas
      items.forEach(function(other){
        other.classList.remove("open");
        var b = other.querySelector(".faq-q");
        if(b) b.setAttribute("aria-expanded", "false");
      });
      // Abrir la elegida
      if(willOpen){
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
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
  // Un punto invisible a 24 px del inicio: cuando sale de la pantalla, la cabecera se vuelve sólida.
  // IntersectionObserver no obliga a calcular la página (leer scrollY al cargar sí lo hacía).
  if("IntersectionObserver" in window){
    var mark = document.createElement("div");
    mark.setAttribute("aria-hidden", "true");
    mark.style.cssText = "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none";
    document.body.prepend(mark);
    new IntersectionObserver(function(en){
      header.classList.toggle("scrolled", !en[0].isIntersecting);
    }).observe(mark);
    return;
  }
  var onScroll = function(){ header.classList.toggle("scrolled", window.scrollY > 24); };
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
  // Idioma por defecto: SIEMPRE español.
  // No hay detección automática por idioma del navegador (navigator.language):
  // solo se aplica ?lang= de la URL o la elección explícita previa del visitante.
  // Prioridad: ?lang= en la URL > elección guardada > español
  var urlLang = null;
  try { urlLang = new URLSearchParams(location.search).get("lang"); } catch(e){}
  var saved = null;
  try { saved = localStorage.getItem("ow_lang"); } catch(e){}
  changeLanguage((urlLang && I18N[urlLang]) ? urlLang : (saved && I18N[saved] ? saved : "es"), true);

  var yearEl = document.getElementById("year");
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // la constelación arranca después del primer pintado: no compite con el texto del hero
  requestAnimationFrame(function(){ setTimeout(initBackgroundArt, 0); });
  initReveal();
  initMagnetic();
  initDemos();
  initFaq();
  initLangDropdown();
  initMobileMenu();
  initHeaderScroll();
  initForm();
});
