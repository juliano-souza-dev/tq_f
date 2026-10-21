import {assetUrl,fashionAssetUrl,equippedAvatarUrl} from '../../resources/asset-map.mjs';
import {fashionFor,fashionStatus} from './fashion.mjs';
import {art,topbar,escapeHTML} from '../../components/ui.mjs';
const FRAMES=[{id:null,label:'Original',src:null},{id:'frame_star',label:'Estelar',src:'frame-star.webp'},{id:'frame_floral',label:'Floral',src:'frame-floral.webp'},{id:'frame_champion',label:'Campeã',src:'frame-champion.webp'},{id:'frame_rainbow',label:'Arco-íris',src:'frame-rainbow.webp'}];
export const availableFashion=profile=>fashionFor(profile).filter(item=>fashionStatus(profile,item).owned);
export const availableFrames=profile=>FRAMES.filter(x=>!x.id||profile.owned?.includes(x.id));
const coins=n=>new Intl.NumberFormat('pt-BR').format(n);
function sourceLabel(skin){
 const src=skin.sources||[];
 if(src.includes('coins'))return '🪙 Comprar com moedas';
 if(src.includes('daily'))return '🎁 Recompensa diária';
 if(src.includes('chest'))return '🎁 Baús';
 const mastery=src.find(x=>x.includes('chest'));
 return mastery?'🏆 Conquista de tabuada':'🔒 Recompensa especial';
}
export function wardrobeScreen(profile,notice='',selectedSkin=null,tab='fashion'){
 const skins=fashionFor(profile),frames=availableFrames(profile);
 const equipped=profile.avatar?.skinId||'original';
 const selected=skins.find(x=>x.id===selectedSkin)||skins.find(x=>x.id===equipped)||skins[0];
 const status=fashionStatus(profile,selected);
 const unlocked=skins.filter(x=>fashionStatus(profile,x).owned).length;
 const source=status.owned?'✓ Disponível no guarda-roupa':sourceLabel(selected);
 const action=status.equipped?'✓ Em uso':status.owned?'Equipar visual':status.buyable?'🪙 Comprar por '+coins(status.price):'🔒 Desbloqueie jogando';
 return `<main class="wardrobe-view screen-stack">
   <header class="atelier-head"><button type="button" class="atelier-back" data-action="home" aria-label="Voltar à home">‹</button><strong>ATELIÊ MÁGICO</strong><span class="atelier-coins" aria-label="${coins(profile.coins||0)} moedas">🪙 ${coins(profile.coins||0)}</span></header>
   <section class="atelier-stage" aria-label="Prévia do visual">
     <div class="atelier-spotlight"></div>
     ${art(fashionAssetUrl(profile.avatar.id,selected.id),{className:'atelier-preview-avatar',alt:'Prévia da roupa '+selected.name,eager:true})}
     <div class="atelier-stage-info"><span>${escapeHTML(profile.name)}</span><strong>${escapeHTML(selected.name)}</strong><small>${escapeHTML(selected.theme||'Visual especial')}</small></div>
   </section>
   <nav class="atelier-tabs" aria-label="Categorias do Ateliê">
     <button type="button" data-action="wardrobeTab" data-tab="fashion" aria-pressed="${tab==='fashion'}">👗 Roupas</button>
     <button type="button" data-action="wardrobeTab" data-tab="frames" aria-pressed="${tab==='frames'}">🖼️ Molduras</button>
   </nav>
   ${tab==='fashion'?`
     <section class="atelier-collection" aria-label="Escolha uma roupa">
      <div class="atelier-section-caption"><strong>Escolha seu visual</strong><small>${unlocked}/${skins.length} desbloqueados</small></div>
      <div class="atelier-rail" role="group" aria-label="Visuais do personagem">
       ${skins.map(skin=>{const st=fashionStatus(profile,skin);return `<button class="atelier-skin ${selected.id===skin.id?'is-selected':''}" type="button" data-action="previewFashion" data-skin="${escapeHTML(skin.id)}" aria-pressed="${selected.id===skin.id}">${art(fashionAssetUrl(profile.avatar.id,skin.id),{className:'atelier-skin-img',alt:''})}<span>${escapeHTML(skin.name)}</span><small>${st.owned?'✓':st.buyable?'🪙 '+coins(st.price):'🔒'}</small></button>`}).join('')}
      </div>
     </section>
     <section class="atelier-footer" aria-label="Visual selecionado">
       ${notice?`<p class="atelier-notice" role="status">${escapeHTML(notice)}</p>`:''}
       <p class="atelier-acquire">${escapeHTML(source)}</p>
       <button type="button" class="atelier-main-action" data-action="fashionAction" data-skin="${escapeHTML(selected.id)}" ${status.equipped||(!status.owned&&!status.buyable)?'disabled':''}>${action}</button>
     </section>`:`
     <section class="atelier-collection atelier-frame-collection" aria-label="Escolha uma moldura">
      <div class="atelier-section-caption"><strong>Suas molduras</strong><small>${frames.length} disponíveis</small></div>
      <div class="atelier-rail">${frames.map(x=>`<button type="button" class="atelier-skin atelier-frame-option" data-action="equipFrame" data-frame="${x.id||''}" aria-pressed="${(profile.equipped?.frame||null)===x.id}"><span class="wardrobe-frame-swatch">${x.src?art(assetUrl(x.src),{alt:''}):'✦'}</span><span>${escapeHTML(x.label)}</span><small>${(profile.equipped?.frame||null)===x.id?'✓ Em uso':'Equipar'}</small></button>`).join('')}</div>
     </section>
     <section class="atelier-footer"><p class="atelier-acquire">Molduras conquistadas personalizam seu retrato.</p><button type="button" class="atelier-main-action" data-action="home">Concluir personalização</button></section>`}
 </main>`;
}
