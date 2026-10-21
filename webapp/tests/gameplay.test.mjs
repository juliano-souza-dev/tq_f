import test from 'node:test';
import assert from 'node:assert/strict';
import {createProfileStore,LEGACY_KEY,STORAGE_KEY,FAMILIES} from '../src/core/profiles.mjs';
import {WORLDS,REVIEW_INTERVAL_DAYS,worldState,masteredCount,chestProgress,reviewSchedule} from '../src/core/progression.mjs';
import {createPractice,answerPractice,nextPractice,finishPractice} from '../src/core/practice.mjs';
import {createApp} from '../src/app/app.mjs';
import {fashionFor,acquireFashion,fashionStatus} from '../src/features/wardrobe/fashion.mjs';

function storage(initial={}){
 const values=new Map(Object.entries(initial));
 return {getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,String(value)),dump:key=>values.get(key)};
}
function storeForTest(){
 let serial=0;
 const s=createProfileStore({storage:storage(),now:()=>100000+serial++,random:()=>.22});
 s.select('alana');
 return s;
}
test('mantém perfis de Alana, Thaís e Heloísa independentes',()=>{
 const st=storeForTest();
 assert.deepEqual(st.profiles().map(p=>p.name),FAMILIES.map(p=>p.name));
 st.updateActive(p=>{p.coins+=42;p.stats.correct=17});
 st.select('thais');
 assert.equal(st.active().coins,10000);
 assert.equal(st.active().stats.correct,0);
 st.select('alana');
 assert.equal(st.active().coins,10042);
});
test('copia progresso antigo sem alterar a chave legado',()=>{
 const before=JSON.stringify({profiles:[{id:'old-a',name:'Alana',coins:152,xp:999,
 stats:{sessions:8,masteredDecks:{}},learning:{tables:{'1':{masteredAt:123,nextReviewAt:234}}}}],activeId:'old-a'});
 const mem=storage({[LEGACY_KEY]:before});
 const store=createProfileStore({storage:mem,now:()=>9999,random:()=>0});
 assert.equal(store.source(),'legacy-copy');
 assert.equal(store.active().coins,152);
 assert.equal(store.active().learning.tables['1'].masteredAt,123);
 assert.equal(mem.dump(LEGACY_KEY),before,'legado deve permanecer intocado');
 assert.ok(mem.dump(STORAGE_KEY),'webapp usa chave diferente');
});
test('somente a tabuada 1 inicia liberada e desbloqueia progressivamente',()=>{
 const p=storeForTest().active();
 assert.equal(worldState(p,1,200).id,'new');
 assert.equal(worldState(p,2,200).id,'locked');
 p.learning.tables['1']={masteredAt:100,nextReviewAt:100+86_400_000};
 assert.equal(worldState(p,1,200).id,'scheduled');
 assert.equal(worldState(p,2,200).id,'new');
 assert.equal(masteredCount(p),1);
 assert.equal(worldState(p,1,100+86_400_000).id,'due');
});
test('revisão espaçada respeita os intervalos 2h, 3, 7, 14 e 30 dias',()=>{
 const p=storeForTest().active();const at=1000000;
 p.learning.tables['1']={};
 const first=reviewSchedule(p,1,'learn',0,at);
 assert.equal(first.nextReviewAt-at,2*60*60*1000);
 p.learning.tables['1']=first;
 const second=reviewSchedule(p,1,'review',0,at+10000);
 assert.equal(second.nextReviewAt-(at+10000),3*86400000);
 p.learning.tables['1']=second;
 const afterErrors=reviewSchedule(p,1,'review',3,at+30000);
 assert.equal(afterErrors.reviewStage,0);
 assert.equal(afterErrors.lapses,1);
});
test('acertar 10 contas duas vezes seguidas domina o mundo e concede experiência/moedas',()=>{
 const st=storeForTest();const p=st.active();
 const random=()=>.314159;
 const session=createPractice(1,'learn',random,1000);
 let rounds=0;
 while(session.queue.length>0){
  const card=session.queue[0];
  assert.equal(answerPractice(session,p,card.answer).accepted,true);
  assert.equal(answerPractice(session,p,card.answer).accepted,false,'não permite duplo envio');
  rounds++;
  if(session.queue.length)nextPractice(session,random);
  if(rounds>50)throw Error('Loop de prática não concluiu');
 }
 assert.equal(rounds,20);
 assert.equal(session.mastered,10);
 assert.equal(session.correct,20);
 assert.equal(p.coins,10020);
 const report=finishPractice(session,p,10_000);
 assert.equal(p.xp,200);
 assert.equal(p.stats.sessions,1);
 assert.equal(report.deck,1);
 assert.ok(p.learning.tables['1'].masteredAt);
 assert.equal(chestProgress(p).into,1);
});
test('erro zera sequência da conta e repete o cartão no final',()=>{
 const p=storeForTest().active(),s=createPractice(2,'learn',()=>.37);
 const current=s.queue[0];
 answerPractice(s,p,current.answer);
 assert.equal(s.activeFact.streak,1);
 nextPractice(s,()=>.3);
 // A mesma conta foi para o fim da fila, e quando reaparecer seu primeiro acerto é mantido.
 while(s.queue[0]!==current && s.queue.length>1){
  const card=s.queue[0];answerPractice(s,p,card.answer);nextPractice(s,()=>.3);
 }
 assert.equal(s.queue[0],current);
 const wrong=answerPractice(s,p,-1);
 assert.equal(wrong.good,false);
 assert.equal(s.activeFact.streak,0);
 assert.equal(s.wrong,1);
});
test('controlador renderiza perfil, home, mapa, quiz e vitória sem depender da aplicação antiga',()=>{
 const root={innerHTML:'',handlers:new Map(),addEventListener(n,fn){this.handlers.set(n,fn)},removeEventListener(n){this.handlers.delete(n)},contains(){return true}};
 const mem=storage();
 let time=1_000_000;
 const app=createApp({root,storage:mem,now:()=>time++,random:()=>.345});
 assert.equal(app.getScreen(),'profiles');assert.match(root.innerHTML,/Alana/);
 app.act('selectPlayer',{player:'alana'});app.act('enter');
 assert.equal(app.getScreen(),'home');
 assert.match(root.innerHTML,/home_new_jogar.webp/);
 app.act('worlds');assert.equal(app.getScreen(),'worlds');assert.match(root.innerHTML,/world_map_bg.webp/);
 app.act('startWorld',{world:'2'});assert.equal(app.getScreen(),'worlds','mundo bloqueado não começa');
 app.act('startWorld',{world:'1'});
 assert.equal(app.getScreen(),'practice');assert.match(root.innerHTML,/Quanto é/);
 let turns=0;
 while(app.getScreen()==='practice'&&turns<40){
  const session=app.getSession();
  app.act('answer',{answer:String(session.queue[0].answer)});
  assert.ok(app.getSession().answered);
  app.act('nextQuestion');
  turns++;
 }
 assert.equal(turns,20);assert.equal(app.getScreen(),'win');
 assert.equal(app.getPlayer().stats.sessions,1);
 assert.equal(app.getPlayer().learning.tables['1'].reviewStage,0);
 assert.ok(mem.dump(STORAGE_KEY));
 app.act('worlds');app.act('selectWorld',{world:'2'});
 assert.match(root.innerHTML,/Floresta da Dupla/);
 app.destroy();
});

test('moldura e moda seguem o contrato do APK, sem conceder itens não conquistados',()=>{
 const st=storeForTest();
 st.updateActive(p=>{p.fashionOwned.push('pirate');p.owned.push('frame_floral');});
 const root={innerHTML:'',addEventListener(){},removeEventListener(){},contains(){return true}};
 const memory=storage();
 const app=createApp({root,storage:memory,random:()=>.31});
 app.act('selectPlayer',{player:'alana'});app.act('enter');
 app.act('openFeature',{feature:'Moda'});
 assert.equal(app.getScreen(),'wardrobe');
 assert.match(root.innerHTML,/Moda de Alana/);
 app.act('equipFashion',{skin:'pirate'});
 assert.equal(app.getPlayer().avatar.skinId,'pirate','A compra com moedas equipa a moda');
 assert.equal(app.getPlayer().coins,9820,'A compra precisa descontar 180 moedas');
 app.act('equipFashion',{skin:'pirate'});
 assert.equal(app.getPlayer().coins,9820,'Não cobrar duas vezes por item já comprado');
 app.act('fashionAction',{skin:'navigator2'});
 assert.equal(app.getPlayer().avatar.skinId,'pirate','Item exclusivo de baú não pode ser comprado');
 app.act('equipFrame',{frame:'frame_floral'});
 assert.equal(app.getPlayer().equipped.frame,null,'Não pode equipar moldura não conquistada');
 app.destroy();
});

test('moda e moldura conquistadas são equipadas, salvas e continuam ao reabrir',()=>{
 const mem=storage();
 const root={innerHTML:'',addEventListener(){},removeEventListener(){},contains(){return true}};
 const app=createApp({root,storage:mem,random:()=>.2});
 app.act('selectPlayer',{player:'alana'});app.act('enter');
 // Faz a conquista passar pelo estado persistido, sem desbloqueios fictícios.
 const current=JSON.parse(mem.dump(STORAGE_KEY));
 const user=current.profiles.find(x=>x.name==='Alana');
 user.fashionOwned.push('pirate');user.owned.push('frame_floral');
 mem.setItem(STORAGE_KEY,JSON.stringify(current));
 app.destroy();
 const reopened=createApp({root,storage:mem,random:()=>.2});
 reopened.act('openFeature',{feature:'Moda'});
 assert.match(root.innerHTML,/Pirata/);
 assert.match(root.innerHTML,/Floral/);
 reopened.act('equipFashion',{skin:'pirate'});
 reopened.act('equipFrame',{frame:'frame_floral'});
 assert.equal(reopened.getPlayer().avatar.skinId,'pirate');
 assert.equal(reopened.getPlayer().equipped.frame,'frame_floral');
 reopened.act('home');
 assert.match(root.innerHTML,/avatar-luna-pirate.webp/);
 assert.match(root.innerHTML,/frame-floral.webp/);
 reopened.destroy();
 const again=createProfileStore({storage:mem,now:()=>300});
 again.select('alana');
 assert.equal(again.active().avatar.skinId,'pirate');
 assert.equal(again.active().equipped.frame,'frame_floral');
});

test('catálogo Moda preserva 9, 14 e 9 roupas do APK e exclusividade Thaís',()=>{
 const st=storeForTest();const alana=st.active();
 assert.equal(fashionFor(alana).length,9);
 st.select('thais');const thais=st.active();
 assert.equal(fashionFor(thais).length,14);
 assert.equal(fashionFor(thais).filter(item=>item.id.startsWith('panda_infinity_')).length,5);
 st.select('heloisa');const heloisa=st.active();
 assert.equal(fashionFor(heloisa).length,9);
 assert.equal(fashionFor(heloisa).filter(item=>item.id.startsWith('panda_infinity_')).length,0);
});
test('compra Moda aplica preço uma vez; roupa de baú requer conquista; saldo insuficiente não altera perfil',()=>{
 const st=storeForTest();let profile=st.active();
 profile.coins=179;
 let result=acquireFashion(profile,'pirate');
 assert.equal(result.reason,'insufficient-coins');
 assert.equal(profile.coins,179);
 assert.equal(profile.avatar.skinId,'original');
 profile.coins=180;
 result=acquireFashion(profile,'pirate');
 assert.equal(result.reason,'purchased');
 assert.equal(profile.coins,0);
 assert.equal(profile.avatar.skinId,'pirate');
 result=acquireFashion(profile,'pirate');
 assert.equal(profile.coins,0);
 assert.equal(result.reason,'already-equipped');
 result=acquireFashion(profile,'navigator2');
 assert.equal(result.reason,'reward-only');
 assert.equal(profile.avatar.skinId,'pirate');
 profile.fashionOwned.push('navigator2');
 result=acquireFashion(profile,'navigator2');
 assert.equal(result.reason,'equipped');
 assert.equal(profile.avatar.skinId,'navigator2');
});
