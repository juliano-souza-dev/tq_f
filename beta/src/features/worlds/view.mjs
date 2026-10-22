import {WORLDS,worldState,masteredCount} from '../../core/progression.mjs';
import {assetUrl,worldUrl} from '../../resources/asset-map.mjs';
import {art,topbar,endNav,escapeHTML} from '../../components/ui.mjs';
export function worldsScreen(player,selected,now=Date.now()){
 const world=WORLDS.find(x=>x.number===selected)||WORLDS[0];
 const selection=worldState(player,world.number,now);
 return `<main class="worlds-view screen-stack">
  ${topbar(player,{title:'O mapa encantado'})}
  <div class="world-heading"><span>✦ SEU PRÓXIMO DESTINO ✦</span><h1>Os dez mundos</h1>
    <p>Domine as tabuadas, desperte os portais e revele novos lugares.</p></div>
  <section class="world-map-shell" aria-label="Mapa interativo dos dez mundos">
   <div class="world-map world-map-new">
    ${`<img class="world-map-art" src="${assetUrl('world_map_new.webp')}" alt="Mapa ilustrado dos dez mundos conectados por pontes" onerror="this.onerror=null;this.closest('.world-map').classList.remove('world-map-new');this.src='./assets/optimized/world_map_bg.webp'">`}
    ${WORLDS.map(item=>{
      const st=worldState(player,item.number,now);
      return `<button type="button" data-action="selectWorld" data-world="${item.number}"
         class="world-pin ${escapeHTML(st.id)} ${selected===item.number?'selected':''}"
         aria-pressed="${selected===item.number}" aria-label="Mundo ${item.number}: ${escapeHTML(item.name)}. ${st.label}">
        <span class="sr-only">${item.number}</span>${st.id==='locked'?'<i aria-hidden="true">🔒</i>':''}
       </button>`;
    }).join('')}
   </div>
  </section>
  <section class="selected-world" aria-label="Destino selecionado">
   ${art(worldUrl(world.number),{className:'world-preview',alt:'Ilustração de '+world.name})}
   <div class="world-preview-overlay">
    <span class="world-kicker">MUNDO ${world.number} · TABUADA DO ${world.number}</span>
    <h2>${escapeHTML(world.name)}</h2>
    <span class="world-status">${selection.id==='scheduled'?'Revisão em '+selection.days+' dia(s)':selection.label}</span>
    <button type="button" class="main-cta world-start" data-action="startWorld"
      data-world="${world.number}" ${selection.enabled?'':'disabled'}>
       ${selection.id==='due'?'↻ Revisar tabuada':selection.id==='new'?'✦ Começar aventura':'🔒 Aguardando desbloqueio'}
    </button>
   </div>
  </section>
  <div class="world-footnote">⭐ ${masteredCount(player)}/10 dominadas · As próximas aventuras são desbloqueadas com sua evolução.</div>
  ${endNav('worlds')}
 </main>`;
}
