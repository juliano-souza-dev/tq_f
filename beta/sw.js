/* Tabuada Quest PWA: update online, preserve installed/offline access. */
const VERSION='tq-beta-magic-store-20261023';
const CORE=[
 './','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png',
 './styles/app.css','./styles/home.css','./styles/fashion-reference.css','./styles/backgrounds.css','./styles/store.css',
 './src/resources/asset-map.mjs','./src/core/progression.mjs','./src/core/profiles.mjs','./src/core/practice.mjs',
 './src/app/bootstrap.mjs','./src/app/app.mjs','./src/components/ui.mjs',
 './src/features/store/view.mjs','./src/features/store/catalog.mjs','./src/features/home/view.mjs','./src/features/home/effects.mjs',
 './src/features/backgrounds/view.mjs','./src/features/backgrounds/snow.mjs','./src/features/backgrounds/clouds.mjs',
 './src/features/backgrounds/forest.mjs','./src/features/backgrounds/ocean.mjs',
 './src/features/backgrounds/catalog.mjs','./src/features/backgrounds/cosmic.mjs','./src/features/backgrounds/effects.mjs',
 './src/features/profiles/view.mjs','./src/features/chests/inventory.mjs','./src/features/chests/view.mjs',
 './src/features/chests/catalog.mjs','./src/features/pets/view.mjs','./src/features/pets/catalog.mjs',
 './src/features/daily/view.mjs','./src/features/daily/catalog.mjs',
 './src/features/practice/scene-gl.mjs','./src/features/practice/view.mjs','./src/features/practice/fx.mjs',
 './src/features/worlds/view.mjs','./src/features/wardrobe/view.mjs',
 './src/features/wardrobe/fashion-catalog.json','./src/features/wardrobe/fashion.mjs'
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(VERSION).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('tq-beta-')&&key!==VERSION)await caches.delete(key);
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin||!url.pathname.startsWith(new URL('./',self.registration.scope).pathname))return;
 event.respondWith((async()=>{
  const cache=await caches.open(VERSION);
  try{
   const fresh=/\.(?:mjs|js|css|html)$/.test(url.pathname)||url.pathname.endsWith('/beta/');
   const response=await fetch(fresh?new Request(request,{cache:'no-store'}):request);
   if(response.ok)await cache.put(request,response.clone());
   return response;
  }catch(error){
   const stored=await cache.match(request,{ignoreSearch:true});
   if(stored)return stored;
   if(request.mode==='navigate')return (await cache.match('./index.html'))||Response.error();
   throw error;
  }
 })());
});
