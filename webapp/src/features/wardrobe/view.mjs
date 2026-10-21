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
 const skins=fashionFor(profile),frames=availableFrames(profile),current=skins.find(x=>x.id===(profile.avatar?.skinId||'original'))||skins[0];
 const unlocked=skins.filter(s=>fashionStatus(profile,s).owned).length;
 const file=n=>'./assets/optimized/fashion-'+n+'.webp';
 const icon=n=>art(file('icon-'+n),{alt:''});
 return `<main class="fashion-reference">
   <div class="fashion-reference-inner">
     <header class="fashion-reference-head">
       ${art(file('header'),{alt:'Moda',className:'fashion-reference-logo',eager:true})}
       <button type="button" class="fashion-head-hit back" data-action="home" aria-label="Voltar"></button>
       <button type="button" class="fashion-head-hit help" data-action="fashionHelp" aria-label="Como obter roupas"> </button>
     </header>
     <div class="fashion-reference-wallet">${icon('coin')}<span><small>SUAS MOEDAS</small><strong>${coins(profile.coins||0)}</strong></span></div>
     <section class="fashion-reference-preview" aria-label="Roupa equipada">
       <div class="fashion-reference-preview-copy"><span>${escapeHTML(profile.name)}</span><b>✓ ${escapeHTML(current.name)}</b></div>
       ${art(fashionAssetUrl(profile.avatar.id,current.id),{className:'fashion-reference-character',alt:'Visual equipado: '+current.name,eager:true})}
     </section>
     <div class="fashion-reference-heading"><strong>Seu guarda-roupa</strong><span>${unlocked}/${skins.length} DESBLOQUEADAS</span></div>
     ${notice?`<p class="fashion-reference-notice" role="status">${escapeHTML(notice)}</p>`:''}
     <section class="fashion-reference-grid" aria-label="Catálogo de roupas">
       ${skins.map(skin=>{
        const st=fashionStatus(profile,skin);
        const source=sourceLabel(skin);
        const label=st.equipped?'✓ Em uso':st.owned?'Selecionar':st.buyable?coins(st.price):'Bloqueada';
        return `<article class="fashion-reference-card ${st.equipped?'selected':''} ${st.owned?'':'locked'}" aria-label="${escapeHTML(skin.name)}">
         <div class="fashion-reference-art">
           ${art(fashionAssetUrl(profile.avatar.id,skin.id),{alt:skin.name,className:'fashion-reference-outfit'})}
           ${!st.owned?`<div class="fashion-reference-lock">${icon('lock')}</div>`:''}
           <span class="fashion-reference-state">${st.owned?'★':icon('lock')}</span>
         </div>
         <h2>${escapeHTML(skin.name)}</h2>
         <p>${escapeHTML(skin.theme||'Visual')}</p>
         <div class="fashion-reference-source">${st.owned?'✓ Desbloqueada':escapeHTML(source)}</div>
         <button type="button" class="fashion-reference-action" data-action="fashionAction" data-skin="${escapeHTML(skin.id)}" ${st.equipped||(!st.owned&&!st.buyable)?'disabled':''}>${st.buyable&&!st.owned?icon('coin'):''}${label}</button>
        </article>`;
       }).join('')}
     </section>

   </div>
 </main>`;
}
