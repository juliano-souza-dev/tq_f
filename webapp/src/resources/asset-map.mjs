/* Registro tipado de migração. Arquivos fora do lote mantêm referência original até serem migrados. */
const firstBatch = [
  'logo','header','jogar','worlds','chests','pets','collectibles',
  'daily','store','fundo','moda','items','next_chest','fashion_stage'
];
export const HOME_ARTWORK = Object.freeze(
  Object.fromEntries(firstBatch.map(name => [
    'home_new_'+name+'.png',
    './assets/optimized/home_new_'+name+'.webp'
  ]))
);
export function migratedAssetPath(source){
 const simple=String(source??'').split(/[?#]/,1)[0].split('/').at(-1);
 return HOME_ARTWORK[simple]??null;
}
export function assetIsMigrated(source){return migratedAssetPath(source)!==null;}
