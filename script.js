const Q=[
["El monitor del lobby muestra billetes que hoy compran la mitad que antes: los precios suben sin parar. ¿Cómo se llama el aumento generalizado y sostenido de precios?","Inflación","Deflación","Devaluación","Inflación: alza generalizada y sostenida de precios"],
["Un ahorro en la bóveda crece solo: sus intereses generan nuevos intereses. ¿Qué concepto es?","Interés compuesto","Interés simple","Amortización","Interés compuesto: intereses que generan más intereses"],
["Te exigen pagar ya, pero solo tienes un edificio que nadie quiere comprar. ¿Cómo se llama la facilidad de convertir un activo en efectivo?","Liquidez","Solvencia","Rentabilidad","Liquidez: rapidez para convertir un activo en efectivo"],
["El libro contable muestra lo que la empresa posee, lo que debe y lo que es de los dueños. ¿Qué estado financiero es?","Balance general","Estado de resultados","Flujo de efectivo","Balance general: activos = pasivos + capital"],
["Un fantasma pregunta cuánto debes vender para no ganar ni perder. ¿Cómo se llama el nivel donde ingresos = costos?","Punto de equilibrio","Margen de utilidad","Costo de oportunidad","Punto de equilibrio: ingresos = costos totales"],
["Un papel te hace dueño de una pequeña parte de una empresa que cotiza en bolsa. ¿Qué es?","Una acción","Un bono","Un pagaré","Acción: parte del capital de una empresa"],
["Un contrato promete ganancias enormes en poco tiempo. ¿Qué relación existe entre rendimiento esperado y riesgo?","A mayor rendimiento, mayor riesgo","A mayor rendimiento, menor riesgo","No existe relación","Riesgo-rendimiento: más ganancia esperada, más riesgo"]];
const N=['Lobby','Sala de Trading','Contabilidad','Bóveda','Archivo Fiscal','Sala de Juntas','Penthouse del CEO'];
const EN=['Auditor Zombi','Libro Diario','Libro Mayor','Balanza Maldita','Calculadora Poseída','Asiento Contable','Contador Jefe'];
const $=i=>document.getElementById(i),g=$('c').getContext('2d'),dk=document.createElement('canvas');dk.width=640;dk.height=360;const d=dk.getContext('2d');
let r=0,hp=100,herbs=0,got=0,cp=100,deaths=0,done=[],st='play',P,Z,T,B,H,open,time=0,bi=0,shk=0,extra=0,stp=0,dm=0,mt,K={},muted=false;
const sd=n=>Math.abs(Math.sin(n*91.7)*1e4)%1;
const hit=(x,y,q)=>x<30+q||x>610-q||y<30+q||y>330-q||B.some(b=>x>b.x-q&&x<b.x+b.w+q&&y>b.y-q&&y<b.y+b.h+q);
function msg(t){$('msg').textContent=t;clearTimeout(mt);mt=setTimeout(()=>$('msg').textContent='',6500)}
function build(){const s=r*7+3;cp=hp;extra=0;bi=0;P={x:62,y:180,a:0};T={x:300+sd(s+20)*150,y:70+sd(s+21)*220};
 H=(r%2)?{x:220+sd(s+40)*280,y:60+sd(s+41)*240}:null;B=[];
 for(let i=0;i<4;i++){const w=44+sd(s+i)*50,h=34+sd(s+i+9)*60,x=150+sd(s+i+3)*330,y=45+sd(s+i+6)*240,m=34;
  if(![T,H].some(p=>p&&p.x>x-m&&p.x<x+w+m&&p.y>y-m&&p.y<y+h+m))B.push({x,y,w,h})}
 Z={x:575,y:sd(s+30)>.5?60:300,t:0};if(hit(Z.x,Z.y,12))Z.x=598;open=false}
function upd(dt){
 if(st!='play')return;
 P.a+=((K.ArrowLeft||K.a?-1:0)+(K.ArrowRight||K.d?1:0))*2.6*dt;
 const mv=(K.ArrowUp||K.w?1:0)-(K.ArrowDown||K.s?.6:0);
 if(mv){const nx=P.x+Math.cos(P.a)*mv*110*dt,ny=P.y+Math.sin(P.a)*mv*110*dt;if(!hit(nx,P.y,10))P.x=nx;if(!hit(P.x,ny,10))P.y=ny;stp+=dt;if(stp>.42){stp=0;sfx.step()}}
 if(Z){const dx=P.x-Z.x,dy=P.y-Z.y,dist=Math.hypot(dx,dy)||1,zs=38+r*6+extra,nx=Z.x+dx/dist*zs*dt,ny=Z.y+dy/dist*zs*dt;
 if(!hit(nx,Z.y,12))Z.x=nx;if(!hit(Z.x,ny,12))Z.y=ny;
 Z.t-=dt;if(dist<170&&Z.t<=0){Z.t=2.6;sfx.groan()}
 bi-=dt;if(dist<22&&bi<=0){hp-=15;bi=1.3;shk=.4;sfx.bite();const kx=P.x+dx/dist*30,ky=P.y+dy/dist*30;if(!hit(kx,ky,10)){P.x=kx;P.y=ky}if(hp<=0)return die()}}
 if(H&&Math.hypot(P.x-H.x,P.y-H.y)<18){H=null;herbs++;msg('Recoges una hierba verde. Pulsa H para curarte.')}
 if(P.x>596&&Math.abs(P.y-180)<36){if(open){r++;if(r>=7)return finish();build();msg(N[r]+'. Aquí acecha el '+EN[r]+'. Responde bien en el terminal para destruirlo.')}else{dm-=dt;if(dm<=0){dm=4;msg('Puerta bloqueada. Acércate al terminal y pulsa E.')}}}
}
function act(){ai();if(st=='play'&&!open&&Math.hypot(P.x-T.x,P.y-T.y)<44)quiz()}
function heal(){if(st=='play'&&herbs>0&&hp<100){herbs--;hp=Math.min(100,hp+30);msg('Usas una hierba verde: +30 de salud.')}}
function quiz(){st='quiz';const q=Q[r],o=[{x:q[1],c:1},{x:q[2]},{x:q[3]}];
 for(let i=2;i>0;i--){const j=Math.floor(Math.random()*(i+1));[o[i],o[j]]=[o[j],o[i]]}
 $('qh').textContent='TERMINAL · '+N[r].toUpperCase()+' · PREGUNTA '+(r+1)+'/7';$('qt').textContent=q[0];$('qo').innerHTML='';
 o.forEach((a,i)=>{const b=document.createElement('button');b.textContent='ABC'[i]+') '+a.x;b.onclick=()=>answer(!!a.c);$('qo').appendChild(b)});$('q').style.display='flex'}
function answer(ok){if(st!='quiz')return;st='play';$('q').style.display='none';open=true;
 if(ok){done[r]=1;got=done.filter(Boolean).length;Z=null;sfx.ok();msg('✔ Documento obtenido — '+Q[r][4]+'. El '+EN[r]+' se desvanece y la puerta se desbloquea.')}
 else{hp-=10;shk=.5;extra+=10;sfx.bad();msg('✘ Acceso denegado. Era “'+Q[r][1]+'”. La puerta se abre, pero el '+EN[r]+' se enfurece.')}
 if(hp<=0)die()}
function die(){if(st=='dead')return;st='dead';deaths++;$('et').textContent='HAS CAÍDO';$('et').style.color='#e8742a';$('ep').textContent='El '+EN[r]+' te alcanzó. La torre te devuelve al inicio de esta sala: los niveles que ya superaste quedan guardados.';$('ebtn').textContent='Reintentar sala '+(r+1);$('ebtn').onclick=retry;$('end').style.display='flex'}
function retry(){$('end').style.display='none';hp=Math.max(cp,60);build();st='play';msg('Reintentas la sala '+(r+1)+': '+N[r]+'.')}
function finish(){st='end';let t,p;
 if(got>=7){t='FINAL PERFECTO';p='Siete documentos, cero deudas. Llegas al helipuerto con tu patrimonio intacto y la torre arde a tus espaldas. Caídas: '+deaths+'.'}
 else if(got>=5){t='FINAL BUENO';p='Escapas por el helipuerto con casi todas las credenciales. La torre arde a tus espaldas. Documentos: '+got+'/7 · Caídas: '+deaths+'.'}
 else if(got>=3){t='FINAL NEUTRO';p='Escapas, pero con deudas: las cuentas mal cuadradas te perseguirán. Documentos: '+got+'/7 · Caídas: '+deaths+'.'}
 else{t='FINAL MALO';p='Sales arrastrándote, pero la torre ya te embargó la cordura. Documentos: '+got+'/7 · Caídas: '+deaths+'.'}
 $('et').textContent=t;$('et').style.color=got>=5?'#2fe08a':got>=3?'#d4af37':'#e8742a';$('ep').textContent=p;$('ebtn').textContent='Jugar de nuevo';$('ebtn').onclick=()=>location.reload();$('end').style.display='flex'}
function draw(){
 g.save();if(shk>0){g.translate((Math.random()-.5)*20*shk,(Math.random()-.5)*20*shk);shk-=.016}
 g.fillStyle='#08140f';g.fillRect(-20,-20,680,400);g.strokeStyle='#12301f';g.lineWidth=1;
 for(let x=30;x<=610;x+=40){g.beginPath();g.moveTo(x,30);g.lineTo(x,330);g.stroke()}
 for(let y=30;y<=330;y+=40){g.beginPath();g.moveTo(30,y);g.lineTo(610,y);g.stroke()}
 g.strokeStyle='#1f4a34';g.lineWidth=8;g.strokeRect(26,26,588,308);
 B.forEach(b=>{g.fillStyle='#10251a';g.fillRect(b.x,b.y,b.w,b.h);g.strokeStyle='#8a7425';g.lineWidth=2;g.strokeRect(b.x,b.y,b.w,b.h);g.fillStyle='#1c4a36';g.fillRect(b.x+6,b.y+6,14,10)});
 if(H){g.fillStyle='#3be07a';[[0,-4],[-5,3],[5,3]].forEach(o=>{g.beginPath();g.arc(H.x+o[0],H.y+o[1],4,0,7);g.fill()})}
 g.save();g.translate(P.x,P.y);g.rotate(P.a);g.fillStyle='#d9e8df';g.beginPath();g.moveTo(12,0);g.lineTo(-8,-9);g.lineTo(-8,9);g.fill();g.fillStyle='#d4af37';g.fillRect(-8,-3,6,6);g.restore();
 
 const za=Z?Math.atan2(P.y-Z.y,P.x-Z.x):0;
 if(Z){
   g.save();
   g.translate(Z.x,Z.y);
   g.rotate(za);

   // 1. Cuerpo principal: Una silueta de traje corporativo espectral (forma de túnica/fantasma elegante)
   g.fillStyle='#08140f';
   g.beginPath();
   g.moveTo(14, 0);
   g.lineTo(-12, -14);
   g.lineTo(-8, 0);
   g.lineTo(-12, 14);
   g.closePath();
   g.fill();
   g.strokeStyle='#2fe08a';
   g.lineWidth=1.5;
   g.stroke();

   // 2. Corbata de ejecutivo flotando en el centro (en tono rojo/granate terrorífico)
   g.fillStyle='#8a2a24';
   g.beginPath();
   g.moveTo(2, -5);
   g.lineTo(8, -1);
   g.lineTo(4, 8);
   g.lineTo(-1, 2);
   g.closePath();
   g.fill();
   g.strokeStyle='#d4af37';
   g.lineWidth=1;
   g.stroke();

   // 3. Cabeza / Monitor flotante cibernético hostil
   g.fillStyle='#10251a';
   g.fillRect(-8, -11, 16, 22);
   g.strokeStyle='#2fe08a';
   g.lineWidth=2;
   g.strokeRect(-8, -11, 16, 22);

   // Pantalla interior con un ojo o símbolo de error parpadeante ($ rojo/verde)
   g.fillStyle='#020805';
   g.fillRect(-5, -8, 10, 16);
   g.fillStyle='#e8742a'; // Brillo de alerta
   g.font='bold 12px monospace';
   g.textAlign='center';
   g.fillText('$', 0, 3);

   g.restore();

   // Nombre del enemigo flotando arriba
   g.font='11px Special Elite,monospace';
   g.fillStyle='#d4af37';
   g.textAlign='center';
   g.fillText(EN[r], Z.x, Z.y - 22);
   g.textAlign='left';
 }

 d.globalCompositeOperation='source-over';d.clearRect(0,0,640,360);d.fillStyle='rgba(0,4,2,.96)';d.fillRect(0,0,640,360);d.globalCompositeOperation='destination-out';
 let gr=d.createRadialGradient(P.x,P.y,0,P.x,P.y,250);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');d.fillStyle=gr;d.beginPath();d.moveTo(P.x,P.y);d.arc(P.x,P.y,250,P.a-.5,P.a+.5);d.fill();
 gr=d.createRadialGradient(P.x,P.y,0,P.x,P.y,55);gr.addColorStop(0,'rgba(0,0,0,.9)');gr.addColorStop(1,'rgba(0,0,0,0)');d.fillStyle=gr;d.beginPath();d.arc(P.x,P.y,55,0,7);d.fill();
 g.drawImage(dk,0,0);
 g.shadowBlur=16;g.shadowColor=open?'#2fe08a':'#d4af37';g.fillStyle=open?'#2fe08a':'#d4af37';g.fillRect(608,150,10,60);
 g.shadowColor='#2fe08a';g.fillStyle=open?'#1c4a36':'#2fe08a';g.fillRect(T.x-12,T.y-9,24,18);g.shadowBlur=0;g.fillStyle='#021';g.font='12px monospace';g.fillText('$',T.x-3,T.y+4);
 const cd=hp>66?['FINE','#2fe08a']:hp>33?['CAUTION','#d4af37']:['DANGER','#e8742a'];
 g.font='bold 16px Special Elite,monospace';g.fillStyle=cd[1];g.fillText(hp>0?cd[0]:'FATAL',14,22);
 g.textAlign='right';g.fillText(N[Math.min(r,6)]+' · '+(r+1)+'/7',628,22);g.textAlign='left';
 g.strokeStyle=cd[1];g.lineWidth=1.5;g.beginPath();const sp=1+(100-hp)/35;
 for(let i=0;i<=70;i++){const ph=((i/35-time*sp)%1+1)%1,y=44-(hp>0?(ph<.08?16*Math.sin(ph/.08*Math.PI):ph>.14&&ph<.2?-5:0):0);i?g.lineTo(14+i*1.8,y):g.moveTo(14,y)}g.stroke();
 g.restore();
 $('inv').textContent='Documentos '+got+'/7  ·  Hierbas verdes '+herbs+'  ·  Salud '+Math.max(hp,0)+'%  ·  Caídas '+deaths}
// audio
let AC,M,nb;
function ai(){if(AC){AC.resume();return}AC=new(window.AudioContext||webkitAudioContext)();M=AC.createGain();M.gain.value=muted?0:.8;M.connect(AC.destination);
 nb=AC.createBuffer(1,AC.sampleRate,AC.sampleRate);const a=nb.getChannelData(0);for(let i=0;i<a.length;i++)a[i]=Math.random()*2-1;
 const lp=AC.createBiquadFilter();lp.frequency.value=160;const dg=AC.createGain();dg.gain.value=.1;lp.connect(dg);dg.connect(M);
 [49,49.7,73.4].forEach(f=>{const o=AC.createOscillator();o.type='sawtooth';o.frequency.value=f;o.connect(lp);o.start()});hb()}
function env(n,t0,dur,pk){n.gain.setValueAtTime(.0001,t0);n.gain.exponentialRampToValueAtTime(pk,t0+.02);n.gain.exponentialRampToValueAtTime(.0001,t0+dur)}
function tone(ty,f1,f2,dur,pk,dl=0){if(!AC)return;const t0=AC.currentTime+dl,o=AC.createOscillator(),n=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f1,t0);o.frequency.exponentialRampToValueAtTime(f2,t0+dur);env(n,t0,dur,pk);o.connect(n);n.connect(M);o.start(t0);o.stop(t0+dur+.1)}
function burst(fr,dur,pk,ty='lowpass'){if(!AC)return;const t0=AC.currentTime,s=AC.createBufferSource(),f=AC.createBiquadFilter(),n=AC.createGain();s.buffer=nb;f.type=ty;f.frequency.value=fr;env(n,t0,dur,pk);s.connect(f);f.connect(n);n.connect(M);s.start(t0);s.stop(t0+dur+.1)}
function hb(){if(AC&&!muted&&st=='play'){const v=.3+(100-hp)/100*.5;tone('sine',70,40,.18,v);tone('sine',60,35,.2,v*.7,.2)}setTimeout(hb,Math.max(550,1300-(100-hp)*9))}
const sfx={step:()=>burst(240,.15,.4),groan:()=>{tone('sawtooth',110,55,1.4,.12);tone('sawtooth',117,50,1.4,.08)},bite:()=>{burst(2500,.4,.4,'highpass');tone('sine',60,30,.6,.8)},ok:()=>{tone('sine',523,523,.5,.1);tone('sine',784,784,.8,.1,.15)},bad:()=>{tone('sawtooth',900,200,.7,.15);burst(3000,.5,.2,'highpass')}};
// input
addEventListener('keydown',e=>{ai();const k=e.key.length==1?e.key.toLowerCase():e.key;
 if(st=='quiz'){const i='abc'.indexOf(k),j='123'.indexOf(k),n=i>=0?i:j;if(n>=0)$('qo').children[n]?.click();return}
 if(k.startsWith('Arrow')||k==' ')e.preventDefault();
 if(k=='e'||k==' ')act();else if(k=='h')heal();else K[k]=1});
addEventListener('keyup',e=>{K[e.key.length==1?e.key.toLowerCase():e.key]=0});
document.querySelectorAll('#pad [data-k]').forEach(b=>{b.addEventListener('pointerdown',()=>{ai();K[b.dataset.k]=1});['pointerup','pointerleave','pointercancel'].forEach(v=>b.addEventListener(v,()=>K[b.dataset.k]=0))});
$('bact').onclick=act;$('bheal').onclick=heal;$('mute').onclick=()=>{muted=!muted;if(M)M.gain.value=muted?0:.8;$('mute').textContent=muted?'🔇':'🔊'};
let last=0;function loop(ts){const dt=Math.min(.05,(ts-last)/1000);last=ts;time+=dt;upd(dt);draw();requestAnimationFrame(loop)}
build();msg('Despiertas en el Lobby de la Torre Mortgage. Encuentra el terminal verde, pulsa E y sobrevive a los monstruos contables.');requestAnimationFrame(loop);