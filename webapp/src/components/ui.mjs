export const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,ch=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[ch]));
export function art(name,options={}){
 const {className='',alt='',eager=false}=options;
 return `<img class="${escapeHTML(className)}" src="${escapeHTML(name)}" alt="${escapeHTML(alt)}" ${eager?'fetchpriority="high" loading="eager"':'loading="lazy"'} decoding="async">`;
}
export function topbar(player,{back='home',title='Tabuada Quest'}={}){
 return `<header class="screen-head">
  <button type="button" class="nav-back" data-action="${escapeHTML(back)}" aria-label="Voltar">‹</button>
  <strong>${escapeHTML(title)}</strong>
  <span class="wallet" aria-label="${Number(player.coins)||0} moedas">🪙 ${Number(player.coins)||0}</span>
 </header>`;
}
export function endNav(current){
 return `<nav class="tabbar" aria-label="Menu do jogo">
  <button type="button" data-action="home" ${current==='home'?'aria-current="page"':''}>🏡<span>Início</span></button>
  <button type="button" data-action="worlds" ${current==='worlds'?'aria-current="page"':''}>🗺️<span>Mundos</span></button>
  <button type="button" data-action="openFeature" data-feature="Coleção">🎒<span>Coleção</span></button>
  <button type="button" data-action="profiles">👧<span>Perfis</span></button>
 </nav>`;
}
