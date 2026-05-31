/* ===== Componentes compartidos ===== */
const { useState, useEffect, useRef } = React;
const I = (name, props={}) => { const C = window.Ic[name]; return C? <C {...props}/> : null; };

/* ---------- Guía con Imagen única ---------- */
function Mascot({ size=96, pose="hi" }){
  return (
    <img 
      src="Media/Avatar.png" /* <- Reemplaza aquí con la ruta de tu imagen */
      alt="Guía Lucía" 
      width={size} 
      height={size}
      style={{ 
        objectFit: 'contain', /* Evita que la imagen se deforme si las proporciones cambian */
        display: 'block' 
      }} 
    />
  );
}

/* ---------- Status bar del teléfono ---------- */
function StatusBar({ dark=false }){
  const now = new Date();
  const t = now.getHours().toString().padStart(2,"0")+":"+now.getMinutes().toString().padStart(2,"0");
  const col = dark? "#fff" : "var(--ink)";
  return (
    <div className="statusbar" style={{color:col}}>
      <span>{t}</span>
      <span className="sb-icons">
        {I("signal",{size:16,color:col})}
        {I("wifi",{size:16,color:col})}
        {I("battery",{size:20,color:col})}
      </span>
    </div>
  );
}

/* ---------- Encabezado con botón Volver ---------- */
function SubHeader({ title, onBack, right }){
  return (
    <div className="row spread" style={{padding:"4px 4px 12px", gap:12}}>
      <button className="row gap8" onClick={onBack} aria-label="Volver"
        style={{background:"none",border:"none",color:"var(--blue)",fontWeight:800,fontSize:"1.02rem",padding:"8px 6px",minHeight:48}}>
        {I("back",{size:24})}<span>Volver</span>
      </button>
      {right || <span/>}
    </div>
  );
}

/* ---------- Barra de progreso etiquetada ---------- */
function Progress({ value, label }){
  return (
    <div>
      {label && <div className="row spread mb8"><span className="body" style={{fontWeight:700}}>{label}</span><span className="muted body">{value}%</span></div>}
      <div className="bar" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
        <i style={{width:value+"%"}}/>
      </div>
    </div>
  );
}

/* ---------- Bocadillo de la guía ---------- */
function GuideSays({ children, size=70 }){
  return (
    <div className="row gap12" style={{alignItems:"flex-start"}}>
      <div style={{flex:"0 0 auto"}}><Mascot size={size}/></div>
      <div className="bubble tip-left grow" style={{marginTop:6}}>{children}</div>
    </div>
  );
}

/* ---------- Reproductor multiformato (lee duración real si hay archivo) ---------- */
function MediaPlayer({ media, kind, onRequestFormatChange }){
  // kind: "video" | "audio"
  const cfg = media[kind] || {src:"",estLabel:"--"};
  const [dur,setDur] = useState(cfg.estLabel);
  const [cur,setCur] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [muted,setMuted] = useState(false);
  const ref = useRef(null);
  const hasFile = !!cfg.src;

  const fmt = (s)=>{ if(!isFinite(s)) return cfg.estLabel; const m=Math.floor(s/60); const ss=Math.floor(s%60); return m+":"+ss.toString().padStart(2,"0"); };

  useEffect(()=>{ setPlaying(false); setCur(0); setDur(cfg.estLabel); },[cfg.src, kind]);

  const onMeta = ()=>{ if(ref.current) setDur(fmt(ref.current.duration)); };
  const onTime = ()=>{ if(ref.current) setCur(ref.current.currentTime); };
  const toggle = ()=>{ const el=ref.current; if(!el) return; if(playing){ el.pause(); } else { el.play().catch(()=>{}); } setPlaying(!playing); };
  const toggleMute = ()=>{ const el = ref.current; if(!el) return; const next = !muted; el.muted = next; setMuted(next); };
  const skip = (seconds)=>{ const el = ref.current; if(!el || !el.duration) return; const next = Math.max(0, Math.min(el.duration, el.currentTime + seconds)); el.currentTime = next; setCur(next); };
  const pct = (hasFile && ref.current && ref.current.duration)? (cur/ref.current.duration*100) : (playing? 25:0);

// FUNCIÓN DE BÚSQUEDA (SEEKING) COMPATIBLE CON MOUSE Y TOQUES TÁCTILES
  const handleSeek = (e) => {
    const el = ref.current;
    if (!el || !el.duration) return;

    try {
      const rect = e.currentTarget.getBoundingClientRect();
      
      // Detecta si es un toque en celular o un clic de mouse
      let clientX = e.clientX;
      if (e.touches && e.touches[0]) {
        clientX = e.touches[0].clientX;
      } else if (e.changedTouches && e.changedTouches[0]) {
        clientX = e.changedTouches[0].clientX;
      }

      if (clientX === undefined) return;

      const clickX = clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      
      el.currentTime = percentage * el.duration;
      setCur(el.currentTime);
    } catch (err) {
      console.warn("No se pudo cambiar la posición del reproductor", err);
    }
  };

    // Mantener el estado de silencio sincronizado con el elemento media
    useEffect(()=>{
      try{ if(ref.current) ref.current.muted = muted; }catch(e){}
    },[muted]);

  // FUNCIÓN PARA PANTALLA COMPLETA
  const handleFullscreen = () => {
    const el = ref.current;
    if (!el) return;
    
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { /* Soporte para Safari en iOS/macOS */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  };

  if(kind==="audio"){
    // estilo nota de voz de WhatsApp
    return (
      <div className="card card-white shadow" style={{background:"#fff"}}>
        <div className="row gap12">
          <button className="mascot" icon= "audio" onClick={toggle} aria-label={playing?"Pausar audio":"Reproducir audio"}
            style={{width:54,height:54,borderRadius:"50%",border:"none",background:"var(--whatsapp)"}}>
            {I(playing?"pause":"play",{size:24,color:"#fff"})}
          </button>
          <div className="grow">
            {/* ONDAS DE AUDIO INTERACTIVAS: Se añade onClick y cursor pointer */}
            <div 
              onClick={handleSeek}
              style={{height:34,display:"flex",alignItems:"center",gap:3,cursor:"pointer"}} 
              aria-hidden="true"
            >
              {Array.from({length:34}).map((_,i)=>{
                const h = 6+Math.abs(Math.sin(i*0.9))*22;
                const on = (i/34*100) <= pct;
                return <span key={i} style={{flex:1,height:h,borderRadius:3,background:on?"var(--whatsapp)":"#cfe8d6"}}/>;
              })}
            </div>
            <div className="row spread mt8">
              <span className="muted" style={{fontSize:".88rem",fontWeight:700}}>{playing?fmt(cur):dur}</span>
              <span className="row gap6 muted" style={{fontSize:".88rem",fontWeight:700}}></span>
            </div>
          </div>
        </div>
        {hasFile && <audio ref={ref} src={cfg.src} onLoadedMetadata={onMeta} onTimeUpdate={onTime} onEnded={()=>setPlaying(false)} preload="metadata"/>}
      </div>
    );
  }

  // VIDEO
  return (
    <div className="card card-white shadow" style={{padding:0,overflow:"hidden"}}>
      <div className="media-ph" style={{aspectRatio:"16/9",width:"100%",position:"relative"}}>
        {hasFile
          ? <video ref={ref} src={cfg.src} style={{width:"100%",height:"100%",objectFit:"cover"}} onLoadedMetadata={onMeta} onTimeUpdate={onTime} onEnded={()=>setPlaying(false)} preload="metadata" playsInline />
          : (
            <div role="alert" className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',background:'#FFF8EE'}}>
              <div style={{fontWeight:800,color:'#B23A2E',fontSize:'1.02rem',marginBottom:8}}>Lo lamento, el vídeo no está disponible</div>
              <p className="muted" style={{textAlign:'center',maxWidth:360}}>Pero puedes revisar el contenido en las opciones de <b>Texto</b> o <b>Audio</b> en la parte superior.</p>
              <div className="row gap8 mt12">
                <button className="btn btn-soft" onClick={()=>{ if(onRequestFormatChange) onRequestFormatChange('texto'); }}>Ver texto</button>
                <button className="btn btn-soft" onClick={()=>{ if(onRequestFormatChange) onRequestFormatChange('audio'); }}>Escuchar audio</button>
              </div>
              {/* Imagen visual para el error: si existe, se puede colocar en Media/video_missing.svg */}
            </div>
          )}

        {/* Controles dentro del contenedor (estilo YouTube): sonido + pantalla completa */}
        <div style={{position:"absolute",right:12,bottom:12,display:"flex",gap:8,zIndex:6}}>
          <button className="mascot" aria-label={muted?"Quitar silencio":"Silenciar"} onClick={toggleMute}
            style={{width:44,height:44,borderRadius:12,background:"rgba(0,0,0,.5)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",border:"none"}}>
            {I("audio",{size:18,color:"#fff"})}
          </button>
          <button className="mascot" aria-label="Pantalla completa" onClick={handleFullscreen}
            style={{width:44,height:44,borderRadius:12,background:"rgba(0,0,0,.5)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",border:"none"}}>
            {I("arrow",{size:18,color:"#fff"})}
          </button>
        </div>

        <button onClick={toggle} aria-label={playing?"Pausar video":"Reproducir video"} style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:"none"}}>
          <span className="mascot" style={{width:64,height:64,borderRadius:"50%",background:"rgba(28,58,92,.86)"}}>{I(playing?"pause":"play",{size:28,color:"#fff"})}</span>
        </button>
      </div>
      <div style={{padding:"12px 16px"}}>
        <div className="bar" style={{height:8,cursor: hasFile?"pointer":"default"}} onClick={hasFile?handleSeek:undefined}>
          <i style={{width:pct+"%",background:"var(--orange)"}}/>
        </div>
        <div className="row spread mt8">
          <span className="muted" style={{fontSize:".88rem",fontWeight:700}}>{fmt(cur)} / {dur}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Selector de formato Video / Texto / Podcast ---------- */
function FormatBlock({ media, texto }){
  const [fmt,setFmt] = useState("texto");
  const tabs = [
    { id:"video", label:"Video", icon:"video" },
    { id:"texto", label:"Texto", icon:"text" },
    { id:"audio", label:"Audio", icon:"audio" },
  ];
  return (
    <div>
      <div className="row gap8 mb16" role="tablist" aria-label="Elige el formato">
        {tabs.map(t=>(
          <button key={t.id} role="tab" aria-selected={fmt===t.id} onClick={()=>setFmt(t.id)}
            className="row gap6" style={{
              flex:1, minHeight:52, borderRadius:14, fontWeight:800, fontSize:".95rem",
              justifyContent:"center", border: fmt===t.id?"2.5px solid var(--orange-strong)":"2px solid var(--line)",
              background: fmt===t.id?"#FCEFE0":"#fff", color: fmt===t.id?"var(--orange-strong)":"var(--blue)"}}>
            {I(t.icon,{size:20})}{t.label}
          </button>
        ))}
      </div>
      <p className="muted body mb16" style={{marginTop:-6,display:"flex",gap:7,alignItems:"center"}}>
        {I("check",{size:16})} Elige cómo prefieres ver este contenido.
      </p>
      {fmt==="texto" && <div className="card card-white lead fadein" style={{background:"#fff"}}>{texto}</div>}
      {fmt==="video" && <div className="fadein"><MediaPlayer media={media} kind="video" onRequestFormatChange={(f)=>setFmt(f)}/></div>}
      {fmt==="audio" && <div className="fadein"><MediaPlayer media={media} kind="audio" onRequestFormatChange={(f)=>setFmt(f)}/></div>}
    </div>
  );
}

/* ---------- Caja de notas (guarda en la pestaña Notas) ---------- */
function NoteBox({ module }){
  const app = useApp();
  const [text,setText] = useState("");
  const [saved,setSaved] = useState(false);
  const existing = app.state.notes.filter(n=>n.module===module);
  const save = ()=>{
    if(!text.trim()) return; 
    app.addNote(module, text.trim()); 
    if(app.setUnsavedNote) app.setUnsavedNote(module, false);
    setText(""); setSaved(true); setTimeout(()=>setSaved(false),2200); 
  };
  return (
    <div className="card" style={{background:"#FFF8EE"}}>
      <div className="row gap8 mb8" style={{color:"var(--blue)",fontWeight:800}}>{I("note",{size:22})}<span className="h3">Tomar una nota</span></div>
      <p className="hint" style={{marginTop:0,marginBottom:12}}>{I("shield",{size:16})} <span>Lo que escribas aquí se guarda en la pestaña <b>Notas</b> y lo puedes corregir cuando quieras.</span></p>
      <textarea className="textarea" value={text} onChange={e=>{ setText(e.target.value); if(app.setUnsavedNote) app.setUnsavedNote(module, !!e.target.value.trim()); }} placeholder="Escribe lo que quieras recordar…" aria-label="Escribe tu nota"/>
      <div className="row spread mt12">
        <span className="muted body">{existing.length>0? existing.length+" nota(s) guardada(s)" : ""}</span>
        <button className="btn btn-blue btn-sm" disabled={!text.trim()} onClick={save}>{I("check",{size:18})} Guardar nota</button>
      </div>
      {saved && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} ¡Nota guardada en Notas!</div>}
    </div>
  );
}
function LessonBar({ value, onClose, closeGuardModule }){
  const app = useApp();
  const [confirmOpen,setConfirmOpen] = useState(false);
  const handleClose = ()=>{
    if(closeGuardModule && app.state.unsavedNotes && app.state.unsavedNotes[closeGuardModule]){
      setConfirmOpen(true);
      return;
    }
    if(onClose) onClose();
  };
  const doConfirm = ()=>{ if(app.setUnsavedNote) app.setUnsavedNote(closeGuardModule, false); setConfirmOpen(false); if(onClose) onClose(); };
  return (
    <>
      <div className="row gap12" style={{padding:"6px 4px 16px"}}>
        <button onClick={handleClose} aria-label="Salir del módulo" style={{background:"none",border:"none",color:"var(--ink-soft)",padding:8,minHeight:44}}>{I("close",{size:26})}</button>
        <div className="bar grow" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style={{width:value+"%"}}/></div>
      </div>
      {confirmOpen && <ConfirmDialog title="Salir sin guardar" body="Si sales ahora, la nota que no hayas guardado se perderá." confirmLabel="Salir" cancelLabel="Regresar" danger={true} onConfirm={doConfirm} onCancel={()=>setConfirmOpen(false)}/>}    
    </>
  );
}

/* ---------- Diálogo de confirmación (acciones de riesgo, WCAG K) ---------- */
function ConfirmDialog({ icon="warn", title, body, confirmLabel="Sí, continuar", cancelLabel="No, volver", danger=true, onConfirm, onCancel }){
  return (
    <div className="overlay" style={{alignItems:"center"}} role="dialog" aria-modal="true" aria-label={title}>
      <div className="dialog">
        <div className="mascot mb16" style={{width:62,height:62,borderRadius:18,background:danger?"#F6E2DE":"#FCEFE0",color:danger?"var(--danger)":"var(--orange-strong)"}}>
          {I(icon,{size:30})}
        </div>
        <h3 className="h2 mb8">{title}</h3>
        <p className="lead mb24">{body}</p>
        <div className="stack gap12">
          <button className="btn" style={{background:danger?"var(--danger)":"var(--orange-strong)",color:"#fff"}} onClick={onConfirm}>{confirmLabel}</button>
          <button className="btn btn-soft" onClick={onCancel}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pantalla de Felicitaciones (reutilizable en los 3 módulos) ---------- */
function Congrats({ stars, title, subtitle, primaryLabel, onPrimary, secondaryLabel, onSecondary }){
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center",alignItems:"center"}}>
        <div style={{position:"relative",marginBottom:8}}><Mascot size={130}/></div>
        <div className="row gap6 mt16" aria-hidden="true">
          {Array.from({length:3}).map((_,i)=>(
            <span key={i} style={{color:"var(--orange)",animation:`pop .3s ease ${i*0.12}s both`}}>{I("star",{size:40})}</span>
          ))}
        </div>
        <h1 className="h1 mt16" style={{color:"var(--orange-strong)"}}>{title}</h1>
        <p className="lead mt12 mb8" style={{maxWidth:320}}>{subtitle}</p>
        <div className="chip mt16" style={{background:"var(--blue)",fontSize:"1.05rem"}}>{I("star",{size:20,color:"#fff"})} Ganaste {stars} estrellas</div>
        <div className="stack gap12 mt28" style={{width:"100%",maxWidth:360}}>
          <button className="btn btn-primary btn-lg" onClick={onPrimary}>{primaryLabel} {I("arrow",{size:20})}</button>
          {secondaryLabel && <button className="btn btn-soft" onClick={onSecondary}>{secondaryLabel}</button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { I, Mascot, StatusBar, SubHeader, Progress, GuideSays, MediaPlayer, FormatBlock, NoteBox, ConfirmDialog, Congrats });
