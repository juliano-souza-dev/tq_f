import {avatarUrl,homeCharacterUrl,assetUrl,equippedFrameUrl} from '../../resources/asset-map.mjs';
import {art,topbar,escapeHTML} from '../../components/ui.mjs';
const FRAMES=[
 {id:null,label:'Moldura original',src:null},
 {id:'frame_star',label:'Estelar',src:'frame-star.webp'},
 {id:'frame_floral',label:'Floral',src:'frame-floral.webp'},
 {id:'frame_champion',label:'Campeã',src:'frame-champion.webp'},
 {id:'frame_rainbow',label:'Arco-íris',src:'frame-rainbow.webp'}
];
export const availableFashion=profile=>[
 {id:'original',label:'Original',url:avatarUrl(profile.avatar.id)},
 ...(profile.fashionOwned?.includes('pirate')?[{id:'pirate',label:'Pirata',url:homeCharacterUrl(profile.avatar.id)}]:[])
];
export const availableFrames=profile=>FRAMES.filter(x=>!x.id||profile.owned?.includes(x.id));
export function wardrobeScreen(profile){
 const selected=profile.avatar.skinId||'original',frame=profile.equipped?.frame||null;
 const costume=availableFashion(profile);
 const frames=availableFrames(profile);
 return `<main class="wardrobe-view screen-stack">
   ${topbar(profile,{title:'Meu visual'})}
   <h1>Moda e molduras</h1>
   <p>Escolha as roupas e molduras que sua aventureira já conquistou.</p>
   <section class="wardrobe-picks" aria-label="Roupas disponíveis">
     <h2>Moda</h2>
     <div class="wardrobe-list">${costume.map(x=>`<button type="button" class="wardrobe-choice" data-action="equipFashion" data-skin="${escapeHTML(x.id)}" aria-pressed="${selected===x.id}">${art(x.url,{alt:'',className:'wardrobe-avatar'})}<strong>${escapeHTML(x.label)}</strong><span>${selected===x.id?'Equipado':'Equipar'}</span></button>`).join('')}</div>
   </section>
   <section class="wardrobe-picks" aria-label="Molduras disponíveis">
     <h2>Molduras</h2>
     <div class="wardrobe-list">${frames.map(x=>`<button type="button" class="wardrobe-choice" data-action="equipFrame" data-frame="${x.id||''}" aria-pressed="${frame===x.id}"><span class="wardrobe-frame-swatch">${x.src?art(assetUrl(x.src),{alt:''}):'✦'}</span><strong>${escapeHTML(x.label)}</strong><span>${frame===x.id?'Equipada':'Equipar'}</span></button>`).join('')}</div>
   </section>
   <button type="button" class="main-cta" data-action="home">Voltar à aventura</button>
 </main>`;
}
