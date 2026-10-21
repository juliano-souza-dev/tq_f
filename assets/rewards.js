/* Expedição Tabuada — inventário determinístico, isolado do motor de ensino.
   Sem rede, sem sorteios pagos, sem atalhos para avançar nas tabuadas. */
(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.TQRewards = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const CATALOG = Object.freeze([
    {id:'capa-aventureira',name:'Capa da Aventureira',symbol:'🧥',rarity:'Raro',kind:'cosmetic',currency:'gold',price:90,description:'Uma capa para quem descobre novos caminhos.'},
    {id:'tiara-estrelada',name:'Tiara Estrelada',symbol:'👑',rarity:'Épico',kind:'cosmetic',currency:'gold',price:180,description:'Estrelinhas para iluminar a jornada.'},
    {id:'mochila-exploradora',name:'Mochila de Exploração',symbol:'🎒',rarity:'Raro',kind:'cosmetic',currency:'gold',price:130,description:'Guarda lembranças de cada capítulo.'},
    {id:'asas-arco-iris',name:'Asas do Atlas',symbol:'🦋',rarity:'Épico',kind:'cosmetic',currency:'gems',price:12,description:'O brilho dos céus, sem facilitar nenhuma conta.'}
  ]);
  function ensure(p) {
    if (!p || typeof p !== 'object') return p;
    p.done = Array.isArray(p.done) ? p.done : [];
    p.pets = Array.isArray(p.pets) ? p.pets : [];
    p.gold = Number.isFinite(p.gold) ? p.gold : 0;
    p.gems = Number.isFinite(p.gems) ? p.gems : 0;
    p.inventory = Array.isArray(p.inventory) ? p.inventory : [];
    if (!p.inventory.includes('nilo')) p.inventory.push('nilo');
    for (const r of p.pets) {const id='pet-'+r;if (Number.isInteger(r)&&r>=0&&r<12&&!p.inventory.includes(id))p.inventory.push(id);}
    p.equipped = p.equipped && typeof p.equipped==='object' ? p.equipped : {pet:'nilo',cosmetic:null};
    p.equipped.pet = p.equipped.pet || 'nilo';
    p.chests = Array.isArray(p.chests) ? p.chests : [];
    p.openedChests = Array.isArray(p.openedChests) ? p.openedChests : [];
    p.relics = Array.isArray(p.relics) ? p.relics : [];
    p.rewardLedger = Array.isArray(p.rewardLedger) ? p.rewardLedger : [];
    // Migrar fases previamente concluídas, preservando saldos e evitando duplicação.
    if (p.rewardsVersion !== 1) {
      for (let r=0;r<12;r++) {
        if (p.done.includes(r+'-3')) {
          const id='chest-'+r;
          if (!p.chests.includes(id) && !p.openedChests.includes(id)) p.chests.push(id);
          if (!p.rewardLedger.includes(r+'-3')) p.rewardLedger.push(r+'-3');
        }
        if (p.done.includes(r+'-4')) {
          const id='relic-'+r;
          if (!p.relics.includes(id)) p.relics.push(id);
          if (!p.rewardLedger.includes(r+'-4')) p.rewardLedger.push(r+'-4');
        }
      }
      p.rewardsVersion=1;
    }
    return p;
  }
  function grantStage(p,r,island) {
    ensure(p);
    const key=r+'-'+island;
    if (!p.done.includes(key) || p.rewardLedger.includes(key)) return {chest:false,relic:false};
    p.rewardLedger.push(key);
    let chest=false,relic=false;
    if (island===3) {
      const id='chest-'+r;
      if (!p.chests.includes(id) && !p.openedChests.includes(id)) {p.chests.push(id);chest=true;}
    }
    if (island===4) {
      const id='relic-'+r;
      if (!p.relics.includes(id)) {p.relics.push(id);relic=true;}
    }
    return {chest,relic};
  }
  function openChest(p,id) {
    ensure(p);
    const index=p.chests.indexOf(id);
    const match=/^chest-(\d{1,2})$/.exec(String(id));
    if (index<0 || !match || Number(match[1])>=12) return {ok:false,reason:'Baú indisponível.'};
    const region=Number(match[1]);
    p.chests.splice(index,1);
    p.openedChests.push(id);
    const gold=40+region*10;
    const gems=(region%3===2)?2:1;
    const sticker='sticker-'+region;
    p.gold+=gold;p.gems+=gems;
    if (!p.inventory.includes(sticker)) p.inventory.push(sticker);
    return {ok:true,gold,gems,sticker,region};
  }
  function purchase(p,id) {
    ensure(p);
    const item=CATALOG.find(x=>x.id===id);
    if (!item) return {ok:false,reason:'Item não encontrado.'};
    if (p.inventory.includes(id)) return {ok:false,reason:'Você já possui este item.'};
    if (p[item.currency]<item.price) return {ok:false,reason:'Junte mais '+(item.currency==='gold'?'moedas':'cristais')+' nas missões.'};
    p[item.currency]-=item.price;
    p.inventory.push(id);
    p.equipped.cosmetic=id;
    return {ok:true,item};
  }
  function equip(p,id) {
    ensure(p);
    if (!p.inventory.includes(id)) return {ok:false,reason:'Desbloqueie o item primeiro.'};
    const item=CATALOG.find(x=>x.id===id);
    if (item) p.equipped.cosmetic=id;
    else if (id==='nilo'||/^pet-\d{1,2}$/.test(id)) p.equipped.pet=id;
    else return {ok:false,reason:'Este item é apenas de coleção.'};
    return {ok:true};
  }
  return Object.freeze({CATALOG,ensure,grantStage,openChest,purchase,equip});
});
