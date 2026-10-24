const FAMILIES=Object.freeze([
 {key:'alana',name:'Alana',avatar:'luna',color:'lilac'},
 {key:'thais',name:'Thaís',avatar:'sofia',color:'rose'},
 {key:'heloisa',name:'Heloísa',avatar:'maya',color:'aqua'}
]);
const STORAGE_KEY='tabuadaquest.webapp.v1';
const LEGACY_KEY='tabuadaquest.v0.1';
const copy=x=>JSON.parse(JSON.stringify(x));
const same=(a,b)=>String(a??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim()===String(b??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const number=(v,fallback=0)=>Number.isFinite(Number(v))?Number(v):fallback;
export {FAMILIES,STORAGE_KEY,LEGACY_KEY};

export function makeProfile(family,id){
 return {
  id,name:family.name,coins:0,gems:0,xp:0,
  owned:['fx_magic','fx_papai'],fashionOwned:['original'],quantities:{},
  equipped:{frame:null,background:null,effect:'fx_papai'},
  avatar:{id:family.avatar,skinId:'original'},
  flags:{familyEntry:true},stats:{correct:0,wrong:0,sessions:0,chestsClaimed:0,masteredDecks:{}},
  learning:{tables:Object.fromEntries(Array.from({length:10},(_,i)=>[String(i+1),{}]))},
  pets:{},history:[]
 };
}
function normalizeProfile(p,family,createId){
 const base=makeProfile(family,createId());
 const tables={...base.learning.tables,...p.learning?.tables};
 const pets=p.pets&&typeof p.pets==='object'?{...p.pets}:{};
 const flags={...base.flags,...p.flags};
 if(!flags.pets30Migrated){
  for(const [id,table] of [[1,3],[2,7],[3,10]]){
   if(!pets[String(id)]&&Number(tables[String(table)]?.masteredAt)>0)
    pets[String(id)]={rescued:true,rescuedAt:null,legacy:true,portal:1,table};
  }
  flags.pets30Migrated=true;
 }
 flags.petRescueSeen=flags.petRescueSeen||{};
 // Corrige somente os perfis ainda intocados que herdaram o saldo
 // de demonstração antigo (10.000 moedas / 45 rubis).
 const wasDemoSeed=number(p.coins)===10000&&number(p.gems)===45
  &&number(p.xp)===0&&number(p.stats?.sessions)===0
  &&!Object.values(tables).some(t=>Number(t?.masteredAt)>0)
  &&(!Array.isArray(p.history)||p.history.length===0)
  &&(p.owned||[]).every(id=>['fx_magic','fx_papai'].includes(id));
 if(wasDemoSeed){p={...p,coins:0,gems:0};}


 // Versões anteriores do APK guardavam conquistas em stats.masteredDecks.
 // Se ainda não houver a marca mais nova, preservamos o fato já dominado.
 for(const [id,entry] of Object.entries(p.stats?.masteredDecks||{})){
  if(!tables[id]?.masteredAt && Number(entry?.at)>0){
    tables[id]={...tables[id],masteredAt:Number(entry.at),reviewStage:0,
     reviewCount:0,nextReviewAt:Number(entry.at),lapses:0};
  }
 }
 return {...base,...p,name:family.name,
  avatar:{...base.avatar,...p.avatar,id:family.avatar},
  equipped:{...base.equipped,...p.equipped},
  flags,pets,
  stats:{...base.stats,...p.stats,masteredDecks:{...base.stats.masteredDecks,...p.stats?.masteredDecks}},
  learning:{...base.learning,...p.learning,tables},
  history:Array.isArray(p.history)?p.history:[],
  coins:number(p.coins,0),gems:number(p.gems,0),xp:number(p.xp)
 };
}
export function createProfileStore({storage,now=()=>Date.now(),random=Math.random}={}){
 if(!storage)throw Error('storage obrigatório');
 let seq=0;
 const makeId=()=>`tw_${now()}_${++seq}_${Math.floor(random()*1e6)}`;
 const safeParse=(key)=>{try{return JSON.parse(storage.getItem(key)||'null')}catch{return null}};
 let state=safeParse(STORAGE_KEY);
 const legacy=safeParse(LEGACY_KEY);
 const original=(!state||!Array.isArray(state.profiles))&&legacy&&Array.isArray(legacy.profiles)?legacy:null;
 if(!state||!Array.isArray(state.profiles)) state=original?copy(original):{profiles:[],activeId:null};
 state.profiles=state.profiles.filter(x=>x&&typeof x==='object');
 for(const family of FAMILIES){
   const index=state.profiles.findIndex(p=>same(p.name,family.name));
   if(index<0)state.profiles.push(makeProfile(family,makeId()));
   else state.profiles[index]=normalizeProfile(state.profiles[index],family,makeId);
 }
 const snapshot=()=>copy(state);
 const save=()=>{
  try{storage.setItem(STORAGE_KEY,JSON.stringify(state));return true}
  catch{return false}
 };
 save();
 return {
  snapshot,
  active:()=>copy(state.profiles.find(p=>p.id===state.activeId)||null),
  profiles:()=>FAMILIES.map(f=>copy(state.profiles.find(p=>same(f.name,p.name)))),
  select(key){
   const family=FAMILIES.find(f=>f.key===key);if(!family)return false;
   const target=state.profiles.find(p=>same(p.name,family.name));
   if(!target)return false;
   state.activeId=target.id;save();return true;
  },
  updateActive(mutator){
   const idx=state.profiles.findIndex(p=>p.id===state.activeId);
   if(idx<0)throw Error('Perfil ativo não selecionado');
   const next=copy(state.profiles[idx]);mutator(next);
   state.profiles[idx]=next;save();return copy(next);
  },
  source:()=>original?'legacy-copy':(!legacy?'fresh':'webapp-existing')
 };
}
