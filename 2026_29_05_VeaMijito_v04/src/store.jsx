/* ===== Estado global + persistencia real (localStorage) ===== */
const STORE_KEY = "veamijito_v1";

const DEFAULT_STATE = {
  onboarded:false,          // pasó la pantalla de nombre
  name:"",
  fontSize:"med",           // sm | med | lg
  stars:0,
  reminder:{ on:true, hour:9, min:0, period:"AM" },
  completed:{ m1:false, m2:false, m3:false },
  m1:{ result:false, summary:false, caso:false },
  // Módulo 1
  test:{ skill:null, audience:null, years:null, channel:null },
  chat:{ level:null, time:null, goal:null },
  // Módulo 2
  idea:{ que:"", quien:"", como:"" },
  // Módulo 3
  canvasIdea:"",
  // Unsaved notes tracking per module (used to warn before leaving)
  unsavedNotes: {},
  // Notas: {id, module, text, ts}
  notes:[],
};

const FS_MAP = { sm:0.9, med:1, lg:1.18 };

function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return {...DEFAULT_STATE};
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  }catch(e){ return {...DEFAULT_STATE}; }
}

const AppCtx = React.createContext(null);
const useApp = () => React.useContext(AppCtx);

function AppProvider({ children }){
  const [state, setState] = React.useState(loadState);

  // persistir
  React.useEffect(()=>{
    try{ localStorage.setItem(STORE_KEY, JSON.stringify(state)); }catch(e){}
  }, [state]);

  // aplicar escala de letra global
  React.useEffect(()=>{
    document.documentElement.style.setProperty("--fs", FS_MAP[state.fontSize] || 1);
  }, [state.fontSize]);

  const patch = (p) => setState(s => ({ ...s, ...(typeof p==="function"? p(s): p) }));

  const actions = {
    setName:(name)=> patch({ name }),
    finishOnboarding:(name)=> patch({ name, onboarded:true }),
    setFontSize:(fontSize)=> patch({ fontSize }),
    setReminder:(reminder)=> patch(s=>({ reminder:{...s.reminder, ...reminder} })),
    addStars:(n)=> patch(s=>({ stars:s.stars + n })),
    completeModule:(m)=> patch(s=>({ completed:{...s.completed, [m]:true} })),
    saveTest:(test)=> patch(s=>({ test:{...s.test, ...test} })),
    saveChat:(chat)=> patch(s=>({ chat:{...s.chat, ...chat} })),
    saveM1Progress:(progress)=> patch(s=>({ m1:{...s.m1, ...progress} })),
    saveIdea:(idea)=> patch(s=>({ idea:{...s.idea, ...idea} })),
    saveCanvasIdea:(canvasIdea)=> patch({ canvasIdea }),
    setUnsavedNote:(module, val)=> patch(s=>({ unsavedNotes:{...s.unsavedNotes, [module]: !!val} })),
    // notas
    addNote:(module, text)=> patch(s=>({ notes:[...s.notes, { id:"n"+Date.now()+Math.random().toString(36).slice(2,6), module, text, ts:Date.now() }] })),
    updateNote:(id, text)=> patch(s=>({ notes:s.notes.map(n=> n.id===id? {...n, text, ts:Date.now()} : n) })),
    deleteNote:(id)=> patch(s=>({ notes:s.notes.filter(n=> n.id!==id) })),
    reset:()=>{ try{ localStorage.removeItem(STORE_KEY); }catch(e){}; setState({...DEFAULT_STATE}); },
  };

  // helpers de progreso (derivados)
  const moduleProgress = (m)=>{
    const s = state;
    if(m==="m1"){
      if(s.completed.m1) return 100;
      let done=0;
      const t = s.test;
      if(t.skill) done++;
      if(t.audience) done++;
      if(t.years) done++;
      if(t.channel) done++;
      if(s.chat.level) done++;
      if(s.chat.time) done++;
      if(s.chat.goal) done++;
      if(s.m1.result) done++;
      if(s.m1.summary) done++;
      if(s.m1.caso) done++;
      return done * 10;
    }
    if(m==="m2"){
      if(s.completed.m2) return 100;
      const i=s.idea; let f=0; if(i.que)f++; if(i.quien)f++; if(i.como)f++;
      return Math.round((f/4)*100);
    }
    if(m==="m3"){
      if(s.completed.m3) return 100;
      return s.canvasIdea? 60 : 10;
    }
    return 0;
  };

  const isUnlocked = (m)=>{
    if(m==="m1") return true;
    if(m==="m2") return state.completed.m1;
    if(m==="m3") return state.completed.m2;
    return false;
  };

  return (
    <AppCtx.Provider value={{ state, ...actions, moduleProgress, isUnlocked }}>
      {children}
    </AppCtx.Provider>
  );
}

window.AppProvider = AppProvider;
window.useApp = useApp;
window.FS_MAP = FS_MAP;
