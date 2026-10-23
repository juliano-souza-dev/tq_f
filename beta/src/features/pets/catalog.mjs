// Port of the PETS v0.9.3.9 / rescue v0.9.4.0 definitions in apoio.
export const PET_NAMES=Object.freeze(['Axolote Pirata','Coelho Aquático','Kirin Celestial','Manta Celestial','Coruja-Lagarto','Koi Dragão de Fogo','Yokai Planador','Camaleão da Floresta','Ouriço Cristalino','Pangolim Fênix','Tanuki Místico','Tartaruga Samurai','Pet Alquimista','Oráculo Octópode','Cavalinho-Marinho Elétrico','Guardião Besouro','Alpaca Celestial','Lontra Celestial','Tamanduá Xamã','Capivara Lunar','Arara Solar','Narval Imperial','Pavão Astral','Preguiça Relíquia','Quokka Celestial','Louva-a-Deus Sagrada','Caranguejo do Tesouro','Libélula de Cristal','Foca Aurora','Tatu Solar']);
export const PETS=Object.freeze(Array.from({length:10},(_,portal)=>[3,7,10].map((table,slot)=>{
 const spriteId=table===10?21+portal:portal*2+slot+1;
 const rescueTable=portal===9&&slot===2?9:table;
 return Object.freeze({id:portal*3+slot+1,portal:portal+1,table:rescueTable,spriteId,name:PET_NAMES[spriteId-1],title:slot===2?'Lendário':slot===0?'Mágico':'Raro',desc:'Companheiro resgatado no Portal '+(portal+1)+', ao dominar o mapa '+rescueTable+'.'});
})).flat());
const base='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
export const petImage=filename=>base+encodeURIComponent(filename);
export function petFrames(pet,animation='idle'){const sprite=pet?.spriteId||1;return Array.from({length:8},(_,i)=>petImage('pet30-'+String(sprite).padStart(2,'0')+'-'+animation+'_'+String(i).padStart(2,'0')+'.png'))}
export const rescued=(profile,pet)=>!!profile?.pets?.[String(pet.id)]?.rescued;
export const petsSaved=profile=>PETS.filter(pet=>rescued(profile,pet)).length;
export function grantPetForTable(profile,table,portal=1,now=Date.now()){
 const pet=PETS.find(p=>p.portal===portal&&p.table===table);
 if(!pet||rescued(profile,pet))return null;
 profile.pets??={};profile.flags??={};profile.flags.petRescueSeen??={};
 profile.pets[String(pet.id)]={rescued:true,rescuedAt:now,portal,table};
 if(!profile.flags.petRescueSeen[String(pet.id)])profile.flags.petRescuePending=pet.id;
 return pet;
}
