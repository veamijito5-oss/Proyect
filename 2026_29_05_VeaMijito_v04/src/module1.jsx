/* ===== MÓDULO 1 · Tu experiencia ===== */

/* barra superior de lección: cerrar + progreso (sin vidas/temporizador, WCAG L) */
function LessonBar({ value, onClose }){
  return (
    <div className="row gap12" style={{padding:"6px 4px 16px"}}>
      <button onClick={onClose} aria-label="Salir del módulo" style={{background:"none",border:"none",color:"var(--ink-soft)",padding:8,minHeight:44}}>{I("close",{size:26})}</button>
      <div className="bar grow" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style={{width:value+"%"}}/></div>
    </div>
  );
}

const optById = (qid, oid)=>{ const q = window.DATA.TEST.find(x=>x.id===qid); return q? q.options.find(o=>o.id===oid) : null; };

/* ---------- Antesala reutilizable ---------- */
function Antesala({ m, onStart, onBack, startLabel="Empezar" }){
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <SubHeader onBack={onBack}/>
        <div className="mascot mt12" style={{width:72,height:72,borderRadius:20,background:"#FCEFE0",color:"var(--orange-strong)"}}>
          <img src="Media/Logo.png" alt="Logo" style={{width:42,height:42,objectFit:"contain"}} />
        </div>
        <div className="eyebrow mt20">Módulo {m.n} · {m.sub}</div>
        <h1 className="h1 mt8" style={{color:"var(--orange-strong)"}}>{m.title}</h1>
        <GuideSays size={64}><span className="body">{m.desc}</span></GuideSays>
        <div className="card mt20" style={{background:"#FFF8EE"}}>
          <div className="row gap8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Aquí no hay respuestas malas.</div>
          <div className="row gap8 mt8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Puedes volver atrás cuando quieras.</div>
          <div className="row gap8 mt8" style={{color:"var(--blue)",fontWeight:700}}>{I("check",{size:20})} Tu avance se guarda solo.</div>
        </div>
        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={onStart}>{startLabel} {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* ---------- Test por tarjetas (FUNCIONAL) ---------- */
function SkillTest({ onDone, onClose }){
  const app = useApp();
  const qs = window.DATA.TEST;
  const [i,setI] = useState(0);
  const [sel,setSel] = useState({ ...app.state.test });
  const q = qs[i];
  const chosen = sel[q.id];
  const next = ()=>{
    app.saveTest({ [q.id]: chosen });
    if(i < qs.length-1){ setI(i+1); }
    else { app.saveM1Progress({ result:true }); onDone(); }
  };
  return (
    <div className="screen"><StatusBar/>
      <div className="pad" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={Math.round((i)/qs.length*100)} onClose={onClose}/>
        <div className="eyebrow">Pregunta {i+1} de {qs.length}</div>
        <h1 className="h2 mt8 mb8"style={{color:"var(--orange-strong)"}}>{q.q}</h1>
        <p className="lead muted mb20">{q.help}</p>
        <div className="stack gap12 fadein" key={q.id}>
          {q.options.map((o,idx)=>(
            <button key={o.id} className="opt" aria-pressed={chosen===o.id} onClick={()=> setSel({...sel,[q.id]:o.id})}>
              <span className="optico">{I(o.icon,{size:26})}</span>
              <span className="grow">{o.label}</span>
              {chosen===o.id && <span style={{color:"var(--orange-strong)"}}>{I("checkc",{size:26})}</span>}
            </button>
          ))}
        </div>
        <div className="grow"/>
        <div className="row gap12 mt24">
          {i>0 && <button className="btn btn-soft" style={{width:"auto",flex:"0 0 auto",padding:"0 22px"}} onClick={()=>setI(i-1)}>{I("back",{size:20})}</button>}
          <button className="btn btn-primary grow" disabled={!chosen} onClick={next}>{i<qs.length-1?"Continuar":"Ver mi resultado"} {I("arrow",{size:20})}</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Resultado vía personaje guía (REAL, usa nombre + respuestas) ---------- */
function TestResult({ onContinue, onClose }){
  const app = useApp(); const s = app.state;
  const skill = optById("skill", s.test.skill);
  const aud   = optById("audience", s.test.audience);
  const yrs   = optById("years", s.test.years);
  const chan  = optById("channel", s.test.channel);
  const name = s.name||"amiga";
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={55} onClose={onClose}/>
        <div className="badge badge-ok" style={{alignSelf:"flex-start"}}>{I("checkc",{size:18})} ¡Terminaste el test!</div>
        <h1 className="h1 mt16" style={{color:"var(--orange-strong)"}}>Esto descubrí de ti, {name}</h1>

        <div className="mt20"><GuideSays size={64}>
          <span className="body">Tu mayor fortaleza es <b>{skill?.noun}</b>. Lo {skill?.verb} desde hace <b>{yrs?.when}</b> y disfrutas ayudar a <b>{aud?.who}</b>.</span>
        </GuideSays></div>

        <div className="card shadow mt20" style={{background:"#fff"}}>
          <div className="eyebrow mb12">Tu valor</div>
          <ul className="stack gap12" style={{margin:0,paddingLeft:0,listStyle:"none"}}>
            <li className="row gap10"><span style={{color:"var(--orange-strong)",flex:"0 0 auto"}}>{I("star",{size:22})}</span><span className="lead"><b>Sabes hacer:</b> {skill?.noun}</span></li>
            <li className="row gap10"><span style={{color:"var(--orange-strong)",flex:"0 0 auto"}}>{I("clock",{size:22})}</span><span className="lead"><b>Experiencia:</b> {yrs?.when}</span></li>
            <li className="row gap10"><span style={{color:"var(--orange-strong)",flex:"0 0 auto"}}>{I("userheart",{size:22})}</span><span className="lead"><b>Te gusta ayudar a:</b> {aud?.who}</span></li>
            <li className="row gap10"><span style={{color:"var(--orange-strong)",flex:"0 0 auto"}}>{I("gift",{size:22})}</span><span className="lead"><b>Tu oportunidad:</b> {skill?.opp}</span></li>
          </ul>
        </div>

        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={onContinue}>Conversemos un poco más {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* ---------- "Conversemos" estilo WhatsApp (inputs predefinidos) ---------- */
function Conversemos({ onDone, onClose }){
  const app = useApp(); const s = app.state;
  const flow = window.DATA.CHAT_FLOW;
  const [step,setStep] = useState(0);
  const [msgs,setMsgs] = useState([{ from:"bot", text:flow[0].bot }]);
  const endRef = useRef(null);
  useEffect(()=>{ if(endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; },[msgs]);

  const pick = (opt)=>{
    const cur = flow[step];
    // guardar valor
    const key = cur.options[0].level!==undefined? "level" : cur.options[0].time!==undefined? "time" : "goal";
    app.saveChat({ [key]: opt.level||opt.time||opt.goal });
    const newMsgs = [...msgs, { from:"me", text:opt.text }];
    setMsgs(newMsgs);
    setTimeout(()=>{
      if(step < flow.length-1){
        setMsgs(m=>[...m, { from:"bot", text:flow[step+1].bot }]);
        setStep(step+1);
      } else {
        setMsgs(m=>[...m, { from:"bot", text:"¡Gracias por contarme! Ya tengo una idea muy clara de tu potencial. 💛" }]);
        setStep(step+1);
      }
    }, 550);
  };

  const finished = step >= flow.length;
  const cur = flow[step];

  return (
    <div className="screen chat-screen" style={{background:"var(--wa-bg)"}}>
      <StatusBar/>
      {/* header tipo whatsapp */}
      <div className="chat-header row spread">
        <div className="row gap10">
          <button onClick={onClose} aria-label="Salir" style={{background:"none",border:"none",color:"#fff",padding:4}}>{I("back",{size:24})}</button>
          <Mascot size={42}/>
          <div className="chat-title"><div style={{fontWeight:800,whiteSpace:"nowrap"}}>Lucía</div><div className="chat-subtitle">tu guía · en línea</div></div>
        </div>
      </div>  

      {/* mensajes */}
      <div ref={endRef} className="grow chat-body">
        {msgs.map((m,idx)=>(
          <div key={idx} className={`fadein chat-row ${m.from==="me"?"out":"in"}`}>
            <div className={`chat-bubble ${m.from==="me"?"out":"in"}`}>
              {m.text}
              {m.from==="me" && <span>✓✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* inputs predefinidos (al tocar, se "envía") */}
      <div className="chat-bottom">
        {!finished ? (
          <>
            <div className="chat-prompt">Selecciona tu respuesta para enviarla:</div>
            <div className="chat-actions">
              {cur.options.map(o=>(
                <button key={o.id} className="chat-option row spread" onClick={()=>pick(o)}>
                  <span>{o.text}</span>{I("send",{size:20,color:"var(--orange-strong)"})}
                </button>
              ))}
            </div>
          </>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={onDone}>Ver mi resumen {I("arrow",{size:20})}</button>
        )}
      </div>
    </div>
  );
}

/* ---------- Resumen breve de lo conversado ---------- */
function ChatResumen({ onContinue, onClose }){
  const app = useApp(); const s = app.state;
  const skill = optById("skill", s.test.skill);
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <LessonBar value={80} onClose={onClose}/>
        <div className="eyebrow">En resumen</div>
        <h1 className="h1 mt8 mb20" style={{color:"var(--orange-strong)"}}>Lo que hablamos</h1>
        <div className="card shadow" style={{background:"#fff"}}>
          <p className="lead" style={{fontSize:"1.12rem"}}>
            Te sientes <b>{s.chat.level==="avanzado"?"toda una experta":s.chat.level==="intermedio"?"con confianza":"aprendiendo"}</b> con <b>{skill?.noun}</b>.
            Puedes dedicarle <b>{s.chat.time}</b> y lo que más quieres es <b>{s.chat.goal}</b>.
          </p>
        </div>
        <p className="hint mt16">{I("shield",{size:18})} Guardamos esto para usarlo en el siguiente módulo. No tendrás que repetirlo.</p>
        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={onContinue}>Ver un caso real {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* ---------- Caso real multiformato ---------- */
function CasoReal({ onDone, onClose }){
  const c = window.DATA.CASO_M1;
  const app = useApp();
  const completed = app.state.completed.m1;
  return (
    <div className="screen"><StatusBar/>
      <div className="pad fadein">
        <LessonBar value={92} onClose={onClose}/>
        <div className="eyebrow">Caso real · te puede inspirar</div>
        <h1 className="h1 mt8 mb4" style={{color:"var(--orange-strong)"}}>{c.titulo}</h1>
        <div className="row gap8 muted body mb20" style={{fontWeight:700}}>{I("user",{size:18})} {c.nombre} · {c.lugar}</div>
        <FormatBlock media={c.media} texto={c.texto}/>
        <div className="grow"/>
        {completed
          ? <button className="btn btn-primary btn-lg mt24" onClick={onClose}>Volver al inicio {I("arrow",{size:20})}</button>
          : <button className="btn btn-primary btn-lg mt24" onClick={onDone}>Terminar módulo {I("check",{size:20})}</button>
        }
      </div>
    </div>
  );
}

/* ---------- Orquestador del Módulo 1 ---------- */
function Module1(){
  const app = useApp(); const nav = window.useNav();
  const m = window.DATA.MODULES[0];
  const [step,setStep] = useState("antesala");
  const close = ()=> nav.tab("home");
  const finish = ()=>{
    if(!app.state.completed.m1){ app.addStars(5); app.completeModule("m1"); }
    setStep("congrats");
  };
  switch(step){
    case "antesala": return <Antesala m={m} onBack={close} onStart={()=>setStep("test")}/>;
    case "test":     return <SkillTest onClose={close} onDone={()=>setStep("result")}/>;
    case "result":   return <TestResult onClose={close} onContinue={()=>{ app.saveM1Progress({ result:true }); setStep("chat"); }}/>;
    case "chat":     return <Conversemos onClose={close} onDone={()=>setStep("resumen")}/>;
    case "resumen":  return <ChatResumen onClose={close} onContinue={()=>{ app.saveM1Progress({ summary:true }); setStep("caso"); }}/>;
    case "caso":     return <CasoReal onClose={close} onDone={()=>{ app.saveM1Progress({ caso:true }); finish(); }}/>;
    case "congrats": return <Congrats stars={5} title="¡Felicidades!" subtitle={`${app.state.name}, completaste el Módulo 1. Acabas de desbloquear el Módulo 2: Define tu idea.`}
                        primaryLabel="Continuar al Módulo 2" onPrimary={()=>nav.go("m2")}
                        secondaryLabel="Volver al inicio" onSecondary={close}/>;
    default: return null;
  }
}

Object.assign(window, { LessonBar, Antesala, optById, Module1 });
