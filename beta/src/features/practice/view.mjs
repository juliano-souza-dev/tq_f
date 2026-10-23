import {worldUrl,assetUrl} from '../../resources/asset-map.mjs';
import {WORLDS} from '../../core/progression.mjs';
import {SUCCESS_FX} from './fx.mjs';
import {art,topbar,escapeHTML} from '../../components/ui.mjs';
const legacyPracticeAsset=name=>'https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/'+name;
function successFXPicker(player){
 return `<div class="practice-fx-picker" aria-label="Efeito de acerto">
  <span>✨ Acerto</span>
  ${SUCCESS_FX.filter(fx=>player.owned?.includes(fx.id)).map(fx=>`<button type="button" data-action="equipSuccessFX" data-effect="${fx.id}" aria-pressed="${player.equipped?.effect===fx.id}" title="${fx.name}" ${player.equipped?.effect===fx.id?'class="selected"':''}>${fx.id==='fx_papai'?'💛':fx.source==='chest'?'<img src="'+legacyPracticeAsset(fx.asset)+'" alt="">':'🌟'}</button>`).join('')}
 </div>`;
}
function illustratedPracticeScene(player,session,fact){
 const world=WORLDS[session.table-1];
 const isSecond=session.table===2;
 const scene='practice-world-'+session.table+'.webp';
 const coins=new Intl.NumberFormat('pt-BR').format(player.coins||0);
 return `<main class="practice-scene-view practice-scene-world-${session.table}" style="--practice-scene-url:url('./assets/optimized/${scene}')">
  <div class="practice-scene-art">
   <img class="practice-scene-image" src="./assets/optimized/${scene}?dev=${globalThis.__TQ_DEV_VERSION__||Date.now()}" alt="Cenário ilustrado do ${escapeHTML(world.name)}" onerror="this.onerror=null;this.src='./assets/optimized/world-practice-01.webp'">
   ${successFXPicker(player)}
   <button class="practice-scene-back" data-action="leavePractice" type="button" aria-label="Voltar aos mundos"></button>
   <header class="practice-scene-heading">
    <strong>Mundo ${session.table}</strong><small>${escapeHTML(world.name)}</small>
   </header>
   <div class="practice-scene-coins"> ${coins}</div>
   <div class="practice-scene-progress" role="progressbar" aria-label="${session.mastered} de 10 operações dominadas" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${session.mastered}"><span>${session.mastered}/10 dominadas</span><i style="width:${session.mastered*10}%"></i></div>
   <section class="practice-scene-question" aria-label="Multiplicação atual">
    <div class="practice-scene-streak">ACERTOS <span>${fact.streak>=1?'★':'☆'} ${fact.streak>=2?'★':'☆'}</span></div>
    <h1>${fact.a} × ${fact.b} = ?</h1>
   </section>
   <div class="practice-scene-answers" role="group" aria-label="Escolha uma resposta">
    ${session.choices.map((v,i)=>`<button type="button" data-action="answer" data-answer="${v}" aria-label="Alternativa ${i+1}: ${v}" class="practice-scene-answer ${session.answered?(v===fact.answer?'good':session.feedback?.badValue===v?'bad':''):''}" ${session.answered?'disabled':''}>${v}</button>`).join('')}
   </div>
   ${session.preview?'<div class="practice-scene-preview-label">MODO TESTE · Sem alterar moedas ou progresso</div>':''}
   <div class="practice-scene-feedback ${session.feedback?(session.feedback.good?'good':'bad'):''}" role="status">
    ${session.feedback?(session.feedback.good?(session.feedback.mastered?'⭐ Dominada!':'✨ Muito bem!'):`💛 ${fact.a} × ${fact.b} = ${fact.answer}`):''}
   </div>
  </div>
 </main>`;
}
export function practiceScreen(player,session){
 const world=WORLDS[session.table-1],fact=session.answered?session.activeFact:session.queue[0];
 const image=session.table===1?assetUrl('world-practice-01.webp'):worldUrl(session.table);
 if(session.table>=1&&session.table<=10)return illustratedPracticeScene(player,session,fact);
 const percent=session.mastered*10;
 const coins=new Intl.NumberFormat('pt-BR').format(player.coins||0);
 // Restore the original apoio practice artwork, while using Beta's answer engine.
 return `<main class="practice-view practice-legacy" style="--legacy-practice-bg:url('${image}');--legacy-answer-art:url('${legacyPracticeAsset('practice-answer-button.png')}')">
  <div class="practice-legacy-backdrop" aria-hidden="true"></div>
  <section class="practice-legacy-shell">
   ${successFXPicker(player)}
   <header class="practice-legacy-hud">
    <img class="practice-legacy-hud-art" src="${legacyPracticeAsset('practice-hud.png')}" alt="">
    <div class="practice-legacy-hud-content">
     <button class="practice-legacy-back" type="button" data-action="leavePractice" aria-label="Voltar aos mundos">‹</button>
     <div class="practice-legacy-world"><small>MUNDO ${session.table} · TABUADA DO ${session.table}</small><strong>${escapeHTML(world.name)}</strong><span>${session.mode==='review'?'Revisão espaçada':'Aprender e dominar'}</span></div>
     <div class="practice-legacy-wallet"><b>🪙 ${coins}</b><span>⭐ ${session.mastered}/10</span></div>
    </div>
   </header>
   <div class="practice-legacy-progress" role="progressbar" aria-valuemin="0" aria-valuemax="10" aria-valuenow="${session.mastered}"><i style="width:${percent}%"></i></div>
   <section class="practice-legacy-card">
    <div class="practice-legacy-question-wrap">
     <img class="practice-legacy-question-art" src="${legacyPracticeAsset('practice-question-panel.png')}" alt="">
     <div class="practice-legacy-question-copy">
      <div class="practice-legacy-streak">ACERTOS NESTA CARTA <span class="practice-legacy-pips"><i class="${fact.streak>=1?'on':''}"></i><i class="${fact.streak>=2?'on':''}"></i></span></div>
      <h1 class="practice-legacy-question">${fact.a} × ${fact.b} = ?</h1>
      <div class="practice-legacy-prompt">Qual é o resultado?</div>
     </div>
    </div>
    <div class="practice-legacy-choices" role="group" aria-label="Escolha uma resposta">
      ${session.choices.map((v,i)=>`<button class="practice-legacy-choice ${session.answered?(v===fact.answer?'good':session.feedback?.badValue===v?'bad':''):''}" type="button" data-action="answer" data-answer="${v}" ${session.answered?'disabled':''} aria-label="Alternativa ${i+1}: ${v}">${v}</button>`).join('')}
    </div>
    <div class="practice-legacy-feedback ${session.feedback?(session.feedback.good?'good':'bad'):''}" role="status">
    ${session.feedback?(session.feedback.good?(session.feedback.mastered?'⭐ Dominada! Dois acertos seguidos.':'✨ Mais um acerto para dominar.'): `💛 ${fact.a} × ${fact.b} = ${fact.answer}. Tente novamente.`):(fact.streak===1?'Mais um acerto para dominar esta conta!':'Escolha uma resposta.')}
    </div>
   </section>
   <section class="practice-legacy-queue" aria-label="Trilha de domínio"><strong>TRILHA DE DOMÍNIO</strong><div class="practice-legacy-queue-items">${Array.from({length:10},(_,i)=>`<span class="${i<session.mastered?'done':''}">${i<session.mastered?'★':i+1}</span>`).join('')}</div></section>
  </section>
 </main>`;
}
export function winScreen(profile,result){
 const world=WORLDS[result.deck-1];
 const newChest=result.unlockedChests||[];
 const first=!!result.firstMastery;
 const petName=result.petName||'';
 const confetti=Array.from({length:34},(_,i)=>{
  const angle=i*Math.PI*2/34,dist=35+(i%6)*10;
  const x=Math.cos(angle)*dist,y=Math.sin(angle)*dist;
  return `<i style="--x:${x.toFixed(1)}vw;--y:${y.toFixed(1)}vh;--delay:${(i%8)*0.07}s">${['⭐','✨','💎','🪙','🎉'][i%5]}</i>`;
 }).join('');
 return `<main class="lesson-reward-screen">
  <div class="lesson-reward-rays" aria-hidden="true"></div>
  <div class="lesson-reward-confetti" aria-hidden="true">${confetti}</div>
  <section class="lesson-reward-card" role="status">
   <div class="lesson-reward-crown" aria-hidden="true">🏆</div>
   <span class="lesson-reward-kicker">${first?'TABUADA DOMINADA':'REVISÃO CONCLUÍDA'}</span>
   <h1>Incrível, ${escapeHTML(profile.name)}!</h1>
   <h2>${escapeHTML(world.name)}</h2>
   <p>${first?`A tabuada do ${result.deck} foi dominada! Você concluiu as dez multiplicações, acertando cada uma duas vezes seguidas.`:'Mais uma missão concluída! Seu aprendizado ficou ainda mais forte.'}</p>
   <div class="lesson-reward-banner"><span>⭐</span><b>+50 XP</b><small>Recompensa da lição</small></div>
   <div class="lesson-reward-stats">
    <div><b>${result.correct}</b><span>ACERTOS</span></div>
    <div><b>${result.wrong}</b><span>ERROS</span></div>
    <div><b>+${result.coins}</b><span>MOEDAS</span></div>
   </div>
   ${first&&result.deck<10?`<div class="lesson-reward-unlock">🗺️ Nova tabuada desbloqueada: <b>${result.deck+1}</b></div>`:''}
   ${newChest.length?`<div class="lesson-reward-unlock chest">🎁 ${newChest.length===1?'Novo baú disponível!':newChest.length+' novos baús disponíveis!'}</div>`:''}
   ${petName?`<div class="lesson-reward-unlock pet">🐾 ${escapeHTML(petName)} está esperando pelo resgate!</div>`:''}
   <button type="button" class="lesson-reward-continue" data-action="claimLessonRewards">${petName?'🐾 Resgatar meu pet':'✨ Continuar aventura'}</button>
   ${newChest.length?`<button type="button" class="lesson-reward-chests" data-action="claimLessonChest">🎁 Ver baús conquistados</button>`:''}
  </section>
 </main>`;
}
export function featureScreen(player,feature){
 return `<main class="coming-view screen-stack">${topbar(player,{title:feature})}
  <section class="coming-panel"><span>✦</span>
    <h1>${escapeHTML(feature)}</h1>
    <p>Estamos migrando este módulo do Tabuada Quest original, junto com seus assets e regras de conquista. Seu progresso permanece salvo.</p>
    <button type="button" class="main-cta" data-action="home">Voltar à aventura</button>
  </section></main>`;
}
