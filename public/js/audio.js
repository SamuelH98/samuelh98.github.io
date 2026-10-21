/* background music: instrumental track only (public/audio/theme.mp3). Button stays hidden if the file is missing. */
(function(){var au=document.getElementById('bgm'),sb=document.getElementById('snd');if(!au||!sb)return;
 var lab=sb.querySelector('span'),want=true,fade,ready=false,failed=false;
 try{want=localStorage.getItem('snd')!=='off'}catch(e){}
 function ui(){var on=!au.paused;sb.setAttribute('aria-pressed',on);lab.textContent=on?'Sound on':'Sound off'}
 function play(){clearInterval(fade);au.volume=0;var p=au.play();if(p&&p.then)p.then(function(){fade=setInterval(function(){au.volume=Math.min(.5,au.volume+.025);if(au.volume>=.5)clearInterval(fade)},100);ui()}).catch(function(){})}
 function pause(){clearInterval(fade);au.pause();ui()}
 function first(e){if(e.target.closest&&e.target.closest('#snd'))return;off();if(want)play()}
 function off(){['pointerdown','keydown','touchend'].forEach(function(t){removeEventListener(t,first)})}
 function show(){if(ready||failed)return;ready=true;sb.hidden=false;if(want){['pointerdown','keydown','touchend'].forEach(function(t){addEventListener(t,first)});play()}}
 au.addEventListener('error',function(){failed=true;sb.hidden=true});
 /* metadata may already be loaded before this module runs (cached file), and some browsers defer it until a tap. */
 if(au.readyState>=1)show();else{au.addEventListener('loadedmetadata',show);au.addEventListener('canplay',show);setTimeout(show,2000)}
 sb.addEventListener('click',function(){off();if(au.paused){want=true;play()}else{want=false;pause()}try{localStorage.setItem('snd',want?'on':'off')}catch(e){}});
 document.addEventListener('visibilitychange',function(){if(document.hidden&&!au.paused){au.pause();au.dataset.r=1}else if(!document.hidden&&au.dataset.r){delete au.dataset.r;au.play().catch(function(){})}ui()});
 au.addEventListener('play',ui);au.addEventListener('pause',ui);})();
