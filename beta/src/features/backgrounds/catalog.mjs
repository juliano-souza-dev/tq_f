export const BACKGROUNDS=Object.freeze([
 {id:'bg_forest',name:'Floresta Mágica',asset:'bg-forest.webp',price:90,rarity:'Raro'},
 {id:'bg_ocean',name:'Praia Tropical',asset:'bg-beach.webp',price:100,rarity:'Raro'},
 {id:'bg_space',name:'Espaço Cósmico',asset:'bg-space.webp',price:110,rarity:'Épico'},
 {id:'bg_ice',name:'Terra do Gelo',asset:'bg-ice.webp',price:115,rarity:'Épico'},
 {id:'bg_clouds',name:'Céu das Nuvens Encantadas',asset:'bg-clouds.webp',price:125,rarity:'Épico'}
]);
const origin='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
export const backgroundUrl=item=>item?(item.id==='bg_clouds'?'/tq_f/beta/assets/bg-clouds.webp':origin+encodeURIComponent(item.asset)):'';
export const backgroundStatus=(profile,item)=>({owned:!!profile?.owned?.includes(item.id),equipped:profile?.equipped?.background===item.id});
export function acquireBackground(profile,id){
 if(id==='__default__'){profile.equipped.background=null;return {reason:'equipped'};}
 const item=BACKGROUNDS.find(x=>x.id===id);
 if(!item)return {reason:'not-found'};
 if(profile.equipped.background===id)return {reason:'already-equipped'};
 if(!profile.owned.includes(id)){
  if(profile.coins<item.price)return {reason:'insufficient-coins',missing:item.price-profile.coins};
  profile.coins-=item.price;
  profile.owned.push(id);
  profile.equipped.background=id;
  return {reason:'purchased'};
 }
 profile.equipped.background=id;
 return {reason:'equipped'};
}
