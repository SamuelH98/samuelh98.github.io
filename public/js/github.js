/* Live GitHub data: one repo-list request drives both the hero "Latest commit" cell and the Projects section.
   - Projects: the 5 most recently pushed public repos (forks, archived repos and this site's own repo are skipped).
   - Latest commit: newest commit across any public repo (featured or not, this site included).
   If the API is blocked or rate-limited (60 requests/hour per visitor IP, unauthenticated) the static HTML stays as the fallback.
   Responses are cached in localStorage for 30 minutes, and a stale cache is used if a fresh request fails. */
(function(){
var USER='SamuelH98',COUNT=5,TTL=30*60*1000,KEY='gh-live-v2';
var EXCLUDE=['samuelh98.github.io'];          /* repos that never show as a project (this site itself) */
/* Hand-written copy for projects that already had it. Any other repo uses its GitHub description, language and topics. */
var CURATED={
 'orange':{tag:'Systems',desc:'A wlroots compositor for Linux with a macOS-style desktop drawn in C. Includes shell, dock, desktop icons, menus, status icons and wallpaper, plus GPU driver detection, DRM device selection and NVIDIA Optimus support.',stack:['C','wlroots','Meson','Wayland']},
 'unstuck-mcp':{tag:'Agent tooling',desc:'An MCP server that keeps AI coding agents out of infinite fix loops. It tracks failed attempts, normalizes error signatures, and blocks repeats until the agent searches the web.',stack:['JavaScript','MCP']},
 'ultimate-swe':{tag:'Agent tooling',desc:'A production-grade engineering workflow covering requirements, architecture, testing, validation and Git discipline.',stack:['Prompt engineering','Technical writing']},
 'resume-tailor':{tag:'Web app',desc:'Matches a job description to your skills and projects, then compiles a tailored PDF in the browser with Typst WASM.',stack:['JavaScript','Typst WASM']},
 'movedex':{tag:'Web app',desc:'Pokémon lookup using live PokeAPI data plus curated competitive builds, items, EV spreads, Tera types and full movepools.',stack:['HTML','JavaScript','PokeAPI']},
 'c-raytracer':{tag:'Graphics',desc:'A real-time ray tracer in C using GLFW and Vulkan. Companion piece: dbview, a zero-dependency SQLite file reader.',stack:['C','Vulkan','GLFW']}
};
var $1=function(i){return document.getElementById(i)};
var api='https://api.github.com';
function get(u){return fetch(api+u,{headers:{Accept:'application/vnd.github+json'}}).then(function(r){if(!r.ok)throw new Error(r.status);return r.json()})}
function ago(d){var s=(Date.now()-d)/1000;if(s<60)return 'just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' h ago';return Math.floor(s/86400)+' d ago'}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function pad2(n){return String(n).padStart(2,'0')}
function cacheGet(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function cachePut(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}

function load(){
 var c=cacheGet();if(c&&Date.now()-c.t<TTL)return Promise.resolve(c);
 return get('/users/'+USER+'/repos?type=owner&sort=pushed&direction=desc&per_page=30').then(function(all){
  /* pushed_at is only a hint (it also moves on branch pushes), so the 8 newest-pushed public repos, this site included,
     each get their real latest commit. A failed lookup falls back to pushed_at for that repo. */
  var cand=all.filter(function(r){return !r.fork&&!r.private}).slice(0,8).map(function(r){
   return{name:r.name,full:r.full_name,url:r.html_url,home:r.homepage||'',desc:r.description||'',lang:r.language||'',topics:(r.topics||[]).slice(0,3),
    show:!r.archived&&EXCLUDE.indexOf(r.name.toLowerCase())<0,cdate:r.pushed_at,sha:'',msg:'',curl:''}});
  var later=all.filter(function(r){return !r.fork&&!r.archived&&!r.private&&EXCLUDE.indexOf(r.name.toLowerCase())<0}).slice(cand.length)
   .map(function(r){return{name:r.name,url:r.html_url,home:r.homepage||'',desc:r.description||'',lang:r.language||'',topics:(r.topics||[]).slice(0,3),cdate:r.pushed_at}});
  return Promise.all(cand.map(function(r){return get('/repos/'+r.full+'/commits?per_page=1').then(function(a){var x=a[0];if(!x)return;
    r.cdate=(x.commit.committer||x.commit.author).date;r.sha=x.sha;r.msg=x.commit.message.split('\n')[0];r.curl=x.html_url}).catch(function(){})})).then(function(){
   cand.sort(function(a,b){return new Date(b.cdate)-new Date(a.cdate)});
   /* hero "Latest commit": newest commit across ANY of those repos (featured or not); needs a real sha, so a repo whose lookup failed is skipped */
   var n=cand.filter(function(r){return r.sha})[0];
   var commit=n?{repo:n.name,full:n.full,sha:n.sha,msg:n.msg,date:n.cdate,url:n.curl}:null;
   /* Projects: those same repos minus forks/archived/this site, newest commit first, then the rest by push date */
   var repos=cand.filter(function(r){return r.show}).concat(later);
   var v={t:Date.now(),repos:repos,commit:commit};cachePut(v);return v});
 }).catch(function(err){if(c)return c;throw err});
}

function showCommit(c){
 if(!c)return;
 var msg=c.msg.length>60?c.msg.slice(0,57)+'...':c.msg,a=$1('lc-msg'),m=$1('lc-meta');if(!a||!m)return;
 a.textContent=msg;a.href=c.url;
 /* same "repo · sha · age" format as before: the flap counter and the tape read it from this element */
 m.textContent=c.repo+' · '+c.sha.slice(0,7)+' · '+ago(new Date(c.date));
}

function card(r,i){
 var cur=CURATED[r.name.toLowerCase()]||{},big=i<2;
 var a=el('a','look'+(big?' lg':''));a.href=r.home||r.url;a.target='_blank';a.rel='noopener';
 var top=el('div','top');top.appendChild(el('span','tag',cur.tag||r.lang||'Project'));top.appendChild(el('span','lbl','Committed '+ago(new Date(r.cdate))));a.appendChild(top);
 a.appendChild(el('h3',null,r.name));
 a.appendChild(el('p',null,cur.desc||r.desc||'No description yet. Open the repository to see the code.'));
 var st=el('div','stack'),items=cur.stack||[r.lang].concat(r.topics).filter(Boolean);
 items.forEach(function(s){st.appendChild(el('span',null,s))});a.appendChild(st);
 return a;
}

function showProjects(repos){
 var grid=document.querySelector('#looks .looks');if(!grid||!repos.length)return;
 var top=repos.slice(0,COUNT),cards=top.map(card);
 grid.textContent='';cards.forEach(function(c,i){c.classList.add('rv');c.style.setProperty('--d',i*70+'ms');grid.appendChild(c)});
 requestAnimationFrame(function(){requestAnimationFrame(function(){cards.forEach(function(c){c.classList.add('in')})})});
 var lbl=document.querySelector('#looks .head .lbl');if(lbl)lbl.textContent='Latest '+top.length+' · live from GitHub';
 var also=document.querySelector('#looks .more span');
 if(also){var rest=repos.slice(COUNT,COUNT+5).map(function(r){return r.name});also.textContent=rest.length?'Also: '+rest.join(' · '):''}
}

load().then(function(v){showCommit(v.commit);showProjects(v.repos)}).catch(function(){});
})();
