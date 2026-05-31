/* ===== MÓDULO 2 · Define tu idea ===== */

/* Resumen de respuestas del Módulo 1 (no se repite el trabajo) */
function ResumenM1({ onContinue, onClose }){
  const app = useApp(); const s = app.state;
  const skill = window.optById("skill", s.test.skill);
  const aud   = window.optById("audience", s.test.audience);
  const yrs   = window.optById("years", s.test.years);
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={15} onClose={onClose} closeGuardModule="m2"/>
        <div className="eyebrow" style={{color:"var(--blue)"}}>Retomamos lo tuyo</div>
        <h1 className="h1 mt8 mb16" style={{color:"var(--orange-strong)"}}>Esto ya lo sabemos de ti</h1>
        <GuideSays size={62}><span className="body">No empezamos de cero, {s.name}. Usaremos lo que descubriste en el Módulo 1.</span></GuideSays>
        <div className="card shadow mt20" style={{background:"#fff"}}>
          <div className="row gap10 mb12"><span style={{color:"var(--orange-strong)"}}>{I("star",{size:22})}</span><span className="lead"><b>Tu fortaleza:</b> {skill?.noun}</span></div>
          <hr className="hr" style={{margin:"12px 0"}}/>
          <div className="row gap10 mb12"><span style={{color:"var(--orange-strong)"}}>{I("userheart",{size:22})}</span><span className="lead"><b>A quién ayudas:</b> {aud?.who}</span></div>
          <hr className="hr" style={{margin:"12px 0"}}/>
          <div className="row gap10"><span style={{color:"var(--orange-strong)"}}>{I("clock",{size:22})}</span><span className="lead"><b>Experiencia:</b> {yrs?.when}</span></div>
        </div>
        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={onContinue}>Aprender a definir mi idea {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* Lección multiformato + notas */
function LeccionM2({ onContinue, onClose }){
  const app = useApp();
  const hasSavedNote = app.state.notes.some(n=>n.module==="m2");
  const L = window.DATA.LESSON_M2;
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={40} onClose={onClose} closeGuardModule="m2"/>
        <div className="eyebrow" style={{color:"var(--blue)"}}>Lección</div>
        <h1 className="h1 mt8 mb20" style={{color:"var(--orange-strong)"}}>{L.titulo}</h1>
        <FormatBlock media={L.media} texto={L.texto}/>
        <div className="mt20"><NoteBox module="m2"/></div>
        {!hasSavedNote && (
          <p className="hint mt12" style={{color:"#B23A2E"}}>Escribe y guarda tu nota primero antes de continuar.</p>
        )}
        <button className="btn btn-primary btn-lg mt24" disabled={!hasSavedNote} onClick={onContinue}>Poner mi idea en palabras {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* Sheet para revisar notas dentro de la actividad */
function NotesSheet({ modules, onClose }){
  const app = useApp();
  const list = app.state.notes.filter(n=> !modules || modules.includes(n.module));
  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Tus notas">
      <div className="sheet" style={{maxHeight:"80%",overflowY:"auto"}}>
        <div className="row spread mb16">
          <h3 className="h2">{I("note",{size:24})} Tus notas</h3>
          <button onClick={onClose} aria-label="Cerrar" style={{background:"none",border:"none",color:"var(--ink-soft)"}}>{I("close",{size:26})}</button>
        </div>
        {list.length===0
          ? <p className="lead muted">Aún no has guardado notas. Puedes tomar notas en la lección anterior.</p>
          : <div className="stack gap12">{list.map(n=>(
              <div key={n.id} className="note-item"><div className="lead">{n.text}</div></div>
            ))}</div>}
        <button className="btn btn-soft mt20" onClick={onClose}>Volver a mi idea</button>
      </div>
    </div>
  );
}

/* Actividad: 3 preguntas abiertas (autosave) */
function PreguntasM2({ onContinue, onBack, onClose }){
  const app = useApp(); const s = app.state;
  const qs = window.DATA.QUESTIONS_M2;
  const [showNotes,setShowNotes] = useState(false);
  const all = s.idea.que.trim() && s.idea.quien.trim() && s.idea.como.trim();
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={70} onClose={onClose} closeGuardModule="m2"/>
        <GuideSays size={60}><span className="body">Vamos a poner tu idea en palabras. Responde con tranquilidad; <b>todo se guarda</b> y lo puedes corregir.</span></GuideSays>
        <div className="row gap8 mt16">
          <button className="btn btn-soft btn-sm" onClick={()=>setShowNotes(true)}>{I("note",{size:18})} Revisar notas</button>
        </div>

        <div className="stack gap20 mt20">
          {qs.map(q=>(
            <div key={q.id} className="card" style={{background:"#fff"}}>
              <label className="label row gap8" htmlFor={"q-"+q.id} style={{color:"var(--blue)",fontSize:"1.1rem"}}>
                <span style={{color:"var(--orange-strong)"}}>{I(q.icon,{size:22})}</span>{q.q}
              </label>
              <p className="muted body mb12" style={{marginTop:-2}}>{q.help}</p>
              <textarea id={"q-"+q.id} className="textarea" style={{minHeight:80}} placeholder={q.ph}
                value={s.idea[q.id]} onChange={e=>app.saveIdea({[q.id]:e.target.value})} aria-label={q.q}/>
            </div>
          ))}
        </div>
        <p className="hint mt16">{I("checkc",{size:18})} {all? "¡Listo! Ya puedes ver tu idea en resumen." : "Responde las tres preguntas para continuar."}</p>
        <button className="btn btn-primary btn-lg mt12" disabled={!all} onClick={onContinue}>Ver mi idea en resumen {I("arrow",{size:20})}</button>
      </div>
      {showNotes && <NotesSheet modules={["m1","m2"]} onClose={()=>setShowNotes(false)}/>}
    </div>
  );
}

/* Tu idea en resumen */
function IdeaResumen({ onDone, onBack, onClose }){
  const app = useApp(); const s = app.state;
  const completed = app.state.completed.m2;
  const [saved,setSaved] = useState(false);
  const frase = `Ofrezco ${s.idea.que} a ${s.idea.quien}, entregándolo ${s.idea.como}.`;
  const guardar = ()=>{ app.addNote("m2", "Mi idea: "+frase); setSaved(true); setTimeout(()=>setSaved(false),2200); };
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={92} onClose={onClose} closeGuardModule="m2"/>
        <div className="badge badge-ok" style={{alignSelf:"flex-start"}}>{I("checkc",{size:18})} ¡Tu idea quedó clara!</div>
        <h1 className="h1 mt16 mb20" style={{color:"var(--orange-strong)"}}>Tu idea en resumen</h1>
        <div className="card shadow" style={{background:"var(--blue)",color:"#fff"}}>
          <div className="row gap8 mb12" style={{opacity:.85,fontWeight:800,letterSpacing:".08em",fontSize:".8rem",textTransform:"uppercase"}}>{I("idea",{size:18,color:"#fff"})} Mi negocio</div>
          <p style={{fontSize:"1.3rem",lineHeight:1.45,fontWeight:600}}>
            Ofrezco <u>{s.idea.que}</u> a <u>{s.idea.quien}</u>, entregándolo <u>{s.idea.como}</u>.
          </p>
        </div>
        <div className="row gap8 mt16">
          <button className="btn btn-soft btn-sm" onClick={onBack}>{I("pencil",{size:18})} Corregir</button>
          <button className="btn btn-soft btn-sm" onClick={guardar}>{I("note",{size:18})} Guardar en Notas</button>
        </div>
        {saved && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} Guardada en Notas</div>}
        <div className="grow"/>
        {completed
          ? <button className="btn btn-primary btn-lg mt24" onClick={onClose}>Volver al inicio {I("arrow",{size:20})}</button>
          : <button className="btn btn-primary btn-lg mt24" onClick={onDone}>Terminar módulo {I("check",{size:20})}</button>
        }
      </div>
    </div>
  );
}

function Module2(){
  const app = useApp(); const nav = window.useNav();
  const m = window.DATA.MODULES[1];
  const [step,setStep] = useState("antesala");
  const close = ()=> nav.tab("home");
  const finish = ()=>{ if(!app.state.completed.m2){ app.addStars(5); app.completeModule("m2"); } setStep("congrats"); };
  switch(step){
    case "antesala": return <Antesala m={m} onBack={close} onStart={()=>setStep("resumen")}/>;
    case "resumen":  return <ResumenM1 onClose={close} onContinue={()=>setStep("leccion")}/>;
    case "leccion":  return <LeccionM2 onClose={close} onContinue={()=>setStep("preguntas")}/>;
    case "preguntas":return <PreguntasM2 onClose={close} onBack={()=>setStep("leccion")} onContinue={()=>setStep("idea")}/>;
    case "idea":     return <IdeaResumen onClose={close} onBack={()=>setStep("preguntas")} onDone={finish}/>;
    case "congrats": return <Congrats stars={5} title="¡Lo lograste!" subtitle={`${app.state.name}, ya tienes tu idea en palabras. Desbloqueaste el Módulo 3: el modelo Canvas.`}
                        primaryLabel="Continuar al Módulo 3" onPrimary={()=>nav.go("m3")}
                        secondaryLabel="Volver al inicio" onSecondary={close}/>;
    default: return null;
  }
}

Object.assign(window, { NotesSheet, Module2 });
