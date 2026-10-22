// Original apoio effects adapted for the Beta practice lifecycle.
const raw='https://raw.githubusercontent.com/juliano-souza-dev/tq_f/apoio/apk-extraido/assets/';
export const SUCCESS_FX=Object.freeze([
 {id:'fx_magic',name:'Explosão de Magia',asset:'fx-success-gems.png'},
 {id:'fx_papai',name:'Papai Comemorando',asset:'papai-celebrate-02.png'}
]);
const villain=[
 ['vilao_erro_lottie/images/villain_error_01.png',0],
 ['vilao_erro_lottie/images/villain_error_02.png',200],
 ['vilao_erro_lottie/images/villain_error_03.png',400],
 ['vilao_erro_lottie/images/villain_error_04.png',633],
 ['vilao_erro_lottie/images/villain_error_05.png',933],
 ['vilao_erro_lottie/images/villain_error_06.png',1200]
];
const papai=[
 ['papai-celebrate-01.png','papai-celebrate-02.png','papai-celebrate-04.png'],
 ['papai-celebrate-05.png','papai-celebrate-06.png','papai-celebrate-08.png'],
 ['papai-celebrate-02.png','papai-celebrate-03.png','papai-celebrate-07.png']
];
export function equipSuccessFX(profile,id){
 if(!SUCCESS_FX.some(x=>x.id===id)||!profile.owned?.includes(id))return false;
 profile.equipped??={};profile.equipped.effect=id;return true;
}
export function playPracticeFX(host,good,equipped){
 if(!host)return ()=>{};
 host.querySelector('.practice-fx-layer')?.remove();
 const layer=host.ownerDocument.createElement('div');
 layer.className='practice-fx-layer '+(good?'success':'error');
 layer.setAttribute('aria-hidden','true');
 const image=host.ownerDocument.createElement('img');image.alt='';
 layer.append(image);host.append(layer);
 const scheduled=[];
 const step=(fn,delay)=>scheduled.push(setTimeout(()=>{if(layer.isConnected)fn()},delay));
 if(!good){
  image.src=raw+villain[0][0];
  villain.slice(1).forEach(([asset,at])=>step(()=>{image.src=raw+asset},at));
 }else if(equipped==='fx_papai'){
  const seq=papai[Math.floor(Math.random()*papai.length)];
  image.src=raw+seq[0];
  step(()=>image.src=raw+seq[1],350);
  step(()=>image.src=raw+seq[2],700);
 }else{
  image.src=raw+'fx-success-gems.png';
 }
 return ()=>{scheduled.forEach(clearTimeout);layer.remove()};
}
