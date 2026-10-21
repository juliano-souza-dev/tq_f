import {assetUrl,avatarUrl} from '../../resources/asset-map.mjs';
import {art,endNav,escapeHTML} from '../../components/ui.mjs';
import {masteredCount,level,experienceProgress,chestProgress} from '../../core/progression.mjs';
export function homeScreen(profile){
 const coin=Number(profile.coins||0),gems=Number(profile.gems||0);
 const chest=chestProgress(profile),mastered=masteredCount(profile);
 const amount=value=>new Intl.NumberFormat('pt-BR').format(value);
 const image=(n,cls='',alt='')=>art(assetUrl('home_new_'+n+'.webp'),{className:cls,alt});
 const feature=(name,action,label)=>`<button class="home-tile" type="button" data-action="${action}" ${action==='openFeature'?'data-feature="'+escapeHTML(label)+'"':''} aria-label="${escapeHTML(label)}">${image(name,'tile-art','')}<span class="sr-only">${escapeHTML(label)}</span></button>`;
 return `<main class="home-view screen-stack">
   <div class="home-header" aria-label="Perfil e recursos da aventureira">
    <button class="hero-identity" type="button" data-action="profiles" aria-label="Trocar de aventureira">
      ${art(avatarUrl(profile.avatar.id),{className:'hero-mini-avatar',alt:''})}
      <span class="hero-identity-info"><strong>${escapeHTML(profile.name)}</strong><small>Nível ${level(profile.xp)} · ${mastered}/10 mundos</small></span>
    </button>
    <div class="hero-wallet" aria-label="Saldo de moedas e gemas">
      <span class="wallet-item" aria-label="${amount(coin)} moedas de ouro"><span class="wallet-coin" aria-hidden="true">★</span><strong>${amount(coin)}</strong></span>
      <span class="wallet-item" aria-label="${amount(gems)} gemas"><span class="wallet-gem" aria-hidden="true"></span><strong>${amount(gems)}</strong></span>
    </div>
   </div>
   ${image('logo','home-logo','Tabuada Quest')}
   <div class="hero-stage">
    <button type="button" data-action="openFeature" data-feature="Fundos" class="fashion-shortcut left" aria-label="Escolher fundo">${image('fundo')}</button>
    <div class="hero-fashion">
     ${image('fashion_stage','fashion-base')}
     ${art(avatarUrl(profile.avatar.id),{className:'hero-character',alt:'Aventureira '+profile.name})}
    </div>
    <button type="button" data-action="openFeature" data-feature="Moda" class="fashion-shortcut right" aria-label="Mudar roupa">${image('moda')}</button>
   </div>
   <button type="button" class="play-button" data-action="worlds" aria-label="Jogar: abrir os mundos">
     ${image('jogar','play-art')}
   </button>
   <div class="next-chest" aria-label="${chest.available?chest.available+' baú disponível':chest.into+' de '+chest.nextReq+' atividades para o próximo baú'}">
      ${image('next_chest','next-chest-art')}
      <span class="next-chest-progress" role="progressbar" aria-label="Atividades para o próximo baú" aria-valuemin="0" aria-valuemax="${chest.nextReq}" aria-valuenow="${chest.into}">
        <span class="next-chest-progress-fill" data-progress="${chest.percentage}" aria-hidden="true"></span>
        <span class="next-chest-counter">${chest.available?chest.available+' pronto'+(chest.available>1?'s':''):chest.into+' / '+chest.nextReq}</span>
      </span>
   </div>
   <section class="home-tiles" aria-label="Explore o jogo">
    ${feature('chests','openFeature','Baús')}
    ${feature('pets','openFeature','Pets')}
    ${feature('store','openFeature','Loja')}
    ${feature('daily','openFeature','Recompensa diária')}
    ${feature('items','openFeature','Itens')}
   </section>
   ${endNav('home')}
 </main>`;
}
