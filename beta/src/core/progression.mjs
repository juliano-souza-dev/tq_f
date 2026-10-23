export const WORLDS=Object.freeze([
 {number:1,name:'Jardim do Primeiro Passo'},
 {number:2,name:'Floresta da Dupla'},
 {number:3,name:'Reino Vulcânico'},
 {number:4,name:'Jardim das Cerejeiras'},
 {number:5,name:'Reino Subaquático'},
 {number:6,name:'Portal do Reino Místico'},
 {number:7,name:'Vila das Joaninhas'},
 {number:8,name:'Galáxia Cósmica'},
 {number:9,name:'Reino do Gelo'},
 {number:10,name:'Floresta Encantada'}
]);
export const REVIEW_INTERVAL_DAYS=Object.freeze([2/24,3,7,14,30]);
export const MAX_WORLD=10;
const DAY_MS=86_400_000;
export function getTable(profile,n){
 return profile?.learning?.tables?.[String(n)]||{};
}
export function isMastered(profile,n){
 return Number(getTable(profile,n).masteredAt)>0;
}
export function worldState(profile,n,now=Date.now()){
 if(!Number.isInteger(n)||n<1||n>MAX_WORLD)return {id:'invalid',label:'Indisponível',enabled:false};
 const table=getTable(profile,n);
 const mastered=isMastered(profile,n);
 if(n>1&&!mastered&&!isMastered(profile,n-1))return {id:'locked',label:'Bloqueado',enabled:false};
 if(!mastered)return {id:'new',label:'Nova aventura',enabled:true};
 if(Number(table.nextReviewAt||0)<=now)return {id:'due',label:'Revisar',enabled:true};
 const days=Math.max(1,Math.ceil((Number(table.nextReviewAt)-now)/DAY_MS));
 return {id:'scheduled',label:'Dominada',enabled:false,days};
}
export function masteredCount(profile){return WORLDS.filter(w=>isMastered(profile,w.number)).length;}
export function level(xp){return Math.floor(Math.max(0,Number(xp)||0)/100)+1;}
export function experienceProgress(xp){return Math.max(0,Number(xp)||0)%100;}
export function chestProgress(profile){
 const sessions=Number(profile?.stats?.sessions||0),claimed=Number(profile?.stats?.chestsClaimed||0);
 const req=[3,5,7,9],requirement=i=>req[i]||10;
 let used=0,earned=0;
 while(used+requirement(earned)<=sessions){used+=requirement(earned);earned++}
 const nextReq=requirement(earned),into=Math.max(0,sessions-used);
 return {earned,available:Math.max(0,earned-claimed),into,nextReq,percentage:Math.min(100,Math.round(into/nextReq*100))};
}
export function reviewSchedule(profile,n,mode,wrong,now=Date.now()){
 const old=getTable(profile,n);
 const table={...old};
 if(mode==='review'&&table.masteredAt){
  const previous=Math.max(0,Number(table.reviewStage)||0);
  table.reviewStage=wrong===0?Math.min(REVIEW_INTERVAL_DAYS.length-1,previous+1)
   :wrong>=3?Math.max(0,previous-1):previous;
  table.reviewCount=Number(table.reviewCount||0)+1;
  table.lastReviewAt=now;
  if(wrong>=3)table.lapses=Number(table.lapses||0)+1;
 }else{
  table.masteredAt=table.masteredAt||now;
  table.reviewStage=0;
  table.reviewCount=Number(table.reviewCount||0);
  table.lastReviewAt=now;
 }
 table.nextReviewAt=now+REVIEW_INTERVAL_DAYS[table.reviewStage]*DAY_MS;
 return table;
}
