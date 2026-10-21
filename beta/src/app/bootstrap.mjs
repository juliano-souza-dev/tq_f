import {migratedAssetPath} from '../resources/asset-map.mjs';

// Ponte temporária de compatibilidade para views ainda emitidas pelo legado.
// Novas telas devem importar o registro diretamente, sem depender do observer.
function upgradeImage(image){
  if(!(image instanceof HTMLImageElement))return;
  const original=image.getAttribute('src');
  const target=migratedAssetPath(original);
  if(!target || original===target)return;
  image.src=new URL(target,document.baseURI).href;
  image.decoding='async';
  if(!/home_new_(logo|header|jogar)\.png$/.test(original)){
    image.loading='lazy';
  }
}
function upgradeTree(node){
 if(node instanceof HTMLImageElement)upgradeImage(node);
 if(node instanceof Element)node.querySelectorAll('img').forEach(upgradeImage);
}
upgradeTree(document.documentElement);
const observer=new MutationObserver(records=>{
 for(const record of records){
  if(record.type==='attributes')upgradeImage(record.target);
  for(const child of record.addedNodes)upgradeTree(child);
 }
});
observer.observe(document.documentElement,{
  subtree:true,childList:true,attributes:true,attributeFilter:['src']
});
