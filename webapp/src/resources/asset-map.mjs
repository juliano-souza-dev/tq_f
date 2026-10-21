/* Manifesto de arte. Somente arquivos convertidos e registrados em lotes. */
export const BATCH_001=Object.freeze([
 'home_new_logo','home_new_header','home_new_jogar','home_new_worlds',
 'home_new_chests','home_new_pets','home_new_collectibles','home_new_daily',
 'home_new_store','home_new_fundo','home_new_moda','home_new_items',
 'home_new_next_chest','home_new_fashion_stage'
]);
const converted=[...BATCH_001.map(n=>n+'.webp'),
 'avatar-luna-neutral-base.webp','avatar-sofia-neutral-base.webp',
 'avatar-maya-neutral-base.webp','world-practice-01.webp',
 ...Array.from({length:10},(_,i)=>'world_map_'+String(i+1).padStart(2,'0')+'.webp'),
 'world_map_bg.webp',
 'avatar-luna-pirate.webp','avatar-sofia-pirate.webp','avatar-maya-pirate.webp'];
export const AVAILABLE_ASSETS=new Set(converted);
export function assetUrl(name){
 if(!AVAILABLE_ASSETS.has(name))throw Error('Asset fora dos lotes migrados: '+name);
 return './assets/optimized/'+name;
}
export const HOME_ARTWORK=Object.freeze(Object.fromEntries(
 BATCH_001.map(n=>[n+'.png',assetUrl(n+'.webp')])
));
export function migratedAssetPath(source){
 const simple=String(source??'').split(/[?#]/,1)[0].split('/').at(-1);
 return HOME_ARTWORK[simple]??null;
}
export function avatarUrl(avatar){
 const map={luna:'avatar-luna-neutral-base.webp',sofia:'avatar-sofia-neutral-base.webp',maya:'avatar-maya-neutral-base.webp'};
 return assetUrl(map[avatar]||map.luna);
}
export function worldUrl(number){
 if(!Number.isInteger(number)||number<1||number>10)throw Error('Mundo inválido');
 return assetUrl('world_map_'+String(number).padStart(2,'0')+'.webp');
}

export function homeCharacterUrl(avatar){
 const options={luna:'avatar-luna-pirate.webp',sofia:'avatar-sofia-pirate.webp',maya:'avatar-maya-pirate.webp'};
 return assetUrl(options[avatar]||options.luna);
}
