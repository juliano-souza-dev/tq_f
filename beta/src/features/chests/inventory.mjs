import {ALL_CHEST_ITEMS,chestAsset} from './catalog.mjs';
import {DAILY_FRAMES,DAILY_BONUS_BACKGROUNDS} from '../daily/catalog.mjs';
import {escapeHTML} from '../../components/ui.mjs';
import {assetUrl,equippedAvatarUrl} from '../../resources/asset-map.mjs';
import {BACKGROUNDS,backgroundUrl} from '../backgrounds/catalog.mjs';
import {SUCCESS_FX} from '../practice/fx.mjs';
import {availableFrames} from '../wardrobe/view.mjs';
import {storeSaleItems,storeAsset} from '../store/catalog.mjs';

const VAULT_TABS=[['frame','Molduras','🖼️'],['background','Fundos','🏰'],['effect','Efeitos','✨']];
const VAULT_ORIGINAL='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
const vaultAssets=new Map([...ALL_CHEST_ITEMS,...DAILY_FRAMES,...DAILY_BONUS_BACKGROUNDS].map(item=>[item.id,item]));
function vaultArtUrl(item){
 if(!item)return chestAsset('pack-magic.webp');
 if(item.cat==='background')return backgroundUrl(item);
 if(item.source==='store')return storeAsset(item);
 if(vaultAssets.has(item.id))return chestAsset(item.asset);
 if(item.id==='frame_star')return assetUrl('frame-star.webp');
 if(item.id==='frame_floral')return assetUrl('frame-floral.webp');
 if(item.id==='frame_champion')return assetUrl('frame-champion.webp');
 if(item.id==='frame_rainbow')return assetUrl('frame-rainbow.webp');
 return chestAsset(item.asset||'pack-magic.webp');
}
function vaultInventoryItems(profile,cat){
 const pool=cat==='frame'
  ?[...availableFrames(profile).filter(x=>x.id).map(x=>vaultAssets.get(x.id)||({id:x.id,cat:'frame',asset:x.src,name:x.label,rarity:'Comum'})),...DAILY_FRAMES,...storeSaleItems().filter(x=>x.cat==='frame')]
  :cat==='background'?[...BACKGROUNDS,...DAILY_BONUS_BACKGROUNDS]
  :[...SUCCESS_FX,...ALL_CHEST_ITEMS.filter(x=>x.cat==='effect'),...storeSaleItems().filter(x=>x.cat==='effect')];
 const seen=new Set();
 return pool.filter(x=>x?.id&&!seen.has(x.id)&&seen.add(x.id)&&profile.owned?.includes(x.id)).map(x=>({...x,cat,name:x.name||x.label||'Item mágico'}));
}
const vaultOriginLabel=x=>x?.source==='chest'||x?.shop===false||x?.id?.startsWith('chest_')?'RECOMPENSA DO BAÚ':String(x?.source||'').includes('table')?'MUNDO DA TABUADA':'LOJA MÁGICA';
function vaultItemPreview(profile,item,category){
 if(!item)return `<div class="vault-preview-inner"><div class="vault-preview-stage"><img src="${chestAsset('pack-magic.webp')}" alt="" style="width:82%;height:82%;object-fit:contain"></div><div class="vault-preview-info"><span class="vault-preview-kicker">COFRE VAZIO</span><h2>Novos tesouros virão!</h2><p>Visite a Loja ou conquiste baús para encontrar itens desta categoria.</p></div></div>`;
 const isEquipped=profile.equipped?.[category]===item.id,src=vaultArtUrl(item),avatar=equippedAvatarUrl(profile),name=escapeHTML(item.name);
 const artwork=category==='frame'
   ?`<div class="vault-avatar-demo"><div class="vault-face-crop"><img src="${avatar}" alt="Rosto de ${escapeHTML(profile.name)}"></div><img class="vault-demo-frame" src="${src}" alt="${name}"></div>`
   :category==='background'
   ?`<div class="vault-bg-demo" style="background-image:url('${src}')"><img src="${avatar}" alt="${escapeHTML(profile.name)}"></div>`
   :`<div class="vault-fx-demo ${item.id==='fx_papai'?'papai':''}"><img src="${src}" alt="${name}"></div>`;
 const description=category==='frame'?`Veja como a moldura envolve o retrato de ${escapeHTML(profile.name)}.`:category==='background'?'Este cenário será usado na HOME e nas telas compatíveis.':'Este efeito aparece durante as respostas e comemorações.';
 return `<div class="vault-preview-inner"><div class="vault-preview-stage">${artwork}</div><div class="vault-preview-info"><span class="vault-preview-kicker">PRÉVIA DO ITEM</span><h2>${name}</h2><p>${description}</p><div class="vault-preview-meta"><span class="vault-preview-chip">${escapeHTML(item.rarity||'Mágico')}</span><span class="vault-preview-chip">${vaultOriginLabel(item)}</span></div><button type="button" class="vault-preview-action ${isEquipped?'equipped':''}" data-action="vaultEquip" data-category="${category}" data-item="${escapeHTML(item.id)}" ${isEquipped?'disabled':''}>${isEquipped?'✓ EM USO':'EQUIPAR AGORA'}</button>${category==='effect'?`<button type="button" class="vault-preview-play" data-action="vaultPlayPreview" data-item="${escapeHTML(item.id)}">▶ VER EFEITO</button>`:''}</div></div>`;
}
export function chestInventoryScreen(profile,category='frame',notice='',unused=false,selectedId=null){
 const tab=VAULT_TABS.some(([id])=>id===category)?category:'frame';
 const all=vaultInventoryItems(profile,tab),equipped=profile.equipped?.[tab];
 const chosen=all.find(item=>item.id===selectedId)||all.find(item=>item.id===equipped)||all[0]||null;
 const level=Math.max(1,Math.floor(Number(profile.xp||0)/100)+1);
 const resettable=tab==='frame'||tab==='background';
 return `<main class="vault-screen" data-vault-screen>
  <div class="vault-v2-shell">
   <div class="vault-fixed-zone">
    <header class="vault-v2-top">
     <button class="vault-back" type="button" data-action="home" aria-label="Voltar para o início">‹</button>
     <div class="vault-profile-mini"><img class="vault-profile-avatar" src="${equippedAvatarUrl(profile)}" alt=""><div class="vault-profile-copy"><strong>${escapeHTML(profile.name)}</strong><span>NÍVEL ${level} · COFRE PESSOAL</span></div></div>
     <div class="vault-wallet"><img class="coin-inline" src="${chestAsset('coin.webp')}" alt="">${Number(profile.coins||0).toLocaleString('pt-BR')}</div>
    </header>
    <img class="vault-v2-title" src="${chestAsset('home_new_items.png')}" alt="Baú de Itens">
    <div class="vault-preview">${vaultItemPreview(profile,chosen,tab)}</div>
   </div>
   <div class="vault-scroll-zone">
    <nav class="vault-tabs" aria-label="Tipos de itens">${VAULT_TABS.map(([id,label,icon])=>`<button type="button" class="vault-tab ${tab===id?'active':''}" data-action="vaultTab" data-cat="${id}" ${tab===id?'aria-current="page"':''}><b>${icon}</b>${label}</button>`).join('')}</nav>
    <div class="vault-status"><div><b>${VAULT_TABS.find(x=>x[0]===tab)[1]} de ${escapeHTML(profile.name)}</b><span>Toque em um tesouro para experimentar antes de equipar.</span>${resettable?`<button type="button" class="vault-default" data-action="vaultReset" data-category="${tab}">Usar visual padrão</button>`:''}</div><div class="vault-count">${all.length} ITEM${all.length===1?'':'S'}</div></div>
    ${notice?`<p class="chests-notice" role="status">${escapeHTML(notice)}</p>`:''}
    <div class="vault-grid">${all.length?all.map(item=>{
     const isEquipped=item.id===equipped,isSelected=item.id===chosen?.id,relic=vaultOriginLabel(item)==='RECOMPENSA DO BAÚ';
     return `<div class="vault-item ${isEquipped?'equipped':''} ${relic?'rare-chest':''} ${isSelected?'selected':''}"><button class="vault-select" type="button" data-action="vaultSelect" data-item="${escapeHTML(item.id)}" aria-label="Ver ${escapeHTML(item.name)}" aria-pressed="${isSelected}"></button><div class="vault-item-art"><img src="${vaultArtUrl(item)}" alt="${escapeHTML(item.name)}" loading="lazy"></div><span class="vault-name">${escapeHTML(item.name)}</span><div class="vault-meta"><span class="vault-chip ${relic?'relic':''}">${escapeHTML(item.rarity||'Mágico')}</span>${relic?'<span class="vault-chip relic">DO BAÚ</span>':''}</div><button type="button" class="vault-use" data-action="vaultEquip" data-category="${tab}" data-item="${escapeHTML(item.id)}">${isEquipped?'✓ Equipado':'Equipar'}</button></div>`;
    }).join(''):'<div class="vault-empty">Você ainda não possui itens desta categoria. Compre na Loja Mágica ou encontre relíquias nos baús de aventura.</div>'}</div>
   </div>
  </div>
 </main>`;
}
export function vaultOwnsItem(profile,id,category){return vaultInventoryItems(profile,category).some(item=>item.id===id)}

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
 const all=[...new Map([...ALL_CHEST_ITEMS.filter(item=>item.cat==='collectible'),...storeSaleItems().filter(x=>x.cat==='collectible')].map(x=>[x.id,x])).values()];
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
