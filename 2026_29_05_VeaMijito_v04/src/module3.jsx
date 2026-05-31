/* ===== MÓDULO 3 · Modelo de negocio Canvas ===== */

/* Preámbulo: por qué son 9 bloques (lo explica la guía) */
function PreambuloCanvas({ onContinue, onClose }){
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={15} onClose={onClose} closeGuardModule="m3"/>
        <div className="eyebrow">Modelo Canvas · Fase 2 de 5</div>
        <h1 className="h1 mt8 mb16" style={{color:"var(--orange-strong)"}}>9 piezas, una a la vez</h1>
        <GuideSays size={64}>
          <span className="body">El modelo Canvas tiene <b>9 piezas</b> para ordenar un negocio. No te asustes: <b>no las veremos todas hoy</b>. Iremos de a poquito. Hoy solo abrimos la primera.</span>
        </GuideSays>
        <div className="card mt20" style={{background:"#FFF8EE"}}>
          <div className="row gap8 mb8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Empezamos por la pieza más importante.</div>
          <div className="row gap8 mb8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Usaremos la idea que ya escribiste.</div>
          <div className="row gap8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Las demás piezas se abrirán más adelante.</div>
        </div>
        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={onContinue}>Ver las 9 piezas {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* Vista de los 9 bloques — solo el primero activo */
function CanvasBlocks({ onOpen, onClose }){
  const app = useApp();
  const [nudge,setNudge] = useState(false);
  const firstDone = app.state.notes.some(n=>n.module==="m3");
  const blocks = window.DATA.CANVAS_BLOCKS.map((b,index)=>{
    if(b.id==="valor") return { ...b, active:true, completed:firstDone };
    if(index===1) return { ...b, active:firstDone };
    return b;
  });
  const tap = (b)=>{ if(b.active) onOpen(b.id); else { setNudge(true); setTimeout(()=>setNudge(false),2400); } };
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={35} onClose={onClose} closeGuardModule="m3"/>
        <h1 className="h1 mb8" style={{color:"var(--orange-strong)"}}>Tu lienzo Canvas</h1>
        <p className="lead muted mb20">Toca la pieza encendida para empezar. Las grises se abrirán en las siguientes fases.</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {blocks.map(b=>(
            <button key={b.id} onClick={()=>tap(b)} aria-disabled={!b.active}
              className="card" style={{textAlign:"left",minHeight:128,position:"relative",
                border: b.completed?"2.5px solid #2E8A4B": b.active?"2.5px solid var(--orange-strong)":"1px solid var(--line)",
                background: b.completed?"#E9F7EE": b.active?"#fff":"#EDE2D0", opacity:b.active?1:.85}}>
              <div className="row spread mb8">
                <span className="mascot" style={{width:42,height:42,borderRadius:12,
                  background:b.completed?"#2E8A4B": b.active?"var(--orange)":"#C9BCA8",color:"#fff"}}>{I(b.active?b.icon:"lock",{size:22})}</span>
                {b.completed
                  ? <span className="badge badge-ok" style={{padding:"3px 9px",fontSize:"0.72rem"}}>{I("checkc",{size:12,color:"#fff"})} Completado</span>
                  : b.active
                    ? <span className="badge badge-active" style={{padding:"3px 9px",fontSize:"0.72rem"}}>{I("play",{size:12,color:"#fff"})} Abierta</span>
                    : <span className="badge badge-lock" style={{padding:"3px 9px",fontSize:"0.72rem"}}>{I("lock",{size:12})} Pronto</span>}
              </div>
              <div style={{fontWeight:800,fontSize:"0.98rem",color:b.active?"var(--ink)":"var(--blue)"}}>{b.n}. {b.title}</div>
              <div className="muted" style={{fontSize:"0.82rem",marginTop:2}}>{b.sub}</div>
            </button>
          ))}
        </div>
        {nudge && <div className="badge badge-lock mt16" role="status" style={{width:"100%",justifyContent:"center",padding:"12px"}}>
          {I("lock",{size:18})} Esta pieza se abre en una fase más adelante.
        </div>}
      </div>
    </div>
  );
}

/* Bloque activo: descripción multiformato + notas */
function CanvasBloque({ blockId, onContinue, onBack, onClose }){
  const app = useApp();
  const hasSavedNote = app.state.notes.some(n=>n.module==="m3");
  const L = window.DATA.CANVAS_LESSON;
  const block = window.DATA.CANVAS_BLOCKS.find(x=>x.id===blockId) || { n:1, title:L.titulo };
  if(blockId !== "valor"){
    return (
      <div className="screen"><StatusBar/>
        <div className="pad fadein">
          <LessonBar value={60} onClose={onClose} closeGuardModule="m3"/>
          <button className="row gap8 mb12" onClick={onBack} style={{background:"none",border:"none",color:"var(--blue)",fontWeight:800,padding:"6px 4px"}}>{I("back",{size:22})} Las 9 piezas</button>
          <div className="eyebrow">Pieza {block.n} de 9</div>
          <h1 className="h1 mt8 mb20" style={{color:"var(--orange-strong)"}}>{block.title}</h1>
          <div className="card shadow" style={{background:"#fff"}}>
            <p className="lead">¡Bien! Esta pieza ya está activa. En el siguiente paso de la experiencia trabajaremos su contenido.</p>
          </div>
          <div className="grow"/>
          <button className="btn btn-soft btn-lg mt24" onClick={onBack}>Volver a las 9 piezas</button>
        </div>
      </div>
    );
  }
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={60} onClose={onClose} closeGuardModule="m3"/>
        <button className="row gap8 mb12" onClick={onBack} style={{background:"none",border:"none",color:"var(--blue)",fontWeight:800,padding:"6px 4px"}}>{I("back",{size:22})} Las 9 piezas</button>
        <div className="eyebrow">Pieza 1 de 9</div>
        <h1 className="h1 mt8 mb20" style={{color:"var(--orange-strong)"}}>{L.titulo}</h1>
        <FormatBlock media={L.media} texto={L.texto}/>
        <div className="mt20"><NoteBox module="m3"/></div>
        {!hasSavedNote && (
          <p className="hint mt12" style={{color:"#B23A2E"}}>Escribe y guarda tu nota primero antes de continuar.</p>
        )}
        <button className="btn btn-primary btn-lg mt24" disabled={!hasSavedNote} onClick={onContinue}>Actualizar mi idea {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* Actividad de afianzamiento: actualiza tu idea con lo aprendido */
function ActualizaIdea({ onContinue, onClose }){
  const app = useApp(); const s = app.state;
  const hasSavedNote = app.state.notes.some(n=>n.module==="m3");
  const baseIdea = `Ofrezco ${s.idea.que} a ${s.idea.quien}, entregándolo ${s.idea.como}.`;
  const [val,setVal] = useState(s.canvasIdea || "");
  const [saved,setSaved] = useState(hasSavedNote);
  const [showMsg,setShowMsg] = useState(false);
  useEffect(()=>{ if(s.canvasIdea) setVal(s.canvasIdea); },[]);
  const onChange = (v)=>{ setVal(v); app.saveCanvasIdea(v); if(app.setUnsavedNote) app.setUnsavedNote("m3", !!v.trim()); };
  const guardar = ()=>{ if(!val.trim())return; app.addNote("m3","Propuesta de valor: "+val.trim()); if(app.setUnsavedNote) app.setUnsavedNote("m3", false); setSaved(true); setShowMsg(true); setTimeout(()=>setShowMsg(false),2200); };
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={88} onClose={onClose}/>
        <GuideSays size={60}><span className="body">Ahora que sabes qué es la <b>propuesta de valor</b>, mejora tu idea: ¿qué hace especial lo tuyo? <b>Se guarda en Notas</b> y lo puedes corregir.</span></GuideSays>

        <div className="card mt20" style={{background:"#FFF8EE"}}>
          <div className="eyebrow mb8">Tu idea hasta ahora</div>
          <p className="lead">{baseIdea}</p>
        </div>

        <div className="card mt16" style={{background:"#fff"}}>
          <label className="label row gap8" htmlFor="cv" style={{color:"var(--blue)"}}>{I("idea",{size:22,color:"var(--orange-strong)"})} Actualiza tu propuesta de valor</label>
          <textarea id="cv" className="textarea" placeholder="Ej: comida casera con sazón de antes, hecha el mismo día y entregada en tu puerta."
            value={val} onChange={e=>onChange(e.target.value)} aria-label="Actualiza tu propuesta de valor"/>
          <div className="row spread mt12">
            <span className="muted body">{saved? "" : "Escribe y guarda tu propuesta antes de continuar."}</span>
            <button className="btn btn-blue btn-sm" disabled={!val.trim()} onClick={guardar}>{I("note",{size:18})} Guardar en Notas</button>
          </div>
          {showMsg && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} Guardada en Notas</div>}
        </div>

        <button className="btn btn-primary btn-lg mt24" disabled={!saved} onClick={onContinue}>Continuar al paso 2 {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

function Module3(){
  const app = useApp(); const nav = window.useNav();
  const m = window.DATA.MODULES[2];
  const [step,setStep] = useState("antesala");
  const [currentBlock,setCurrentBlock] = useState("valor");
  const close = ()=> nav.tab("home");
  const finish = ()=>{ if(!app.state.completed.m3){ app.addStars(5); app.completeModule("m3"); } setStep("congrats"); };
  switch(step){
    case "antesala":  return <Antesala m={m} onBack={close} onStart={()=>setStep("preambulo")} startLabel="Comenzar"/>;
    case "preambulo": return <PreambuloCanvas onClose={close} onContinue={()=>setStep("bloques")}/>;
    case "bloques":   return <CanvasBlocks onClose={close} onOpen={(id)=>{ setCurrentBlock(id); setStep("bloque"); }}/>;
    case "bloque":    return <CanvasBloque blockId={currentBlock} onClose={close} onBack={()=>setStep("bloques")} onContinue={()=>setStep("actividad")}/>;
    case "actividad": return <ActualizaIdea onClose={close} onContinue={()=>setStep("bloques")} />;
    case "congrats":  return <Congrats stars={5} title="¡Felicidades!" subtitle={`${app.state.name}, terminaste la Fase 2 del Canvas. ¡Diste un gran paso en tu emprendimiento!`}
                        primaryLabel="Volver al inicio" onPrimary={close}/>;
    default: return null;
  }
}

window.Module3 = Module3;
