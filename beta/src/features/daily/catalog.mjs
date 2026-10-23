import {chestAsset} from '../chests/catalog.mjs';
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
export function claimDailyChest(profile){
 profile.stats??={};profile.owned??=[];
 if(Number(profile.stats.dailyChestTokens||0)<=0)return null;
 const index=Math.max(0,Number(profile.stats.dailyChestsClaimed||0));
 const key=DAILY_CHEST_SPRITES[index%6];
 return {index,key};
}
