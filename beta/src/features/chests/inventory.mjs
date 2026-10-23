import {ALL_CHEST_ITEMS,chestAsset} from './catalog.mjs';
import {DAILY_FRAMES,DAILY_BONUS_BACKGROUNDS} from '../daily/catalog.mjs';
import {escapeHTML} from '../../components/ui.mjs';
export function chestInventoryScreen(profile,category='all',notice='',collectiblesOnly=false){
 const items=[...ALL_CHEST_ITEMS,...DAILY_FRAMES,...DAILY_BONUS_BACKGROUNDS];
 const group=collectiblesOnly?items.filter(x=>x.cat==='collectible'):category==='all'?items:items.filter(x=>x.cat===category);
 const owned=group.filter(x=>profile.owned?.includes(x.id)).length;
 const categories=[['all','Todos'],['frame','Molduras'],['background','Fundos'],['effect','Efeitos'],['collectible','Colecionáveis']];
 const chosen=profile.equipped||{};
 const actionFor=item=>item.cat==='frame'?'equipFrame':item.cat==='background'?'backgroundAction':item.cat==='effect'?'equipSuccessFX':null;
 const selected=item=>item.cat==='frame'?chosen.frame===item.id:item.cat==='background'?chosen.background===item.id:item.cat==='effect'?chosen.effect===item.id:false;
 return `<main class="chests-view ${collectiblesOnly?'collectibles-view':''}">
  <header class="chests-header"><button type="button" data-action="home" aria-label="Voltar">‹</button>
  <div><h1>${collectiblesOnly?'Colecionáveis':'Baú de Itens'}</h1><p>${collectiblesOnly?'Tesouros e relíquias para completar sua coleção':'Relíquias, molduras, efeitos e coleções'}</p></div></header>
  <div class="chests-inventory-top"><span>${owned} de ${group.length} itens nesta categoria</span>
  ${collectiblesOnly?'':'<button type="button" data-action="openFeature" data-feature="Baús">🎁 Galeria de baús</button>'}</div>
  ${collectiblesOnly?'':`<nav class="chests-categories" aria-label="Categorias">
  ${categories.map(([id,title])=>`<button type="button" data-action="vaultTab" data-cat="${id}" ${category===id?'aria-current="page"':''}>${title}</button>`).join('')}</nav>`}
  ${notice?`<p class="chests-notice" role="status">${escapeHTML(notice)}</p>`:''}
  <div class="chests-gallery chests-vault-grid">
  ${group.map(item=>{
   const isOwned=profile.owned?.includes(item.id),isSelected=selected(item);
   const action=actionFor(item),attr=item.cat==='frame'?'data-frame':item.cat==='background'?'data-background':'data-effect';
   return `<article class="chests-card ${isOwned?'opened':'locked'}">
     <span class="chests-status">${isOwned?'CONQUISTADO':'BLOQUEADO'}</span>
     <img src="${chestAsset(item.asset)}" loading="lazy" alt="${escapeHTML(item.name)}">
     <b>${escapeHTML(item.name)}</b><small>${escapeHTML(item.rarity)} · ${escapeHTML(item.cat)}</small>
     <p>${isOwned?'Disponível no seu perfil':'Exclusivo de recompensas'}</p>
     ${isOwned&&action?`<button type="button" class="chests-equip" data-action="${action}" ${attr}="${escapeHTML(item.id)}" ${isSelected?'disabled':''}>${isSelected?'✓ Em uso':'Equipar'}</button>`:''}
    </article>`;
  }).join('')}</div>
 </main>`;
}
