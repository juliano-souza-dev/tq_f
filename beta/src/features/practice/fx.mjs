// Practice FX adapted from apoio. Only equipped/owned success effects are selectable.
// The failure animation is shared; results never depend on rendering availability.
const raw='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
export const SUCCESS_FX=Object.freeze([
 {id:'fx_magic',name:'Explosão de Magia',asset:'fx-success-gems.png'},
 {id:'fx_papai',name:'Papai Comemorando',asset:'papai-celebrate-02.png'}
]);
export function equipSuccessFX(profile,id){
 if(!SUCCESS_FX.some(x=>x.id===id)||!profile.owned?.includes(id))return false;
 profile.equipped??={};profile.equipped.effect=id;return true;
}
export function playPracticeFX(host,good,equipped){
 if(!host)return ()=>{};
 host.querySelector('.practice-fx-layer')?.remove();
 const layer=host.ownerDocument.createElement('div');
 const valid=good?SUCCESS_FX.find(x=>x.id===equipped)||SUCCESS_FX[0]:null;
 const asset=good?valid.asset:'fx-error-broken.png';
 layer.className='practice-fx-layer '+(good?'success':'error');
 layer.setAttribute('aria-hidden','true');
 const image=host.ownerDocument.createElement('img');
 image.src=raw+asset;image.alt='';
 layer.append(image);
 host.append(layer);
 const cleanup=()=>layer.remove();
 return cleanup;
}
