import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const root=new URL('../',import.meta.url);
const read=file=>fs.readFileSync(new URL(file,root),'utf8');

test('nova entrada sem HTML com CSS ou lógica embutidos',()=>{
 const html=read('index.html');
 assert.doesNotMatch(html,/<style\b|<script>(.|\n)*?<\/script>|\bonclick\s*=|\bstyle\s*=/i);
 assert.match(html,/href="\.\/styles\/app\.css"/);
 assert.match(html,/src="\.\/src\/app\/app\.mjs"/);
 assert.doesNotMatch(html,/legacy\.js|legacy\.css/);
 assert.ok(read('styles/app.css').length>10000);
});
test('camada antiga arquivada, regras originais ainda disponíveis como referência',()=>{
 assert.ok(read('legacy/entry.html').includes('entryGate'));
 const js=read('scripts/legacy.js');
 for(const n of ['profileDefaults','renderWorlds','renderQuestion','startGame','finishGame','renderPets'])
  assert.ok(js.includes('function '+n+'('),n);
});
test('inventário preserva todos os 1362 arquivos extraídos',()=>{
 const rows=read('data/asset-inventory.csv').trim().split('\n');
 assert.equal(rows.length,1363);
 const summary=JSON.parse(read('data/asset-inventory.summary.json'));
 assert.equal(summary.sourceFileCount,1362);
 assert.equal(summary.formatCounts.png,1208);
 assert.equal(summary.formatCounts.webp,95);
});
test('29 recursos migrados dos dois primeiros lotes e registrados',()=>{
 const plans=['001-home','002-profiles-worlds'];
 let total=0;
 for(const id of plans){
  const manifest=JSON.parse(read('data/batches/'+id+'.json'));
  const results=JSON.parse(read('data/batches/'+id+'-results.json'));
  assert.equal(results.processed,manifest.items.length);
  for(const file of results.items){
   total++;
   const dest=new URL('assets/optimized/'+file.target,root);
   assert.ok(fs.existsSync(dest),'Arquivo ausente: '+file.target);
   assert.ok(file.optimizedBytes>0);
  }
 }
 assert.equal(total,29);
 const csv=read('data/asset-inventory.csv');
 assert.match(csv,/importado_001-home/);
 assert.match(csv,/importado_002-profiles-worlds/);
});
test('módulos isolados e interface sem eventos inline',()=>{
 const featureFiles=[
 'src/core/profiles.mjs','src/core/progression.mjs','src/core/practice.mjs',
 'src/features/profiles/view.mjs','src/features/home/view.mjs',
 'src/features/worlds/view.mjs','src/features/practice/view.mjs','src/app/app.mjs'
 ];
 for(const p of featureFiles)assert.ok(read(p).length>100,p);
 for(const p of featureFiles.filter(x=>x.includes('view.mjs')))
  assert.doesNotMatch(read(p),/\bonclick\s*=|\bstyle\s*=/i,p);
});
