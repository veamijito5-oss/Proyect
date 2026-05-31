/* ===== Home · Para ti · Bottom navigation ===== */

function BottomNav({ active }){
  const nav = window.useNav();
  const items = [
    { id:"home",    label:"Inicio",  icon:"home" },
    { id:"parati",  label:"Para ti", icon:"play" },
    { id:"alarmas", label:"Alarmas", icon:"alarm" },
    { id:"notas",   label:"Notas",   icon:"note" },
  ];
  return (
    <nav className="bottomnav" aria-label="Navegación principal">
      {items.map(it=>(
        <button key={it.id} className="navbtn" aria-current={active===it.id?"page":undefined}
          onClick={()=> nav.tab(it.id)}>
          <span className="navico">{I(it.icon,{size:24})}</span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}

function ModuleCard({ m }){
  const app = useApp(); const nav = window.useNav();
  const unlocked = app.isUnlocked(m.id);
  const completed = app.state.completed[m.id];
  const prog = app.moduleProgress(m.id);
  const [nudge,setNudge] = useState(false);
  const previewSrc = m.id === "m1" ? "Media/H_M1.png" : m.id === "m2" ? "Media/H_M2.png" : "Media/H_M3.png";
  const locked = !unlocked;

  const open = ()=>{
    if(locked){ setNudge(true); setTimeout(()=>setNudge(false),2600); return; }
    nav.go(m.id);
  };

  return (
    <div className={`card shadow module-card${completed?" complete":""}${locked?" locked":""}`} style={{opacity:unlocked?1:.96}}>
      <div className="row" style={{alignItems:"stretch"}}>
        <div className="module-card__image" style={{background: unlocked? "none":"rgba(71,85,105,.05)"}}>
          <img src={previewSrc} alt={`Vista previa del Módulo ${m.n}`} style={{width:"100%",height:"100%",objectFit:"cover"}} />
          {locked && <div className="module-card__lock-overlay" aria-hidden="true">{I("lock",{size:24})}</div>}
        </div>
        <div className="grow module-card__body">
          <div>
            <div className="eyebrow" style={{color: locked ? "var(--disable)" : "var(--blue)"}}>MÓDULO {m.n}</div>
            <div className="h2" style={{margin:"8px 0 8px",color: locked ? "var(--disable)" : "var(--orange-strong)"}}>{m.title}</div>
            <div className="muted body" style={{color: locked ? "var(--disable)" : "var(--orange-strong)"}}>{m.sub}</div>
          </div>
          <div style={{marginTop:16}}>
            {completed
              ? <button className="btn btn-soft btn-sm" onClick={open}>{I("checkc",{size:18})} Repasar</button>
              : unlocked
                ? <button className="btn btn-primary btn-sm" onClick={open}>{prog>0?"Continuar":"Empezar"} {I("arrow",{size:18})}</button>
                : <span className="badge badge-lock">{I("lock",{size:16})} Bloqueado</span>}
          </div>
        </div>
      </div>
      <div className="module-card__footer">
        <div className="module-card__progress">
          <span>{locked ? 0 : Math.round(prog)}%</span>
          <div className="bar"><i style={{width:(locked ? 0 : prog)+"%"}}/></div>
        </div>
      </div>
      {nudge && <div className="badge badge-lock" role="status" style={{margin:"0 16px 14px",width:"calc(100% - 32px)",justifyContent:"center",padding:"10px"}}>
        {I("lock",{size:16})} Primero termina el Módulo {m.n-1} para abrir este.
      </div>}
    </div>
  );
}

function Home(){
  const app = useApp(); const nav = window.useNav();
  const s = app.state;
  const done = ["m1","m2","m3"].filter(k=>s.completed[k]).length;
  const initial = (s.name||"?").trim().charAt(0).toUpperCase();
  const formats = [
    { icon:"video", label:"Video", dur:"2 min" },
    { icon:"audio", label:"Audio", dur:"2 min" },
    { icon:"text",  label:"Texto", dur:"3 min" },
  ];
  return (
    <div className="screen has-nav"><StatusBar/>
      <div className="pad fadein">
        {/* header */}
        <div className="row spread" style={{marginBottom:18}}>
          <div className="row gap12">
            <div className="mascot" style={{width:54,height:54,borderRadius:"50%",fontWeight:800,fontSize:"1.4rem"}}>{initial}</div>
            <div>
              <div className="muted body" style={{lineHeight:1}}>Hola,</div>
              <div className="h2" style={{color:"var(--orange-strong)"}}>{s.name||"Bienvenida"}</div>
            </div>
          </div>
          <div className="row gap8">
            <button className="mascot" aria-label="Notificaciones" onClick={()=>nav.go("notif")}
              style={{width:48,height:48,borderRadius:14,background:"none",border: "none", color:"var(--orange-strong)"}}>{I("bell",{size:24})}</button>
            <button className="mascot" aria-label="Ajustes" onClick={()=>nav.go("ajustes")}
              style={{width:48,height:48,borderRadius:14,background:"none", border: "none", color:"var(--orange-strong)"}}>{I("settings",{size:24})}</button>
          </div>
        </div>

        {/* estrellas + racha */}
        <div className="row gap8 mb16">
          <span className="chip">{I("star",{size:20,color:"#DFD028"})} {s.stars} estrellas</span>
          <span className="chip">{I("bolt",{size:18,color:"#DFD028"})} 1 día de racha</span>
        </div>

        {/* progreso */}
        <div className="card mb24">
          <div className="eyebrow mb8">Tu progreso</div>
          <div className="h3 mb12">{done} de 3 módulos completados</div>
          <div className="bar"><i style={{width:(done/3*100)+"%"}}/></div>
        </div>

        <h2 className="h2" style={{color:"var(--orange-strong)"}}>Ruta de emprendimiento</h2>
        <p className="lead muted mt8 mb20">Avanza a tu tiempo. Cada módulo que completes desbloquea el siguiente.</p>

        <div className="stack gap16">
          {window.DATA.MODULES.map(m=> <ModuleCard key={m.id} m={m}/>)}
        </div>
    
      </div>
      <BottomNav active="home"/>
    </div>
  );
}

function ParaTi(){
  const nav = window.useNav();
  return (
    <div className="screen has-nav"><StatusBar/>
      <div className="pad fadein">
        <h1 className="h1 mb8" style={{color:"var(--orange-strong)"}}>Para ti</h1>
        <p className="lead muted mb20">Desliza para conocer historias reales. Te pueden inspirar.</p>
        <div className="stack gap20">
          {window.DATA.PARA_TI.map(c=>(
            <div key={c.id} className="card shadow" style={{padding:0,overflow:"hidden"}}>
              <div className="media-ph" style={{aspectRatio:"4/3",width:"100%"}}>
                {/* BACKEND: Esta imagen se reemplaza con c.imageSrc de data.jsx para cada item.
                    - p1 (Video):  edita PARA_TI[0].imageSrc en data.jsx
                    - p2 (Audio):  edita PARA_TI[1].imageSrc en data.jsx
                    - p3 (Texto):  edita PARA_TI[2].imageSrc en data.jsx
                */}
                <img src={c.imageSrc} alt={c.nombre} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <span className="badge" style={{position:"absolute",top:12,left:12,background:"rgba(28,58,92,.9)",color:"#fff"}}>{I(c.icon,{size:16})} {c.formato} · {c.dur}</span>
                <button className="mascot" aria-label={"Reproducir historia de "+c.nombre} style={{position:"absolute",bottom:12,right:12,width:56,height:56,borderRadius:"50%",background:"var(--orange)",border:"none"}}>{I(c.icon==="text"?"text":"play",{size:26,color:"#fff"})}</button>
              </div>
              <div style={{padding:"16px 18px 18px"}}>
                <div className="h2">{c.titulo}</div>
                <p className="lead mt8 mb12">{c.blurb}</p>
                <div className="row gap8 muted body" style={{fontWeight:700}}>
                  {I("user",{size:18})} {c.nombre} · {c.edad} · {c.lugar}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="parati"/>
    </div>
  );
}

Object.assign(window, { BottomNav, Home, ParaTi });
