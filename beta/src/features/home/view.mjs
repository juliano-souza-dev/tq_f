import {assetUrl,equippedAvatarUrl,equippedFrameUrl} from '../../resources/asset-map.mjs';
import {art,escapeHTML} from '../../components/ui.mjs';
import {BACKGROUNDS,backgroundUrl} from '../backgrounds/catalog.mjs';
import {masteredCount,level,experienceProgress,chestProgress} from '../../core/progression.mjs';
import {petsSaved} from '../pets/catalog.mjs';
import {dailyState} from '../daily/catalog.mjs';
export function homeScreen(profile){
 const coin=Number(profile.coins||0),gems=Number(profile.gems||0);
 const dailyReady=dailyState(profile).canClaim;
 const rewardDot=name=>name==='daily'&&dailyReady;
 const chest=chestProgress(profile),mastered=masteredCount(profile),xp=experienceProgress(profile.xp);
 const amount=value=>new Intl.NumberFormat('pt-BR').format(value);
 const equippedAvatar=equippedAvatarUrl(profile);
 const equippedFrame=equippedFrameUrl(profile);
 const bg=BACKGROUNDS.find(x=>x.id===profile.equipped?.background && profile.owned?.includes(x.id));
 const image=(n,cls='',alt='')=>art(assetUrl('home_new_'+n+'.webp'),{className:cls,alt});
 const feature=(name,action,label)=>`<button class="home-tile" data-slot="${name}" type="button" data-action="${action}" ${action==='openFeature'?'data-feature="'+escapeHTML(label)+'"':''} aria-label="${escapeHTML(label)}">${image(name,'tile-art','')}${rewardDot(name)?'<span class="home-reward-dot" aria-label="Recompensa disponível para coletar"></span>':''}${name==='pets'?'<span class="home-pet-count">'+petsSaved(profile)+'/30</span>':''}<span class="sr-only">${escapeHTML(label)}</span></button>`;
 return `<main class="home-view screen-stack" ${bg?"style=\"--player-bg:url("+backgroundUrl(bg)+")\"":""}>
   <div class="home-header" aria-label="Perfil e recursos da aventureira">
    <button class="hero-identity" type="button" data-action="profiles" aria-label="Trocar de aventureira">
      <span class="hero-portrait" aria-hidden="true">
        <span class="hero-portrait-window">
          ${art(equippedAvatar,{className:'hero-portrait-face',alt:''})}
        </span>
        ${equippedFrame?art(equippedFrame,{className:'hero-portrait-frame',alt:''}):'<span class="hero-portrait-frame-default"></span>'}
      </span>
      <span class="hero-identity-info"><strong>${escapeHTML(profile.name)}</strong><small class="home-level">NÍVEL ${level(profile.xp)}</small><span class="home-xp-label">${xp} / 100</span></span>
    </button>
    <progress class="home-profile-xp" value="${xp}" max="100" aria-label="Experiência: ${xp} de 100"></progress>
    <span class="home-profile-xp-number" aria-hidden="true">${xp} / 100</span>
    <div class="hero-wallet" aria-label="Saldo de moedas e gemas">
      <span class="wallet-item" aria-label="${amount(coin)} moedas de ouro"><span class="wallet-coin" aria-hidden="true">★</span><strong>${amount(coin)}</strong></span>
      <span class="wallet-item" aria-label="${amount(gems)} gemas"><span class="wallet-gem" aria-hidden="true"></span><strong>${amount(gems)}</strong></span>
    </div>
   </div>
   ${image('logo','home-logo','Tabuada Quest')}
   <div class="hero-stage">
    <button type="button" data-action="openFeature" data-feature="Fundos" class="fashion-shortcut left" aria-label="Escolher fundo">${image('fundo')}</button>
    <div class="hero-fashion">
     ${art(equippedAvatar,{className:'hero-character',alt:'Aventureira '+profile.name})}
    </div>
    <button type="button" data-action="openFeature" data-feature="Moda" class="fashion-shortcut right" aria-label="Mudar roupa">${image('moda')}</button>
   </div>
   <button type="button" class="play-button" data-action="worlds" aria-label="Jogar: abrir os mundos">
     ${image('jogar','play-art')}
   </button>
   <button type="button" data-action="openFeature" data-feature="Baús" class="next-chest" aria-label="${chest.available?chest.available+' baú disponível':chest.into+' de '+chest.nextReq+' atividades para o próximo baú'}">
      ${image('next_chest','next-chest-art')}
      <span class="next-chest-progress" role="progressbar" aria-label="Atividades para o próximo baú" aria-valuemin="0" aria-valuemax="${chest.nextReq}" aria-valuenow="${chest.into}">
        <progress class="next-chest-progress-fill" value="${chest.into}" max="${chest.nextReq}" aria-hidden="true"></progress>
        <span class="next-chest-counter">${chest.available?chest.available+' pronto'+(chest.available>1?'s':''):chest.into+' / '+chest.nextReq}</span>
      </span>
   </button>
   <section class="home-menu" aria-label="Atividades do jogo">
    <div class="home-menu-top">
      ${feature('worlds','worlds','Mundos da Tabuada')}
      ${feature('daily','openFeature','Recompensa diária')}
      ${feature('store','openFeature','Loja')}
      ${feature('collectibles','openFeature','Colecionáveis')}
      ${feature('chests','openFeature','Baús')}
    </div>
    <div class="home-menu-bottom">
      <span class="home-pet-tile-wrap">${feature('pets','openFeature','Pets')}<span class="home-pets-count" aria-label="${petsSaved(profile)} dos 30 pets resgatados">${petsSaved(profile)}/30</span></span>
      ${feature('items','openFeature','Baú de itens')}
    </div>
   </section>
 </main>`;
}
