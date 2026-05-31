/* =========================================================================
   CONTENIDO DEL SISTEMA  ·  Vea, mijito
   --------------------------------------------------------------------------
   BACKEND / CAJAS DE MEDIA REEMPLAZABLES
   Cada bloque de contenido informativo tiene { video, audio } con:
     - src: ""   -> dejar vacío usa el placeholder rayado + duración estimada.
                    Pega aquí la URL/ruta del archivo (mp4 / mp3) para activarlo.
     - estLabel: duración estimada que se muestra mientras no hay archivo.
   Si se agrega un archivo real, el reproductor LEE la duración del archivo
   (loadedmetadata) y actualiza la barra y la etiqueta automáticamente.
   ========================================================================= */

// Por defecto dejamos las rutas vacías. Reemplaza cada `src` por la ruta
// del .mp4 / .mp3 correspondiente a ese contenido (ver comentarios abajo).
const MEDIA_DEFAULT = (estLabel) => ({
  video:{ src:"Media/M3_Video", estLabel },   // BACKEND: pega aquí la ruta .mp4 si quieres activar el video
  audio:{ src:"Media/M3_Audio", estLabel },   // BACKEND: pega aquí la ruta .mp3 si quieres activar el audio
});

/* ---------- MÓDULO 1 · Test de experiencia (FUNCIONAL y REAL) ----------
   Cada respuesta guarda un valor que arma el resumen personalizado.        */
const TEST = [
  {
    id:"skill",
    q:"¿En qué se te va el tiempo sin darte cuenta?", 
    help:"Elige lo que más disfrutas hacer. Esa suele ser tu mayor fortaleza.",
    options:[
      { id:"cocina",  icon:"home",   label:"Cocinar y hornear",        noun:"comida casera y postres", verb:"cocinas", opp:"vender comida casera, almuerzos o postres por encargo" },
      { id:"tejido",  icon:"tijeras",  label:"Tejer, coser o manualidades", noun:"prendas y manualidades hechas a mano", verb:"tejes y creas a mano", opp:"vender prendas tejidas o dar talleres de manualidades" },
      { id:"cuidar",  icon:"userheart",  label:"Cuidar y aconsejar a otros", noun:"acompañamiento y buenos consejos", verb:"cuidas y aconsejas", opp:"ofrecer acompañamiento, cuidado o asesoría personal" },
      { id:"vender",  icon:"bag",    label:"Vender y hacer negocios",   noun:"productos bien vendidos", verb:"vendes y negocias", opp:"montar un negocio de reventa o catálogo" },
      { id:"enseñar", icon:"book",   label:"Enseñar lo que sé",         noun:"clases y enseñanza", verb:"enseñas", opp:"dar clases o talleres de lo que dominas" },
      { id:"jardin",  icon:"plant",    label:"Plantas, jardín y huerta",  noun:"plantas y productos de la huerta", verb:"cultivas", opp:"vender plantas, semilleros o productos de la huerta" },
    ],
  },
  {
    id:"audience",
    q:"¿A quién disfrutas más ayudar?",
    help:"Piensa en las personas con las que te sientes a gusto.",
    options:[
      { id:"familia",   icon:"family",   label:"Mi familia y vecinos",    who:"tus vecinos y tu familia" },
      { id:"jovenes",   icon:"user",    label:"Los más jóvenes",         who:"las personas jóvenes" },
      { id:"mujeres",   icon:"women",   label:"Otras mujeres como yo",   who:"otras mujeres adultas" },
      { id:"comunidad", icon:"building", label:"Mi comunidad o barrio",   who:"la gente de tu comunidad" },
    ],
  },
  {
    id:"years",
    q:"¿Hace cuánto haces eso que tanto te gusta?",
    help:"No hay respuestas equivocadas: tu experiencia es tu valor.",
    options:[
      { id:"vida",   icon:"star",     label:"Toda la vida",   when:"toda la vida" },
      { id:"muchos", icon:"starline", label:"Muchos años",    when:"muchos años" },
      { id:"pocos",  icon:"clock",    label:"Algunos años",   when:"algunos años" },
    ],
  },
  {
    id:"channel",
    q:"¿Cómo te gustaría compartir lo que sabes?",
    help:"Elige el medio con el que te sientas más cómoda.",
    options:[
      { id:"persona",  icon:"people",    label:"En persona, cara a cara", how:"en persona, cerca de tu casa" },
      { id:"whatsapp", icon:"whatsapp", label:"Por WhatsApp",            how:"por WhatsApp con tus contactos" },
      { id:"redes",    icon:"video",    label:"Por internet y redes",    how:"por internet y redes sociales" },
    ],
  },
];

/* ---------- MÓDULO 1 · "Conversemos" (chat tipo WhatsApp, inputs fijos) ---------- */
const CHAT_FLOW = [
  {
    bot:"Cuéntame, ¿qué tan segura te sientes haciendo eso que elegiste?",
    options:[
      { id:"experta",  text:"Me siento toda una experta",       level:"avanzado" },
      { id:"buena",    text:"Lo hago bien, con confianza",      level:"intermedio" },
      { id:"aprendo",  text:"Aún estoy aprendiendo",            level:"inicial" },
    ],
  },
  {
    bot:"¡Me encanta! ¿Y cuánto tiempo podrías dedicarle a la semana?",
    options:[
      { id:"poco",  text:"Un par de horas",      time:"unas pocas horas a la semana" },
      { id:"medio", text:"Algunas tardes",        time:"algunas tardes a la semana" },
      { id:"mucho", text:"Casi todos los días",   time:"casi todos los días" },
    ],
  },
  {
    bot:"Perfecto. Última pregunta: ¿qué te gustaría lograr primero?",
    options:[
      { id:"ingreso", text:"Ganar un dinerito extra",   goal:"generar un ingreso extra" },
      { id:"compartir", text:"Compartir lo que sé",     goal:"compartir tu conocimiento" },
      { id:"ocupada", text:"Mantenerme activa",          goal:"mantenerte activa y útil" },
    ],
  },
];

/* ---------- MÓDULO 1 · Caso real (mujer emprendedora) multiformato ---------- */
const CASO_M1 = {
  nombre:"Doña Carmen Restrepo",
  lugar:"Barrio Kennedy, Bogotá · 63 años",
  titulo:"De su cocina a 40 almuerzos diarios",
  texto:"Carmen empezó vendiendo almuerzos a sus vecinos por WhatsApp. Hoy, tres años después, prepara 40 almuerzos cada día con ayuda de su hija. \"Yo creía que a mi edad ya no iba a lograrlo —dice—, pero descubrí que mi sazón valía oro.\" Empezó con una sola olla y la receta de su mamá. Tú también puedes empezar con lo que ya sabes hacer.",
  // BACKEND: Reemplaza `video.src` con la ruta del .mp4 para el Caso Real del Módulo 1
  media: { video:{ src:"Media/M01_CasoReal.mp4", estLabel:"2 min" }, audio:{ src:"", estLabel:"2 min" } },
};

/* ---------- MÓDULO 2 · Lección multiformato ---------- */
const LESSON_M2 = {
  titulo:"¿Cómo definir tu idea de negocio?",
  texto:"Una buena idea de negocio responde tres preguntas sencillas: ¿Qué ofreces?, ¿A quién le sirve? y ¿Cómo se lo entregas?. No tiene que ser algo nuevo en el mundo, basta con que resuelva un problema real de personas que conoces. Empieza por lo que ya sabes hacer y por la gente que tienes cerca. Una idea clara cabe en una sola frase.",
  // BACKEND: Reemplaza `video.src` con la ruta del .mp4 para la Lección del Módulo 2
  media: { video:{ src:"Media/Error.png", estLabel:"3 min" }, audio:{ src:"Media/M2_Audio.mp3", estLabel:"3 min" } },
};

const QUESTIONS_M2 = [
  { id:"que",   icon:"bag",     q:"¿Qué ofreces?",        ph:"Ej: almuerzos caseros saludables", help:"Escribe en pocas palabras tu producto o servicio." },
  { id:"quien", icon:"user",    q:"¿A quién le servirá?", ph:"Ej: a trabajadores del barrio",     help:"Piensa en las personas que lo necesitan." },
  { id:"como",  icon:"hands",   q:"¿Cómo lo entregarías?",ph:"Ej: por encargo y domicilio",       help:"De qué forma llega tu idea a esas personas." },
];

/* ---------- MÓDULO 3 · Modelo Canvas (9 bloques; solo el 1.º activo) ---------- */
const CANVAS_BLOCKS = [
  { id:"valor",     n:1, icon:"idea",    title:"Propuesta de valor", sub:"¿Qué ofreces y por qué te eligen?", active:true },
  { id:"clientes",  n:2, icon:"user",    title:"Segmento de clientes", sub:"¿Para quién es?", active:false },
  { id:"canales",   n:3, icon:"send",    title:"Canales", sub:"¿Cómo llegas a ellos?", active:false },
  { id:"relacion",  n:4, icon:"heart",   title:"Relación con clientes", sub:"¿Cómo los cuidas?", active:false },
  { id:"ingresos",  n:5, icon:"star",    title:"Fuentes de ingreso", sub:"¿Cómo ganas dinero?", active:false },
  { id:"recursos",  n:6, icon:"grid",    title:"Recursos clave", sub:"¿Qué necesitas?", active:false },
  { id:"actividades",n:7,icon:"compass", title:"Actividades clave", sub:"¿Qué haces cada día?", active:false },
  { id:"aliados",   n:8, icon:"hands",   title:"Aliados clave", sub:"¿Quién te ayuda?", active:false },
  { id:"costos",    n:9, icon:"bag",     title:"Estructura de costos", sub:"¿En qué gastas?", active:false },
];

const CANVAS_LESSON = {
  titulo:"Propuesta de valor",
  texto:"Tu propuesta de valor es la razón por la que alguien te elige a ti y no a otra persona. Responde: ¿Qué problema resuelves y qué hace especial lo que ofreces? No es presumir: es ser clara. Por ejemplo: \"Yo ofrezco comida casera con sazón de antaño, hecha el mismo día\". Eso que para ti es normal, para otros es justo lo que buscan.",
  // BACKEND: Reemplaza `video.src` con la ruta del .mp4 para la Lección Canvas (Módulo 3)
  media: { video:{ src:"Media/M3_Canvas.mp4", estLabel:"2 min" }, audio:{ src:"Media/M3_Canvas.mp3", estLabel:"2 min" } },
};

/* ---------- "Para ti" · cards tipo TikTok ---------- */
const PARA_TI = [
  { id:"p1", nombre:"Rosa Mejía", edad:"58 años", lugar:"Medellín", formato:"Video", dur:"1:40", icon:"video",
    titulo:"Empezó tejiendo para sus nietos", blurb:"Hoy vende 30 gorros al mes por WhatsApp.",
    // BACKEND: reemplaza esta ruta con la imagen de fondo para esta caja (Video)
    imageSrc:"Media/P_Video.png",
    media:{ video:{ src:"Media/P1_Rosa.mp4", estLabel:"1:40" }, audio:{ src:"", estLabel:"1:40" } } },
  { id:"p2", nombre:"Gloria Páez", edad:"66 años", lugar:"Bogotá", formato:"Audio", dur:"2:10", icon:"audio",
    titulo:"Sus tamales son los más pedidos", blurb:"Pasó de cocinar para la familia a tener clientes fijos.",
    // BACKEND: reemplaza esta ruta con la imagen de fondo para esta caja (Audio)
    imageSrc:"Media/P_Audio.png",
    media:{ video:{ src:"", estLabel:"2:10" }, audio:{ src:"Media/P2_Gloria.mp3", estLabel:"2:10" } } },
  { id:"p3", nombre:"Inés Ararat", edad:"61 años", lugar:"Cali", formato:"Texto", dur:"2 min", icon:"text",
    titulo:"De maestra jubilada a tutora", blurb:"Da clases de refuerzo a niños de su cuadra.",
    // BACKEND: reemplaza esta ruta con la imagen de fondo para esta caja (Texto)
    imageSrc:"Media/P_Texto.png",
    media:{ video:{ src:"", estLabel:"2 min" }, audio:{ src:"", estLabel:"2 min" } } },
];

/* ---------- Módulos (estructura del Home) ---------- */
const MODULES = [
  { id:"m1", n:1, title:"Tu experiencia", sub:"5 pasos · 12 min", icon:"compass",
    desc:"En este módulo vamos a descubrir juntas tus fortalezas y tu experiencia de vida. Harás un test corto, conversaremos sobre lo que sabes hacer y verás el caso real de una mujer como tú." },
  { id:"m2", n:2, title:"Define tu idea", sub:"4 pasos · 12 min", icon:"idea",
    desc:"Con lo que descubrimos de ti, vamos a poner tu idea de negocio en palabras claras. Aprenderás a definirla y la dejarás escrita en una sola frase." },
  { id:"m3", n:3, title:"Modelo Canvas", sub:"Fase 2 · 25 min", icon:"grid",
    desc:"Conocerás el modelo Canvas: una herramienta de 9 piezas para ordenar tu negocio. Empezaremos por la primera pieza, de a poquito, sin abrumarnos." },
];

{MODULES.map((module) => (
  <div key={module.id}>
    <h3>{module.title}</h3>
    
    {/* REVISAR Aquí aplicas el color solo a la parte de los pasos */}
    <p>
      <span style={{ color: '#FF5733', fontWeight: 'bold' }}>{module.steps}</span>
      <span> · {module.duration}</span>
    </p>
    
    <p>{module.desc}</p>
  </div>
))}


window.DATA = { TEST, CHAT_FLOW, CASO_M1, LESSON_M2, QUESTIONS_M2, CANVAS_BLOCKS, CANVAS_LESSON, PARA_TI, MODULES };
