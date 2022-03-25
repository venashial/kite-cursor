var z=Object.defineProperty;var T=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var h=(n,e,t)=>e in n?z(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,f=(n,e)=>{for(var t in e||(e={}))C.call(e,t)&&h(n,t,e[t]);if(T)for(var t of T(e))F.call(e,t)&&h(n,t,e[t]);return n};var c=(n,e,t)=>(h(n,typeof e!="symbol"?e+"":e,t),t);const _=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};_();const p=document.createElement("canvas"),i=p.getContext("2d");p.style.pointerEvents="none";p.style.position="fixed";p.style.top="0";p.style.left="0";p.style.zIndex="999";p.id="kite-cursor";function w(){p.width=document.documentElement.clientWidth,p.height=document.documentElement.clientHeight}(async()=>{let n=!1;try{n=await browser.storage.managed.get("disabled")}catch{}!document.getElementById("kite-cursor")&&!n&&(w(),document.body.appendChild(p),window.addEventListener("resize",w))})();class d{static zero(){return{x:0,y:0}}static sub(e,t){return{x:e.x-t.x,y:e.y-t.y}}static add(e,t){return{x:e.x+t.x,y:e.y+t.y}}static mag(e){return Math.sqrt(e.x*e.x+e.y*e.y)}static normalized(e){const t=d.mag(e);return t===0?d.zero():{x:e.x/t,y:e.y/t}}}class L{constructor(e,t,l,s,o=500){c(this,"points");c(this,"_prevDelta");c(this,"_solverIterations");this.update=this.update.bind(this),this._prevDelta=0,this._solverIterations=o;let a=[];const m=e/t;for(let r=0;r<m;r++)a[r]=new g({x:-20,y:p.height/2},t),a[r].mass=l,a[r].damping=s;for(let r=0;r<m;r++){const P=r!=0?a[r-1]:null,v=a[r],E=r!=m-1?a[r+1]:null;v.prev=P,v.next=E}a[0].isFixed=!0,this.points=a}update(e,t){for(let l=1;l<this.points.length-1;l++){let s=this.points[l],o=f({},e);g.integrate(s,o,t,this._prevDelta)}for(let l=0;l<this._solverIterations;l++)for(let s=1;s<this.points.length-1;s++){let o=this.points[s];g.constrain(o)}this._prevDelta=t}}class g{constructor(e,t){c(this,"pos");c(this,"isFixed");c(this,"mass");c(this,"damping");c(this,"prev");c(this,"next");c(this,"distanceToNextPoint");c(this,"oldPos");c(this,"velocity");this.pos=e,this.distanceToNextPoint=t,this.isFixed=!1,this.oldPos=f({},e),this.velocity=d.zero(),this.mass=1,this.damping=1,this.prev=null,this.next=null}static integrate(e,t,l,s){e.velocity=d.sub(e.pos,e.oldPos),e.oldPos=f({},e.pos);let o=s!=0?l/s:0,a=d.add(t,{x:0,y:e.mass});const m=o*e.damping,r=Math.pow(l,2);e.pos.x+=e.velocity.x*m+a.x*r,e.pos.y+=e.velocity.y*m+a.y*r}static constrain(e){if(e.next){const t=d.sub(e.next.pos,e.pos),s=d.mag(t)-e.distanceToNextPoint,o=d.normalized(t);e.isFixed||(e.pos.x+=o.x*s*.25,e.pos.y+=o.y*s*.25),e.next.isFixed||(e.next.pos.x-=o.x*s*.25,e.next.pos.y-=o.y*s*.25)}if(e.prev){const t=d.sub(e.prev.pos,e.pos),s=d.mag(t)-e.distanceToNextPoint,o=d.normalized(t);e.isFixed||(e.pos.x+=o.x*s*.25,e.pos.y+=o.y*s*.25),e.prev.isFixed||(e.prev.pos.x-=o.x*s*.25,e.prev.pos.y-=o.y*s*.25)}}}const u={yellow:"hsl(59, 89%, 57%)",red:"hsl(12, 87%, 53%)",blue:"hsl(209, 85%, 59%)",green:"hsl(97, 60%, 47%)"},x=new L(200,8,.88,.8);function N(){let n=0;for(let e=0;e<x.points.length;e++){let t=x.points[e];const l=e!==0?x.points[e-1]:null;if(l&&e!==x.points.length-1&&e>8&&(i.globalCompositeOperation="destination-over",i.beginPath(),i.moveTo(l.pos.x,l.pos.y),i.lineTo(t.pos.x,t.pos.y),i.lineWidth=1,i.strokeStyle="white",i.stroke(),i.globalCompositeOperation="source-over",e>4&&(e+2)%3===0&&n<4)){let s=x.points[e+1],o=x.points[e+2];i.fillStyle=Object.values(u)[n],i.beginPath(),i.moveTo(s.pos.x,s.pos.y),i.lineTo(t.pos.x-8,t.pos.y+4),i.lineTo(o.pos.x-8,o.pos.y-4),i.lineTo(s.pos.x,s.pos.y),i.lineTo(t.pos.x+8,t.pos.y+4),i.lineTo(o.pos.x+8,o.pos.y-4),i.lineTo(s.pos.x,s.pos.y),i.fill(),n++}if(e===0){let s=x.points[e+9],o=x.points[e+3];i.fillStyle=u.yellow,i.beginPath(),i.moveTo(t.pos.x,t.pos.y),i.lineTo(o.pos.x-20,o.pos.y),i.lineTo(o.pos.x,o.pos.y),i.fill(),i.fillStyle=u.red,i.beginPath(),i.moveTo(o.pos.x-20,o.pos.y),i.lineTo(s.pos.x,s.pos.y),i.lineTo(o.pos.x,o.pos.y),i.fill(),i.fillStyle=u.blue,i.beginPath(),i.moveTo(s.pos.x,s.pos.y),i.lineTo(o.pos.x+20,o.pos.y),i.lineTo(o.pos.x,o.pos.y),i.fill(),i.fillStyle=u.green,i.beginPath(),i.moveTo(o.pos.x+20,o.pos.y),i.lineTo(t.pos.x,t.pos.y),i.lineTo(o.pos.x,o.pos.y),i.fill()}}}const y={deltaTime:0,currentTime:0,lastTime:new Date().getTime(),interval:1e3/60};function b(){if(window.requestAnimationFrame(b),y.currentTime=new Date().getTime(),y.deltaTime=y.currentTime-y.lastTime,y.deltaTime>y.interval){const n=y.deltaTime*.001;x.update({x:0,y:3e3},n),i.clearRect(0,0,p.width,p.height),N(),y.lastTime=y.currentTime-y.deltaTime%y.interval}}window.addEventListener("mousemove",n=>{x.points[0].pos={x:n.pageX+window.scrollX,y:n.pageY-window.scrollY+20}});b();