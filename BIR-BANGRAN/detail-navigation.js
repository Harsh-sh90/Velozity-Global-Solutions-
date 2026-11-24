/* Shared responsive navigation for all detail pages */
(()=>{
 const nav=document.getElementById('mainNav'),btn=document.getElementById('menuButton'),overlay=document.getElementById('menuOverlay');
 if(!nav||!btn||btn.dataset.sharedNavBound==='1')return; btn.dataset.sharedNavBound='1';
 const setOpen=(open)=>{nav.classList.toggle('open',open);btn.classList.toggle('is-active',open);btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu');overlay?.classList.toggle('is-visible',open);overlay?.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open);};
 btn.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 overlay?.addEventListener('click',()=>setOpen(false));
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
 window.addEventListener('pageshow',()=>setOpen(false));
 window.addEventListener('resize',()=>{if(innerWidth>1150)setOpen(false)});
})();
