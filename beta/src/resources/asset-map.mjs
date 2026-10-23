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
 'world_map_bg.webp','world_map_new.webp',
 'avatar-luna-pirate.webp','avatar-sofia-pirate.webp','avatar-maya-pirate.webp',
 'frame-star.webp','frame-floral.webp','frame-champion.webp','frame-rainbow.webp',
 'avatar-luna-pirata1.webp','avatar-luna-navigator2.webp','avatar-luna-inventor3.webp','avatar-luna-coelhinha.webp','avatar-luna-havaiana.webp','avatar-luna-lbug.webp','avatar-luna-penelope.webp','avatar-sofia-pirata1.webp','avatar-sofia-navigator2.webp','avatar-sofia-inventor3.webp','avatar-sofia-coelhinha.webp','avatar-sofia-havaiana.webp','avatar-sofia-lbug.webp','avatar-sofia-penelope.webp','avatar-sofia-panda-infinity-01.webp','avatar-sofia-panda-infinity-02.webp','avatar-sofia-panda-infinity-03.webp','avatar-sofia-panda-infinity-04.webp','avatar-sofia-panda-infinity-05.webp','avatar-maya-pirata1.webp','avatar-maya-navigator2.webp','avatar-maya-inventor3.webp','avatar-maya-coelhinha.webp','avatar-maya-havaiana.webp','avatar-maya-lbug.webp','avatar-maya-penelope.webp'];
export const AVAILABLE_ASSETS=new Set(converted);
export function assetUrl(name){
 if(!AVAILABLE_ASSETS.has(name))throw Error('Asset fora dos lotes migrados: '+name);
 return './assets/optimized/'+name+'?dev='+(globalThis.__TQ_DEV_VERSION__||Date.now());
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

/* O APK guarda moda em avatar.skinId e moldura em equipped.frame.
   Respeitamos IDs equipados. Nunca atribuimos itens pagos automaticamente. */
const FRAME_FILES=Object.freeze({
 frame_star:'frame-star.webp',frame_floral:'frame-floral.webp',
 frame_champion:'frame-champion.webp',frame_rainbow:'frame-rainbow.webp'
});
const LEGACY_CHEST_FRAME_ASSETS={"chest_frame_secret":"frame-secret-royal.png","chest_frame_astral_lotus":"chest-frame-astral-lotus.png","chest_frame_tide_dragon":"chest-frame-tide-dragon.png","chest_frame_crimson_eclipse":"chest-frame-crimson-eclipse.png","chest_frame_celestial_crystal":"chest-frame-celestial-crystal.png","chest_frame_pirate_golden_nautical":"chest-frame-pirate-golden-nautical.png","chest_frame_pirate_fantastic_treasures":"chest-frame-pirate-fantastic-treasures.png","chest_frame_pirate_treasure":"chest-frame-pirate-treasure.png","chest_frame_pirate_waves_gems":"chest-frame-pirate-waves-gems.png"};
export function equippedFrameUrl(profile){
 const id=profile?.equipped?.frame;
 if(!id || !profile?.owned?.includes(id))return null;
 if(FRAME_FILES[id])return assetUrl(FRAME_FILES[id]);
 const file=LEGACY_CHEST_FRAME_ASSETS[id];
 return file?'https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/'+encodeURIComponent(file):null;
}
export function fashionAssetUrl(avatar,skin='original'){
 const original=avatarUrl(avatar);
 if(skin==='original')return original;
 const names={pirate:'pirate',pirata1:'pirata1',navigator2:'navigator2',inventor3:'inventor3',coelhinha:'coelhinha',havaiana:'havaiana',lbug:'lbug',penelope:'penelope',
 panda_infinity_01:'panda-infinity-01',panda_infinity_02:'panda-infinity-02',panda_infinity_03:'panda-infinity-03',panda_infinity_04:'panda-infinity-04',panda_infinity_05:'panda-infinity-05'};
 const suffix=names[skin];
 const file=avatar&&suffix?'avatar-'+avatar+'-'+suffix+'.webp':null;
 return file&&AVAILABLE_ASSETS.has(file)?assetUrl(file):original;
}
export function equippedAvatarUrl(profile){
 const id=profile?.avatar?.id||'luna';
 const skin=profile?.avatar?.skinId||'original';
 if(skin!=='original'&&!profile?.fashionOwned?.includes(skin))return avatarUrl(id);
 return fashionAssetUrl(id,skin);
}
