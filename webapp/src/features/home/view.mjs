import {assetUrl,avatarUrl} from '../../resources/asset-map.mjs';
import {art,endNav,escapeHTML} from '../../components/ui.mjs';
import {masteredCount,level,experienceProgress,chestProgress} from '../../core/progression.mjs';
export function homeScreen(profile){
 const coin=Number(profile.coins||0),gems=Number(profile.gems||0);
 const xp=experienceProgress(profile.xp),chest=chestProgress(profile),mastered=masteredCount(profile);
 const image=(n,cls='',alt='')=>art(assetUrl('home_new_'+n+'.webp'),{className:cls,alt});
 const feature=(name,action,label)=>`<button class="home-tile" type="button" data-action="${action}" ${action==='openFeature'?'data-feature="'+escapeHTML(label)+'"':''} aria-label="${escapeHTML(label)}">${image(name,'tile-art','')}<span class="sr-only">${escapeHTML(label)}</span></button>`;
 return `<main class="home-view screen-stack">
   <div class="home-header">
    ${image('header','home-header-art')}
    <button class="hero-identity" type="button" data-action="profiles" aria-label="Trocar de aventureira">
      ${art(avatarUrl(profile.avatar.id),{className:'hero-mini-avatar',alt:''})}
      <span class="hero-identity-info"><strong>${escapeHTML(profile.name)}</strong><small>Nível ${level(profile.xp)} · ${mastered}/10 mundos</small></span>
    </button>
    <span class="hero-coins">🪙 ${coin}<span> 💎 ${gems}</span></span>
    <div class="home-xp"><span style="--progress:${xp}%"></span><small>EXP ${xp}/100</small></div>
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
   <div class="next-chest" aria-label="Próxima recompensa">
      ${image('next_chest','next-chest-art')}
      <span class="next-chest-counter">${chest.available?chest.available+' baú disponível':chest.into+'/'+chest.nextReq+' atividades'}</span>
   </div>
   <section class="home-tiles" aria-label="Explore o jogo">
    ${feature('worlds','worlds','Explorar mundos')}
    ${feature('chests','openFeature','Baús')}
    ${feature('pets','openFeature','Pets')}
    ${feature('collectibles','openFeature','Colecionáveis')}
    ${feature('daily','openFeature','Recompensa diária')}
    ${feature('store','openFeature','Loja')}
    ${feature('items','openFeature','Itens')}
   </section>
   <p class="progress-note">⭐ ${mastered} de 10 tabuadas dominadas. Sua jornada continua!</p>
   ${endNav('home')}
 </main>`;
}
