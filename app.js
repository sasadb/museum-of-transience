const D=window.MUSEUM,N=window.NOTES||{},CN=window.CURATOR_NOTE||'',A=D.A,R=D.ROOMS;
const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const ps=t=>t.split('\n\n').map(p=>`<p>${e(p)}</p>`).join('');
const rv=(h,c='')=>`<div class="rv ${c}">${h}</div>`;
const notes=k=>{const n=N[k]||{};const r=[['Tool',n.tool],['Prompt',n.prompt],['What the AI got wrong',n.flaw]].filter(x=>x[1]);
  return r.length?`<details class="notes"><summary>Conservation notes</summary><dl>${r.map(([l,v])=>`<dt>${l}</dt><dd>${e(v)}</dd>`).join('')}</dl></details>`:''};
const plaque=(name,medium,title,body,key)=>`<div class="plaque"><p class="name">${e(name)}</p><p class="medium">${e(medium)}</p><h3>${e(title)}</h3><div class="body">${body}${notes(key)}</div></div>`;
const obj=(o,i)=>{
  const m=o.img?`<img src="${o.img}" alt="${e(o.name+', '+o.medium)}" loading="lazy">`
   :`<div class="mv"><model-viewer src="${o.glb}" alt="${e(o.name)}" camera-controls touch-action="pan-y" shadow-intensity="0.7" loading="lazy" tabindex="0" aria-label="${e(o.name)}. 3D model. Drag to rotate."></model-viewer><span class="hint">Drag to inspect</span></div>`;
  return `<article class="obj ${i%2?'alt':''}">${rv(m,'media')}${rv(plaque(o.name,o.medium,o.title,ps(o.text),o.name),'txt')}</article>`};
const flip=x=>`<div class="fa"><button class="flip" aria-pressed="false" data-label="${e(x.label)}" aria-label="${e(x.label)}. Showing the front. Activate to view the back." style="aspect-ratio:${x.aspect}"><span class="fi"><img src="${x.pair[0]}" alt="${e(x.alt)} (front)" loading="lazy"><img class="bk" src="${x.pair[1]}" alt="${e(x.alt)} (back)" loading="lazy"></span></button><p class="cap">${e(x.label)}</p><p class="ins" aria-hidden="true">Flip to view back</p></div>`;
const pair=(o,items)=>`<div class="pair">${rv(plaque(o.name,o.medium,o.title,ps(o.text)))}${rv(items.map(flip).join(''),'fl')}</div>`;
const room=(i,inner,dark)=>`<section id="room-${R[i].n}" data-room="${R[i].n}" class="room ${dark?'dark':''}">${rv(`<p class="eyebrow">Room ${R[i].n}</p><h2>${e(R[i].title)}</h2><p class="sub">${e(R[i].sub)}</p>`,'rh')}<div class="stack">${inner}</div></section>`;
const n=A.trains.length;
const tix=A.trains.map((s,i)=>`<li><button class="tk" data-i="${i}" aria-label="Open train ticket ${i+1} of ${n}"><span class="tkf"><img src="${s}" alt="Train ticket ${i+1}" loading="lazy"></span><span class="tkn">No. ${String(i+1).padStart(2,'0')} · View</span></button></li>`).join('');
const gl=A.tiktok.map((s,k)=>`<figure class="gl"><div class="gli"><img src="${s}" alt="TikTok screenshot ${k+1}, corrupted into glitch art" loading="lazy"><img class="g1" src="${s}" alt="" aria-hidden="true"><img class="g2" src="${s}" alt="" aria-hidden="true"></div></figure>`).join('');
const T=D.TIKTOK,S=D.SPOTIFY;
document.getElementById('app').innerHTML=
`<header class="hero"><img class="hbg" src="${A.indomie}" alt="" aria-hidden="true"><h1>The Museum<br><em>of</em> Transience</h1><p class="tag">A personal collection<br>of things that do not stay.</p><a class="enter" href="#intro">Enter the collection →</a></header>
<section id="intro" class="intro">${D.INTRO.map((p,i)=>rv(`<p class="${i==4?'mut':''}">${e(p)}</p>`)).join('')}</section>`
+room(0,D.ROOM1.map(obj).join(''))
+room(1,`<div>${rv(`<h3 style="font:400 clamp(2.2rem,4vw,3rem)/1.05 var(--d);margin-bottom:3rem">${e(D.TRAIN_TITLE)}</h3>`)}<ul class="tg">${tix}</ul>${rv(D.TRAIN_TEXT.map(p=>`<p>${e(p)}</p>`).join(''),'long')}</div>
<div class="tt">${rv(plaque('TikTok Belajar Bahasa',T.medium,T.title,T.text.map(p=>`<p>${e(p)}</p>`).join(''),'TikTok Belajar Bahasa'))}${rv(`<div class="gls">${gl}</div>`)}</div>`)
+room(2,`<div class="sp">${rv(plaque(S.name,S.medium,S.title,ps(S.text)))}${rv(`<iframe data-testid="embed-iframe" style="border-radius:12px" title="Twelve Songs, Twelve Months, Spotify playlist" src="https://open.spotify.com/embed/playlist/5WgnnjciGyI7TqGd3oWr9T?utm_source=generator&si=19ea497c164a48ec" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`)}</div>`
 +pair(D.SLOGANS,[{label:'Jaehyun Fancon slogan',alt:'Jaehyun fancon slogan',pair:A.slogan.jaehyun,aspect:'3/4'},{label:'NCT DREAM slogan',alt:'NCT DREAM encore slogan',pair:A.slogan.nct,aspect:'4/3'}])
 +pair(D.TICKETS,[{label:'Jaehyun Fancon ticket',alt:'Jaehyun fancon ticket',pair:A.ticket.jaehyun,aspect:'4/3'},{label:'NCT DREAM ticket',alt:'NCT DREAM encore ticket',pair:A.ticket.nct,aspect:'3/4'}]),true)
+room(3,D.ROOM4.map(obj).join(''))
+(CN?`<section class="cn"><div>${rv(`<p class="eyebrow">Curator’s note</p><h2>On making this with AI</h2>${ps(CN)}`)}</div></section>`:'')
+`<footer class="outro">${D.OUTRO.map((p,i)=>rv(`<p class="${i?'mut':''}">${e(p)}</p>`)).join('')}${rv('<p class="sig">The Museum of Transience</p>')}</footer>`;
document.getElementById('nav').innerHTML=R.map(r=>`<a href="#room-${r.n}" aria-label="Room ${r.n}: ${e(r.title)}">${r.n}</a>`).join('');

// flip: one click turns the object over; click again to flip back
document.addEventListener('click',ev=>{
  const f=ev.target.closest('.flip');
  if(f){const b=f.classList.toggle('is-back');f.setAttribute('aria-pressed',b);
    f.setAttribute('aria-label',`${f.dataset.label}. ${b?'Showing the back. Activate to flip back.':'Showing the front. Activate to view the back.'}`);
    f.parentElement.querySelector('.ins').textContent=b?'Flip back':'Flip to view back';return}
  const t=ev.target.closest('.tk'),dlg=document.getElementById('dlg');
  if(t){const i=+t.dataset.i;
    dlg.innerHTML=`<button class="x" aria-label="Close" autofocus>✕</button><div class="dg"><div class="dimg"><img src="${A.trains[i]}" alt="Train ticket ${i+1}, full image"><span class="stamp" aria-hidden="true">USED</span></div><div class="dtx"><p class="eyebrow">Ticket ${i+1} of ${n}</p><p style="margin-top:1rem">${e(D.TRAIN_TEXT[0])}</p></div></div>`;
    dlg.showModal();return}
  if(ev.target.closest('.x')||ev.target===dlg)dlg.close();
});
// slow reveal while scrolling + highlight current room in the nav
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{rootMargin:'0px 0px -12% 0px'});
document.querySelectorAll('.rv').forEach(x=>io.observe(x));
const no=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#room-'+x.target.dataset.room))),{threshold:.25});
document.querySelectorAll('[data-room]').forEach(x=>no.observe(x));
