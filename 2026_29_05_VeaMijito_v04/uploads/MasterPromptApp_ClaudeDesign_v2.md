# MasterPromptApp_ClaudeDesign

> **One-shot** para generar un sistema digital de **alta fidelidad funcional** (prototipo) enfocado en mujeres adultas mayores (50–70) y la ruta de emprendimiento senior (modelo Canvas, Fase 2/5).

---

## CHANGELOG (qué se refinó — no se eliminó ningún detalle)

- **(+) Nueva pantalla** “¿Cómo te llamas?” integrada en flujo y en referencias de pantalla (sección 7), con sus hex de marca.
- **(+) Sección nueva “Flujo / Arquitectura de navegación”**: mapa único y explícito del recorrido, ausente antes (clave para un one-shot completo).
- **(+) Requisito de personalización por nombre** conectado con la sección *Correcciones* (el nombre se usa en todo el sistema).
- **(+) Especificación de estados del campo de nombre** (botón inactivo + texto de ayuda persistente).
- **(✏️) WCAG renumerada A–T continua**: la lista original saltaba K/L y desordenaba M/N. Se conservó el contenido íntegro de cada regla; solo se corrigió la letra/orden.
- **(✏️) Typos corregidos** (p. ej. “n esta parte” → “En esta parte”).
- **(+) Sección “Pantallas a entregar”**: checklist del set mínimo del prototipo.
- **(⚠️) Notas de auditoría al final**: inconsistencias de fechas en nombres de archivo y adjuntos referenciados pero no incluidos. *No se modificaron los nombres de archivo* para no romper tu mapeo real; quedan listados para que los verifiques.
- **(+) Sección nueva “Módulos detallados (pantalla por pantalla)”**: integra el desglose de Módulo 1 (Experiencia), Módulo 2 (Definir idea) y Módulo 3 (Canvas) con su lógica de desbloqueo progresivo, antesalas, actividades de afianzamiento y pantallas de felicitación. *El “Flujo / Arquitectura” conserva un resumen; el detalle vive aquí.*
- **(+) Sección nueva “Funciones del sistema (transversales)”**: notas persistentes y editables, ajustes/perfil, tamaño de letra global con previsualización, recordatorio configurable, sección “Para ti” tipo TikTok, advertencias en acciones de riesgo y especificación de backend para reemplazar/añadir media con duración dinámica.
- **(+) Sección nueva “Archivo «Icon» (set de iconos disponible)”**: declara que ese archivo es la fuente de iconos a usar en todo el sistema.
- **(✏️) “Flujo / Arquitectura” actualizado**: el test ahora es **Módulo 1 (Experiencia)**; se intercala **Módulo 2 (Definir idea)** y el Canvas pasa a **Módulo 3**, con desbloqueo secuencial.
- **(✏️) “Pantallas a entregar” ampliado** con las pantallas nuevas (Conversemos, caso real, ajustes, “Para ti”, recordatorio, notas, felicitaciones).

> Borra este bloque y el de *Notas de auditoría* antes de usar el prompt si quieres una versión limpia para pegar.

---

## Rol

Eres un diseñador UX/UI Senior experto en el diseño centrado en el adulto mayor. Estás diseñando una propuesta de producto que se aleja del convencional diseño asistivo y se centra en la generación de productos y servicios que aprovechen los recursos y gustos que un adulto mayor contempla (gustos, motivaciones, experiencia y trayectoria de vida).

## Contexto

Estamos desarrollando un producto digital enfocado para adultos mayores de 50 a 70 años de edad. Se busca que ellos puedan acceder a la ruta de emprendimiento senior de manera fácil, directa y familiar (es decir, similar o consumible a través de los canales y formatos que usan con frecuencia, como WhatsApp o YouTube). La propuesta es un **Sistema** (interfaz que contiene videos y audios tipo podcast o audio de WhatsApp) que les permita centralizar la ruta de emprendimiento senior y que dentro de este se plantee el modelo Canvas. La idea de esta información es que puedan aterrizar su idea de negocio: que se muestre el paso a paso de la ruta de emprendimiento a profundidad, ejemplificando todo lo que se muestra en el contenido.

En el documento **“2026-09-05_NotasIA_PerfilUsuario_V01”** se exploran sus motivaciones, necesidades y relación con la tecnología. Úsalo por completo porque ahí mismo se define la edad y el lugar de residencia. En suma, se identifica que el adulto mayor debe tener un plan posterior al consumo de un video o texto que le permita afianzar el conocimiento, a través de la aplicación de lo aprendido en ejercicios o actividades prácticas.

**Problema a resolver:** actualmente, los canales digitales de acceso a la ruta de emprendimiento no están diseñados para mujeres mayores de 50 años, lo que genera confusión, desmotivación y abandono temprano del proceso.

## Objetivo

**Estructurar** una propuesta de sistema digital alineada con los requerimientos identificados que facilite el acceso a la ruta de emprendimiento.

La ruta de emprendimiento aún no está consolidada, pero la **Fase 2 de 5** se encarga únicamente de desarrollar un modelo de negocio Canvas. Vamos a usar en este prototipo esa navegación y ese ejemplo práctico para hacerlo usable y testeable con usuarios reales. **Solamente se utilizará una sección del modelo Canvas; las restantes se verán bloqueadas dentro de la interfaz y no se podrán acceder.**

## Documentación

Los archivos adjuntados se irán mencionando en las secciones donde se consideran útiles. Sin embargo, aplican a toda la instrucción: si ves una sección donde pueda ser útil otro archivo adjuntado, menciónalo y úsalo.

Todos los documentos y archivos adjuntados se verán **solo desde la dimensión funcional del diseño**: no entraremos a revisar color, estilo de fuente, ilustración, fotografía, etc. (a menos de que sean tamaños o condiciones recomendadas).

**Archivo de iconografía:** el archivo **“Icon”** es el set de iconos disponible para todo el sistema (ver sección *Archivo «Icon»*). Usa esos iconos como repertorio base.

---

## Flujo / Arquitectura de navegación  *(resumen del recorrido — el detalle por pantalla está en “Módulos detallados”)*

Orden confirmado del onboarding y entrada al sistema:

1. **Loader** (carga de marca).
2. **Bienvenida** (avatar tipo Duolingo que anticipa lo que el usuario logrará, en clave de emprendimiento).
3. **¿Cómo te llamas?** (captura del nombre — ver sección 7). *Va después de bienvenida y antes del home.*
4. **Home** (saludo personalizado “Hola, [Nombre]” + sección motivacional + acceso a módulos).
5. **Módulo 1 — Experiencia** (test de habilidades y trayectoria → resultado personalizado vía personaje guía → pantalla “Conversemos” tipo WhatsApp → caso real multiformato → felicitaciones).
6. **Módulo 2 — Definir idea** (*bloqueado hasta completar el Módulo 1*: resumen de respuestas previas → lección multiformato → actividad de afianzamiento con preguntas abiertas → “tu idea en resumen” → felicitaciones).
7. **Módulo 3 — Modelo de negocio Canvas** (*bloqueado hasta completar el Módulo 2*: preámbulo de los 9 bloques → **solo el primer bloque activo**, el resto bloqueado → descripción multiformato + notas → actividad de afianzamiento que actualiza la idea).
8. **Multiformato transversal**: en las secciones informativas, el usuario elige Video / Texto / Podcast (audio). *No aparece en pantallas de apertura ni de resumen.*
9. **Barra de navegación inferior**: incluye **Notas**, **Recordatorio**, **Para ti** y acceso a módulos (ver “Funciones del sistema”).
10. **Notificaciones** (recordatorio diario tipo Duolingo, con refuerzo de recompensa por estrellas) + **botón de Ajustes/Perfil** al lado de notificaciones.

**Desbloqueo progresivo (requisito):** el Módulo 1 inicia habilitado; los Módulos 2 y 3 están bloqueados y se desbloquean **al completar el módulo anterior**. No se repite el trabajo ya hecho: cada módulo parte de lo que la usuaria desarrolló en el anterior.

**Personalización por nombre (requisito):** el nombre capturado en el paso 3 se usa en **todo el sistema** — saludo del home, introducción de módulos y resumen final del test.

---

## Módulos detallados (pantalla por pantalla)  *(sección nueva — detalle del PDF de especificación)*

**Regla común a los 3 módulos:** al entrar a cualquier módulo, antes de empezar se muestra una **antesala** que describe qué se va a realizar o ver durante todo el módulo; en esa pantalla está el botón **“Empezar”** (o equivalente). Y al final de **cada** módulo se muestra una **pantalla de felicitaciones** a la usuaria, con la **cantidad de estrellas** ganadas y la opción de **volver al inicio** o **continuar al siguiente módulo**.

### Módulo 1 — Experiencia *(habilitado desde el inicio)*

1. **Antesala**: descripción del módulo + botón Empezar.
2. **Test por tarjetas** (trayectoria y habilidades). Visual tipo *card test*. **Debe ser verdaderamente funcional**: las respuestas elegidas generan una respuesta **personalizada y real** (no genérica). Ver sección *Correcciones*.
3. **Resultado vía personaje guía**: el personaje comenta los resultados y menciona **qué puede lograr** la usuaria con las habilidades halladas.
4. **Pantalla “Conversemos”**: toma el resultado anterior en **formato conversacional tipo WhatsApp**. Profundiza en las habilidades y a quién puede dirigirlas; busca determinar el **nivel de experiencia** en cada habilidad. Los **inputs de la usuaria están predefinidos**: al hacer clic se ve como si **enviara un mensaje**, replicando la interfaz de WhatsApp.
5. **Resumen breve** de lo conversado.
6. **Caso real**: pantalla con un caso de **mujer emprendedora**, disponible en los **tres formatos** (texto corto, video, audio).
7. **Felicitaciones** (estrellas + volver al inicio / continuar al Módulo 2).

### Módulo 2 — Definir idea *(bloqueado hasta completar el Módulo 1)*

1. **Antesala**: descripción del módulo + botón Empezar.
2. **Resumen de respuestas del Módulo 1**. *Es información que la usuaria ya desarrolló, no respuestas aleatorias: el sistema debe preservar sus respuestas.*
3. **Pantalla informativa**: lección **¿Cómo definir la idea de negocio?** en multiformato (video + texto + audio). Incluye opción de **tomar nota**.
4. **Actividad de afianzamiento**: el personaje dice “vamos a poner tu idea en palabras”. Botón **“Revisar notas”** que aclara que las notas tomadas del material anterior se pueden revisar aquí sin salir de la sección. En todo momento hay opción de **Volver** por si desea corregir algo.
   - Preguntas **abiertas**: **¿Qué ofreces?** (abierta) · **¿A quién le servirá?** (abierta) · **¿Cómo lo entregarías?** (abierta).
5. **“Tu idea en resumen”** (tras enviar): `Ofrezco… [respuesta] a… [respuesta] entregándolo… [respuesta]`.
6. **Felicitaciones** (volver al menú / continuar al Módulo 3).

> **Notas en este módulo:** cada actividad de afianzamiento deja espacio para escribir; lo escrito se guarda **directo en la sección de Notas** (barra inferior), organizado por módulo, editable y con guardar cambios. Si la usuaria escribe una nota, avanza y debe regresar a redactar otra cosa, **lo escrito queda guardado**.

### Módulo 3 — Modelo de negocio Canvas *(bloqueado hasta completar el Módulo 2)*

1. **Antesala/preámbulo**: qué se va a hacer y de qué trata la sección + botón **Comenzar**. Aquí (o en otra pantalla) se aclara **por qué son 9 bloques** (los del modelo Canvas): no es para abrumarse, sino que se desarrollarán **poco a poco**. Esto lo puede anunciar el **personaje guía**.
2. **Despliegue de los 9 bloques**: se muestran todos; **solo uno está activo** (prioriza que sea **el primero**), el resto **deshabilitados**.
3. **Bloque activo**: al acceder, **descripción del bloque** en los **tres formatos** + sección abierta de **Notas**.
4. **Actividad de afianzamiento**: breve actividad que afiance lo aprendido y permita **desarrollar la idea de negocio** trabajada en los dos módulos previos, ahora con los **nuevos conceptos**. Avisar que esta información, si quiere corregirse, queda guardada en Notas (p. ej. **“Actualiza tu idea según lo que has aprendido”**).
5. **Felicitaciones** (estrellas + volver al inicio).

---

## Funciones del sistema (transversales)  *(sección nueva — todas son requisitos del prototipo)*

### Persistencia y progreso
- La **información y el progreso** deben quedar **guardados en cada módulo**.
- El sistema debe **preservar las respuestas** de la usuaria entre pantallas y módulos (si avanza y vuelve, no se pierde lo escrito).

### Notas (barra de navegación inferior)
- Las notas **aparecen en cada sección** que tenga audio, video o texto: la usuaria puede poner sus **propias notas**.
- Esas notas se guardan en la **sección de Notas** y también dentro del **progreso del módulo** correspondiente.
- La sección de Notas **organiza las notas por módulo**, está en **constante actualización** y permite **editar y guardar cambios**.
- **Anuncio recurrente:** donde haya sección de notas, o la usuaria deba escribir, o se genere un dato importante, indicar que esa información quedará guardada en Notas y podrá corregirse (p. ej. “Actualiza tu idea según lo que has aprendido”).

### Elección de formato (multiformato)
- El selector **Video / Texto / Podcast** está **únicamente** en las **secciones informativas** (lecciones o contenido nuevo).
- **No** aparece en pantallas de **apertura/antesala** ni de **resumen**.

### Recordatorio (barra de navegación inferior)
- **Reloj libre**: permite programar la hora en **horas y minutos**, y **mañana/tarde**.
- Botón de **previsualización** de cómo se vería la notificación.

### Advertencias de acción riesgosa (todo el sistema)
- Cargar advertencia ante acciones que puedan **perjudicar** a la usuaria: apagar el recordatorio, **eliminar una nota**, **eliminar la alarma**, etc., para que pueda **retractarse** si se equivocó.
- **Únicamente** cuando la acción pueda perjudicar (no en acciones inocuas). Concordante con WCAG **(K)**.

### Ajustes / Perfil (botón al lado de Notificaciones)
La pantalla de configuración debe mostrar:
- **Nombre** elegido por la usuaria al inicio: **editable**, y afecta a **cómo es llamada** en todo el sistema.
- **Tamaño de letra** (pequeño / mediano / grande): afecta a **todo el sistema**; la tipografía se **actualiza en todos los módulos y secciones**. Debe tener **previsualización antes de confirmar**: la usuaria elige el tamaño, da “Confirmar” y el sistema responde a esa decisión cambiando la tipografía globalmente.
- **Privacidad y datos**: abre una pantalla que trata el tema.
- **Ayuda y soporte**: menciona que puede contactar a un **asesor real** (recalcar que es un **humano** que la va a ayudar) con **icono/botón de WhatsApp** que redirige a la usuaria.
- **Eliminar datos**: **reinicia todo el prototipo** (nombre, datos, progreso) — vuelve al estado de primer ingreso. **Si nunca se pulsa, los datos se conservan** aunque se refresque o se salga del prototipo.

### Sección “Para ti” (barra de navegación inferior)
- Formato **tipo TikTok**: serie de **cards** con **imagen grande** del caso y, en la parte inferior, las **especificaciones** (duración, nombre, etc.).

### Backend de contenido multimedia (requisito técnico)
- En el código/backend debe existir la opción de **reemplazar o añadir** imagen, video o audio según el formato.
- Dejar **boxes** que permitan **agregar libremente** el material necesario desde el código.
- Si se agrega un **video**, la **barra de duración** y la **duración estimada** mostrada en la card deben **actualizarse según los datos del video** adjuntado. Aplica también a archivos **mp3/audio**.

---

## Restricciones

Prioriza **funcionalidad, arquitectura de la información y flujo** por encima de la estética. Vamos a priorizar la experiencia y la accesibilidad del sistema.

Ten en cuenta las normas **WCAG 2.2 (2022)**, las más actuales y pertinentes para adultos mayores.

### Normas críticas de interfaz para adultos mayores *(renumeradas A–T; contenido íntegro)*

- **(A) Texto legible sin esfuerzo.** Tamaño base mínimo 16 px, ideal 18 px; tipografía sans serif clara; interlineado amplio; nunca fuentes delgadas, condensadas o decorativas. Si el texto no escala bien, la interfaz no cumple.
- **(B) Contraste alto y medible.** Texto normal mínimo 4.5:1; texto grande mínimo 3:1; iconos, bordes y estados esenciales también con contraste suficiente. Si depende del color para entenderse, falla.
- **(C) Ninguna acción importante depende solo del color.** Estados, alertas, errores, éxito y selección deben tener color + texto + icono o señal adicional. Si solo cambia el color, no es accesible.
- **(D) Botones y áreas táctiles grandes.** Mínimo recomendable 48 × 48 dp o equivalente; los objetivos cercanos deben estar separados. Si hay que “apuntar con precisión”, el diseño está mal.
- **(E) Sin gestos ocultos o complejos como única forma de operar.** Cualquier swipe, pinch, long press o gesto multitoque debe tener alternativa visible con botón o menú. Si no existe alternativa, falla.
- **(F) Navegación consistente en todas las pantallas.** Ubicación, orden, nombres y comportamiento de botones, menús y controles deben mantenerse. Si cambian de lugar o nombre, se pierde la orientación.
- **(G) Estructura simple y predecible.** Menos niveles de profundidad, menos pantallas, menos decisiones por paso. Si el flujo obliga a memorizar rutas, la experiencia es mala.
- **(H) Una sola intención principal por pantalla.** Un paso = una tarea. Si una pantalla mezcla demasiadas acciones, reduce comprensión, aumenta errores y eleva carga cognitiva.
- **(I) Lenguaje directo, corto y literal.** Nada de jerga técnica, metáforas ambiguas o microcopys confusos. Cada instrucción dice exactamente qué pasa y qué debe hacer el usuario.
- **(J) Errores claros y con solución.** No bastan mensajes como “error” o “campo inválido”; debe indicar qué pasó, dónde y cómo solucionarlo. Si no ayuda a corregir, falla.
- **(K) Siempre se puede deshacer o confirmar una acción crítica.** Eliminar, pagar, enviar o cambiar datos sensibles requiere confirmación clara y opción de reversa cuando sea posible. Si no, la interfaz es riesgosa.
- **(L) Sin tiempos límite agresivos fuera del control del usuario.** Formularios, sesiones y procesos deben permitir extender, pausar o reanudar. Si expira rápido sin aviso ni recuperación, es mal diseño.
- **(M) Respeta los ajustes de accesibilidad del sistema.** Tamaño de letra, contraste, reducción de movimiento, lector de pantalla y escalado deben funcionar sin romper el layout.
- **(N) Todo contenido no textual tiene equivalente textual.** Iconos, imágenes funcionales y botones sin texto deben tener etiqueta accesible. Si un lector de pantalla no lo interpreta, falla.
- **(O) Campos de formulario perfectamente etiquetados.** Cada campo necesita nombre visible, ayuda si aplica, estado de error y propósito claro. Si hay que adivinar, no es apto para mayores.
- **(P) Formularios que minimizan memoria y escritura.** Autocompletado, valores por defecto, validación en línea, ejemplos visibles y autoguardado cuando sea posible.
- **(Q) Foco visual y lectura asistida en secuencia lógica.** El orden de tabulación, la lectura por lector de pantalla y el recorrido visual deben coincidir con la lógica de la pantalla.
- **(R) No ocultar información clave tras iconos ambiguos.** Todo icono crítico lleva texto o etiqueta. Si el usuario debe interpretar símbolos poco evidentes, el diseño falla.
- **(S) Retroalimentación inmediata y visible ante cada acción.** Al tocar, guardar, cargar, enviar o borrar debe haber respuesta clara. Si la app “no muestra nada”, el usuario no sabe si funcionó.
- **(T) Tareas críticas con ruta corta y sin distracciones.** Pagos, citas, mensajes, salud, compras o trámites con el menor número de pasos posible.

### Regla de auditoría rápida

Si una interfaz para adultos mayores cumple esto, pasa la base mínima:

- Se lee sin esfuerzo.
- Se entiende sin memorizar.
- Se toca sin precisión extrema.
- Se navega sin sorpresas.
- Se corrige sin frustración.
- Se puede usar con lector de pantalla y ajustes del sistema.

---

## Referencias de pantalla

### 1. 2026-09-05_ImagenPantalla_WhatsApp_v01
En esta parte se debe tomar de referencia la **arquitectura y las pantallas** como tal. Es uno de los canales que más usan los adultos mayores. Se puede tomar como evidencia cada uno de los chats y la forma en que se presentan, para adecuarlo a pantallas donde haya un espacio tipo *forms* con pregunta y respuesta al estilo chat de WhatsApp. Los iconos también son fundamentales, porque ya hay algunos reconocidos por la frecuencia de uso: la cámara, el contador de mensajes recibidos, el micrófono de audio, entre otros. *Aplica directamente a la pantalla “Conversemos” del Módulo 1.*

### 2. 2026-09-05_ImagenPantalla_DuolingoNotificacion_v01
La notificación preserva la identidad de marca de la aplicación. La idea es que sea muy amigable y le recuerde al usuario que debe hacer su lección de hoy; si no, se le quitan estrellas que tiene como recompensa.

### 3. 2026-09-05_ImagenPantalla_Duolingo_v01 y v02
En el primer módulo necesitamos un **test de habilidades**. Según la diagramación de Duolingo, se presentan opciones en *box* con su icono. El test puede ser solo texto o texto con icono, pero la idea es que se presente en grande y se entienda qué se pregunta y qué va a responder el usuario. Al confirmar, el usuario debe ver una pantalla que le confirme que lo hizo bien. Esta pantalla será la bienvenida a la aplicación después del loader: el pajarito (avatar) le dice al usuario todo lo que va a lograr con la aplicación. En nuestro caso será igual, pero relacionado con el emprendimiento.

### 4. 2026-09-05_ImagenPantalla_DomestikaMenu_v01
Tomar de referencia el **flujo de navegación** y la distribución de la información. Empiezan con una pantalla simple (“creativos”, el nombre del curso o de lo que van a ver) y, a medida que se profundiza, se muestra el temario o los tópicos de las sesiones.

En el **home** habrá una sección motivacional, en estilo novedad/noticias: testimonios y material de emprendimientos que prosperaron o casos de éxito, dentro de los formatos establecidos, con opción de elegir audio, texto corto o video; pequeños fragmentos motivacionales.

### 5. 2026-09-05_ImagenPantalla_AudioGuia_v01
La pantalla principal será el **home**, con la información dispuesta por módulos (en la referencia es un curso de inglés; en el nuestro serán lecciones o una ruta para entender a profundidad el emprendimiento senior y cómo dar el primer paso). Hay una presentación de un audiobook que, en nuestro caso, no sería audiobook sino un **audio dentro de un módulo como formato elegible**; los audios deben ser similares a los podcast o audios de WhatsApp. Diseño similar al de **“2026-29-05_ImagenPantalla_AudiosFormato_v01”**.

### 6. 2026-29-05_ImagenSistema_PaletaColor_v01
Se presenta la **paleta de color** del proyecto con códigos hexadecimales. Es crucial usar **exactamente** esos colores porque representan la identidad de marca. En las imágenes de referencia visual se muestra cómo deben quedar las secciones (es una aproximación): si alguna característica debe modificarse por las reglas de diseño para el adulto mayor, hazlo — **prioriza la usabilidad sobre la estética.**

### 7. 2026-05-29_ImagenPantalla_NombreUsuario_v01  *(NUEVA)*
**Función:** captura del nombre del usuario para personalizar la experiencia. Va **después de la bienvenida y antes del home**.

**Composición observada (referencia):**
- Avatar circular naranja con icono de carita amable, centrado.
- Título grande “**¿Cómo te llamas?**” en naranja.
- Subtítulo “Queremos personalizar tu experiencia”.
- Campo de texto: “Escribe tu nombre”.
- Botón primario “**Continuar**”.

**Comportamiento funcional (requisito):**
- El campo de nombre tiene **etiqueta accesible** (no solo placeholder) y propósito claro (WCAG O/N).
- El botón **“Continuar” permanece inactivo hasta que se escribe al menos un carácter**. El estado inactivo debe ser **perceptible por contraste + texto**, no solo por color (WCAG C).
- **Texto de ayuda persistente** bajo el campo: “Escribe tu nombre para continuar”, para que el usuario entienda por qué el botón aún no responde (WCAG S — retroalimentación; evita el bloqueo silencioso).
- Al continuar, el nombre queda disponible para **todo el sistema** (home, módulos, resumen del test).

**Hex extraídos de esta pantalla (verificar contra paleta oficial):**
- Fondo: `#F2E1C7`
- Naranja (avatar/título): `#D37E3B`
- Azul/botón primario: `#465568`
- Tipografía de marca: **Manrope**

> Contraste a comprobar: el texto del botón (claro sobre `#465568`) y el título naranja sobre fondo crema deben medir ≥ 4.5:1 (texto normal) o ≥ 3:1 (texto grande). Si no llega, oscurecer el naranja del **texto** (no necesariamente el del avatar).

---

## Archivo «Icon» (set de iconos disponible)  *(sección nueva)*

El archivo **“Icon”** es el **repertorio de iconos** que puedes utilizar en todo el sistema. Trátalo como la **biblioteca oficial de iconografía** del prototipo:

- **Usa esos iconos** para acciones, estados, navegación y refuerzo visual (cámara, micrófono/audio, mensajes, estrellas/recompensa, notas, recordatorio, ajustes, WhatsApp/soporte, formatos video/texto/audio, etc.).
- Mantén **coherencia**: el mismo concepto usa siempre el mismo icono en todas las pantallas (WCAG **F**).
- Todo icono crítico debe ir **acompañado de texto o etiqueta accesible**; no dependas solo del símbolo (WCAG **N/R**).
- Si una función necesaria no tiene icono en el archivo “Icon”, **indícalo** en tu plan de acción antes de construir, en lugar de inventarlo de forma inconsistente.

> El archivo “Icon” debe **viajar adjunto** junto a este prompt para que el one-shot funcione (ver Notas de auditoría).

---

## Preferencias

En los archivos **2026-09-05_ImagenPantalla_AudioGuia** y **2026-09-05_ImagenPantalla_WhatsApp** están los flujos de navegación y pestañas más familiares para los adultos mayores (apps y plataformas que más usan y conocen). Lo ideal es que les resulte familiar.

Acoger la función **multiformato**: el adulto mayor selecciona cómo quiere la información. Formatos: **Video, Texto y Podcast**.

## Formato de salida

El formato de salida es un **prototipo de alta funcionalidad**: “alta” no como versión estética final, sino como el acercamiento más aproximado a lo que el usuario necesita funcionalmente. Revisaremos interacciones, secciones, flujo y experiencia. **Antes de construir el prototipo, genera una respuesta donde anuncies tu plan de acción y tus decisiones de diseño; después, diseña el prototipo.**

## Requisitos

1. Priorizar lo **funcional** sobre lo estético: importa más la experiencia y el flujo de navegación que cómo se verá.
2. Basarse en los principios de **diseño UI**, las **heurísticas de Nielsen** y las pautas de **accesibilidad WCAG**.
3. **Jerarquizar, diagramar y organizar** el contenido para que un adulto mayor de 50+ lo entienda sin caer en el extremo del minimalismo, pero dispuesto de tal forma que se entienda **sin ayuda de un tercero**; la experiencia final debe ser agradable.
4. **Personalización real por nombre:** el nombre capturado se refleja en saludo del home, intro de módulos y resumen del test.
5. **Desbloqueo progresivo de módulos:** M1 habilitado; M2 y M3 se desbloquean al completar el módulo previo, sin repetir el trabajo ya hecho.
6. **Persistencia real:** respuestas, notas y progreso se guardan por módulo y se conservan al avanzar/volver; solo se borran con “Eliminar datos”.
7. **Test funcional real:** las respuestas del test del Módulo 1 producen un resultado personalizado y verdadero (ver *Correcciones*).
8. **Notas globales:** presentes en cada sección con audio/video/texto, editables y centralizadas en la pestaña de Notas, organizadas por módulo.
9. **Ajustes con efecto global:** tamaño de letra y nombre se aplican a todo el sistema, con previsualización antes de confirmar.
10. **Advertencias en acciones de riesgo** (eliminar nota/alarma, apagar recordatorio) con opción de retractarse.
11. **Backend de media:** boxes para reemplazar/añadir imagen, video o audio; la duración mostrada (barra y card) se actualiza según el archivo adjuntado (video y mp3).

## Pantallas a entregar *(checklist del set mínimo — ampliado)*

- [ ] Loader
- [ ] Bienvenida (avatar)
- [ ] **¿Cómo te llamas?** (con estados del botón)
- [ ] Home (saludo personalizado + sección motivacional multiformato)
- [ ] Antesala de módulo (plantilla reutilizable “descripción + Empezar”)
- [ ] **Módulo 1** — Test de habilidades (preguntas tipo *box*)
- [ ] **Módulo 1** — Resultado vía personaje guía
- [ ] **Módulo 1** — “Conversemos” (chat tipo WhatsApp, inputs predefinidos)
- [ ] **Módulo 1** — Resumen breve
- [ ] **Módulo 1** — Caso real (mujer emprendedora, 3 formatos)
- [ ] **Módulo 2** — Resumen de respuestas del M1
- [ ] **Módulo 2** — Lección “¿Cómo definir la idea?” (multiformato)
- [ ] **Módulo 2** — Actividad de afianzamiento (3 preguntas abiertas + revisar notas)
- [ ] **Módulo 2** — “Tu idea en resumen”
- [ ] **Módulo 3** — Preámbulo de los 9 bloques
- [ ] **Módulo 3** — Vista de los 9 bloques (solo el 1.º activo; resto bloqueado)
- [ ] **Módulo 3** — Bloque activo (descripción multiformato + notas)
- [ ] **Módulo 3** — Actividad de afianzamiento (“actualiza tu idea”)
- [ ] Pantalla de **felicitaciones** (estrellas + volver/continuar) — reutilizable en los 3 módulos
- [ ] Reproductor/selector multiformato (Video / Texto / Podcast)
- [ ] Pestaña **Notas** (organizada por módulo, editable)
- [ ] Pestaña **Recordatorio** (hora/minutos, mañana/tarde, previsualización)
- [ ] Pestaña **“Para ti”** (cards tipo TikTok)
- [ ] Pantalla **Ajustes/Perfil** (nombre editable, tamaño de letra con previsualización, privacidad, ayuda/soporte WhatsApp, eliminar datos)
- [ ] Notificación tipo Duolingo
- [ ] Estados de **advertencia** en acciones de riesgo

## Razonamiento

Detalla cada paso y cada decisión de diseño que consideres necesaria; justifícala y especifica por qué debe ser así. Esto **antes** de desarrollar el prototipo funcional dirigido al usuario final.

## Correcciones

En ocasiones anteriores desarrollaste un sistema de selección de habilidades y un resumen final de cuál era la habilidad y la propuesta de valor del usuario. El test hacía las preguntas y el resumen hablaba de esas elecciones, **pero no eran realmente funcionales**. **NECESITO** que ese sistema sea realmente funcional: que las respuestas dentro del test generen una **respuesta personalizada y verdadera** en el resumen final (y que use el nombre capturado).

## Estilo visual

Usa los **códigos exactos** de la paleta descrita en las imágenes. La fuente para mantener la identidad de marca es **“Manrope”**.

**TOMA FUERTEMENTE DE REFERENCIA** la pantalla **2026-29-05_ImagenPantalla_EstiloVisual_v01**, dado que es la propuesta de diseño de pantallas más fuerte que tenemos.

---

## ⚠️ Notas de auditoría — verificar antes de usar (no son parte del prompt)

1. **Fechas inconsistentes en nombres de archivo.** Conviven `2026-09-05`, `2026-0905` y `2026-29-05`. `29-05` no encaja con el formato `AAAA-MM-DD` del resto. *No los cambié* para no romper tu mapeo a archivos reales; verifica y unifica.
2. **Adjuntos referenciados pero no incluidos en esta sesión.** El prompt cita: `NotasIA_PerfilUsuario_V01`, las imágenes de WhatsApp, Duolingo (notif/v01/v02), Domestika, AudioGuia, AudiosFormato, **PaletaColor**, **EstiloVisual** y el archivo **«Icon»**. Para que el one-shot funcione, **deben viajar adjuntos junto al prompt**.
3. **Paleta oficial.** Los hex de la sección 7 los extraje de la imagen del nombre, no del archivo `PaletaColor`. Si difieren, manda la paleta oficial.
4. **Formatos del Módulo 2.** El PDF de especificación dice que la lección “¿Cómo definir la idea?” va en “video y sus otros dos formatos (texto y video)”: parece un typo y debería ser **texto y audio (podcast)** para ser coherente con el multiformato del resto. Lo dejé como **video + texto + audio**; corrige si tu intención era otra.
5. **Archivo «Icon».** No venía adjunto en esta sesión. La sección lo declara como set de iconos; confirma su formato (SVG/PNG/biblioteca) y que viaje con el prompt.
