import {chestDefinitions,chestState,chestRemaining,chestFrames,chestAsset,rewardAsset} from './catalog.mjs';
import {escapeHTML} from '../../components/ui.mjs';
const safe=escapeHTML;
export function chestsScreen(profile,opening=null,notice=''){
 const defs=chestDefinitions(profile),states=defs.map(d=>chestState(profile,d));
 const counts={ready:states.filter(s=>s==='ready').length,opened:states.filter(s=>s==='opened').length,locked:states.filter(s=>s==='locked').length};
 const reward=opening?.result;
 return `<main class="chests-view">
  <header class="chests-header"><button type="button" data-action="home" aria-label="Voltar">‹</button><div><h1>Baús do Tesouro</h1><p>Recompensas e relíquias da aventura</p></div></header>
  <div class="chests-summary"><div><b>${counts.ready}</b>Prontos</div><div><b>${counts.opened}</b>Abertos</div><div><b>${counts.locked}</b>Fechados</div></div>
  ${notice?`<p class="chests-notice" role="status">${safe(notice)}</p>`:''}
  <div class="chests-gallery">${defs.map((def,i)=>{
    const state=states[i],imgs=chestFrames(def),image=imgs[state==='opened'?5:0];
    return `<button type="button" class="chests-card ${state}" data-action="openChest" data-chest="${def.id}" ${state!=='ready'?'disabled':''}>
       <span class="chests-status">${state==='ready'?'PRONTO':state==='opened'?'ABERTO':'FECHADO'}</span>
       <img src="${image}" loading="lazy" alt="${safe(def.name)}" onerror="this.onerror=null;this.src='${chestAsset('pack-magic.webp')}'">
       <b>${safe(def.name)}</b><small>${safe(def.rarity)} · ${def.kind==='mastery'?'TABUADA ×'+def.table:'AVENTURA'}</small>
       <p>${state==='ready'?'Toque para abrir':state==='opened'?'Tesouro conquistado':safe(chestRemaining(profile,def))}</p>
      </button>`;
  }).join('')}</div>
  ${opening?`<div class="chests-overlay" role="dialog" aria-modal="true" aria-label="Abrindo baú">
    <div class="chests-modal">
      ${opening.phase==='opening'?`<b>ABRINDO TESOURO</b><h2>${safe(opening.def.name)}</h2><img data-chest-anim src="${chestFrames(opening.def)[0]}" alt="Baú se abrindo"><span class="chests-spark">✦ ✧ ✦</span>`:
      `<h2>${safe(opening.def.name)} aberto!</h2><img src="${chestFrames(opening.def)[5]}" alt="Baú aberto">
       <p>Recompensas enviadas ao perfil</p><div class="chests-rewards">${(reward?.items||[]).map(item=>`<div><img src="${rewardAsset(item,profile)}" alt=""><b>${safe(item.name)}</b><small>${safe(item.cat)}</small></div>`).join('')}</div>
       <button type="button" data-action="closeChest">Continuar</button>`}
    </div>
   </div>`:''}
 </main>`;
}
