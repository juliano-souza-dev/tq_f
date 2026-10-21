import {avatarUrl,assetUrl} from '../../resources/asset-map.mjs';
import {FAMILIES} from '../../core/profiles.mjs';
import {art,escapeHTML} from '../../components/ui.mjs';
export function profilesScreen(profiles,selectedKey){
 const avatarOf=f=>profiles.find(p=>p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')===f.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''))?.avatar?.id||f.avatar;
 return `<main class="entry-view">
  <div class="entry-header">
   ${art(assetUrl('home_new_logo.webp'),{className:'entry-logo',alt:'Tabuada Quest',eager:true})}
   <p class="entry-kicker">Bem-vinda ao mundo dos números!</p>
   <h1>Quem vai explorar hoje?</h1>
  </div>
  <div class="players" role="group" aria-label="Escolha a aventureira">
    ${FAMILIES.map(f=>`<button type="button" class="player-choice ${f.color} ${f.key===selectedKey?'picked':''}"
     data-action="selectPlayer" data-player="${f.key}" aria-pressed="${f.key===selectedKey}">
      ${art(avatarUrl(avatarOf(f)),{className:'player-art',alt:'Avatar de '+f.name})}
      <span class="player-name">${escapeHTML(f.name)}</span>
      <span class="player-marker" aria-hidden="true">${f.key===selectedKey?'✓':'✦'}</span>
     </button>`).join('')}
  </div>
  <button type="button" class="main-cta" data-action="enter" ${selectedKey?'':'disabled'}>
   ✦ Entrar na aventura ✦
  </button>
  <p class="entry-tip">Cada aventureira guarda suas conquistas separadamente neste dispositivo.</p>
 </main>`;
}
