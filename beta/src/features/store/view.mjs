import {escapeHTML} from '../../components/ui.mjs';
import {STORE_TABS,STORE_TAB_META,STORE_TYPE_LABEL,storeSaleItems,storeItem,storeAsset} from './catalog.mjs';
const format=n=>Number(n||0).toLocaleString('pt-BR');
const own=(p,id)=>!!p?.owned?.includes(id);
const coin=()=>storeAsset({asset:'coin.webp'});
const itemImage=(item)=>storeAsset(item);
function rewardTags(item){return (item?.bundle||[]).map(id=>storeItem(id)).filter(Boolean).map(x=>`<span class="feature-reward" title="${escapeHTML(x.name)}"><img src="${itemImage(x)}" alt="${escapeHTML(x.name)}"></span>`).join('');}
function productCard(profile,item){
 const owned=own(profile,item.id),type=STORE_TYPE_LABEL[item.cat]||item.cat,rarity='rarity-'+String(item.rarity||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const label=owned?(item.cat==='collectible'?'Colecionado':item.bundle?'Pacote adquirido':'No Baú'):'Comprar';
 const bundle=item.bundle?`<div class="bundle-preview">${rewardTags(item)}</div>`:'';
 const price=owned&&!item.bundle?`<div class="price owned-price">✓ Comprado</div>`:`<div class="price"><img class="coin-inline" src="${coin()}" alt=""> ${format(item.price)}</div>`;
 return `<article class="item ${item.cat==='package'?'package':''} ${owned?'owned-card':''}">
  <span class="rarity ${rarity}">${escapeHTML(item.rarity||'Mágico')}</span>${owned?'<span class="owned-mark">✓</span>':''}
  <div class="item-art"><img src="${itemImage(item)}" alt="${escapeHTML(item.name)}" loading="lazy"></div>
  <div class="item-name">${escapeHTML(item.name)}</div><div class="item-type">${escapeHTML(type)}</div>${bundle}
  <div class="item-footer">${price}<button class="buy ${owned?'owned':''}" type="button" data-action="storeBuy" data-item="${escapeHTML(item.id)}">${label}</button></div>
 </article>`;
}

function bundleDetails(profile,id){
 const bundle=storeItem(id);
 if(!bundle?.bundle)return '';
 const products=bundle.bundle.map(storeItem).filter(Boolean);
 return `<div class="store-bundle-overlay" role="dialog" aria-modal="true" aria-labelledby="store-bundle-title">
   <div class="store-bundle-panel">
    <button class="store-bundle-close" type="button" data-action="storePackClose" aria-label="Fechar detalhes">✕</button>
    <span class="store-bundle-kicker">✨ TESOUROS CONQUISTADOS</span>
    <h2 id="store-bundle-title">${escapeHTML(bundle.name)}</h2>
    <p>Os itens deste pacote pertencem ao seu perfil. Toque em um deles para vê-lo no lugar certo.</p>
    <div class="store-bundle-items">${products.map(x=>`<button type="button" class="store-bundle-item" data-action="storePackItem" data-item="${escapeHTML(x.id)}" data-cat="${escapeHTML(x.cat)}">
       <img src="${itemImage(x)}" alt="">
       <span><strong>${escapeHTML(x.name)}</strong><small>${escapeHTML(STORE_TYPE_LABEL[x.cat]||x.cat)} · ${own(profile,x.id)?'✓ Adquirido':'Ainda bloqueado'}</small></span>
       <b aria-hidden="true">›</b>
     </button>`).join('')}</div>
    <button class="store-bundle-done" type="button" data-action="storePackClose">Voltar à loja</button>
   </div>
 </div>`;
}
export function storeScreen(profile,tab='all',notice='',selectedPack=null){
 const selected=STORE_TABS.some(x=>x[0]===tab)?tab:'all';
 const sale=storeSaleItems(),hero=storeItem('pack_magic');
 const list=selected==='all'?sale.filter(x=>['frame','background','collectible','effect'].includes(x.cat)).slice(0,12):sale.filter(x=>x.cat===selected);
 const acquired=sale.filter(x=>x.cat!=='package'&&own(profile,x.id)).length,total=sale.filter(x=>x.cat!=='package').length;
 const pct=total?Math.round(acquired/total*100):0;
 const heroOwned=own(profile,'pack_magic');
 return `<main class="store-shell"><section class="store-v2" aria-label="Loja Mágica">
 <button class="store-back" type="button" data-action="home" aria-label="Voltar para início">‹ <span>Voltar</span></button>
 <div class="store-topbar">
  <div class="store-title-wrap"><span class="store-kicker">✦ MERCADO ENCANTADO</span><h1>Loja Mágica</h1><div class="store-sub">Tesouros que transformam sua aventura sem mexer no avatar.</div></div>
  <div class="store-purse"><img src="${coin()}" alt=""><strong>${format(profile.coins)}</strong></div>
 </div>
 <div class="shop-feature" id="magicPackHero">
  <div class="shop-feature-art"><img src="${itemImage(hero)}" alt="Pacote Mágico"></div>
  <div class="shop-feature-copy"><span class="feature-badge">DESTAQUE DA LOJA</span><h2>Pacote Mágico</h2><p>Um baú especial com cinco recompensas para ampliar sua coleção de uma vez.</p>
   <div class="feature-rewards">${rewardTags(hero)}</div>
   <div class="feature-action-row"><span class="feature-price">${heroOwned?'✓ Adquirido':`<img src="${coin()}" alt=""> ${format(hero.price)}`}</span><button class="feature-buy" type="button" data-action="storeBuy" data-item="pack_magic">${heroOwned?'Ver itens':'Abrir pacote'}</button></div>
  </div>
 </div>
 <div class="store-collection"><strong>✨ Sua coleção</strong><div class="bar"><i style="width:${pct}%"></i></div><span>${acquired}/${total}</span></div>
 ${notice?`<p class="store-notice" role="status">${escapeHTML(notice)}</p>`:''}
 <div class="store-tabs-wrap"><div class="tabs" role="tablist">${STORE_TABS.map(([id,title])=>`<button type="button" class="tab ${id===selected?'active':''}" data-action="storeTab" data-tab="${id}" role="tab" aria-selected="${id===selected}">${escapeHTML(title)}</button>`).join('')}</div></div>
 <div class="store-shelf-head"><div><h2>${selected==='all'?'Destaques':STORE_TABS.find(x=>x[0]===selected)?.[1]}</h2><p>${escapeHTML(STORE_TAB_META[selected])}</p></div><span class="shelf-count">${list.length} ITENS</span></div>
 <div class="shop-grid">${list.map(x=>productCard(profile,x)).join('')}</div>
 </section>${selectedPack?bundleDetails(profile,selectedPack):''}</main>`;
}
