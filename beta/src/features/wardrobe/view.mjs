import {assetUrl,fashionAssetUrl,equippedAvatarUrl} from '../../resources/asset-map.mjs';
import {fashionFor,fashionStatus} from './fashion.mjs';
import {CHEST_ITEMS,chestAsset} from '../chests/catalog.mjs';
import {DAILY_FRAMES} from '../daily/catalog.mjs';
import {storeSaleItems,storeAsset} from '../store/catalog.mjs';
import {art,topbar,escapeHTML} from '../../components/ui.mjs';
const FRAMES=[{id:null,label:'Original',src:null},{id:'frame_star',label:'Estelar',src:'frame-star.webp'},{id:'frame_floral',label:'Floral',src:'frame-floral.webp'},{id:'frame_champion',label:'Campeã',src:'frame-champion.webp'},{id:'frame_rainbow',label:'Arco-íris',src:'frame-rainbow.webp'}];
const FRAME_CATALOG=[...FRAMES,...[...CHEST_ITEMS,...DAILY_FRAMES,...storeSaleItems().filter(x=>x.cat==='frame')].filter(item=>item.cat==='frame').map(item=>({id:item.id,label:item.name,src:item.asset,source:item.source||'chest'}))];
export const availableFashion=profile=>fashionFor(profile).filter(item=>fashionStatus(profile,item).owned);
export const availableFrames=profile=>FRAME_CATALOG.filter(x=>!x.id||profile.owned?.includes(x.id));
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
 const allFrames=FRAME_CATALOG;
 const ownedFrameCount=availableFrames(profile).length;
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
     <div class="fashion-reference-heading"><strong>${tab==='frames'?'Suas molduras':'Seu guarda-roupa'}</strong><span>${tab==='frames'?ownedFrameCount+'/'+allFrames.length:unlocked+'/'+skins.length} DESBLOQUEADAS</span></div>
     <div class="fashion-chest-tabs"><button type="button" data-action="wardrobeTab" data-tab="fashion" ${tab==='fashion'?'aria-current="page"':''}>👗 Roupas</button><button type="button" data-action="wardrobeTab" data-tab="frames" ${tab==='frames'?'aria-current="page"':''}>🖼️ Molduras</button></div>
     ${notice?`<p class="fashion-reference-notice" role="status">${escapeHTML(notice)}</p>`:''}
${tab==='frames'?`<section class="fashion-reference-grid" aria-label="Molduras de baús">
    ${allFrames.map(frame=>{
      const owned=!frame.id||profile.owned?.includes(frame.id);
      const equipped=(profile.equipped?.frame||null)===frame.id;
      const src=!frame.src?'':frame.source==='chest'?chestAsset(frame.src):frame.source==='store'?storeAsset({asset:frame.src}):assetUrl(frame.src);
      return `<article class="fashion-reference-card ${equipped?'selected':''} ${owned?'':'locked'}">
        <div class="fashion-reference-art">${src?art(src,{alt:frame.label,className:'fashion-reference-outfit'}):'<span class="frame-empty-preview">◯</span>'}</div>
        <h2>${escapeHTML(frame.label)}</h2><p>${frame.source==='chest'?'Exclusiva de baús':'Moldura da coleção'}</p>
        <div class="fashion-reference-source">${owned?'✓ Desbloqueada':'🔒 Desbloqueie no baú'}</div>
        <button type="button" class="fashion-reference-action" data-action="equipFrame" data-frame="${escapeHTML(frame.id||'')}" ${!owned||equipped?'disabled':''}>${equipped?'✓ Em uso':owned?'Equipar':'Bloqueada'}</button>
      </article>`;
    }).join('')}
   </section>`:`     <section class="fashion-reference-grid" aria-label="Catálogo de roupas">
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
     </section>`}

   </div>
 </main>`;
}
