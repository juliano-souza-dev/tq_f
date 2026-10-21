import {migratedAssetPath,HOME_ARTWORK} from '../src/resources/asset-map.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');

test('HTML isolado das folhas e do JavaScript da app',()=>{
 const html=read('index.html');
 assert.doesNotMatch(html,/<style\b/i);
 assert.doesNotMatch(html,/<script>(.|\n)*?<\/script>/i);
 assert.match(html,/href="\.\/styles\/legacy\.css"/);
 assert.match(html,/src="\.\/scripts\/legacy\.js"/);
 assert.match(html,/src="\.\/vendor\/lottie-data\.js"/);
 assert.match(html,/src="\.\/vendor\/lottie-light-5\.12\.2\.min\.js"/);
});

test('regras originais permanecem na camada de compatibilidade enquanto migramos',()=>{
 const js=read('scripts/legacy.js');
 for(const fn of ['profileDefaults','renderHome','renderWorlds','renderQuestion',
                   'startGame','answer','finishGame','renderPortalMap','renderPets']){
  assert.ok(js.includes('function '+fn+'('),'Função da fonte ausente: '+fn);
 }
 assert.match(js,/REVIEW_INTERVAL_DAYS/);
 assert.match(js,/localStorage/);
});

test('mapa de origem tem 100% dos arquivos da extração inicial',()=>{
 const rows=read('data/asset-inventory.csv').trim().split('\n');
 const metadata=JSON.parse(read('data/asset-inventory.summary.json'));
 assert.equal(rows.length-1,metadata.sourceFileCount);
 assert.equal(new Set(rows.slice(1).map(row=>row.split('","')[0])).size,metadata.sourceFileCount);
 assert.equal(metadata.sourceFileCount,1362);
 assert.equal(metadata.formatCounts.webp,95);
 assert.equal(metadata.formatCounts.png,1208);
});

test('cada migração exige entrada auditável de lote',()=>{
 const plan=JSON.parse(read('data/batches/001-home.json'));
 assert.equal(plan.items.length,14);
 assert.equal(new Set(plan.items.map(i=>i.source)).size,14);
 assert.ok(plan.items.every(i=>i.source.endsWith('.png')&&i.target.endsWith('.webp')));
 const resultPath=new URL('data/batches/001-home-results.json',root);
 if(fs.existsSync(resultPath)){
  const done=JSON.parse(read('data/batches/001-home-results.json'));
  assert.equal(done.processed,14);
  for(const i of done.items){
   assert.ok(fs.existsSync(new URL('assets/optimized/'+i.target,root)),i.target+' ausente');
   assert.ok(i.optimizedBytes>0);
  }
 }
});

test('registro modular resolve apenas o lote convertido sem afetar os demais recursos',()=>{
 assert.equal(Object.keys(HOME_ARTWORK).length,14);
 assert.equal(migratedAssetPath('home_new_logo.png'),'./assets/optimized/home_new_logo.webp');
 assert.equal(migratedAssetPath('/anywhere/home_new_jogar.png'),'./assets/optimized/home_new_jogar.webp');
 assert.equal(migratedAssetPath('pet30-01-idle_00.png'),null);
 const html=read('index.html');
 assert.match(html,/src="\.\/src\/app\/bootstrap\.mjs"/);
 for(const key of ['home_new_logo','home_new_jogar','home_new_worlds','home_new_chests']){
   assert.ok(html.includes(key+'.webp'),'Imagem WebP ainda não conectada ao HTML: '+key);
 }
});
