import {DAILY_REWARDS,DAILY_BONUS_BACKGROUNDS,dailyState,dailyChestArt} from './catalog.mjs';
import {chestAsset} from '../chests/catalog.mjs';
import {equippedAvatarUrl} from '../../resources/asset-map.mjs';
import {level,experienceProgress} from '../../core/progression.mjs';
import {escapeHTML as esc} from '../../components/ui.mjs';
const image=(name,alt='')=>'<img src="'+chestAsset(name)+'" alt="'+esc(alt)+'">';
export function dailyScreen(profile,page=0,date=new Date(),notice=''){
 const st=dailyState(profile,date),count=DAILY_REWARDS.length;
 const week=Math.max(0,Math.min(4,page));const from=week*7,to=Math.min(count,from+7);
 const status=st.done?'Calendário concluído!':st.canClaim?'Dia '+(st.progress+1)+' disponível!':'Recompensa de hoje coletada';
 const actualPage=week===st.week;
 const btn=actualPage?(st.done?'CALENDÁRIO CONCLUÍDO':st.canClaim?'COLETAR DIA '+(st.progress+1):'VOLTE AMANHÃ'):'IR PARA O DIA '+(st.progress+1);
 const items=DAILY_REWARDS.slice(from,to).map((r,i)=>{
  const day=from+i+1,claimed=day<=st.progress,today=day===st.progress+1&&!st.done;
  const item=DAILY_BONUS_BACKGROUNDS.find(x=>x.id===r.id);
  const art=r.kind==='coins'?image('coin.webp','Moedas'):r.kind==='background'?image(item?.asset||'bg-kingdom.webp',item?.name||'Fundo'):image('chest-'+['magic','pirate','starlight','royal','pirate','starlight'][Math.max(0,Math.floor((day-1)/5))]+'-frame-0.webp','Baú');
  const label=r.kind==='coins'?'<strong>'+r.amount+'</strong><span>MOEDAS</span>':r.kind==='background'?'<strong>FUNDO</strong><span>'+esc(item?.name||'ESPECIAL')+'</span>':'<strong>BAÚ DIÁRIO</strong><span>TESOURO + MOLDURA</span>';
  return '<article class="daily-v2-card '+(claimed?'claimed':today?'today':'locked')+' '+(r.kind==='daily_chest'?'special':'')+'"><div class="daily-v2-card-day">Dia '+day+'</div>'+(r.kind==='daily_chest'?'<div class="daily-v2-special-ribbon">RECOMPENSA ESPECIAL</div>':'')+'<div class="daily-v2-card-art">'+art+'</div><div class="daily-v2-card-copy">'+label+'</div>'+(claimed?'<span class="daily-v2-card-badge">✓</span>':!today?'<span class="daily-v2-card-lock">🔒</span>':'')+'</article>';
 }).join('');
 return `<main class="daily-v2-overlay active"><div class="daily-v2-page" style="--daily-bg:url('${chestAsset('bg-kingdom.webp')}')" role="main" aria-label="Recompensas diárias">
 <header class="daily-v2-profilebar"><button class="daily-v2-back" data-action="home" aria-label="Voltar">‹</button>
  <div class="daily-v2-profile"><img src="${equippedAvatarUrl(profile)}" alt="" class="daily-avatar"><div class="daily-v2-profile-copy"><strong>${esc(profile.name)}</strong><small>NÍVEL ${level(profile.xp)}</small><div class="daily-v2-profile-xp"><span><i style="width:${experienceProgress(profile.xp)}%"></i></span><b>${experienceProgress(profile.xp)}/100 XP</b></div></div></div>
  <div class="daily-v2-wallet">🪙 <span>${Number(profile.coins||0).toLocaleString('pt-BR')}</span></div>
 </header>
 <div class="daily-v2-scroll">
  <section class="daily-v2-hero" aria-labelledby="dailyTitle">${image('pet30-01-idle_00.png','Mascote mágico')}<h1 id="dailyTitle"><span>RECOMPENSAS</span><b>DIÁRIAS</b></h1><img class="daily-v2-gift" src="${chestAsset('collect-gift.webp')}" alt="Presente mágico"><i class="daily-v2-spark s1">✦</i><i class="daily-v2-spark s2">★</i><i class="daily-v2-spark s3">✦</i></section>
  <section class="daily-v2-calendar">
   <div class="daily-v2-week-head"><button data-action="dailyWeek" data-shift="-1" ${week===0?'disabled':''} aria-label="Semana anterior">‹</button><div><small>CICLO ${st.cycle} · ${st.progress}/30 DIAS</small><strong>SEMANA ${week+1} DE 5</strong></div><button data-action="dailyWeek" data-shift="1" ${week===4?'disabled':''} aria-label="Próxima semana">›</button></div>
   <div class="daily-v2-status">${st.done?'🏆':st.canClaim?'🎁':'✓'} <b>${status}</b><span>${st.done?'As 30 recompensas foram conquistadas.':st.canClaim?'Entre todos os dias para avançar e liberar tesouros.':'A próxima recompensa ficará disponível amanhã.'}</span></div>
   <div class="daily-v2-progress" style="--week-fill:${Math.min(88,Math.max(0,(st.progress-from)/6*88))}%">${Array.from({length:7},(_,i)=>{const day=from+i+1;return '<span class="daily-v2-node '+(day>30?'empty':day<=st.progress?'claimed':day===st.progress+1?'today':'')+'">'+(day>30?'·':day<=st.progress?'✓':day)+'</span>'}).join('')}</div>
   <div class="daily-v2-grid">${items}</div>
   ${notice?'<p class="daily-notice" role="status">'+esc(notice)+'</p>':''}
   <button class="daily-v2-claim" data-action="dailyClaim" ${actualPage&&!st.canClaim?'disabled':''}>${btn}</button>
   <p class="daily-v2-footnote">Uma recompensa por dia · Seu progresso fica salvo neste aparelho</p>
  </section>
 </div></div></main>`;
}
