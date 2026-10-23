import {PETS,petsSaved,rescued,petFrames,petImage} from './catalog.mjs';
import {escapeHTML as esc} from '../../components/ui.mjs';
export function petsScreen(profile,selectedId=1,rescue=null){
 const picked=PETS.find(x=>x.id===selectedId)||PETS[0],saved=petsSaved(profile),ok=rescued(profile,picked);
 return `<main class="pets-screen">
 <div class="pets-shell">
 <header class="pets-header"><button class="pets-round-btn" data-action="home" aria-label="Voltar">‹</button><div class="pets-title">PETS</div><button class="pets-round-btn" data-action="petsInfo" aria-label="Como resgatar pets">i</button></header>
 <div class="pets-counter">Pets salvos: <strong>${saved}/30</strong></div>
 <div class="pets-story"><img src="${petImage('pets-rescue-banner.png')}" alt="O Capitão Corsário Arcano sequestrou 30 filhotes mágicos. Resgate 3 pets em cada portal!"></div>
 <div class="pet-showcase">
  <div class="pet-showcase-art"><img class="pet-showcase-img ${ok?'':'locked'}" data-pet-showcase src="${petFrames(picked)[0]}" alt="${esc(picked.name)}"><span class="pet-showcase-lock" style="${ok?'display:none':''}">🔒</span></div>
  <div class="pet-showcase-info"><div class="pet-selected-name">${esc(picked.name)} <span>${esc(picked.title)}</span></div>
   <div class="pet-status ${ok?'rescued':'locked'}">${ok?'RESGATADO':'SEQUESTRADO'}</div>
   <div class="pet-selected-desc">${ok?'<b>✨ Animado</b> '+esc(picked.desc):'<b>🔒 Portal '+picked.portal+'</b> Domine o <b>mapa '+picked.table+'</b> para libertar este pet.'}</div>
   ${ok?'':`<button type="button" class="pet-watch-btn" data-action="petMission" data-pet="${picked.id}">🗺️ Jogar missão do Portal ${picked.portal}</button>`}
  </div>
 </div>
 <div class="pets-list-scroll"><div class="pets-grid">
 ${PETS.map(pet=>{const owned=rescued(profile,pet);return `<button class="pet-card ${owned?'rescued':'locked'} ${selectedId===pet.id?'selected':''}" data-action="selectPet" data-pet="${pet.id}">
  <span class="pet-card-number">P${pet.portal}</span><div class="pet-card-art"><img class="pet-live-sprite" data-pet-id="${pet.id}" src="${petFrames(pet)[0]}" loading="lazy" alt="${esc(pet.name)}"><span class="pet-card-lock">🔒</span></div>
  <span class="pet-card-status">${owned?'RESGATADO':'Tabuada '+pet.table}</span><small>${owned?'✦ ANIMADO':pet.title==='Lendário'?'LENDÁRIO':'PET OCULTO'}</small>
 </button>`}).join('')}</div>
 <div class="pets-footer-note">🗺️ Complete os mapas <b>3, 7 e 10 de cada portal</b> para resgatar os PETS. No Portal 10, o último lendário é salvo no mapa 9.</div></div></div>
 ${rescue?`<div class="pets-rescue-overlay" role="dialog" aria-modal="true" aria-label="Resgate de pet"><div class="pets-rescue-stage">
 <h2>PORTAL ${rescue.portal} · RESGATE</h2><p>O Capitão Corsário Arcano aprisionou ${esc(rescue.name)}!</p>
 <div class="pets-rescue-energy"><span>FORÇA DO CORSÁRIO</span><b data-villain-power>${rescue.table===3?'3':rescue.table===7?'2':'1'}/3</b><i data-villain-bar style="width:${rescue.table===3?'100':rescue.table===7?'67':'33'}%"></i></div>
 <div class="pets-rescue-actors"><img data-rescue-villain src="${petImage('villain-frame-0.webp')}" alt="Capitão Corsário Arcano"><span class="pets-rescue-blast" data-rescue-blast>✦</span><img src="${petFrames(rescue,'happy')[0]}" data-rescue-pet alt="${esc(rescue.name)}"></div>
 <h3 data-rescue-message>O Capitão Corsário Arcano ainda mantém ${esc(rescue.name)} preso!</h3><button data-action="petRescueDone" data-rescue-done disabled>Aguarde...</button></div></div>`:''}
 </main>`;
}
export function mountPetAnimation(root,profile,selectedId,rescue=null){
 const selected=PETS.find(x=>x.id===selectedId)||PETS[0];
 const timers=[];
 if(rescue){
  const later=(fn,delay)=>timers.push(setTimeout(()=>{if(root.isConnected)fn()},delay));
  const villain=root.querySelector('[data-rescue-villain]'),power=root.querySelector('[data-villain-power]'),bar=root.querySelector('[data-villain-bar]'),message=root.querySelector('[data-rescue-message]'),done=root.querySelector('[data-rescue-done]'),blast=root.querySelector('[data-rescue-blast]');
  const initial=rescue.table===3?3:rescue.table===7?2:1;
  later(()=>{if(message)message.textContent='Aventureira, use o poder da tabuada!';blast?.classList.add('fire')},650);
  for(let i=0;i<6;i++)later(()=>{if(villain)villain.src=petImage('villain-frame-'+i+'.webp')},910+i*135);
  later(()=>{if(power)power.textContent=Math.max(0,initial-1)+'/3';if(bar)bar.style.width=(Math.max(0,initial-1)/3*100)+'%';if(message)message.textContent='✨ '+rescue.name+' foi resgatado!';villain?.classList.add('defeated')},1850);
  later(()=>{if(message)message.textContent='🐾 '+rescue.name+' agora está seguro. '+petsSaved(profile)+'/30 pets resgatados.';if(done){done.disabled=false;done.textContent='Ver pet resgatado'}},2850);
 }
 let frame=0,interval=setInterval(()=>{
  if(!root.isConnected)return;
  frame=(frame+1)%8;
  root.querySelectorAll('.pet-card.rescued .pet-live-sprite').forEach(img=>{const pet=PETS.find(x=>x.id===Number(img.dataset.petId));if(pet)img.src=petFrames(pet)[frame]});
  if(rescued(profile,selected)){const image=root.querySelector('[data-pet-showcase]');if(image&&!image.dataset.playing)image.src=petFrames(selected)[frame]}
  const rescueImg=root.querySelector('[data-rescue-pet]');if(rescueImg&&rescue)rescueImg.src=petFrames(rescue,'happy')[frame];
 },120);
 return ()=>{clearInterval(interval);timers.forEach(clearTimeout)};
}
