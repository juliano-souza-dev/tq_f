import {chestDefinitions,chestState,chestRemaining,chestFrames,chestAsset,rewardAsset} from './catalog.mjs';
import {escapeHTML} from '../../components/ui.mjs';
export function chestsScreen(profile,opening=null,notice=''){
 const defs=chestDefinitions(profile),states=defs.map(def=>chestState(profile,def));
 const ready=states.filter(x=>x==='ready').length,opened=states.filter(x=>x==='opened').length,locked=states.filter(x=>x==='locked').length;
 const reward=opening?.result;
 return `<main class="chests-view chests-screen"><div class="chests-shell">
    <button class="chests-back" type="button" data-action="home" aria-label="Voltar para início">‹</button>
    <div class="chests-head"><div class="copy"><span>COFRE DE AVENTURAS</span><h1>Baús</h1>
      <p>Baús fechados mostram o que ainda falta. Quando um baú estiver pronto, toque nele para assistir à abertura e receber os itens no perfil.</p>
    </div></div>
    <div class="chests-summary">
      <div><b>${ready}</b><span>PRONTOS</span></div><div><b>${opened}</b><span>ABERTOS</span></div><div><b>${locked}</b><span>FECHADOS</span></div>
    </div>
    ${notice?`<p class="chests-notice" role="status">${escapeHTML(notice)}</p>`:''}
    <div class="chests-grid">
     ${defs.map((def,i)=>{
      const state=states[i],image=chestFrames(def)[state==='opened'?5:0];
      const label=state==='ready'?'TOQUE PARA ABRIR':state==='opened'?'✓ JÁ ABERTO':'AINDA FECHADO';
      const note=state==='ready'?'Disponível para abrir agora':state==='opened'?'Tesouro já conquistado':chestRemaining(profile,def);
      return `<button type="button" class="chest-gallery-card ${state}" data-action="openChest" data-chest="${escapeHTML(def.id)}">
         <span class="chest-gallery-status">${state==='ready'?'PRONTO':state==='opened'?'ABERTO':'FECHADO'}</span>
         <div class="chest-gallery-art"><img src="${image}" alt="${escapeHTML(def.name)}" loading="lazy" onerror="this.onerror=null;this.src='${chestAsset('pack-magic.webp')}'">
          <span class="chest-gallery-lock" aria-hidden="true">🔒</span></div>
         <h3>${escapeHTML(def.name)}</h3><p>${escapeHTML(note)}</p>
         <div class="chest-gallery-meta"><span class="chest-gallery-chip">${escapeHTML(def.rarity)}</span><span class="chest-gallery-chip">${def.kind==='mastery'?'TABUADA ×'+def.table:'AVENTURA'}</span></div>
         <div class="chest-gallery-action">${label}</div>
        </button>`;
     }).join('')}
    </div>
  </div>
  ${opening?`<div class="chests-overlay" role="dialog" aria-modal="true" aria-label="Abrindo baú">
   <div class="chests-modal chest-gallery-open-sheet">
    <div class="chest-gallery-open-head"><span>${opening.phase==='opening'?'ABRINDO BAÚ':'TESOURO CONQUISTADO'}</span><h2>${escapeHTML(opening.def.name)}</h2></div>
    <div class="chest-gallery-animation ${opening.phase==='opening'?'running':''}"><img ${opening.phase==='opening'?'data-chest-anim':''}
      src="${chestFrames(opening.def)[opening.phase==='opening'?0:5]}" alt="${escapeHTML(opening.def.name)}"></div>
    ${reward?`<div class="chest-gallery-reward show"><div class="chest-gallery-reward-title">Tesouros enviados ao perfil</div>
      <div class="chest-gallery-reward-grid">${reward.items.map(item=>`<div class="chest-gallery-reward-card">
        <img src="${rewardAsset(item,profile)}" alt="">
        <b>${escapeHTML(item.name)}</b><span>${escapeHTML(item.cat)}</span>
       </div>`).join('')}</div></div>
      <button class="chest-gallery-done show" type="button" data-action="closeChest">Guardar tesouros</button>`:''}
   </div></div>`:''}
 </main>`;
}
