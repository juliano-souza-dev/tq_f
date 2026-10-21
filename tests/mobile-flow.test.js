/* Node.js: testes de fluxo sem dependências externas.
 * Avalia o script real do index.html com uma implementação mínima das APIs de DOM.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const Rewards=require('../assets/rewards.js');

const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
const mobileCss=fs.readFileSync(require('node:path').join(__dirname,'../assets/mobile-portrait.css'),'utf8');
assert.ok(html.includes('<link rel="stylesheet" href="./assets/mobile-portrait.css">'));
assert.ok(mobileCss.includes('.mobile-bottom-nav'));
assert.ok(mobileCss.includes('.region-grid::before'));
assert.ok(mobileCss.includes('.island-grid:before'));
assert.ok(mobileCss.includes('env(safe-area-inset-bottom'));
assert.ok(mobileCss.includes('.typed-row'));
assert.ok(mobileCss.includes('@media(max-width:390px)'));

const source=html.split('<script>')[1]?.split('</script>')[0];
assert.ok(source&&source.length>10000,'O script principal deve existir');
const events={},storage=new Map();
const root={innerHTML:''};
const toast={textContent:'',classList:{add(){},remove(){}}};
const window={scrollTo(){},TQRewards:Rewards};
const document={
 body:{classList:{toggle(){}}},
 getElementById(id){return id==='root'?root:id==='toast'?toast:{focus(){}}},
 addEventListener(type,fn){events[type]=fn}
};
const ctx={document,window,localStorage:{getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)}},setTimeout(){return 1},clearTimeout(){},console,Date,Math};
vm.createContext(ctx);vm.runInContext(source,ctx,{timeout:3000});
function click(action,data={}){
 events.click({target:{closest(){return {dataset:{action,...data},disabled:false}}},preventDefault(){}});
}
function screenIncludes(s){assert.ok(root.innerHTML.includes(s),'Esperado no HTML: '+s);}
screenIncludes('Quem vai explorar hoje?');
click('chooseProfile',{id:'alana'});
screenIncludes('As doze estrelas desapareceram!');
click('beginJourney');
screenIncludes('Cinco fases, uma estrela');
screenIncludes('mobile-bottom-nav');
click('home');
screenIncludes('Mapa do mundo');
const sceneCount=(root.innerHTML.match(/assets\/atlas-scenes.svg#scene-\d+/g)||[]).length;
assert.ok(sceneCount>=12,'Mapa precisa ter as 12 artes regionais');
screenIncludes('mobile-hud');
// Abas + navegação inferior sem perder o jogador
click('openCollection');
screenIncludes('Minha coleção');
screenIncludes('tab-chests');
click('collectionTab',{tab:'shop'});
screenIncludes('Asas do Atlas');
assert.ok(root.innerHTML.includes('aria-selected="true"'));
click('openProfile');
screenIncludes('Fases dominadas');
screenIncludes('mobile-bottom-nav');
click('home');
click('openRegion',{region:'0'});
click('openMission',{island:'0'});
screenIncludes('Resolver desafios');
click('beginMission');
screenIncludes('Quanto é?');
assert.equal(root.innerHTML.includes('mobile-bottom-nav'),false,'Ocultar navbar no quiz');
// Abandono de fase nunca rende conclusão.
let question=root.innerHTML.match(/class="sum">(\d+) × (\d+) = \?/);
assert.ok(question);
click('answer',{value:String(Number(question[1])*Number(question[2]))});
click('leaveQuiz');
assert.equal(JSON.parse(storage.get('expedicao-tabuada-v1')).profiles[0].done.length,0);
// Recomeçar a fase e atingir 2 acertos por cada uma das 8 contas.
click('openMission',{island:'0'});
click('beginMission');
let rounds=0,typed=0;
while(!root.innerHTML.includes('data-action="continueAfterWin"')&&rounds<32){
 const m=root.innerHTML.match(/class="sum">(\d+) × (\d+) = \?/);
 assert.ok(m,'Não encontrou questão na rodada '+rounds);
 const result=Number(m[1])*Number(m[2]);
 if(root.innerHTML.includes('id="typedAnswerForm"')){
    typed++;
    events.submit({target:{id:'typedAnswerForm',elements:{result:{value:String(result)}}},preventDefault(){}});
 }else click('answer',{value:String(result)});
 screenIncludes('Continuar');
 if(!root.innerHTML.includes('data-action="continueAfterWin"'))click('nextQuestion');
 rounds++;
}
assert.equal(rounds,16,'Cada fase deve exigir 8 operações × 2 acertos');
assert.equal(typed,8,'O segundo acerto deve usar resposta digitada');
screenIncludes('Missão concluída!');
const db=JSON.parse(storage.get('expedicao-tabuada-v1'));
assert.deepEqual(Array.from(db.profiles[0].done),['0-0']);
assert.equal(db.profiles[1].done.length,0,'Progresso deve ser individual');
console.log('✓ Navegação retrato, 12 artes, coleção, perfil, abandono e 16 respostas pedagógicas');
