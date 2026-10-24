import {reviewSchedule} from './progression.mjs';
export function shuffled(values,random=Math.random){
 const list=[...values];
 for(let i=list.length-1;i>0;i--){
  const k=Math.floor(random()*(i+1));[list[i],list[k]]=[list[k],list[i]];
 }
 return list;
}
export function choicesFor(fact,random=Math.random){
 // Replica o algoritmo pedagogico do apoio: erros plausiveis em torno
 // do resultado, sem zero nem respostas repetidas.
 const correct=Number(fact.answer),step=Math.max(1,Number(fact.a)||1);
 const pool=[correct-step,correct+step,correct-step*2,correct+step*2,
  correct-1,correct+1,correct-2,correct+2,correct-5,correct+5,correct-10,correct+10];
 const values=[correct];
 for(const candidate of shuffled(pool,random)){
  if(values.length>=4)break;
  if(Number.isInteger(candidate)&&candidate>0&&candidate<=100&&!values.includes(candidate))values.push(candidate);
 }
 let guard=0;
 while(values.length<4&&guard++<100){
  const candidate=Math.max(1,Math.min(100,correct+(Math.floor(random()*21)-10)));
  if(!values.includes(candidate))values.push(candidate);
 }
 return shuffled(values,random);
}
export function createPractice(table,mode='learn',random=Math.random,now=Date.now()){
 if(!Number.isInteger(table)||table<1||table>10)throw Error('Tabuada inválida');
 const queue=shuffled(Array.from({length:10},(_,i)=>({a:table,b:i+1,answer:table*(i+1),streak:0})),random);
 return {table,mode,queue,mastered:0,correct:0,wrong:0,coins:0,started:now,
  answered:false,feedback:null,choices:choicesFor(queue[0],random)};
}
export function answerPractice(session,profile,value){
 if(!session||session.answered||session.queue.length===0)return {accepted:false};
 const first=session.queue.shift(),good=Number.isInteger(value)&&value===first.answer;
 session.answered=true;
 session.lastChoice=value;
 if(good){
  first.streak++;
  session.correct++;session.coins++;
  profile.coins=Number(profile.coins||0)+1;
  profile.xp=Number(profile.xp||0)+5;
  profile.stats.correct=Number(profile.stats.correct||0)+1;
  if(first.streak===2){session.mastered++;profile.xp+=5;}
  else session.queue.push(first);
 }else{
  first.streak=0;session.wrong++;
  profile.stats.wrong=Number(profile.stats.wrong||0)+1;
  session.queue.push(first);
 }
 session.activeFact={...first};
 session.feedback={good,actual:first.answer,multiplier:first.b,mastered:good&&first.streak===2,badValue:good?null:value};
 return {accepted:true,...session.feedback};
}
export function nextPractice(session,random=Math.random){
 if(!session?.answered)return {finished:false,advanced:false};
 session.feedback=null;session.answered=false;session.activeFact=null;session.lastChoice=null;
 if(session.queue.length===0)return {finished:true,advanced:true};
 session.choices=choicesFor(session.queue[0],random);
 return {finished:false,advanced:true};
}
export function finishPractice(session,profile,now=Date.now()){
 if(!session||session.queue.length!==0||!session.answered||session.mastered!==10)throw Error('Prática ainda não concluída');
 profile.stats.sessions=Number(profile.stats.sessions||0)+1;
 profile.stats.masteredDecks??={};
 profile.stats.masteredDecks[String(session.table)]={at:now,correct:session.correct,wrong:session.wrong};
 profile.xp=Number(profile.xp||0)+50;
 profile.learning??={tables:{}};
 profile.learning.tables??={};
 profile.learning.tables[String(session.table)]=reviewSchedule(profile,session.table,session.mode,session.wrong,now);
 profile.history=Array.isArray(profile.history)?profile.history:[];
 const result={deck:session.table,mode:session.mode,correct:session.correct,
  wrong:session.wrong,coins:session.coins,
  seconds:Math.max(1,Math.round((now-session.started)/1000)),at:now};
 profile.history.unshift(result);
 profile.history=profile.history.slice(0,40);
 return result;
}
