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

const COLLECTION_TABS=[['all','Todos'],['Comum','Comuns'],['Raro','Raros'],['Épico','Épicos'],['Lendário','Lendários']];
const COLLECTION_ASSET=name=>chestAsset(name);
const collectionRarityClass=rarity=>String(rarity||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const collectionSourceLabel=item=>{
 if(item.source==='table2_chest')return 'Baú da Tabuada do 2 · exclusivo';
 if(item.source==='table3_chest')return 'Baú da Tabuada do 3 · exclusivo';
 if(item.source==='mastery12')return 'Baú dos Navegadores · exclusivo';
 if(item.source==='daily')return 'Baú da Recompensa Diária · exclusivo';
 if(item.source==='chest'||item.shop===false)return 'Baú Mágico · exclusivo';
 return 'Baús e recompensas';
};
export function collectionScreen(profile,selectedId=null,filter='all'){
 // Somente peças de coleção. "collection" indica apenas a série de um item,
 // portanto não inclui molduras, moda, fundos ou efeitos nesta galeria.
 const all=ALL_CHEST_ITEMS.filter(item=>item.cat==='collectible');
 const owned=all.filter(item=>profile.owned?.includes(item.id));
 const pct=all.length?Math.round(owned.length/all.length*100):0;
 const rarities=[...new Set(all.map(item=>item.rarity).filter(Boolean))];
 const tabs=[...COLLECTION_TABS,...rarities.filter(r=>!COLLECTION_TABS.some(([id])=>id===r)).map(r=>[r,r])];
 const chosen=all.find(item=>item.id===selectedId)||(owned[0]||all[0]);
 const has=chosen&&profile.owned?.includes(chosen.id);
 const visible=filter==='all'?all:all.filter(item=>item.rarity===filter);
 const img=(asset)=>COLLECTION_ASSET(asset);
 return `<main class="collection-screen">
  <div class="collection-shell">
   <header class="collection-nav"><button type="button" data-action="home" aria-label="Voltar à página inicial">‹ <span>Voltar</span></button></header>
   <div class="collection-head"><span class="collection-kicker">GALERIA REAL DOS TESOUROS</span><h1>Minha Coleção</h1><p>Os tesouros conquistados por este perfil ficam guardados aqui. Cada peça pertence somente à criança que a encontrou.</p></div>
   <div class="collection-summary"><div class="collection-summary-copy"><b>${owned.length} de ${all.length} tesouros encontrados</b><span>${owned.length===all.length?'Galeria completa! Este perfil encontrou todos os tesouros disponíveis.':`Faltam ${all.length-owned.length} peça${all.length-owned.length===1?'':'s'} para completar a galeria.`}</span></div><div class="collection-progress-ring" style="--pct:${pct}%"><strong>${pct}%</strong></div></div>
   <div class="collection-showcase">
    <div class="collection-stage"><img class="collection-pedestal" src="${img('collection-pedestal.png')}" alt=""><img class="collection-stage-item ${has?'':'locked'}" src="${img(has?chosen.asset:'collection-locked-card.png')}" alt="${has?escapeHTML(chosen.name):'Tesouro ainda não encontrado'}"></div>
    <div class="collection-detail"><b>${has?escapeHTML(chosen.name):'Tesouro misterioso'}</b><span>${chosen?`${escapeHTML(chosen.rarity)} · ${has?'Tesouro conquistado':'ainda não encontrado'}`:'Escolha uma peça da galeria.'}</span><span class="collection-source">${chosen?escapeHTML(collectionSourceLabel(chosen)):'Sua coleção'}</span></div>
    <div class="collection-actions"></div>
   </div>
   <nav class="collection-tabs" aria-label="Filtrar por raridade">${tabs.map(([id,label])=>`<button type="button" class="collection-tab ${filter===id?'active':''}" data-action="collectionFilter" data-filter="${escapeHTML(id)}" ${filter===id?'aria-current="page"':''}>${escapeHTML(label)}</button>`).join('')}</nav>
   <div class="collection-grid">${visible.map(item=>{
     const itemOwned=profile.owned?.includes(item.id),isSelected=item.id===chosen?.id;
     return `<button type="button" class="collection-card ${itemOwned?'':'locked'} ${isSelected?'selected':''}" data-action="collectionSelect" data-item="${escapeHTML(item.id)}" aria-label="${escapeHTML(itemOwned?item.name:'Tesouro bloqueado')}" aria-pressed="${isSelected}">
      <div class="collection-card-art">${itemOwned?`<img class="frame" src="${img('collection-item-frame.png')}" alt=""><img class="treasure" src="${img(item.asset)}" alt="${escapeHTML(item.name)}" loading="lazy">`:`<img class="mystery" src="${img('collection-locked-card.png')}" alt="Tesouro misterioso" loading="lazy">`}</div>
      <span class="collection-card-name">${itemOwned?escapeHTML(item.name):'???'}</span>
      <div class="collection-card-meta"><span class="collection-rarity ${collectionRarityClass(item.rarity)}">${escapeHTML(item.rarity)}</span><span class="${itemOwned?'owned':''}">${itemOwned?'✓ Encontrado':'🔒 Oculto'}</span></div>
     </button>`;
    }).join('')}</div>
  </div>
 </main>`;
}
