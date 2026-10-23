import {PETS,petsSaved,rescued,petFrames,petImage} from './catalog.mjs';
import {escapeHTML as esc} from '../../components/ui.mjs';
import {equippedAvatarUrl} from '../../resources/asset-map.mjs';
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
 ${rescue?`<div class="pet-rescue-overlay open" role="dialog" aria-modal="true" aria-label="Missão de resgate de pet" aria-hidden="false">
  <div class="pet-rescue-scene">
   <div class="pet-rescue-kicker">PORTAL ${rescue.portal} · RESGATE ${rescue.title==='Lendário'?'LENDÁRIO':''}</div>
   <div class="pet-rescue-title">Tabuada do ${rescue.table} dominada!</div>
   <div class="villain-power"><span>Poder do Corsário</span><div><i data-villain-bar style="width:${rescue.table===3?100:rescue.table===7?67:33}%"></i></div><b data-villain-power>${rescue.table===3?3:rescue.table===7?2:1}/3</b></div>
   <div class="pet-rescue-battle">
    <div class="rescue-hero"><img src="${equippedAvatarUrl(profile)}" alt="Aventureira"></div>
    <div class="rescue-blast" data-rescue-blast></div>
    <div class="rescue-villain" data-rescue-villain-host><img data-rescue-villain src="${petImage('villain-frame-0.webp')}" alt="Capitão Corsário Arcano"></div>
    <div class="rescue-pet-prison" data-rescue-prison><span class="prison-chain left"></span><span class="prison-chain right"></span><div class="prison-ring"><img src="${petFrames(rescue,'happy')[0]}" data-rescue-pet alt="${esc(rescue.name)}"></div><span class="prison-lock">🔒</span></div>
   </div>
   <div class="pet-rescue-message" data-rescue-message>O <strong>Capitão Corsário Arcano</strong> ainda mantém ${esc(rescue.name)} preso!</div>
   <button class="pet-rescue-continue" type="button" data-action="petRescueDone" data-rescue-done disabled>Aguarde...</button>
  </div>
 </div>`:''}
 </main>`;
}
export function mountPetAnimation(root,profile,selectedId,rescue=null){
 const selected=PETS.find(x=>x.id===selectedId)||PETS[0];
 const timers=[];
 if(rescue){
  const later=(fn,delay)=>timers.push(setTimeout(()=>{if(root.isConnected)fn()},delay));
  const villain=root.querySelector('[data-rescue-villain]'),villainHost=root.querySelector('[data-rescue-villain-host]'),prison=root.querySelector('[data-rescue-prison]'),hero=root.querySelector('.rescue-hero'),power=root.querySelector('[data-villain-power]'),bar=root.querySelector('[data-villain-bar]'),message=root.querySelector('[data-rescue-message]'),done=root.querySelector('[data-rescue-done]'),blast=root.querySelector('[data-rescue-blast]'),stage=root.querySelector('.pet-rescue-scene');
  const initial=rescue.table===3?3:rescue.table===7?2:1;
  later(()=>{if(message)message.textContent='Aventureira, use o poder da tabuada!';hero?.classList.add('attack');blast?.classList.add('fire')},650);
  for(let i=0;i<6;i++)later(()=>{if(villain)villain.src=petImage('villain-frame-'+i+'.webp');if(i===0)villainHost?.classList.add('hit')},910+i*135);
  later(()=>{
   if(power)power.textContent=Math.max(0,initial-1)+'/3';
   if(bar)bar.style.width=(Math.max(0,initial-1)/3*100)+'%';
   villainHost?.classList.add(rescue.portal===10&&rescue.id===30?'final-defeat':'defeated');
   prison?.classList.add('broken');stage?.classList.add('rescued');
   if(message)message.innerHTML='✨ <strong>'+esc(rescue.name)+' '+esc(rescue.title)+'</strong> foi resgatado!';
  },1850);
  later(()=>{
   if(message)message.innerHTML=rescue.portal===10&&rescue.id===30?'🏆 <strong>Todos os 30 filhotes foram salvos!</strong> O Corsário foi derrotado de vez.':'🐾 '+esc(rescue.name)+' agora está seguro. <strong>'+petsSaved(profile)+'/30</strong> pets resgatados.';
   if(done){done.disabled=false;done.textContent=rescue.portal===10&&rescue.id===30?'Ver todos os PETS':'Ver pet resgatado'}
  },2850);
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
