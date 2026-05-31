/* ===== Iconos SVG inline — repertorio coherente (1 concepto = 1 icono) ===== */
const Ic = {};
const mk = (path, opts={}) => ({size=24,color="currentColor",stroke=2,...rest}={}) =>
  <svg width={size} height={size} viewBox="0 0 24 24" fill={opts.fill?color:"none"}
       stroke={opts.fill?"none":color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true" {...rest}>{path}</svg>;

Ic.home   = mk(<><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-5h5v5"/></>);
Ic.heart  = mk(<path d="M12 20s-7-4.6-9.2-8.4C1.4 9 2.3 6 5.2 6c1.8 0 2.9 1 3.8 2.2C9.9 7 11 6 12.8 6 15.7 6 16.6 9 14.2 11.6 12 15 12 15 12 20Z" fill="currentColor" stroke="none"/>);
Ic.gear   = mk(<><circle cx="12" cy="12" r="3.2"/><path d="M12 3v2.5M12 18.5V21M4.5 7l1.8 1.8M17.7 15.2 19.5 17M3 12h2.5M18.5 12H21M4.5 17l1.8-1.8M17.7 8.8 19.5 7"/></>);
Ic.star   = mk(<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/>, {fill:true});
Ic.starline = mk(<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z"/>);
Ic.bolt   = mk(<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>, {fill:true});
Ic.lock   = mk(<><rect x="5" y="10.5" width="14" height="9.5" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></>);
Ic.check  = mk(<path d="M5 12.5 10 17.5 19.5 7"/>);
Ic.checkc = mk(<><circle cx="12" cy="12" r="9"/><path d="M8 12.2l2.8 2.8L16 9"/></>);
Ic.arrow  = mk(<><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>);
Ic.back   = mk(<><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>);
Ic.play   = mk(<path d="M7 4.5v15l13-7.5-13-7.5Z"/>, {fill:true});
Ic.pause  = mk(<><rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none"/></>);
Ic.video  = mk(<><rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10l5-3v10l-5-3"/></>);
Ic.audio  = mk(<><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z"/><path d="M6 11a6 6 0 0 0 12 0"/><path d="M12 17v4"/></>);
Ic.volume = mk(<><path d="M5 9v6h4l5 5V4L9 9H5Z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/></>);
Ic.volumeOff = mk(<><path d="M5 9v6h4l5 5V4L9 9H5Z" /><path d="M17 9l6 6" /><path d="M23 9l-6 6" /></>);
Ic.text   = mk(<><path d="M5 5h14"/><path d="M5 10h14"/><path d="M5 15h9"/><path d="M5 20h6"/></>);
Ic.note   = mk(<><path d="M5 3.5h9L19 8v12.5H5z"/><path d="M14 3.5V8h5"/><path d="M8 13h7M8 16.5h5"/></>);
Ic.notes  = Ic.note;
Ic.pencil = mk(<><path d="M4 20l4-1 10-10-3-3L5 16l-1 4Z"/><path d="M14 6l3 3"/></>);
Ic.clock  = mk(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>);
Ic.alarm  = mk(<><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M5 3 2.5 5.5M19 3l2.5 2.5"/></>);
Ic.camera = mk(<><path d="M4 8.5h3l1.5-2.2h7L17 8.5h3v10H4z"/><circle cx="12" cy="13" r="3.2"/></>);
Ic.mic    = mk(<><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v4"/></>);
Ic.send   = mk(<path d="M4 12 20 4l-5 16-3.5-6.5L4 12Z"/>);
Ic.chat   = mk(<path d="M4 5h16v11H9l-4 3.5V16H4z"/>);
Ic.whatsapp = mk(<><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></>);
Ic.smile  = mk(<><circle cx="12" cy="12" r="9"/><path d="M8.5 14c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8"/><circle cx="9" cy="10" r="1.1" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r="1.1" fill="currentColor" stroke="none"/></>);
Ic.user   = mk(<><circle cx="12" cy="8.5" r="3.8"/><path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6"/></>);
Ic.shield = mk(<><path d="M12 3 5 6v6c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3Z"/><path d="M9 12l2 2 4-4"/></>);
Ic.trash  = mk(<><path d="M5 7h14"/><path d="M9 7V5h6v2"/><path d="M7 7l1 13h8l1-13"/></>);
Ic.help   = mk(<><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7"/><circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none"/></>);
Ic.eye    = mk(<><path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.8"/></>);
Ic.aletter= mk(<><path d="M6 19l5-13 5 13"/><path d="M7.8 14.5h6.4"/></>);
Ic.plus   = mk(<><path d="M12 5v14M5 12h14"/></>);
Ic.warn   = mk(<><path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v5"/><circle cx="12" cy="17.6" r="1" fill="currentColor" stroke="none"/></>);
Ic.idea   = mk(<><path d="M9 17h6"/><path d="M9.5 20h5"/><path d="M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1-1 2H9c0-1-.3-1.4-1-2A6 6 0 0 1 12 3Z"/></>);
Ic.grid   = mk(<><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></>);
Ic.close  = mk(<><path d="M6 6l12 12M18 6 6 18"/></>);
Ic.bag    = mk(<><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>);
Ic.refresh= mk(<><path d="M20 11a8 8 0 0 0-14-4.5L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14 4.5L20 16"/><path d="M20 20v-4h-4"/></>);
Ic.wifi   = mk(<><path d="M2 8.5C6 5 18 5 22 8.5M5 12c4-3 10-3 14 0M8.5 15.5c2-1.6 5-1.6 7 0"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></>);
Ic.battery= mk(<><rect x="2" y="8" width="18" height="8" rx="2"/><path d="M22 11v2"/><rect x="4" y="10" width="12" height="4" rx="1" fill="currentColor" stroke="none"/></>);
Ic.signal = mk(<><rect x="3" y="14" width="3" height="6" rx="1" fill="currentColor" stroke="none"/><rect x="8" y="10" width="3" height="10" rx="1" fill="currentColor" stroke="none"/><rect x="13" y="6" width="3" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="18" y="3" width="3" height="17" rx="1" fill="currentColor" stroke="none"/></>);
Ic.book   = mk(<><path d="M4 5c2-1 6-1 8 .5C14 4 18 4 20 5v14c-2-1-6-1-8 .5C10 18 6 18 4 19V5Z"/><path d="M12 5.5v14"/></>);
Ic.sun    = mk(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.5 4.5 6.3 6.3M17.7 17.7l1.8 1.8M19.5 4.5 17.7 6.3M6.3 17.7 4.5 19.5"/></>);
Ic.moon   = mk(<path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"/>);
Ic.target = mk(<><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></>);
Ic.fullscreen = mk(<><path d="M8 3H6a3 3 0 0 0-3 3v2"/><path d="M16 3h2a3 3 0 0 1 3 3v2"/><path d="M3 16v2a3 3 0 0 0 3 3h2"/> <path d="M21 16v2a3 3 0 0 1-3 3h-2"/></>)
Ic.tijeras = mk(<><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4 8.12 15.88" /><path d="M14.8 14.8 20 20" /><path d="M8.12 8.12 12 12" /></>);
Ic.plant = mk(<><path d="M7 15h10v6H7Z" /> <path d="M12 11v4" /><path d="M12 11C12 7.5 8 5 3 5C3 9.5 7.5 11 12 11Z" /><path d="M12 11C12 7.5 16 5 21 5C21 9.5 16.5 11 12 11Z" /></>);
Ic.userheart = mk(<><circle cx="11" cy="7" r="4" /><path d="M4 21a7 7 0 0 1 7-7" /><path 
      d="M17.5 21.35l-.45-.42C15.4 19.33 14 18.06 14 16.5c0-1.28 1-2.3 2.25-2.3.7 0 1.37.33 1.75.85.38-.52 1.05-.85 1.75-.85 1.25 0 2.25 1.02 2.25 2.3 0 1.56-1.4 2.83-3.05 4.43l-.45.42z" fill="currentColor" stroke="none" /></>);
Ic.building = mk(<><path d="M2 21h20" /><path d="M4 21V4h10v17" /><path d="M16 10h2v11" /><path d="M7 8h4" /><path d="M7 12h4" /></>);
Ic.women = mk(<><circle cx="12" cy="12" r="10" /><path d="M9 9h.01M15 9h.01" strokeWidth="3" strokeLinecap="round" /><path d="M8 13h8a4 4 0 0 1-8 0z" /></>);
Ic.people=mk(<><circle cx="12" cy="7" r="3"/><path d="M8 21v-4a4 4 0 0 1 8 0v4"/><circle cx="6" cy="12" r="2.2"/><path d="M3 21v-2a3 3 0 0 1 3-3h2"/><circle cx="18" cy="12" r="2.2"/><path d="M16 16h2a3 3 0 0 1 3 3v2"/></>);
Ic.gift= mk(<><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>);
Ic.family = mk(<><path d="m3 10 9-7 9 7"/><path d="M16 5V4h3v3"/><circle cx="12" cy="11" r="2"/><path d="M8 21v-4a4 4 0 0 1 8 0v4"/></>);
Ic.settings=mk(<><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></>);
Ic.bell= mk(<><path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><circle cx="18" cy="8" r="3" fill="currentColor" stroke="none"/></>);
window.Ic = Ic;
