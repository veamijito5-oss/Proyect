/* ===== Funciones del sistema: Notas, Recordatorio, Ajustes, Notificación ===== */

/* ---------- Tarjeta de notificación (estilo recordatorio amigable) ---------- */
function NotifCard({ name, stars }){
  return (
    <div style={{background:"#F9F0E3",borderRadius:16,padding:"0 18px 18px",border:"1px solid rgba(255,255,255,.55)",boxShadow:"0 18px 42px rgba(0,0,0,.14)",marginTop:16}}>
      <div style={{background:"#E6D3B3",borderRadius:"16px 16px 0 0",padding:"10px 18px",margin:"0 -18px 16px",border:"1px solid rgba(255,255,255,.9)"}}>
        <div className="row spread" style={{alignItems:"center"}}>
          <div className="row gap8" style={{color:"#4A2E1F",fontSize:".88rem",fontWeight:700}}>
            <img src="Media/Logo.png" alt="Vea Mijito" style={{width:26,height:26,objectFit:"contain"}}/>
            Vea, mijito
          </div>
          <span style={{color:"#4A2E1F",fontSize:".82rem"}}>ahora</span>
        </div>
      </div>
      <div className="row gap12" style={{alignItems:"flex-start"}}>
        <div style={{flex:"0 0 auto"}}><img src="Media/Avatar.png" alt="Guía Lucía" width={52} height={52} style={{objectFit:"contain",borderRadius:14}}/></div>
        <div>
          <div style={{fontWeight:800,marginBottom:4,color:"#B45A1F", fontSize:"18px"}}>¡La lección de hoy te espera!</div>
          <div style={{fontSize:".98rem",lineHeight:1.6,color:"#4A2E1F", fontSize:"16px"}}> {name||"amiga"}, hoy es un buen día para avanzar un pasito en tu emprendimiento. ¡No pierdas tus <b>{stars} estrellas</b>. Te espero🌟
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Pantalla de notificación (vista previa de pantalla bloqueada) ---------- */
function NotifScreen(){
  const app = useApp(); const nav = window.useNav();
  const now = new Date();
  const hh = now.getHours().toString().padStart(2,"0")+":"+now.getMinutes().toString().padStart(2,"0");
  return (
    <div className="screen" style={{background:"var(--cream)"}}>
      <StatusBar light/>
      <div className="pad" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <SubHeader onBack={()=>nav.back()} right={<span/>}/>
        <div className="center" style={{color:"var(--brown)",marginTop:8,marginBottom:24}}>
          <div style={{fontSize:"3.2rem",fontWeight:800,lineHeight:1}}>{hh}</div>
          <div style={{opacity:.7,fontWeight:600,marginTop:4}}>Así se ve tu recordatorio</div>
        </div>
        <NotifCard name={app.state.name} stars={app.state.stars}/>
        <div className="row gap12 mt20" style={{flexDirection:"column"}}>
          <button className="btn btn-ghost btn-lg" onClick={()=>nav.back()} style={{color:"var(--disable)"}}>Recordar más tarde</button>
          <button className="btn btn-primary btn-lg" onClick={()=>nav.tab("home")}>Continuar mi ruta {I("arrow",{size:20})}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Recordatorio / Alarmas ---------- */
function Stepper({ label, value, onDec, onInc, fmt }){
  return (
    <div className="center" style={{flex:1}}>
      <div className="muted body mb8" style={{fontWeight:700}}>{label}</div>
      <div className="row gap8" style={{justifyContent:"center"}}>
        <button className="mascot" aria-label={"Bajar "+label} onClick={onDec} style={{width:48,height:48,borderRadius:14,background:"var(--card)",color:"var(--blue)",border:"1px solid var(--line)"}}>{I("back",{size:22})}</button>
        <div className="h1" style={{minWidth:64,fontVariantNumeric:"tabular-nums"}}>{fmt(value)}</div>
        <button className="mascot" aria-label={"Subir "+label} onClick={onInc} style={{width:48,height:48,borderRadius:14,background:"var(--card)",color:"var(--blue)",border:"1px solid var(--line)",transform:"rotate(180deg)"}}>{I("back",{size:22})}</button>
      </div>
    </div>
  );
}

function Alarmas(){
  const app = useApp(); const nav = window.useNav();
  const r = app.state.reminder;
  const [confirmOff,setConfirmOff] = useState(false);
  const [savedMsg,setSavedMsg] = useState(false);
  const setH = (d)=> app.setReminder({ hour: ((r.hour + d + 12) % 12) || 12 });
  const setM = (d)=> app.setReminder({ min: (r.min + d + 60) % 60 });
  const toggle = ()=>{ if(r.on){ setConfirmOff(true); } else { app.setReminder({on:true}); } };
  const save = ()=>{ setSavedMsg(true); setTimeout(()=>setSavedMsg(false),2200); };
  return (
    <div className="screen has-nav"><StatusBar/>
      <div className="pad fadein">
        <h1 className="h1 mb8" style={{color:"var(--orange-strong)"}}>{I("alarm",{size:30})} Recordatorio</h1>
        <p className="lead muted mb20">Te avisaremos cada día para que avances con calma.</p>

        {/* on/off con texto + icono (no solo color) */}
        <div className="card row spread mb20">
          <div className="row gap10">
            <span className="mascot" style={{width:46,height:46,borderRadius:13,background:r.on?"#d7ecdd":"#e7ddcd",color:r.on?"var(--ok)":"var(--blue)"}}>{I(r.on?"bell":"close",{size:24})}</span>
            <div><div className="h3">Recordatorio {r.on?"activado":"apagado"}</div><div className="muted body">{r.on?"Recibirás un aviso diario":"No recibirás avisos"}</div></div>
          </div>
          <button className="btn btn-sm" style={{background:r.on?"#e7ddcd":"var(--orange-strong)",color:r.on?"var(--blue)":"#fff",width:"auto",padding:"0 18px"}} onClick={toggle}>{r.on?"Apagar":"Activar"}</button>
        </div>

        <div className="card" style={{opacity:r.on?1:.5,pointerEvents:r.on?"auto":"none"}}>
          <div className="eyebrow mb16 center">¿A qué hora te recordamos?</div>
          <div className="row" style={{alignItems:"flex-start"}}>
            <Stepper label="Hora" value={r.hour} onDec={()=>setH(-1)} onInc={()=>setH(1)} fmt={v=>v}/>
            <div className="h1" style={{paddingTop:28}}>:</div>
            <Stepper label="Minutos" value={r.min} onDec={()=>setM(-5)} onInc={()=>setM(5)} fmt={v=>v.toString().padStart(2,"0")}/>
          </div>
          <div className="row gap8 mt20">
            {[["AM","Mañana","sun"],["PM","Tarde","moon"]].map(([p,lbl,ic])=>(
              <button key={p} className="row gap8" onClick={()=>app.setReminder({period:p})} style={{
                flex:1,minHeight:54,borderRadius:14,justifyContent:"center",fontWeight:800,
                border:r.period===p?"2.5px solid var(--orange-strong)":"2px solid var(--line)",
                background:r.period===p?"#FCEFE0":"#fff",color:r.period===p?"var(--orange-strong)":"var(--blue)"}}>
                {I(ic,{size:20})} {lbl}
              </button>
            ))}
          </div>
        </div>

        <div className="row gap10 mt20">
          <button className="btn btn-soft" onClick={()=>nav.go("notif")}>{I("eye",{size:20})} Previsualizar</button>
          <button className="btn btn-blue" onClick={save}>{I("check",{size:20})} Guardar</button>
        </div>
        {savedMsg && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} Recordatorio guardado a las {r.hour}:{r.min.toString().padStart(2,"0")} {r.period==="AM"?"de la mañana":"de la tarde"}</div>}
      </div>
      {confirmOff && <ConfirmDialog title="¿Apagar el recordatorio?"
        body="Si lo apagas, dejaremos de avisarte cada día y es más fácil perder el hábito. ¿Seguro que quieres apagarlo?"
        confirmLabel="Sí, apagarlo" cancelLabel="No, déjalo activado"
        onConfirm={()=>{ app.setReminder({on:false}); setConfirmOff(false); }} onCancel={()=>setConfirmOff(false)}/>}
      <BottomNav active="alarmas"/>
    </div>
  );
}

/* ---------- Notas (organizadas por módulo, editable, borrar con confirmación) ---------- */
function NoteRow({ note }){
  const app = useApp();
  const [editing,setEditing] = useState(false);
  const [val,setVal] = useState(note.text);
  const [confirmDel,setConfirmDel] = useState(false);
  return (
    <div className="note-item">
      {editing ? (
        <>
          <textarea className="textarea" value={val} onChange={e=>setVal(e.target.value)} aria-label="Editar nota"/>
          <div className="row gap8 mt12" style={{justifyContent:"flex-end"}}>
            <button className="btn btn-soft btn-sm" onClick={()=>{ setVal(note.text); setEditing(false); }}>Cancelar</button>
            <button className="btn btn-blue btn-sm" onClick={()=>{ app.updateNote(note.id, val.trim()||note.text); setEditing(false); }}>{I("check",{size:18})} Guardar</button>
          </div>
        </>
      ) : (
        <>
          <div className="lead" style={{whiteSpace:"pre-wrap"}}>{note.text}</div>
          <div className="row gap16 mt12">
            <button className="row gap6" onClick={()=>setEditing(true)} style={{background:"none",border:"none",color:"var(--blue)",fontWeight:800,fontSize:".92rem"}}>{I("pencil",{size:18})} Editar</button>
            <button className="row gap6" onClick={()=>setConfirmDel(true)} style={{background:"none",border:"none",color:"var(--danger)",fontWeight:800,fontSize:".92rem"}}>{I("trash",{size:18})} Borrar</button>
          </div>
        </>
      )}
      {confirmDel && <ConfirmDialog title="¿Borrar esta nota?" body="Esta nota se eliminará y no podrás recuperarla."
        confirmLabel="Sí, borrarla" cancelLabel="No, conservarla"
        onConfirm={()=>{ app.deleteNote(note.id); setConfirmDel(false); }} onCancel={()=>setConfirmDel(false)}/>}
    </div>
  );
}

function Notas(){
  const app = useApp();
  const groups = [
    { id:"m1", title:"Módulo 1 · Tu experiencia" },
    { id:"m2", title:"Módulo 2 · Define tu idea" },
    { id:"m3", title:"Módulo 3 · Modelo Canvas" },
  ];
  const total = app.state.notes.length;
  return (
    <div className="screen has-nav"><StatusBar/>
      <div className="pad fadein">
        <h1 className="h1 mb8" style={{color:"var(--orange-strong)"}}>{I("note",{size:30})} Mis notas</h1>
        <p className="lead muted mb20">Aquí se guarda todo lo que escribes en cada módulo. Puedes editarlo cuando quieras.</p>
        {total===0 && (
          <div className="card center" style={{padding:"32px 20px"}}>
            <div className="mascot" style={{width:64,height:64,borderRadius:18,background:"#FCEFE0",color:"var(--orange-strong)",margin:"0 auto 14px"}}>{I("pencil",{size:32})}</div>
            <div className="h3 mb8">Todavía no tienes notas</div>
            <p className="lead muted">Cuando veas una lección, podrás tomar notas y aparecerán aquí.</p>
          </div>
        )}
        {groups.map(g=>{
          const list = app.state.notes.filter(n=>n.module===g.id);
          if(list.length===0) return null;
          return (
            <div key={g.id} className="mb24">
              <div className="eyebrow mb12">{g.title} · {list.length}</div>
              <div className="stack gap12">{list.map(n=> <NoteRow key={n.id} note={n}/>)}</div>
            </div>
          );
        })}
      </div>
      <BottomNav active="notas"/>
    </div>
  );
}

/* ---------- Ajustes / Perfil ---------- */
function Ajustes(){
  const app = useApp(); const nav = window.useNav(); const s = app.state;
  const [name,setName] = useState(s.name);
  const [nameSaved,setNameSaved] = useState(false);
  const [editingName,setEditingName] = useState(false);
  const [pendingFs,setPendingFs] = useState(s.fontSize);
  const [fontEditing,setFontEditing] = useState(false);
  const [fsSaved,setFsSaved] = useState(false);
  const [sheet,setSheet] = useState(null);   // 'privacy' | 'help'
  const [confirmReset,setConfirmReset] = useState(false);

  const saveName = ()=>{ if(name.trim()){ app.setName(name.trim()); setNameSaved(true); setEditingName(false); setTimeout(()=>setNameSaved(false),2000);} };
  const applyFs = ()=>{ app.setFontSize(pendingFs); setFsSaved(true); setFontEditing(false); setTimeout(()=>setFsSaved(false),2000); };
  const fsOpts = [["sm","Pequeña"],["med","Mediana"],["lg","Grande"]];
  const previewPx = Math.round(18 * window.FS_MAP[pendingFs]);

  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <SubHeader onBack={()=>nav.tab("home")}/>
        <h1 className="h1 mb20" style={{color:"var(--orange-strong)"}}>{I("settings",{size:30})} Ajustes</h1>

        {/* Nombre */}
        <div className="card mb16" style={{background:"#fff"}}>
          <label className="label row gap8" htmlFor="setname">{I("user",{size:20,color:"var(--orange-strong)"})} Tu nombre</label>
          <p className="muted body mb12" style={{marginTop:-2}}>Así te llamaremos en todo el sistema.</p>
          <input id="setname" className="field" value={name}
            onChange={e=>setName(e.target.value)}
            onFocus={()=>setEditingName(true)}
            onBlur={e=>{
              const related = e.relatedTarget;
              if(!related || !e.currentTarget.parentNode.contains(related)) setEditingName(false);
            }}
            placeholder="Escribe tu nombre"/>
          {editingName && (
            <button className="btn btn-blue btn-sm mt12" style={{width:"auto",padding:"0 20px"}}
              disabled={!name.trim()||name.trim()===s.name} onClick={saveName}>{I("check",{size:18})} Guardar nombre</button>
          )}
          {nameSaved && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} Nombre actualizado</div>}
        </div>

        {/* Tamaño de letra con previsualización */}
        <div className="card mb16" style={{background:"#fff"}}>
          <div className="label row gap8">{I("aletter",{size:22,color:"var(--orange-strong)"})} Tamaño de la letra</div>
          <p className="muted body mb12" style={{marginTop:-2}}>Elige y mira la vista previa antes de confirmar. Cambia en todo el sistema.</p>
          <div className="row gap8">
            {fsOpts.map(([id,lbl])=>(
              <button key={id} onClick={()=>{ setPendingFs(id); setFontEditing(true); }} style={{flex:1,minHeight:54,borderRadius:14,fontWeight:800,
                border:pendingFs===id?"2.5px solid var(--orange-strong)":"2px solid var(--line)",
                background:pendingFs===id?"#FCEFE0":"#fff",color:pendingFs===id?"var(--orange-strong)":"var(--blue)"}}>{lbl}</button>
            ))}
          </div>
          {fontEditing && (
            <>
              <div className="card mt16" style={{background:"var(--cream)"}}>
                <div className="muted" style={{fontSize:".8rem",fontWeight:800,letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>Vista previa</div>
                <div style={{fontSize:previewPx+"px",lineHeight:1.4,fontWeight:600,color:"var(--ink)"}}>Hola, así se verá tu texto.</div>
              </div>
              <button className="btn btn-blue mt16" disabled={pendingFs===s.fontSize} onClick={applyFs}>{I("check",{size:20})} Confirmar tamaño</button>
            </>
          )}
          {fsSaved && <div className="badge badge-ok mt12" role="status">{I("checkc",{size:16})} Tamaño aplicado en todo el sistema</div>}
        </div>

        {/* Privacidad / Ayuda */}
        <button className="card row spread mb12" onClick={()=>setSheet("privacy")} style={{width:"100%",textAlign:"left",border:"1px solid var(--line)"}}>
          <span className="row gap10"><span style={{color:"var(--orange-strong)"}}>{I("shield",{size:24})}</span><span className="h3">Privacidad y datos</span></span>
          {I("arrow",{size:22,color:"var(--blue)"})}
        </button>
        <button className="card row spread mb12" onClick={()=>setSheet("help")} style={{width:"100%",textAlign:"left",border:"1px solid var(--line)"}}>
          <span className="row gap10"><span style={{color:"var(--orange-strong)"}}>{I("help",{size:24})}</span><span className="h3">Ayuda y soporte</span></span>
          {I("arrow",{size:22,color:"var(--blue)"})}
        </button>

        {/* Eliminar datos */}
        <button className="card row spread" onClick={()=>setConfirmReset(true)} style={{width:"100%",textAlign:"left",border:"1.5px solid #E6C9C3",background:"#FBEFEC"}}>
          <span className="row gap10"><span style={{color:"var(--danger)"}}>{I("trash",{size:24})}</span><span className="h3" style={{color:"var(--danger)"}}>Eliminar mis datos</span></span>
          {I("arrow",{size:22,color:"var(--danger)"})}
        </button>
        <p className="muted body mt8" style={{paddingLeft:4}}>Reinicia todo el sistema (nombre, progreso y notas).</p>
      </div>

      {/* hojas */}
      {sheet==="privacy" && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Privacidad y datos">
          <div className="sheet">
            <div className="row spread mb16"><h3 className="h2">{I("shield",{size:24})} Privacidad y datos</h3>
              <button onClick={()=>setSheet(null)} aria-label="Cerrar" style={{background:"none",border:"none",color:"var(--ink-soft)"}}>{I("close",{size:26})}</button></div>
            <p className="lead mb12">Tus datos se guardan <b>solo en este dispositivo</b>. No los compartimos con nadie ni los enviamos a internet.</p>
            <p className="lead mb12">Tú decides: en cualquier momento puedes borrarlos con el botón <b>“Eliminar mis datos”</b>.</p>
            <p className="lead">Nunca te pediremos contraseñas ni datos bancarios dentro de las lecciones.</p>
            <button className="btn btn-soft mt20" onClick={()=>setSheet(null)}>Entendido</button>
          </div>
        </div>
      )}
      {sheet==="help" && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Ayuda y soporte">
          <div className="sheet">
            <div className="row spread mb16"><h3 className="h2">{I("help",{size:24})} Ayuda y soporte</h3>
              <button onClick={()=>setSheet(null)} aria-label="Cerrar" style={{background:"none",border:"none",color:"var(--ink-soft)"}}>{I("close",{size:26})}</button></div>
            <p className="lead mb20">¿Tienes dudas o tuviste un problema? <b>Una persona real</b> —no un robot— te ayudará por WhatsApp con mucho gusto.</p>
            <a className="btn" href="https://wa.me/573000000000?text=Hola%2C%20necesito%20ayuda%20con%20Vea%20mijito" target="_blank" rel="noopener" style={{background:"var(--whatsapp)",color:"#fff"}}>{I("whatsapp",{size:22,color:"#fff"})} Hablar con una persona por WhatsApp</a>
            <p className="hint mt16">{I("user",{size:18})} Te responde Marcela, del equipo de acompañamiento. Horario: 8am a 6pm.</p>
            <button className="btn btn-soft mt16" onClick={()=>setSheet(null)}>Cerrar</button>
          </div>
        </div>
      )}
      {confirmReset && <ConfirmDialog title="¿Eliminar todos tus datos?"
        body="Se borrará tu nombre, tu progreso, tus respuestas y tus notas. El sistema volverá a empezar desde cero. Esta acción no se puede deshacer."
        confirmLabel="Sí, borrar todo" cancelLabel="No, conservar mis datos"
        onConfirm={()=>{ app.reset(); setConfirmReset(false); nav.replace("welcome"); }} onCancel={()=>setConfirmReset(false)}/>}
    </div>
  );
}

Object.assign(window, { NotifCard, NotifScreen, Alarmas, Notas, Ajustes });
