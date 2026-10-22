import {WORLDS,worldState,masteredCount} from '../../core/progression.mjs';
import {assetUrl} from '../../resources/asset-map.mjs';
import {escapeHTML} from '../../components/ui.mjs';
export function worldsScreen(player,selected,now=Date.now()){
 const world=WORLDS.find(x=>x.number===selected)||WORLDS[0];
 const selection=worldState(player,world.number,now);
 return `<main class="worlds-view worlds-immersive">
   <div class="worlds-map-stage">
    <img class="world-map-art" src="${assetUrl('world_map_new.webp')}" alt="Mapa vertical dos dez mundos interligados por pontes">
    <button class="worlds-back" type="button" data-action="home" aria-label="Voltar ao início">‹</button>
    <div class="worlds-progress">✦ ${masteredCount(player)}/10</div>
    ${WORLDS.map(item=>{
      const st=worldState(player,item.number,now);
      return `<button type="button" data-action="selectWorld" data-world="${item.number}"
        class="world-pin ${escapeHTML(st.id)} ${selected===item.number?'selected':''}"
        aria-pressed="${selected===item.number}" aria-label="Mundo ${item.number}: ${escapeHTML(item.name)}. ${st.label}">
        <span class="sr-only">Mundo ${item.number}</span>${st.id==='locked'?'<i aria-hidden="true">🔒</i>':''}
       </button>`;
    }).join('')}
   </div>
   <section class="worlds-destination" aria-label="Mundo selecionado">
     <div class="worlds-destination-head"><span>MUNDO ${world.number} · TABUADA DO ${world.number}</span><strong>${escapeHTML(world.name)}</strong>
     <small>${selection.id==='scheduled'?'Revisão em '+selection.days+' dia(s)':selection.label}</small></div>
     <button class="worlds-go" type="button" data-action="startWorld" data-world="${world.number}" ${selection.enabled?'':'disabled'}>
      ${selection.id==='due'?'↻ Revisar':selection.id==='new'?'✦ Entrar':'🔒 Bloqueado'}
     </button>
   </section>
 </main>`;
}
