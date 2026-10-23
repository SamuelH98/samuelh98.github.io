/* HUD v3 + latest commit */
(function(){
var $1=function(i){return document.getElementById(i)};
var secs=[['HERO','.hero'],['ABOUT','#about'],['PROJECTS','#looks'],['SKILLS','#sensors'],['EDUCATION','#log'],['CONTACT','#contact']]
 .map(function(a){return [a[0],document.querySelector(a[1])]}).filter(function(a){return a[1]});
var sec=$1('st-sec'),sp=$1('st-sp'),stt=$1('st-t'),fps=$1('st-fps'),mk=document.querySelector('.ruler .mk'),rk=$1('rk'),rul=document.querySelector('.ruler');
function p3(n){return String(n).padStart(3,'0')}
function upd(){var m=document.documentElement.scrollHeight-innerHeight,k=m>0?Math.min(scrollY/m,1):0;
 sp.textContent=p3(Math.round(k*100));
 if(rul&&rul.offsetHeight){mk.style.top=(k*rul.offsetHeight)+'px';rk.textContent=p3(Math.round(scrollY))}
 var cur=secs[0][0],y=innerHeight*.45;secs.forEach(function(a){if(a[1].getBoundingClientRect().top<=y)cur=a[0]});sec.textContent=cur}
var tk2=0;addEventListener('scroll',function(){if(!tk2)tk2=requestAnimationFrame(function(){tk2=0;upd()})},{passive:true});addEventListener('resize',upd);upd();
function clk(){var d=new Date();stt.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(function(n){return String(n).padStart(2,'0')}).join(':')}
clk();setInterval(clk,1000);
(function sample(){if(document.hidden){setTimeout(sample,4000);return}var n=0,t0=performance.now();(function f(now){n++;if(now-t0>=500){fps.textContent=Math.round(n*1000/(now-t0));setTimeout(sample,4000)}else requestAnimationFrame(f)})(t0)})();
/* latest commit + project cards are filled in by github.js */
})();

/* HUD v4: section index, flap counter, tape sync, console typing */
(function(){
var secEl=document.getElementById('st-sec');
if(secEl){var names=['HERO','ABOUT','PROJECTS','SKILLS','EDUCATION','CONTACT'];
 new MutationObserver(function(){var t=secEl.textContent,i=names.indexOf(t);if(i>-1)secEl.textContent='0'+(i+1)+'/06 · '+t}).observe(secEl,{childList:true})}
var fl=[].slice.call(document.querySelectorAll('#fl i'));
window.setFlap=function(n){var t=String(Math.max(0,Math.min(99,n))).padStart(2,'0');fl.forEach(function(el,i){if(el.textContent!==t[i]){el.classList.remove('fl');void el.offsetWidth;el.textContent=t[i];el.classList.add('fl')}})};
var lm=document.getElementById('lc-meta');
if(lm){new MutationObserver(function(){var m=lm.textContent.match(/(\d+) (min|h|d) ago|just now/);if(!m)return;
 setFlap(m[2]==='d'?+m[1]:0);document.querySelectorAll('.tp').forEach(function(e){e.textContent=lm.textContent.split(' · ').slice(0,2).join(' · ')})}).observe(lm,{childList:true,characterData:true,subtree:true})}
var tb=document.getElementById('tb'),term=document.getElementById('term');
if(tb&&term){var L=[['$ ','whoami'],['','samuel hale · software engineer'],['$ ','status'],['','open to opportunities'],['$ ','contact --best'],['','samueljameshale1998@gmail.com']];
 var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function plain(){tb.innerHTML=L.map(function(l){return l[0]?'<span class="pr">'+l[0]+'</span>'+l[1]:'<span class="ok">'+l[1]+'</span>'}).join('\n')}
 if(rm){plain()}else{var started=false;new IntersectionObserver(function(es,ob){if(!es[0].isIntersecting||started)return;started=true;ob.disconnect();
  var li=0,ci=0,out='';(function step(){if(li>=L.length){tb.innerHTML=out+'<span class="cu"></span>';return}
   var l=L[li];if(l[0]){ci++;var cur=l[1].slice(0,ci);tb.innerHTML=out+'<span class="pr">'+l[0]+'</span>'+cur+'<span class="cu"></span>';
    if(ci>=l[1].length){out+='<span class="pr">'+l[0]+'</span>'+l[1]+'\n';li++;ci=0;setTimeout(step,260)}else setTimeout(step,55)}
   else{out+='<span class="ok">'+l[1]+'</span>\n';li++;setTimeout(step,140)}})()},{threshold:.4}).observe(term)}}
})();
