/* ===== Onboarding: Loader, Bienvenida, ¿Cómo te llamas? ===== */

/* ---------- Loader (carga de marca) ---------- */
function Loader(){
  const nav = window.useNav(); const app = useApp();
  const [p,setP] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=> setP(v=> Math.min(100, v+4)), 60);
    return ()=> clearInterval(t);
  },[]);
  useEffect(()=>{
    if(p>=100){ const to=setTimeout(()=> nav.replace(app.state.onboarded? "home":"welcome"), 350); return ()=>clearTimeout(to); }
  },[p]);
  return (
    <div className="screen" style={{background:"--cream"}}>
      <StatusBar light/>
      <div className="pad" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center"}}>
        <div style={{width:130,height:130,borderRadius:30,marginBottom:20}}>
          <img src="Media/Logo.png" style={{width:"100%",height:"100%", objectFit:"contain"}}/>
        </div>
        <div className="bar" style={{width:200,marginTop:0,background:"rgba(211,126,59,.35)"}}>
          <i style={{width:p+"%",background:"--ink"}}/>
        </div>
      </div>
    </div>
  );
}

/* ---------- Bienvenida (la guía anticipa lo que va a lograr) ---------- */
function Welcome(){
  const nav = window.useNav();
  const benefits = [
    { icon:"star", t:"Descubre tu fortaleza", d:"Veremos juntas eso que ya sabes hacer muy bien." },
    { icon:"idea",    t:"Tu experiencia cuenta", d:"Aterrizamos tu idea de negocio paso a paso." },
    { icon:"grid",    t:"Aprende sin afán", d:"Con videos, audios y texto cortos. A tu propio ritmo." },
  ];
  return (
    <div className="screen"><StatusBar/>
      <div className="pad" style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div className="row gap12 mt12" style={{alignItems:"flex-start"}}>
          <div style={{flex:"0 0 auto"}}><Mascot size={84}/></div>
          <div className="bubble tip-left" style={{marginTop:8}}>
            <b>¡Hola! Soy Lucía.</b><br/>Voy a acompañarte en todo el camino. Esto es lo que vas a lograr:
          </div>
        </div>

        <div className="stack gap12 mt28">
          {benefits.map((b,i)=>(
            <div className="card row gap16 fadein" key={i} style={{animationDelay:(i*0.1)+"s"}}>
              <div className="mascot" style={{width:56,height:56,borderRadius:16,background:"#FCEFE0",color:"var(--orange-strong)",flex:"0 0 auto"}}>{I(b.icon,{size:28})}</div>
              <div><div className="h3">{b.t}</div><div className="muted body">{b.d}</div></div>
            </div>
          ))}
        </div>

        <div className="grow"/>
        <button className="btn btn-primary btn-lg mt24" onClick={()=>nav.replace("name")}>Continuar {I("arrow",{size:20})}</button>
      </div>
    </div>
  );
}

/* ---------- ¿Cómo te llamas? ---------- */
function AskName(){
  const nav = window.useNav(); const app = useApp();
  const [name,setName] = useState(app.state.name||"");
  const valid = name.trim().length>=1;
  const submit = ()=>{ if(!valid) return; app.finishOnboarding(name.trim()); nav.tab("home"); };
  return (
    <div className="screen"><StatusBar/>
      <div className="pad" style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:84,height:84,borderRadius:20,background:"transparent",marginBottom:24,display:"grid",placeItems:"center"}}>
          <img src="Media/Logo.png" alt="Vea mijito" style={{width:"100px",height:"100px",objectFit:"contain"}} />
        </div>
        <h1 className="h1 center" style={{color:"var(--orange-strong)",fontSize:"24px",marginBottom:0}}>¿Cómo te llamas?</h1>
        <p className="lead center" style={{color:"var(--blue)",fontSize:"16px", marginTop:0}}>Personaliza tu experiencia</p>

        <div style={{width:"80%",maxWidth:300,marginTop:4}}>
          <label className="sr-only" htmlFor="nm">Tu nombre</label>
          <input id="nm" className="field name-field center" style={{textAlign:"center",fontWeight:100}}
            value={name} onChange={e=>setName(e.target.value)} placeholder="Escribe tu nombre"
            onKeyDown={e=>{ if(e.key==="Enter") submit(); }} autoComplete="given-name"/>
          <p className="hint" style={{justifyContent:"center"}}>
            {I(valid?"check":"pencil",{size:24})} {valid? "¡Listo! Ya puedes continuar.":"Escribe tu nombre para continuar"}
          </p>
          {valid && <button className="btn btn-blue btn-lg mt16" onClick={submit}>Continuar</button>}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Loader, Welcome, AskName });
