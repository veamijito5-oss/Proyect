/* ===== Navegación + montaje raíz ===== */
const NavCtx = React.createContext(null);
window.useNav = () => React.useContext(NavCtx);

const SCREENS = {
  loader:  ()=> <Loader/>,
  welcome: ()=> <Welcome/>,
  name:    ()=> <AskName/>,
  home:    ()=> <Home/>,
  parati:  ()=> <ParaTi/>,
  alarmas: ()=> <Alarmas/>,
  notas:   ()=> <Notas/>,
  ajustes: ()=> <Ajustes/>,
  notif:   ()=> <NotifScreen/>,
  m1:      ()=> <Module1/>,
  m2:      ()=> <Module2/>,
  m3:      ()=> <Module3/>,
};

function Router(){
  const [stack,setStack] = React.useState([{ screen:"loader" }]);
  const nav = React.useMemo(()=>({
    go:(screen)=> setStack(s=>[...s, {screen}]),
    replace:(screen)=> setStack(s=>[...s.slice(0,-1), {screen}]),
    back:()=> setStack(s=> s.length>1? s.slice(0,-1) : s),
    tab:(screen)=> setStack([{screen}]),
  }),[]);
  const top = stack[stack.length-1];
  const render = SCREENS[top.screen] || SCREENS.home;
  return (
    <NavCtx.Provider value={nav}>
      <div className="stage"><div className="phone">{render()}</div></div>
    </NavCtx.Provider>
  );
}

function Root(){
  return (
    <AppProvider>
      <Router/>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root/>);
