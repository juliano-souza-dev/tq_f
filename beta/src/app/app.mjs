import {createProfileStore} from '../core/profiles.mjs';
import {WORLDS,worldState} from '../core/progression.mjs';
import {createPractice,answerPractice,nextPractice,finishPractice} from '../core/practice.mjs';
import {profilesScreen} from '../features/profiles/view.mjs';
import {wardrobeScreen,availableFrames} from '../features/wardrobe/view.mjs';
import {acquireFashion} from '../features/wardrobe/fashion.mjs';
import {homeScreen} from '../features/home/view.mjs';
import {backgroundsScreen} from '../features/backgrounds/view.mjs';
import {acquireBackground} from '../features/backgrounds/catalog.mjs';
import {mountHomeEffects} from '../features/home/effects.mjs';
import {mountBackgroundEffect} from '../features/backgrounds/effects.mjs';
import {mountSnowEffect} from '../features/backgrounds/snow.mjs';
import {mountCosmicEffect} from '../features/backgrounds/cosmic.mjs';
import {mountForestEffect} from '../features/backgrounds/forest.mjs';
import {mountOceanEffect} from '../features/backgrounds/ocean.mjs';
import {worldsScreen} from '../features/worlds/view.mjs';
import {practiceScreen,winScreen,featureScreen} from '../features/practice/view.mjs';

export function createApp({root,storage,now=()=>Date.now(),random=Math.random}){
 if(!root)throw Error('Raiz DOM obrigatória');
 const profiles=createProfileStore({storage,now,random});
 let screen=profiles.active()?'home':'profiles';
 let selectedPlayer=null;
 let selectedWorld=1;
 let session=null;
 let result=null;
 let feature='';
 let fashionNotice='';
 let wardrobeSelection=null;
 let wardrobeTab='fashion';
 let selectedBackground=null;
 let backgroundNotice='';
 let stopHomeEffects=null;

 function pickAvailableWorld(profile){
  const choice=WORLDS.find(w=>worldState(profile,w.number,now()).enabled);
  return choice?.number||1;
 }
 function navigate(next){
  screen=next;
  render();
  if(typeof window!=='undefined'&&typeof window.scrollTo==='function')window.scrollTo(0,0);
 }
 function render(){
  stopHomeEffects?.();stopHomeEffects=null;
  const player=profiles.active();
  try{
   switch(screen){
    case 'profiles':
      root.innerHTML=profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'wardrobe':
      root.innerHTML=player?wardrobeScreen(player,fashionNotice,wardrobeSelection,wardrobeTab):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'backgrounds':
      root.innerHTML=player?backgroundsScreen(player,selectedBackground,backgroundNotice):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'home':
      root.innerHTML=player?homeScreen(player):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'worlds':
      root.innerHTML=player?worldsScreen(player,selectedWorld,now()):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'practice':
      root.innerHTML=player&&session?practiceScreen(player,session):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'win':
      root.innerHTML=player&&result?winScreen(player,result):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'feature':
      root.innerHTML=player?featureScreen(player,feature):profilesScreen(profiles.profiles(),selectedPlayer);break;
    default:throw Error('Tela desconhecida: '+screen);
   }
   if(screen==='home'&&player&&typeof window!=='undefined'){
     const bg=player.owned?.includes(player.equipped?.background)?player.equipped.background:null;
     stopHomeEffects=bg==='bg_ocean'?mountOceanEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_ice'?mountSnowEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_space'?mountCosmicEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_forest'?mountForestEffect(root.querySelector('.home-view'),{windowRef:window}):bg?mountBackgroundEffect(root.querySelector('.home-view'),bg,{windowRef:window}):mountHomeEffects({root,windowRef:window});
   }
   if(screen==='backgrounds'&&player&&typeof window!=='undefined'){
     const id=selectedBackground||player.equipped?.background||'bg_forest';
     stopHomeEffects=id==='bg_ocean'?mountOceanEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_ice'?mountSnowEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_space'?mountCosmicEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_forest'?mountForestEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):mountBackgroundEffect(root.querySelector('.bg-feature-art'),id,{windowRef:window,preview:true});
   }
  }catch(e){
   console.error('Falha ao renderizar:',e);
   root.textContent='Não foi possível carregar esta tela. Recarregue a página para tentar novamente.';
  }
 }
 function startWorld(n){
  const player=profiles.active();if(!player)return navigate('profiles');
  const state=worldState(player,n,now());if(!state.enabled)return;
  selectedWorld=n;
  session=createPractice(n,state.id==='due'?'review':'learn',random,now());
  navigate('practice');
 }
 function submitAnswer(value){
  if(screen!=='practice'||!session||session.answered)return;
  profiles.updateActive(player=>answerPractice(session,player,value));
  render();
 }
 function afterAnswer(){
  if(screen!=='practice'||!session||!session.answered)return;
  if(session.queue.length===0){
   profiles.updateActive(player=>{result=finishPractice(session,player,now());});
   session=null;
   navigate('win');
  }else{
   nextPractice(session,random);
   render();
  }
 }
 function act(action,dataset={}){
  switch(action){
   case 'profiles':selectedPlayer=null;session=null;navigate('profiles');break;
   case 'selectPlayer':selectedPlayer=dataset.player||null;render();break;
   case 'enter':
     if(!selectedPlayer||!profiles.select(selectedPlayer))return;
     selectedWorld=pickAvailableWorld(profiles.active());navigate('home');break;
   case 'home':session=null;navigate('home');break;
   case 'worlds':session=null;selectedWorld=pickAvailableWorld(profiles.active());navigate('worlds');break;
   case 'selectWorld':{
     const id=Number(dataset.world);
     if(!Number.isInteger(id)||id<1||id>10)return;
     selectedWorld=id;render();break;
   }
   case 'startWorld':startWorld(Number(dataset.world));break;
   case 'answer':submitAnswer(Number(dataset.answer));break;
   case 'nextQuestion':afterAnswer();break;
   case 'leavePractice':session=null;navigate('worlds');break;
   case 'openFeature':
     feature=String(dataset.feature||'Em desenvolvimento');
     if(feature==='Fundos'||feature==='Baú de itens'){selectedBackground=null;backgroundNotice='';navigate('backgrounds');}
     else if(feature==='Moda'){fashionNotice='';wardrobeSelection=null;wardrobeTab='fashion';navigate('wardrobe');}
     else navigate('feature');
     break;
   case 'previewBackground':selectedBackground=String(dataset.background||'');backgroundNotice='';render();break;
   case 'backgroundAction':{
     const id=String(dataset.background||'');
     let result;
     profiles.updateActive(p=>{result=acquireBackground(p,id)});
     selectedBackground=id;
     backgroundNotice=result?.reason==='insufficient-coins'?'Faltam '+result.missing+' moedas.':result?.reason==='purchased'?'Novo fundo desbloqueado e equipado!':result?.reason==='equipped'?'Fundo equipado!':'';
     render();break;
   }
   case 'previewFashion':
     wardrobeSelection=String(dataset.skin||'original');fashionNotice='';render();break;
   case 'fashionHelp':
     fashionNotice='Roupas são obtidas com moedas, baús, conquistas e recompensas diárias.';render();break;
   case 'wardrobeTab':
     wardrobeTab=dataset.tab==='frames'?'frames':'fashion';render();break;
   case 'equipFashion':
   case 'fashionAction': {
     const player=profiles.active();
     if(!player)break;
     const id=String(dataset.skin||'original');
     wardrobeSelection=id;
     let result;
     profiles.updateActive(p=>{result=acquireFashion(p,id)});
     fashionNotice=result?.reason==='insufficient-coins'?'Faltam '+result.missing+' moedas para este visual.':result?.reason==='reward-only'?'Este visual é exclusivo de recompensas.':result?.reason==='purchased'?'Nova roupa desbloqueada e equipada!':result?.reason==='equipped'?'Visual equipado!':'';
     render();break;
   }
   case 'equipFrame': {
     const player=profiles.active();
     const id=String(dataset.frame||'')||null;
     if(!player||!availableFrames(player).some(x=>x.id===id))break;
     profiles.updateActive(p=>{p.equipped.frame=id;});render();break;
   }
  }
 }
 const onClick=event=>{
  const target=event.target.closest('[data-action]');
  if(!target||!root.contains(target)||target.disabled)return;
  event.preventDefault();
  act(target.dataset.action,target.dataset);
 };
 const onKeydown=event=>{
  if(screen==='practice'&&session&&!session.answered){
   const n=Number(event.key);
   if(Number.isInteger(n)&&n>=1&&n<=4){
    event.preventDefault();submitAnswer(session.choices[n-1]);
   }
  }
  if(event.key==='Escape'&&screen==='practice'){
   event.preventDefault();act('leavePractice');
  }
 };
 root.addEventListener('click',onClick);
 if(typeof window!=='undefined')window.addEventListener('keydown',onKeydown);
 render();
 return {
  getScreen:()=>screen,
  getPlayer:()=>profiles.active(),
  getSession:()=>session,
  getSelectedWorld:()=>selectedWorld,
  act,
  destroy(){
   stopHomeEffects?.();stopHomeEffects=null;
   root.removeEventListener('click',onClick);
   if(typeof window!=='undefined')window.removeEventListener('keydown',onKeydown);
  }
 };
}
if(typeof document!=='undefined'){
 const root=document.getElementById('app');
 if(root)createApp({root,storage:window.localStorage});
}
