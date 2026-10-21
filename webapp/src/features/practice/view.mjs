import {worldUrl,assetUrl} from '../../resources/asset-map.mjs';
import {WORLDS} from '../../core/progression.mjs';
import {art,topbar,escapeHTML} from '../../components/ui.mjs';
export function practiceScreen(player,session){
 const world=WORLDS[session.table-1],fact=session.queue[0];
 const image=session.table===1?assetUrl('world-practice-01.webp'):worldUrl(session.table);
 const percent=session.mastered*10;
 return `<main class="practice-view">
  <div class="practice-landscape" aria-hidden="true">${art(image,{className:'practice-landscape-art'})}</div>
  ${topbar(player,{back:'leavePractice',title:'Mundo '+session.table+' · '+world.name})}
  <div class="practice-game">
   <div class="game-progress"><span>⭐ ${session.mastered}/10 dominadas</span><strong>${session.mode==='review'?'Revisão espaçada':'Aprender e dominar'}</strong></div>
   <div class="practice-meter" aria-label="${percent}% do mundo concluído"><div class="practice-fill progress-${percent}"></div></div>
   <section class="question-scroll">
    <div class="question-badge">✦ DESAFIO ${session.mastered+1} DE 10 ✦</div>
    <p>Quanto é?</p><h1>${fact.a} <span>×</span> ${fact.b} <span>=</span> ?</h1>
    <div class="streak" aria-label="${fact.streak} acertos consecutivos">
      <span class="${fact.streak>=1?'earned':''}">★</span><span class="${fact.streak>=2?'earned':''}">★</span>
    </div>
   </section>
   <div class="answers" role="group" aria-label="Escolha uma resposta">
    ${session.choices.map((v,i)=>`<button type="button" class="answer-choice ${session.answered?(v===fact.answer?'right':session.feedback?.badValue===v?'wrong':''):''}" data-action="answer"
       data-answer="${v}" ${session.answered?'disabled':''} aria-label="Alternativa ${i+1}: ${v}">${v}</button>`).join('')}
   </div>
   <div class="practice-feedback ${session.feedback?(session.feedback.good?'good':'bad'):''}" role="status">
    ${session.feedback?(session.feedback.good?(session.feedback.mastered?'⭐ Dominada! Dois acertos seguidos.':'✨ Muito bem! Mais um acerto para dominar.'):`💛 Quase! ${fact.a} × ${fact.b} = ${fact.answer}. Vamos tentar novamente.`):'Pense com calma. Você pode tentar quantas vezes precisar.'}
   </div>
   ${session.answered?`<button type="button" class="main-cta next-question" data-action="nextQuestion">${session.queue.length===0?'🏆 Ver conquista':'Próxima conta ➜'}</button>`:''}
  </div>
 </main>`;
}
export function winScreen(profile,result){
 const world=WORLDS[result.deck-1];
 return `<main class="win-view screen-stack">
  <div class="win-panel"><div class="win-stars" aria-hidden="true">⭐ ✨ ⭐</div>
   <span class="win-kicker">MUNDO ${result.deck} DOMINADO</span>
   <h1>Incrível, ${escapeHTML(profile.name)}!</h1>
   <h2>${escapeHTML(world.name)}</h2>
   <p>Você dominou dez multiplicações, acertando cada uma duas vezes seguidas!</p>
   <div class="win-stats"><div><b>${result.correct}</b><span>Acertos</span></div><div><b>${result.wrong}</b><span>Tentativas extras</span></div><div><b>+${result.coins}</b><span>Moedas</span></div></div>
   <button type="button" class="main-cta" data-action="worlds">🗺️ Voltar aos mundos</button>
   <button type="button" class="secondary-cta" data-action="home">🏡 Ir para o início</button>
  </div></main>`;
}
export function featureScreen(player,feature){
 return `<main class="coming-view screen-stack">${topbar(player,{title:feature})}
  <section class="coming-panel"><span>✦</span>
    <h1>${escapeHTML(feature)}</h1>
    <p>Estamos migrando este módulo do Tabuada Quest original, junto com seus assets e regras de conquista. Seu progresso permanece salvo.</p>
    <button type="button" class="main-cta" data-action="home">Voltar à aventura</button>
  </section></main>`;
}
