/* Core page effects: scroll progress, reveals, heading decode, crosshair, hero scene rotation. */
(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(q){return [].slice.call(document.querySelectorAll(q))};
var pad=function(n){return String(n).padStart(3,'0')};
var pg=document.querySelector('.prog'),bands=$('.band .img');
function onScroll(){var m=document.documentElement.scrollHeight-innerHeight;pg.style.transform='scaleX('+(m>0?Math.min(scrollY/m,1):0)+')';
 if(!rm)bands.forEach(function(b){var r=b.parentNode.getBoundingClientRect();if(r.bottom<-80||r.top>innerHeight+80)return;var v=(r.top+r.height/2-innerHeight/2)*-.12;b.style.setProperty('--py',Math.max(-60,Math.min(60,v))+'px')})}
var tk1=0;addEventListener('scroll',function(){if(!tk1)tk1=requestAnimationFrame(function(){tk1=0;onScroll()})},{passive:true});onScroll();
var links=$('.bar nav a');
var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
links.forEach(function(a){var t=document.querySelector(a.getAttribute('href'));if(t)so.observe(t)});
var G='ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&';
function decode(el){var t=el.dataset.t||(el.dataset.t=el.textContent),n=0,tot=16;
 var id=setInterval(function(){n++;var k=Math.floor(t.length*n/tot);el.textContent=t.split('').map(function(c,i){return i<k||c===' '?c:G[Math.random()*G.length|0]}).join('');if(n>=tot){clearInterval(id);el.textContent=t}},45)}
function count(b){var t=b.textContent,v=parseFloat(t),suf=t.replace(/[\d.]/g,''),dec=(t.split('.')[1]||'').replace(/\D/g,'').length,s0=performance.now();
 (function f(now){var k=Math.min((now-s0)/900,1),e=1-Math.pow(1-k,3);b.textContent=(v*e).toFixed(dec)+(k<1?'':suf);if(k<1)requestAnimationFrame(f)})(s0)}
$('.head,.metrics>div,.look,.sensors>div,.log>div,.about p,.chan>*').forEach(function(e){e.classList.add('rv');e.style.setProperty('--d',[].indexOf.call(e.parentNode.children,e)*70+'ms')});
var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;el.classList.add('in');ro.unobserve(el);
 if(rm)return;var h=el.querySelector('h2');if(h)decode(h);var b=el.matches('.metrics>div')&&el.querySelector('b');if(b)count(b)})},{threshold:0,rootMargin:'0px 0px -10% 0px'});
$('.rv').forEach(function(e){ro.observe(e)});
if(!rm){setTimeout(function(){decode(document.querySelector('h1'))},350)}
var hero=document.querySelector('.hero'),cx=document.querySelector('.cross');
if(!rm&&matchMedia('(pointer:fine)').matches){var tx=0,ty=0,x=0,y=0,lab=cx.querySelector('i');
 var run=false;function loop(){x+=(tx-x)*.18;y+=(ty-y)*.18;cx.style.transform='translate('+x+'px,'+y+'px)';if(Math.abs(tx-x)<.1&&Math.abs(ty-y)<.1){run=false;return}requestAnimationFrame(loop)}
 hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();tx=e.clientX-r.left;ty=e.clientY-r.top;cx.classList.add('on');if(!run){run=true;requestAnimationFrame(loop)}lab.textContent='X '+pad(tx|0)+' · Y '+pad(ty|0)});
 hero.addEventListener('mouseleave',function(){cx.classList.remove('on')});}

var sc=$('.scene'),segs=$('.segs b'),fl=document.querySelector('.flash'),cur=0,scn=document.getElementById('sc'),tcE=document.getElementById('tc');
var T=[{iw:2560,ih:2052,f:[.335,.172,.73,.378],py:.3,z:1.1,t:'FLYING CAR · 0.98',l:'JETS 4/4<br>ALT 12 M'},
{iw:1470,ih:980,f:[.395,.635,.47,.695],py:.78,z:1.9,t:'HEADLIGHTS · 0.94',l:'ID 0427 · LOCKED<br>RANGE 210 M'},
{iw:1471,ih:980,f:[.37,.4,.45,.5],py:.6,z:1.7,t:'OFFICE TOWER · 0.96',l:'LIT FLOORS<br>ACTIVITY · HIGH'},
{iw:1281,ih:1092,f:[.397,.295,.523,.412],py:.58,z:1.9,t:'TOWERS ×2 · 0.93',l:'RESIDENTIAL<br>WINDOWS LIT'},
{iw:1470,ih:981,f:[.78,.28,.84,.36],py:.55,z:1.6,t:'LANDMARK TOWER · 0.99',l:'GLASS FACADE<br>BEACON · ACTIVE'}];
sc.forEach(function(el,i){var b=document.createElement('div');b.className='box';b.innerHTML='<span class="tg">'+T[i].t+'</span><span class="ln">'+T[i].l+'</span>';el.appendChild(b)});
function layout(){var HH=hero.offsetHeight;sc.forEach(function(el,i){var t=T[i],W=el.offsetWidth,H=el.offsetHeight,top=el.offsetTop-24,k=Math.max(W/t.iw,H/t.ih),dw=t.iw*k,dh=t.ih*k,
 cx=(t.f[0]+t.f[2])/2,cy=(t.f[1]+t.f[3])/2,sx=W*.56,sy0=HH*.5-top,sy1=HH*.26-top,
 px=dw>W+1?Math.max(0,Math.min(1,(cx*dw-sx)/(dw-W)*-1*-1)):.5,
 py=dh>H+1?Math.max(0,Math.min(1,(cy*dh-sy0)/(dh-H))):.5,
 offx=(W-dw)*px,offy=(H-dh)*py,bx=offx+t.f[0]*dw,by=offy+t.f[1]*dh,bw=(t.f[2]-t.f[0])*dw,bh=(t.f[3]-t.f[1])*dh,b=el.querySelector('.box');
 el.style.backgroundPosition=(px*100)+'% '+(py*100)+'%';
 b.style.left=bx+'px';b.style.top=by+'px';b.style.width=bw+'px';b.style.height=bh+'px';
 var ox=bx+bw/2,oy=by+bh/2,z=t.z;el.style.transformOrigin=ox+'px '+oy+'px';
 var dx=Math.max(-(z-1)*(W-ox),Math.min((z-1)*ox,sx-ox)),dy=Math.max(-(z-1)*(H-oy),Math.min((z-1)*oy,sy1-oy));
 el.style.setProperty('--dx',dx+'px');el.style.setProperty('--dy',dy+'px');el.style.setProperty('--zs',z)})}
layout();addEventListener('resize',layout);addEventListener('load',layout);

if(!rm){
 var heroVis=true;if('IntersectionObserver' in window)new IntersectionObserver(function(e){heroVis=e[0].isIntersecting;document.documentElement.classList.toggle('hero-off',!heroVis)}).observe(hero);
 setInterval(function(){if(!heroVis||document.hidden)return;var n=(cur+1)%sc.length,pv=sc[cur];pv.classList.remove('on');pv.classList.add('out');setTimeout(function(){pv.classList.remove('out')},1500);
  var nx=sc[n];nx.classList.remove('out');void nx.offsetWidth;nx.classList.add('on');
  segs.forEach(function(g,i){g.className=i<n?'done':'';});void segs[n].offsetWidth;segs[n].className='on';
  fl.classList.remove('go');void fl.offsetWidth;fl.classList.add('go');cur=n;scn.textContent=n+1},6500);
 var t0=Date.now();setInterval(function(){if(!heroVis||document.hidden)return;var q=Math.floor((Date.now()-t0)/1000),z=function(v){return String(v).padStart(2,'0')};tcE.textContent=z(Math.floor(q/3600))+':'+z(Math.floor(q/60)%60)+':'+z(q%60)},1000);
 if(matchMedia('(pointer:fine)').matches)hero.addEventListener('mousemove',function(e){var ph=document.querySelector('.photo');ph.style.setProperty('--mx',((e.clientX/innerWidth-.5)*-20)+'px');ph.style.setProperty('--my',((e.clientY/innerHeight-.5)*-12)+'px')});
}
})();
