import {chestProgress,isMastered} from '../../core/progression.mjs';
import {fashionAssetUrl} from '../../resources/asset-map.mjs';
import {FASHION_CATALOG} from '../wardrobe/fashion.mjs';
import {DAILY_CHEST_SPRITES,claimDailyChest} from '../daily/catalog.mjs';
const assetRoot='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
export const chestAsset=name=>assetRoot+encodeURIComponent(name);
export const CHEST_ITEMS=Object.freeze([{"id":"chest_frame_secret","cat":"frame","asset":"frame-secret-royal.png","name":"Moldura Relíquia Real","rarity":"Relíquia","collection":""},{"id":"chest_frame_astral_lotus","cat":"frame","asset":"chest-frame-astral-lotus.png","name":"Lótus Astral","rarity":"Relíquia","collection":"energia_amaldicoada"},{"id":"chest_frame_tide_dragon","cat":"frame","asset":"chest-frame-tide-dragon.png","name":"Dragão das Marés","rarity":"Relíquia","collection":"energia_amaldicoada"},{"id":"chest_frame_crimson_eclipse","cat":"frame","asset":"chest-frame-crimson-eclipse.png","name":"Eclipse Carmesim","rarity":"Relíquia","collection":"energia_amaldicoada"},{"id":"chest_frame_celestial_crystal","cat":"frame","asset":"chest-frame-celestial-crystal.png","name":"Cristal Celestial","rarity":"Relíquia","collection":"energia_amaldicoada"},{"id":"chest_frame_pirate_golden_nautical","cat":"frame","asset":"chest-frame-pirate-golden-nautical.png","name":"Náutica Pirata Dourada","rarity":"Épico","collection":"aventura_pirata"},{"id":"chest_frame_pirate_fantastic_treasures","cat":"frame","asset":"chest-frame-pirate-fantastic-treasures.png","name":"Tesouros Fantásticos","rarity":"Lendário","collection":"aventura_pirata"},{"id":"chest_frame_pirate_treasure","cat":"frame","asset":"chest-frame-pirate-treasure.png","name":"Tesouro do Navegador","rarity":"Épico","collection":"aventura_pirata"},{"id":"chest_frame_pirate_waves_gems","cat":"frame","asset":"chest-frame-pirate-waves-gems.png","name":"Ondas e Gemas do Tesouro","rarity":"Lendário","collection":"aventura_pirata"},{"id":"chest_bg_secret","cat":"background","asset":"bg-secret-vault.png","name":"Cofre Secreto dos Números","rarity":"Relíquia","collection":""},{"id":"chest_collect_star_sum","cat":"collectible","asset":"chest-collect-star-sum.png","name":"Estrela da Soma","rarity":"Baú","collection":""},{"id":"chest_collect_crystal_multiply","cat":"collectible","asset":"chest-collect-crystal-multiply.png","name":"Cristal da Multiplicação","rarity":"Baú","collection":""},{"id":"chest_collect_orb_division","cat":"collectible","asset":"chest-collect-orb-division.png","name":"Orbe da Divisão","rarity":"Baú","collection":""},{"id":"chest_collect_medal_subtract","cat":"collectible","asset":"chest-collect-medal-subtract.png","name":"Medalha da Subtração","rarity":"Baú","collection":""},{"id":"chest_collect_mathmage_coin","cat":"collectible","asset":"chest-collect-mathmage-coin.png","name":"Moeda do Matemago","rarity":"Baú","collection":""},{"id":"chest_collect_number_scroll","cat":"collectible","asset":"chest-collect-number-scroll.png","name":"Pergaminho dos Números","rarity":"Baú","collection":""},{"id":"chest_collect_knowledge_key","cat":"collectible","asset":"chest-collect-knowledge-key.png","name":"Chave do Conhecimento","rarity":"Baú","collection":""},{"id":"chest_collect_times_orb","cat":"collectible","asset":"chest-collect-times-orb.png","name":"Orbe da Tabuada","rarity":"Baú","collection":""},{"id":"chest_collect_calc_potion","cat":"collectible","asset":"chest-collect-calc-potion.png","name":"Poção do Cálculo","rarity":"Baú","collection":""},{"id":"chest_collect_times_book","cat":"collectible","asset":"chest-collect-times-book.png","name":"Livro das Multiplicações","rarity":"Baú","collection":""},{"id":"chest_bg_number_valley","cat":"background","asset":"chest-bg-number-valley.png","name":"Vale dos Números","rarity":"Baú","collection":""},{"id":"chest_bg_rainbow_sky","cat":"background","asset":"chest-bg-rainbow-sky.png","name":"Céu Arco-Íris","rarity":"Baú","collection":""},{"id":"chest_bg_starry_night","cat":"background","asset":"chest-bg-starry-night.png","name":"Noite Estrelada","rarity":"Baú","collection":""},{"id":"chest_bg_magic_castle","cat":"background","asset":"chest-bg-magic-castle.png","name":"Castelo Matemágico","rarity":"Baú","collection":""},{"id":"chest_bg_enchanted_library","cat":"background","asset":"chest-bg-enchanted-library.png","name":"Biblioteca Encantada","rarity":"Baú","collection":""},{"id":"chest_bg_mushroom_forest","cat":"background","asset":"chest-bg-mushroom-forest.png","name":"Floresta dos Cogumelos","rarity":"Baú","collection":""},{"id":"chest_bg_crystal_cave","cat":"background","asset":"chest-bg-crystal-cave.png","name":"Caverna de Cristais","rarity":"Baú","collection":""},{"id":"chest_bg_cloud_kingdom","cat":"background","asset":"chest-bg-cloud-kingdom.png","name":"Reino das Nuvens","rarity":"Baú","collection":""},{"id":"chest_bg_challenge_island","cat":"background","asset":"chest-bg-challenge-island.png","name":"Ilha dos Desafios","rarity":"Baú","collection":""},{"id":"chest_bg_number_desert","cat":"background","asset":"chest-bg-number-desert.png","name":"Deserto dos Números","rarity":"Baú","collection":""},{"id":"chest_fx_golden_spark","cat":"effect","asset":"chest-fx-golden-spark.png","name":"Faísca Dourada","rarity":"Baú","collection":""},{"id":"chest_fx_star_rain","cat":"effect","asset":"chest-fx-star-rain.png","name":"Chuva de Estrelas","rarity":"Baú","collection":""},{"id":"chest_fx_number_confetti","cat":"effect","asset":"chest-fx-number-confetti.png","name":"Confete Numérico","rarity":"Baú","collection":""},{"id":"chest_fx_rainbow_burst","cat":"effect","asset":"chest-fx-rainbow-burst.png","name":"Explosão Arco-Íris","rarity":"Baú","collection":""},{"id":"chest_fx_magic_spiral","cat":"effect","asset":"chest-fx-magic-spiral.png","name":"Espiral Mágica","rarity":"Baú","collection":""},{"id":"chest_fx_streak_flame","cat":"effect","asset":"chest-fx-streak-flame.png","name":"Chama da Sequência","rarity":"Baú","collection":""},{"id":"chest_fx_math_lightning","cat":"effect","asset":"chest-fx-math-lightning.png","name":"Raio Matemático","rarity":"Baú","collection":""},{"id":"chest_fx_crystal_burst","cat":"effect","asset":"chest-fx-crystal-burst.png","name":"Explosão de Cristais","rarity":"Baú","collection":""},{"id":"chest_fx_number_bubbles","cat":"effect","asset":"chest-fx-number-bubbles.png","name":"Bolhas Numéricas","rarity":"Baú","collection":""},{"id":"chest_fx_math_hearts","cat":"effect","asset":"chest-fx-math-hearts.png","name":"Corações Matemáticos","rarity":"Baú","collection":""},{"id":"fx_lottie_cursed_orb","cat":"effect","asset":"papai_correct_lottie/assets/magic_seal.png","name":"Expansão do Orbe Amaldiçoado","rarity":"Oculto","collection":""},{"id":"fx_lottie_golden_seal","cat":"effect","asset":"papai_correct_lottie/assets/magic_seal.png","name":"Selo do Ritual Dourado","rarity":"Oculto","collection":""},{"id":"fx_lottie_celestial_pulse","cat":"effect","asset":"papai_correct_lottie/assets/magic_check.png","name":"Pulso Celestial","rarity":"Oculto","collection":""},{"id":"collect_bonus_08","cat":"collectible","asset":"bonus-collect-08.png","name":"Unicórnio nas Nuvens","rarity":"Oculto","collection":"bonus_oculto"},{"id":"collect_bonus_09","cat":"collectible","asset":"bonus-collect-09.png","name":"Livro Mágico","rarity":"Oculto","collection":"bonus_oculto"},{"id":"collect_bonus_10","cat":"collectible","asset":"bonus-collect-10.png","name":"Castelo no Globo","rarity":"Oculto","collection":"bonus_oculto"}]);
export const SPECIAL_ITEMS=Object.freeze([
{id:'table2_bg_pirate_bay',cat:'background',asset:'table2-bg-pirate-bay.png',name:'Baía Pirata Encantada',rarity:'Épico'},
{id:'table2_bg_pirate_port',cat:'background',asset:'table2-bg-pirate-port.png',name:'Porto dos Navegadores ao Pôr do Sol',rarity:'Lendário'},
{id:'table2_fx_nautical_treasure',cat:'effect',asset:'table2-fx-nautical-treasure.png',name:'Explosão do Tesouro Náutico',rarity:'Lendário'},
{id:'table3_bg_inventor_workshop',cat:'background',asset:'table3-bg-inventor-workshop.png',name:'Oficina Fantástica do Inventor',rarity:'Épico'},
{id:'table3_bg_mechanical_square',cat:'background',asset:'table3-bg-mechanical-square.png',name:'Praça Mecânica Colorida',rarity:'Lendário'},
{id:'table3_fx_gears_bananas',cat:'effect',asset:'table3-fx-gears-bananas.png',name:'Explosão de Engrenagens e Bananas',rarity:'Lendário'}
]);
export const ALL_CHEST_ITEMS=Object.freeze([...CHEST_ITEMS,...SPECIAL_ITEMS]);
export const CHEST_TYPES=Object.freeze([
 {id:'magic',name:'Baú Encantado',rarity:'Raro',theme:'Magia clássica',sprite:'magic'},
 {id:'pirate',name:'Baú dos Navegadores',rarity:'Épico',theme:'Aventura pirata',sprite:'pirate'},
 {id:'starlight',name:'Baú Estelar',rarity:'Lendário',theme:'Reino estelar',sprite:'starlight'},
 {id:'royal',name:'Baú Relíquia Real',rarity:'Relíquia',theme:'Coroa dos números',sprite:'royal'}
]);
const special=[
 {id:'mastery2',table:2,name:'Baú dos Navegadores ×2',rarity:'Épico',sprite:'table2'},
 {id:'mastery3',table:3,name:'Baú dos Inventores ×3',rarity:'Épico',sprite:'inventor'}
];
const requirements=[3,5,7,9];
const requirement=i=>requirements[i]||10;
export const chestFrames=(def)=>Array.from({length:6},(_,i)=>chestAsset('chest-'+def.sprite+'-frame-'+i+'.webp'));
export function chestDefinitions(profile){
 const progress=chestProgress(profile),claimed=Math.max(0,Number(profile?.stats?.chestsClaimed||0));
 const count=Math.max(4,claimed+2,progress.earned+1);
 const daily=Array.from({length:6},(_,i)=>({kind:'daily',id:'daily_'+i,index:i,day:(i+1)*5,name:'Baú Diário '+(i+1),sprite:DAILY_CHEST_SPRITES[i],rarity:['Raro','Épico','Lendário','Relíquia','Épico','Lendário'][i]}));
 return [...special.map(def=>({...def,kind:'mastery'})),...daily,...Array.from({length:count},(_,i)=>{const type=CHEST_TYPES[i%4];return {...type,kind:'activity',index:i,id:'activity_'+i,name:type.name+(i>=4?' · Ciclo '+(Math.floor(i/4)+1):'')}})];
}
export function chestState(profile,def){
 if(def.kind==='daily'){const claimed=Number(profile?.stats?.dailyChestsClaimed||0),tokens=Number(profile?.stats?.dailyChestTokens||0);return def.index<claimed?'opened':def.index===claimed&&tokens>0?'ready':'locked'}
 if(def.kind==='mastery')return profile?.flags?.[def.table===2?'table2PirateChestClaimed':'table3InventorChestClaimed']?'opened':isMastered(profile,def.table)?'ready':'locked';
 const claimed=Number(profile?.stats?.chestsClaimed||0);
 if(def.index<claimed)return 'opened';
 if(def.index===claimed&&chestProgress(profile).available>0)return 'ready';
 return 'locked';
}
export function chestRemaining(profile,def){
 if(def.kind==='daily')return 'Chegue ao dia '+def.day+' da recompensa diária ('+Number(profile?.daily?.progress||0)+'/'+def.day+')';
 if(def.kind==='mastery')return 'Domine a tabuada do '+def.table+' pela primeira vez';
 let need=0;for(let i=0;i<=def.index;i++)need+=requirement(i);
 const left=Math.max(0,need-Number(profile?.stats?.sessions||0));
 return left===0?'Abra o baú anterior primeiro':'Faltam '+left+' atividades';
}
const themeScore=(type,item)=>{
 const words=(item.id+' '+item.asset+' '+item.collection).toLowerCase();
 const cues={pirate:['pirate','sea','treasure','nautical','waves','compass'],starlight:['star','astral','celestial','crystal','night'],royal:['royal','gold','secret','crown','castle'],magic:['magic','secret','lotus','crystal']};
 return (cues[type.id]||[]).reduce((n,k)=>n+(words.includes(k)?5:0),0);
};
function takeItems(profile,cat,count,type,random){
 const available=CHEST_ITEMS.filter(item=>item.cat===cat&&!profile.owned.includes(item.id));
 const selected=[];
 while(available.length&&selected.length<count){
  let top=Math.max(...available.map(item=>themeScore(type,item)));
  const group=available.filter(item=>themeScore(type,item)===top);
  const chosen=group[Math.floor(random()*group.length)];
  selected.push(chosen);available.splice(available.indexOf(chosen),1);profile.owned.push(chosen.id);
 }
 return selected;
}
export function openChest(profile,id,random=Math.random){
 const def=chestDefinitions(profile).find(c=>c.id===id);
 if(!def||chestState(profile,def)!=='ready')return null;
 profile.owned=Array.isArray(profile.owned)?profile.owned:[];
 profile.fashionOwned=Array.isArray(profile.fashionOwned)?profile.fashionOwned:['original'];
 profile.flags=profile.flags||{};
 profile.stats=profile.stats||{};
 const results=[];
 if(def.kind==='daily'){
  const award=claimDailyChest(profile,random);if(!award)return null;
  profile.chestHistory=Array.isArray(profile.chestHistory)?profile.chestHistory:[];
  profile.chestHistory.unshift({id:def.id,at:Date.now(),items:award.items.map(x=>x.id)});
  return {def,items:award.items};
 }
 if(def.kind==='activity'){
  for(const [cat,count] of [['frame',3],['background',2],['effect',1]])results.push(...takeItems(profile,cat,count,def,random));
  // Original APK grants one fashion piece alongside the chest-only items.
  const skins=(FASHION_CATALOG[profile.avatar?.id]||[]).filter(x=>x.sources?.includes('chest')&&!profile.fashionOwned.includes(x.id));
  if(skins.length){const skin=skins[Math.floor(random()*skins.length)];profile.fashionOwned.push(skin.id);results.push({id:'fashion_'+skin.id,name:'Moda '+skin.name,cat:'fashion',skin:skin.id})}
  profile.stats.chestsClaimed=Number(profile.stats.chestsClaimed||0)+1;
 }else if(def.table===2){
  const ids=['chest_frame_pirate_golden_nautical','chest_frame_pirate_fantastic_treasures','chest_frame_pirate_treasure','chest_frame_pirate_waves_gems'];
  const candidates=[...ids.filter(x=>!profile.owned.includes(x)),...ids.filter(x=>profile.owned.includes(x))];
  for(let i=0;i<Math.min(3,candidates.length);i++){
   const j=i+Math.floor(random()*(candidates.length-i));
   [candidates[i],candidates[j]]=[candidates[j],candidates[i]];
  }
  for(const id of candidates.slice(0,3)){const item=CHEST_ITEMS.find(x=>x.id===id);if(item){if(!profile.owned.includes(id))profile.owned.push(id);results.push(item)}}
  for(const id of ['table2_bg_pirate_bay','table2_bg_pirate_port','table2_fx_nautical_treasure']){const item=SPECIAL_ITEMS.find(x=>x.id===id);if(item&&!profile.owned.includes(id)){profile.owned.push(id);results.push(item)}}
  if(!profile.fashionOwned.includes('navigator2')){profile.fashionOwned.push('navigator2');results.push({id:'fashion_navigator2',name:'Capitã dos Navegadores',cat:'fashion',skin:'navigator2'})}
  profile.flags.table2PirateChestClaimed=true;
  profile.flags.table2PirateChestPending=false;
  profile.flags.table2PirateChestRewardIds=results.map(x=>x.id);
 }else if(def.table===3){
  for(const id of ['table3_bg_inventor_workshop','table3_bg_mechanical_square','table3_fx_gears_bananas']){const item=SPECIAL_ITEMS.find(x=>x.id===id);if(item&&!profile.owned.includes(id)){profile.owned.push(id);results.push(item)}}
  if(!profile.fashionOwned.includes('inventor3')){profile.fashionOwned.push('inventor3');results.push({id:'fashion_inventor3',name:'Inventora da Oficina',cat:'fashion',skin:'inventor3'})}
  profile.flags.table3InventorChestClaimed=true;
  profile.flags.table3InventorChestPending=false;
 }
 if(!results.length){const coins=250+Math.floor(random()*151);profile.coins=Number(profile.coins||0)+coins;results.push({id:'coins',name:coins+' moedas',cat:'coins',asset:'coin.webp'})}
 profile.chestHistory=Array.isArray(profile.chestHistory)?profile.chestHistory:[];
 profile.chestHistory.unshift({id:def.id,at:Date.now(),items:results.map(i=>i.id)});
 return {def,items:results};
}
export function rewardAsset(item,profile){return item.skin?fashionAssetUrl(profile.avatar?.id,item.skin):item.asset?chestAsset(item.asset):''}
