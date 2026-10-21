#!/usr/bin/env node
// Atualiza o mapa de migração após um lote verificado por script, nunca por suposição.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const input=path.resolve(root,process.argv[2]||'webapp/data/batches/001-home-results.json');
const report=JSON.parse(fs.readFileSync(input,'utf8'));
const file=path.resolve(root,'webapp/data/asset-inventory.csv');
const text=fs.readFileSync(file,'utf8');
const lines=text.trimEnd().split('\n'),header=lines.shift();
const names=new Set(report.items.map(i=>i.source));
let count=0;
const output=[header,...lines.map(line=>{
 // Cada linha é CSV delimitado e todos os campos são aspados.
 const parts=line.slice(1,-1).split('","');
 if(names.has(parts[0])){
   parts[7]='importado_'+report.batch;
   count++;
 }
 return parts.map(v=>'"'+v.replaceAll('"','""')+'"').join(',');
})];
if(count!==report.items.length)throw Error('Falta no inventário: '+count+'/'+report.items.length);
fs.writeFileSync(file,output.join('\n')+'\n');
console.log('Importação atualizada no inventário:',count,'arquivos do lote',report.batch);
