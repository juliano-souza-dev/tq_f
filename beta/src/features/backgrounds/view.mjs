import {BACKGROUNDS,backgroundUrl,backgroundStatus} from './catalog.mjs';
import {equippedAvatarUrl} from '../../resources/asset-map.mjs';
import {art,escapeHTML} from '../../components/ui.mjs';
const format=n=>new Intl.NumberFormat('pt-BR').format(n);
export function backgroundsScreen(profile,selected=null,notice=''){
 const current=BACKGROUNDS.find(x=>x.id===selected)||BACKGROUNDS.find(x=>x.id===profile.equipped?.background)||BACKGROUNDS[0];
 const status=backgroundStatus(profile,current);
 const count=BACKGROUNDS.filter(x=>backgroundStatus(profile,x).owned).length;
 const action=status.equipped?'✓ Em uso':status.owned?'Equipar':`🪙 ${current.price} · Comprar`;
 return `<main class="backgrounds-view screen-stack">
  <div class="bg-container">
   <header class="bg-head"><button class="bg-back" type="button" data-action="home" aria-label="Voltar">‹</button>
    <div class="bg-player">${art(equippedAvatarUrl(profile),{alt:'',className:'bg-player-avatar'})}<span><strong>${escapeHTML(profile.name)}</strong><small>BAÚ DE ITENS</small></span></div>
    <div class="bg-wallet" aria-label="Moedas disponíveis">🪙 <b>${format(profile.coins||0)}</b></div>
   </header>
   <h1 class="bg-title">✦ Fundos Mágicos ✦</h1>
   <section class="bg-feature" aria-label="Prévia selecionada">
    <div class="bg-feature-art">${art(backgroundUrl(current),{alt:current.name,className:'bg-feature-image'})}</div>
    <div class="bg-feature-body"><span class="bg-kicker">PRÉVIA DO CENÁRIO</span><h2>${escapeHTML(current.name)}</h2>
     <p>Esse cenário será usado na tela inicial.</p><span class="bg-rarity">${escapeHTML(current.rarity)}</span>
     <button class="bg-primary ${status.equipped?'is-equipped':''}" type="button" data-action="backgroundAction" data-background="${current.id}" ${status.equipped?'disabled':''}>${action}</button>
    </div>
   </section>
   <div class="bg-tabs" aria-label="Categorias do baú"><button data-action="openFeature" data-feature="Molduras" type="button">🖼️ Molduras</button><button class="active" type="button" aria-current="page">🏰 Fundos</button><button data-action="openFeature" data-feature="Efeitos" type="button">✨ Efeitos</button></div>
   <div class="bg-collection-heading"><div><strong>Fundos de ${escapeHTML(profile.name)}</strong><small>Toque em um cenário para visualizar</small></div><span>${count}/${BACKGROUNDS.length}</span></div>
   <button type="button" class="bg-reset" data-action="backgroundAction" data-background="__default__" ${!profile.equipped?.background?"disabled":""}>Usar visual padrão</button>
   ${notice?`<p class="bg-notice" role="status">${escapeHTML(notice)}</p>`:''}
   <section class="bg-grid" aria-label="Galeria de fundos">
    ${BACKGROUNDS.map(item=>{const st=backgroundStatus(profile,item);return `<button type="button" class="bg-tile bg-tile-preview ${item.id===current.id?'selected':''}" data-action="previewBackground" data-background="${item.id}" aria-pressed="${item.id===current.id}" aria-label="Visualizar ${escapeHTML(item.name)}">
      <span class="bg-tile-art">${art(backgroundUrl(item),{alt:item.name})}</span><strong>${escapeHTML(item.name)}</strong><span class="bg-tile-meta">${escapeHTML(item.rarity)}</span>
      ${st.equipped?'<span class="bg-equipped-mark" aria-label="Em uso">✓ Em uso</span>':''}
     </button>`}).join('')}
   </section>
  </div>
 </main>`;
}
