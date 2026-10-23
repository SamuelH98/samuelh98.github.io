/* telemetry HUD: decorative, per-scene. Each hero photo gets its own set of HUD elements (different widgets, labels and
   units that match what is in the picture); the panel glitches and rebuilds whenever the scene cuts. All values are
   random walks, not real data. Updates ~7x/s while the hero is visible and the tab is active; static under reduced motion. */
(function(){
 var hero=document.querySelector('.hero'),scenes=[].slice.call(document.querySelectorAll('.scene'));if(!hero||!scenes.length)return;
 var rm=matchMedia('(prefers-reduced-motion: reduce)').matches,vis=true,N=48,ns='http://www.w3.org/2000/svg';
 var clamp=function(v,a,b){return Math.max(a,Math.min(b,v))},walk=function(v,a,b,st){return clamp(v+(Math.random()-.5)*st,a,b)},rnd=function(a,b){return a+Math.random()*(b-a)};
 function box(h){var d=document.createElement('div');d.innerHTML=h;return d}
 var WID={
  line:function(o){var v=rnd(o.lo,o.hi),d=[],i,e=box('<div class="gh"><span>'+o.l+'</span><b></b></div><svg class="lg" viewBox="0 0 200 42" preserveAspectRatio="none"><path class="ar"></path><path class="ln"></path><circle class="dot" r="2.2"></circle></svg>'),
    b=e.querySelector('b'),ln=e.querySelector('.ln'),ar=e.querySelector('.ar'),dt=e.querySelector('.dot');
   for(i=0;i<N;i++){v=walk(v,o.lo,o.hi,o.st);d.push(v)}
   return{el:e,up:function(t){v=walk(v,o.lo,o.hi,o.st);d.push(v);d.shift();var lo=Math.min.apply(null,d),hi=Math.max.apply(null,d),p=d.map(function(x,k){return[k/(N-1)*200,40-(x-lo)/(hi-lo||1)*36]}),
     q='M'+p.map(function(a){return a[0].toFixed(1)+' '+a[1].toFixed(1)}).join('L');ln.setAttribute('d',q);ar.setAttribute('d',q+'L200 42L0 42Z');dt.setAttribute('cx',p[N-1][0]);dt.setAttribute('cy',p[N-1][1]);if(t%3===0)b.textContent=o.f(v)}}},
  bars:function(o){var h='',i,hs=[];for(i=0;i<o.n;i++){h+='<u></u>';hs.push(rnd(.2,.9))}
   var e=box('<div class="gh"><span>'+o.l+'</span><b></b></div><div class="bars">'+h+'</div>'),b=e.querySelector('b'),us=[].slice.call(e.querySelectorAll('u'));
   return{el:e,up:function(t){var sum=0;us.forEach(function(u,k){hs[k]=clamp(hs[k]+(Math.random()-.5)*.5,.08,1);sum+=hs[k];u.style.height=Math.round(hs[k]*100)+'%'});if(t%3===0)b.textContent=o.f(sum/o.n)}}},
  gauge:function(o){var v=rnd(o.lo,o.hi),e=box('<div class="row"><svg width="84" height="48" viewBox="0 0 100 56"><path class="gb" d="M10 52A40 40 0 0 1 90 52"></path><path class="gv" d="M10 52A40 40 0 0 1 90 52" stroke-dasharray="0 200"></path><line class="nd" x1="50" y1="52" x2="50" y2="20"></line></svg><div class="tx"><span>'+o.l+'</span><b></b></div></div>'),
    gv=e.querySelector('.gv'),nd=e.querySelector('.nd'),b=e.querySelector('b');
   return{el:e,up:function(t){v=walk(v,o.lo,o.hi,(o.hi-o.lo)*.12);var f=(v-o.lo)/(o.hi-o.lo);gv.setAttribute('stroke-dasharray',(f*125.7).toFixed(1)+' 200');nd.setAttribute('transform','rotate('+(-90+f*180).toFixed(1)+' 50 52)');if(t%3===0)b.textContent=o.f(v)}}},
  radar:function(o){var bl=[],i,e=box('<div class="row"><svg width="74" height="74" viewBox="0 0 100 100"><circle class="rg" cx="50" cy="50" r="46"></circle><circle class="rg" cx="50" cy="50" r="30"></circle><circle class="rg" cx="50" cy="50" r="14"></circle><line class="rg" x1="4" y1="50" x2="96" y2="50"></line><line class="rg" x1="50" y1="4" x2="50" y2="96"></line><g class="sw"><line x1="50" y1="50" x2="50" y2="4" stroke="#fff" stroke-width="1.4"></line></g><g class="bs"></g><circle class="tg" r="3.2"></circle></svg><div class="tx"><span>'+o.l+'</span><b></b><span class="bg"></span></div></div>'),
    g=e.querySelector('.bs'),tg=e.querySelector('.tg'),b=e.querySelector('b'),bg=e.querySelector('.bg'),ta=rnd(0,6.28),tr=.95;
   for(i=0;i<4;i++){var c=document.createElementNS(ns,'circle');c.setAttribute('class','bl');c.setAttribute('r','1.6');g.appendChild(c);bl.push({c:c,a:rnd(0,6.28),r:rnd(.3,.95),da:rnd(-.03,.03)})}
   return{el:e,up:function(t){bl.forEach(function(k){k.a+=k.da+(Math.random()-.5)*.02;k.r=clamp(k.r+(Math.random()-.5)*.03,.2,.96);k.c.setAttribute('cx',50+Math.cos(k.a)*k.r*46);k.c.setAttribute('cy',50+Math.sin(k.a)*k.r*46)});
     tr-=.012;if(tr<.2)tr=.95;ta+=.01;tg.setAttribute('cx',50+Math.cos(ta)*tr*46);tg.setAttribute('cy',50+Math.sin(ta)*tr*46);if(t%3===0){b.textContent=Math.round(tr*o.max)+' m';bg.textContent='BRG '+String(Math.round(((ta*57.3)%360+360)%360)).padStart(3,'0')+'°'}}}},
  grid:function(o){var h='',i,n=o.c*o.r,on=[],e;for(i=0;i<n;i++){h+='<u></u>';on.push(Math.random()<.6)}
   e=box('<div class="gh"><span>'+o.l+'</span><b></b></div><div class="cells" style="grid-template-columns:repeat('+o.c+',1fr)">'+h+'</div>');var us=[].slice.call(e.querySelectorAll('u')),b=e.querySelector('b');
   function paint(){var c=0;us.forEach(function(u,k){u.className=on[k]?'on':'';if(on[k])c++});b.textContent=c+' / '+n}paint();
   return{el:e,up:function(t){for(var k=0;k<3;k++){var j=Math.floor(Math.random()*n);on[j]=!on[j]}paint()}}}
 };
 var P=[
  {t:'Vehicle · Lift Test',w:[{k:'line',l:'Thrust',lo:68,hi:96,st:7,f:function(v){return Math.round(v)+' %'}},{k:'bars',l:'Jet output',n:4,f:function(v){return Math.round(v*100)+' %'}}],
   m:[['Altitude',9,14,1.2,function(v){return v.toFixed(1)+' m'}],['Climb',-.4,1.6,.5,function(v){return (v>0?'+':'')+v.toFixed(1)+' m/s'}],['Jets',4,4,0,function(v){return Math.round(v)+' / 4'}],['Conf',.95,.99,.01,function(v){return v.toFixed(2)}]]},
  {t:'Target · ID 0427',w:[{k:'radar',l:'Range',max:240},{k:'line',l:'Closing speed',lo:18,hi:34,st:3,f:function(v){return v.toFixed(1)+' m/s'}}],
   m:[['Intensity',1.2,3.4,.5,function(v){return v.toFixed(1)+' kcd'}],['Conf',.9,.97,.02,function(v){return v.toFixed(2)}],['Track age',4,30,3,function(v){return v.toFixed(0)+' s'}],['Drift',-2.4,2.4,.8,function(v){return (v>0?'+':'')+v.toFixed(1)+' °'}]]},
  {t:'Structure · Office Tower',w:[{k:'grid',l:'Floors lit',c:12,r:4},{k:'gauge',l:'Power load',lo:180,hi:420,f:function(v){return Math.round(v)+' kW'}}],
   m:[['Occupancy',38,86,6,function(v){return Math.round(v)+' %'}],['HVAC',20.5,24.5,.5,function(v){return v.toFixed(1)+' °C'}],['Lifts',2,6,1.4,function(v){return Math.round(v)+' / 8'}],['Uplink',420,940,80,function(v){return Math.round(v)+' Mb/s'}]]},
  {t:'Residential · Towers ×2',w:[{k:'gauge',l:'Windows lit',lo:35,hi:82,f:function(v){return Math.round(v)+' %'}},{k:'bars',l:'Demand A / B',n:14,f:function(v){return (v*3.2).toFixed(1)+' MW'}}],
   m:[['Noise',38,52,3,function(v){return v.toFixed(0)+' dB'}],['Wind',1,9,1.6,function(v){return v.toFixed(1)+' m/s'}],['Units',180,236,8,function(v){return Math.round(v)+' / 240'}],['Vis',6,14,1.2,function(v){return v.toFixed(1)+' km'}]]},
  {t:'Landmark · Beacon',w:[{k:'gauge',l:'Wind aloft',lo:2,hi:17,f:function(v){return v.toFixed(1)+' m/s'}},{k:'line',l:'Sway',lo:2,hi:34,st:7,f:function(v){return v.toFixed(0)+' mm'}}],
   m:[['Beacon',.48,.52,.01,function(v){return v.toFixed(2)+' Hz'}],['Altitude',540.2,541.4,.3,function(v){return v.toFixed(1)+' m'}],['Facade',5,13,1,function(v){return v.toFixed(1)+' °C'}],['Cloud base',620,1100,60,function(v){return Math.round(v)+' m'}]]}
 ];
 var el=document.createElement('div');el.className='tele';el.setAttribute('aria-hidden','true');hero.appendChild(el);
 var cur=-1,live=[],kv=[],tick=0,head,body,ms,timer;
 function build(i){var p=P[i%P.length];cur=i;live=[];kv=[];
  el.innerHTML='<div class="th"><span></span><i>●</i></div><div class="bd"></div><div class="ms"></div>';
  el.querySelector('.th span').textContent=p.t;body=el.querySelector('.bd');ms=el.querySelector('.ms');
  p.w.forEach(function(o){var w=WID[o.k](o);body.appendChild(w.el);live.push(w)});
  p.m.forEach(function(m){var d=box('<span>'+m[0]+'</span><b></b>'),b=d.querySelector('b'),o={v:rnd(m[1],m[2]),lo:m[1],hi:m[2],st:m[3],f:m[4],b:b};ms.appendChild(d);b.textContent=m[4](o.v);kv.push(o)});
  step(true)}
 function step(all){tick++;live.forEach(function(w){w.up(all?0:tick)});if(all||tick%3===0)kv.forEach(function(o){o.v=walk(o.v,o.lo,o.hi,o.st);o.b.textContent=o.f(o.v)})}
 function sceneIndex(){for(var i=0;i<scenes.length;i++)if(scenes[i].classList.contains('on'))return i;return 0}
 build(sceneIndex());for(var w=0;w<3;w++)step(true);
 if(rm)return;
 function swap(i){if(i===cur)return;el.classList.remove('swap');void el.offsetWidth;el.classList.add('swap');setTimeout(function(){build(i)},170);clearTimeout(timer);timer=setTimeout(function(){el.classList.remove('swap')},520)}
 scenes.forEach(function(sc,i){new MutationObserver(function(){if(sc.classList.contains('on'))swap(i)}).observe(sc,{attributes:true,attributeFilter:['class']})});
 if('IntersectionObserver' in window)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(hero);
 setInterval(function(){if(vis&&!document.hidden)step(false)},140);
 })();
