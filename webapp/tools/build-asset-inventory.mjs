#!/usr/bin/env node
// Inventário reproduzível da árvore original. Não carrega nem executa o jogo.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const source=path.resolve(process.argv[2]||path.join(here,'../../apk-extraido/assets'));
const dest=path.resolve(process.argv[3]||path.join(here,'../data/asset-inventory.csv'));
const html=fs.readFileSync(path.join(source,'index.html'),'utf8');
const lottieData=fs.readFileSync(path.join(source,'lottie-data.js'),'utf8');
const references=html+'\n'+lottieData;
const paths=[];
function walk(dir,prefix=''){
 for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
  const rel=prefix+entry.name;
  if(entry.isDirectory())walk(path.join(dir,entry.name),rel+'/');
  else if(entry.isFile())paths.push({path:rel,bytes:fs.statSync(path.join(dir,entry.name)).size});
 }
}
walk(source);
const fileCategories=[
 [/^pet30-\d{2}-(?:happy|idle|jump|special)_\d{2}\.png$/,'pet-frame','gerado: petFrames()'],
 [/^pet30-\d{2}-idle-lottie\.json$/,'pet-lottie','candidato: lottie-data.js'],
 [/^(?:villain|chest-[a-z0-9]+)-frame-\d+\.webp$/,'animation-frame','gerado: chestSpriteFrames()/villainFrames()'],
 [/^avatar-(?:sofia|luna|maya)-/,'avatar-skin','gerado: avatarAsset()'],
 [/^world_map_\d+\.webp$/,'world-map','WORLD_META'],
 [/^portal-world-\d+-map\.png$/,'portal-map','PORTAL_MAPS'],
 [/^world-practice-\d+\.png$/,'practice-background','WORLD_META']
];
function classify(file){
 const name=path.basename(file.path),ext=path.extname(name).toLowerCase().slice(1);
 const group=fileCategories.find(([re])=>re.test(name));
 const direct=references.includes(name);
 const usage=direct?'referencia_explicita':group?'referencia_dinamica_ou_derivada':'nao_identificado';
 const evidence=direct?'index.html ou lottie-data.js':group?group[2]:'revisao_manual_necessaria';
 let treatment='preservar_codigo_ou_dados';
 if(ext==='png'||ext==='jpg'||ext==='jpeg')treatment='converter_webp_em_lote';
 if(ext==='webp')treatment=file.bytes <= 250*1024?'webp_ja_pequeno_validar_visual':'reavaliar_tamanho_webp';
 if(ext==='svg')treatment='preservar_svg_vetorial';
 if(ext==='json')treatment='preservar_json_lottie';
 const category=group?.[1]||(ext==='html'||ext==='js'?'codigo':ext==='json'?'animation-data':ext==='svg'?'vector':'other');
 return {...file,extension:ext,category,usage,evidence,treatment,migration:'nao_importado'};
}
const catalog=paths.sort((a,b)=>a.path.localeCompare(b.path,'en')).map(classify);
const escape=v=>'"'+String(v).replaceAll('"','""')+'"';
const keys=['path','bytes','extension','category','usage','evidence','treatment','migration'];
fs.mkdirSync(path.dirname(dest),{recursive:true});
fs.writeFileSync(dest,[keys.join(','),...catalog.map(f=>keys.map(k=>escape(f[k])).join(','))].join('\n')+'\n');
const counts=(name)=>Object.fromEntries([...new Set(catalog.map(f=>f[name]))].map(k=>[k,catalog.filter(f=>f[name]===k).length]));
const summary={generatedFrom:'apoio/apk-extraido/assets',fileCount:catalog.length,totalBytes:catalog.reduce((a,f)=>a+f.bytes,0),usage:counts('usage'),treatment:counts('treatment'),extension:counts('extension'),note:'Não identificado significa sem evidência na análise estática. Não é prova de que o asset não seja usado.'};
fs.writeFileSync(dest.replace(/\.csv$/i,'.summary.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify(summary,null,2));
