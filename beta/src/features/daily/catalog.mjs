import {CHEST_ITEMS} from '../chests/catalog.mjs';
const chestAsset=name=>'https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/'+encodeURIComponent(name);
export const DAILY_REWARDS=Object.freeze([
...[[30,30,40,40],[35,35,45,45],[40,40,50,50],[45,45,55,55],[50,50,60,60]].flatMap(group=>[...group.map(amount=>({kind:'coins',amount})),{kind:'daily_chest'}]),
...['bg_bonus_11','bg_bonus_12','bg_bonus_13','bg_bonus_14'].map(id=>({kind:'background',id})),
{kind:'daily_chest'}
]);
export const DAILY_CHEST_SPRITES=['magic','pirate','starlight','royal','pirate','starlight'];
export const DAILY_BONUS_BACKGROUNDS=Object.freeze([
{id:'bg_bonus_11',name:'Fundo Bônus 11',asset:'bg-bonus-11.png',cat:'background',price:0,rarity:'Raro',source:'daily'},
{id:'bg_bonus_12',name:'Fundo Bônus 12',asset:'bg-bonus-12.png',cat:'background',price:0,rarity:'Raro',source:'daily'},
{id:'bg_bonus_13',name:'Fundo Bônus 13',asset:'bg-bonus-13.png',cat:'background',price:0,rarity:'Épico',source:'daily'},
{id:'bg_bonus_14',name:'Fundo Bônus 14',asset:'bg-bonus-14.png',cat:'background',price:0,rarity:'Épico',source:'daily'}
]);
const pad=n=>Math.min(30,Math.max(0,Number(n)||0));
export const dayKey=(date=new Date())=>{const d=new Date(date);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
export function dailyState(profile,date=new Date()){
 const daily=profile?.daily||{},progress=pad(daily.progress),done=!!daily.completed||progress>=30;
 return {progress,done,canClaim:!done&&daily.lastClaimDate!==dayKey(date),week:Math.min(4,Math.floor(Math.min(29,progress)/7)),cycle:Math.max(1,Number(daily.cycle)||1)};
}
export function claimDaily(profile,date=new Date()){
 const st=dailyState(profile,date);if(!st.canClaim)return null;
 profile.daily??={progress:0,lastClaimDate:null,cycle:1};
 profile.stats??={};profile.owned??=[];
 const reward=DAILY_REWARDS[st.progress];
 let label='';
 if(reward.kind==='coins'){profile.coins=Number(profile.coins||0)+reward.amount;label=reward.amount+' moedas'}
 else if(reward.kind==='background'){
  const item=DAILY_BONUS_BACKGROUNDS.find(x=>x.id===reward.id);
  if(item&&!profile.owned.includes(item.id))profile.owned.push(item.id);label=item?.name||'Fundo especial';
 }else{
  profile.stats.dailyChestTokens=Number(profile.stats.dailyChestTokens||0)+1;
  label='Baú diário liberado';
 }
 profile.daily.lastClaimDate=dayKey(date);
 profile.daily.progress=st.progress+1;
 if(profile.daily.progress>=30)profile.daily.completed=true;
 return {reward,label,day:st.progress+1};
}
export const dailyChestArt=(index)=>chestAsset('chest-'+DAILY_CHEST_SPRITES[index%6]+'-frame-0.webp');
export const DAILY_FRAME_REWARD_IDS=['frame_adventure_02','frame_adventure_04','frame_adventure_06','frame_adventure_08','frame_adventure_09','frame_adventure_10'];
export function claimDailyChest(profile,random=Math.random){
 profile.stats??={};profile.owned??=[];profile.fashionOwned??=['original'];
 const tokens=Number(profile.stats.dailyChestTokens||0),index=Number(profile.stats.dailyChestsClaimed||0);
 if(tokens<=0||index>=6)return null;
 const key=DAILY_CHEST_SPRITES[index],type={id:key};
 const result=[];
 for(const [cat,max] of [['frame',3],['background',2],['effect',1]]){
  const pool=CHEST_ITEMS.filter(x=>x.cat===cat&&!profile.owned.includes(x.id));
  for(let k=0;k<max&&pool.length;k++){
   const clues=key==='pirate'?['pirate','sea','treasure']:key==='starlight'?['star','astral','celestial']:key==='royal'?['royal','gold','secret']:['magic','crystal','lotus'];
   const score=x=>clues.reduce((n,q)=>n+(String(x.id+' '+x.collection).includes(q)?5:0),0);
   const best=Math.max(...pool.map(score));const subset=pool.filter(x=>score(x)===best);
   const chosen=subset[Math.floor(random()*subset.length)];
   pool.splice(pool.indexOf(chosen),1);profile.owned.push(chosen.id);result.push(chosen);
  }
 }
 const preferred=DAILY_FRAME_REWARD_IDS[index];
 if(preferred&&!profile.owned.includes(preferred)){
  profile.owned.push(preferred);
  result.push({id:preferred,cat:'frame',asset:'frame-adventure-'+String(index===0?2:index===1?4:index===2?6:index===3?8:index===4?9:10).padStart(2,'0')+'.png',name:'Moldura especial do dia '+(index+1)*5});
 }
 if(!result.length){profile.coins=Number(profile.coins||0)+300;result.push({id:'coins',cat:'coins',asset:'coin.webp',name:'300 moedas'})}
 profile.stats.dailyChestTokens=tokens-1;profile.stats.dailyChestsClaimed=index+1;
 return {items:result,index,type};
}
