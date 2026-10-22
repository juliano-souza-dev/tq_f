import {WORLDS,worldState,masteredCount} from '../../core/progression.mjs';
import {assetUrl} from '../../resources/asset-map.mjs';
import {escapeHTML} from '../../components/ui.mjs';
export function worldsScreen(player,selected,now=Date.now()){
 return `<main class="worlds-view worlds-immersive">
   <div class="worlds-map-stage">
    <img class="world-map-art" src="${assetUrl('world_map_new.webp')}" alt="Mapa vertical dos dez mundos interligados por pontes">
    <button class="worlds-back" type="button" data-action="home" aria-label="Voltar ao início">‹</button>
    <div class="worlds-progress">✦ ${masteredCount(player)}/10</div>
    ${WORLDS.map(item=>{
      const st=worldState(player,item.number,now);
      return `<button type="button" data-action="startWorld" data-world="${item.number}"
        class="world-pin ${escapeHTML(st.id)}" ${st.enabled?'':'disabled'}
        aria-label="Mundo ${item.number}: ${escapeHTML(item.name)}. ${st.enabled?'Toque para entrar':st.label}">
        <span class="sr-only">Mundo ${item.number}</span>${!st.enabled?'<i aria-hidden="true">🔒</i>':''}
       </button>`;
    }).join('')}
   </div>
 </main>`;
}
