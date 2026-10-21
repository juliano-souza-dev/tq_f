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
export function wardrobeScreen(profile,notice=''){
 const skins=fashionFor(profile),frames=availableFrames(profile);
 const worn=skins.find(x=>x.id===(profile.avatar?.skinId||'original'))||skins[0];
 const unlocked=skins.filter(x=>fashionStatus(profile,x).owned).length;
 return `<main class="wardrobe-view screen-stack">
   ${topbar(profile,{title:'Ateliê da Aventureira'})}
   <section class="fashion-hero">
     <div class="fashion-hero-copy"><span>✨ ATELIÊ MÁGICO</span><h1>Moda de ${escapeHTML(profile.name)}</h1>
     <p>Escolha seu visual para a próxima aventura.</p>
     <div class="fashion-wallet">🪙 ${coins(profile.coins||0)} <small>moedas</small></div></div>
     ${art(equippedAvatarUrl(profile),{className:'fashion-stage-avatar',alt:'Visual equipado de '+profile.name})}
   </section>
   ${notice?`<p class="fashion-notice" role="status">${escapeHTML(notice)}</p>`:''}
   <section class="fashion-collection">
    <div class="fashion-section-title"><h2>Guarda-roupa</h2><span>${unlocked} / ${skins.length} desbloqueadas</span></div>
    <div class="fashion-cards">
      ${skins.map(skin=>{
        const status=fashionStatus(profile,skin);
        const src=fashionAssetUrl(profile.avatar.id,skin.id);
        const label=status.equipped?'✓ Em uso':status.owned?'Equipar':status.buyable?'🪙 '+coins(status.price):'🔒 Bloqueada';
        return `<article class="fashion-card ${status.equipped?'fashion-equipped':''} ${!status.owned?'fashion-locked':''}">
          <div class="fashion-card-media">
            ${art(src,{className:'fashion-card-figure',alt:'Roupa '+skin.name})}
            ${status.equipped?'<span class="fashion-check">✓</span>':''}
          </div>
          <h3>${escapeHTML(skin.name)}</h3>
          <p>${escapeHTML(skin.theme||'Visual especial')}</p>
          <div class="fashion-source">${status.owned?'✓ Desbloqueada':sourceLabel(skin)}</div>
          <button type="button" data-action="fashionAction" data-skin="${escapeHTML(skin.id)}" ${status.equipped||(!status.owned&&!status.buyable)?'disabled':''} aria-label="${escapeHTML(label+' '+skin.name)}">${label}</button>
        </article>`;
      }).join('')}
    </div>
   </section>
   <section class="wardrobe-picks" aria-label="Molduras do perfil">
     <div class="fashion-section-title"><h2>Molduras equipáveis</h2></div>
     <div class="wardrobe-list">${frames.map(x=>`<button class="wardrobe-choice" type="button" data-action="equipFrame" data-frame="${x.id||''}" aria-pressed="${(profile.equipped?.frame||null)===x.id}"><span class="wardrobe-frame-swatch">${x.src?art(assetUrl(x.src),{alt:''}):'✦'}</span><strong>${escapeHTML(x.label)}</strong><span>${(profile.equipped?.frame||null)===x.id?'Equipada':'Equipar'}</span></button>`).join('')}</div>
   </section>
   <button type="button" class="main-cta" data-action="home">Voltar à aventura</button>
 </main>`;
}
