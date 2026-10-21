/* Rode com: node tests/rewards.test.js */
'use strict';
const assert=require('node:assert/strict');
const R=require('../assets/rewards.js');
function child(done=[]){return {id:'teste',gold:0,gems:0,pets:[],done, mistakes:{}};}
// Não deve alterar o progresso escolar existente, nem saldo
const legacy=child(['0-0','0-1','0-2','0-3','0-4']);
legacy.gold=176;legacy.gems=5;legacy.pets=[0];
R.ensure(legacy);
assert.equal(legacy.gold,176);
assert.deepEqual(legacy.done,['0-0','0-1','0-2','0-3','0-4']);
assert.deepEqual(legacy.chests,['chest-0']);
assert.deepEqual(legacy.relics,['relic-0']);
assert.ok(legacy.inventory.includes('nilo'));
assert.ok(legacy.inventory.includes('pet-0'));
R.ensure(legacy);
assert.deepEqual(legacy.chests,['chest-0']);
const opened=R.openChest(legacy,'chest-0');
assert.equal(opened.ok,true);
assert.equal(opened.gold,40);
assert.equal(legacy.gold,216);
assert.ok(legacy.inventory.includes('sticker-0'));
assert.equal(R.openChest(legacy,'chest-0').ok,false);
R.ensure(legacy);
assert.equal(legacy.chests.length,0);
// Recompensas só a partir da fase finalizada e uma vez por fase
const p=R.ensure(child());
assert.deepEqual(R.grantStage(p,2,3),{chest:false,relic:false});
p.done.push('2-3');
assert.deepEqual(R.grantStage(p,2,3),{chest:true,relic:false});
assert.deepEqual(R.grantStage(p,2,3),{chest:false,relic:false});
assert.deepEqual(p.chests,['chest-2']);
p.done.push('2-4');
assert.deepEqual(R.grantStage(p,2,4),{chest:false,relic:true});
assert.deepEqual(R.grantStage(p,2,4),{chest:false,relic:false});
assert.deepEqual(p.relics,['relic-2']);
// Loja não dá acesso a compras sem saldo, e não repete cobranças
assert.equal(R.purchase(p,'capa-aventureira').ok,false);
p.gold=100;
assert.equal(R.purchase(p,'capa-aventureira').ok,true);
assert.equal(p.gold,10);
assert.equal(R.purchase(p,'capa-aventureira').ok,false);
assert.equal(p.gold,10);
assert.equal(R.equip(p,'tiara-estrelada').ok,false);
assert.equal(R.equip(p,'capa-aventureira').ok,true);
assert.equal(p.equipped.cosmetic,'capa-aventureira');
// Perfis independentes
const other=R.ensure(child());
assert.equal(other.inventory.includes('capa-aventureira'),false);
assert.equal(other.chests.length,0);
assert.equal(other.gold,0);
console.log('✓ Migração, baús, relíquias, idempotência, loja e isolamento de perfis');
