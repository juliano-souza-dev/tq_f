import {createProfileStore} from '../core/profiles.mjs';
import {WORLDS,worldState} from '../core/progression.mjs';
import {createPractice,answerPractice,nextPractice,finishPractice} from '../core/practice.mjs';
import {profilesScreen} from '../features/profiles/view.mjs';
import {wardrobeScreen,availableFrames} from '../features/wardrobe/view.mjs';
import {acquireFashion} from '../features/wardrobe/fashion.mjs';
import {homeScreen} from '../features/home/view.mjs';
import {backgroundsScreen} from '../features/backgrounds/view.mjs';
import {BACKGROUNDS,acquireBackground} from '../features/backgrounds/catalog.mjs';
import {mountHomeEffects} from '../features/home/effects.mjs';
import {mountBackgroundEffect} from '../features/backgrounds/effects.mjs';
import {mountSnowEffect} from '../features/backgrounds/snow.mjs';
import {mountCosmicEffect} from '../features/backgrounds/cosmic.mjs';
import {mountForestEffect} from '../features/backgrounds/forest.mjs';
import {mountCloudSkyEffect} from '../features/backgrounds/clouds.mjs';
import {mountOceanEffect} from '../features/backgrounds/ocean.mjs';
import {worldsScreen} from '../features/worlds/view.mjs';
import {practiceScreen,winScreen,featureScreen} from '../features/practice/view.mjs';
import {equipSuccessFX,playPracticeFX} from '../features/practice/fx.mjs';
import {mountPracticeWorldGL} from '../features/practice/scene-gl.mjs';
import {chestsScreen} from '../features/chests/view.mjs';
import {PETS,grantPetForTable,petFrames} from '../features/pets/catalog.mjs';
import {petsScreen,mountPetAnimation} from '../features/pets/view.mjs';
import {chestInventoryScreen} from '../features/chests/inventory.mjs';
import {chestDefinitions,chestState,chestFrames,openChest,chestRemaining} from '../features/chests/catalog.mjs';

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
 let stopPracticeGL=null;
 let stopPets=null,petSelectedId=1,petRescue=null,petPlayTimer=null;
 let chestOpening=null,chestNotice='',chestTimer=null,vaultTab='all',vaultNotice='';
 const cancelChestTimer=()=>{if(chestTimer!==null){clearInterval(chestTimer);chestTimer=null}};
 let answerTimer=null;
 let cleanupPracticeFX=null;
 const clearPracticeFX=()=>{cleanupPracticeFX?.();cleanupPracticeFX=null};
 const cancelAnswerTimer=()=>{if(answerTimer!==null){clearTimeout(answerTimer);answerTimer=null}};
 const scheduleAnswerAdvance=()=>{
  cancelAnswerTimer();
  if(screen!=='practice'||!session?.answered)return;
  const current=session;
  answerTimer=setTimeout(()=>{
   answerTimer=null;
   if(screen==='practice'&&session===current&&session.answered)afterAnswer();
  },session.feedback?.good?1780:1660);
 };
 const navKey='tq_f.beta.navigation.v1';
 const browser=typeof window!=='undefined'?window:null;
 const navStore=(()=>{try{return browser?.sessionStorage||null}catch{return null}})();
 let saved=null;
 try{saved=JSON.parse(navStore?.getItem(navKey)||'null')}catch{}
 const validScreens=['profiles','wardrobe','backgrounds','home','worlds','practice','win','feature','chests','vault','pets'];
 if(saved?.profileId===profiles.active()?.id&&validScreens.includes(saved.screen)){
  screen=saved.screen;
  selectedWorld=Number.isInteger(saved.selectedWorld)&&saved.selectedWorld>=1&&saved.selectedWorld<=10?saved.selectedWorld:1;
  selectedBackground=saved.selectedBackground||null;
  wardrobeSelection=saved.wardrobeSelection||null;
  wardrobeTab=saved.wardrobeTab==='frames'?'frames':'fashion';
  feature=saved.feature||'';
  if(screen==='practice'&&Array.isArray(saved.practice?.queue))session=saved.practice;
  if(screen==='win'&&saved.result?.deck)result=saved.result;
  if((screen==='practice'&&!session)||(screen==='win'&&!result))screen='worlds';
 }
 if(screen==='home'){
  const pending=Number(profiles.active()?.flags?.petRescuePending||0);
  if(pending){const pet=PETS.find(x=>x.id===pending);if(pet){petSelectedId=pet.id;petRescue=pet;screen='pets';}}
 }
 let firstRender=true;
 const initialScroll=saved?.profileId===profiles.active()?.id?Math.max(0,Number(saved.scrollY)||0):0;
 const saveNav=()=>{try{navStore?.setItem(navKey,JSON.stringify({
  profileId:profiles.active()?.id||null,screen,selectedWorld,selectedBackground,
  wardrobeSelection,wardrobeTab,feature,practice:screen==='practice'?session:null,
  result:screen==='win'?result:null,scrollY:browser?.scrollY||0
 }))}catch{}};
 const restoreScroll=y=>{
  if(!browser||y<=0)return;
  const apply=()=>browser.scrollTo(0,y);
  browser.requestAnimationFrame(()=>{apply();
   const img=root.querySelector('.world-map-art');
   if(img&&!img.complete)img.addEventListener('load',apply,{once:true});
  });
 };

 function pickAvailableWorld(profile){
  const choice=WORLDS.find(w=>worldState(profile,w.number,now()).enabled);
  return choice?.number||1;
 }
 function navigate(next){
  cancelChestTimer();chestOpening=null;
  cancelAnswerTimer();
  clearPracticeFX();
  screen=next;
  browser?.scrollTo(0,0);
  saveNav();
  render();
 }
 function render(){
  const currentScroll=firstRender?initialScroll:(browser?.scrollY||0);
  stopHomeEffects?.();stopHomeEffects=null;
  stopPracticeGL?.();stopPracticeGL=null;
  stopPets?.();stopPets=null;
  const player=profiles.active();
  try{
   switch(screen){
    case 'profiles':
      root.innerHTML=profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'wardrobe':
      root.innerHTML=player?wardrobeScreen(player,fashionNotice,wardrobeSelection,wardrobeTab):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'backgrounds':
      root.innerHTML=player?backgroundsScreen(player,selectedBackground,backgroundNotice):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'chests':
      root.innerHTML=player?chestsScreen(player,chestOpening,chestNotice):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'pets':
      root.innerHTML=player?petsScreen(player,petSelectedId,petRescue):profilesScreen(profiles.profiles(),selectedPlayer);break;
    case 'vault':
      root.innerHTML=player?chestInventoryScreen(player,vaultTab,vaultNotice):profilesScreen(profiles.profiles(),selectedPlayer);break;
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
   if(screen==='pets'&&player)stopPets=mountPetAnimation(root,player,petSelectedId,petRescue);
   if(screen==='home'&&player&&typeof window!=='undefined'){
     const bg=BACKGROUNDS.some(item=>item.id===player.equipped?.background)&&player.owned?.includes(player.equipped.background)?player.equipped.background:null;
     stopHomeEffects=bg==='bg_ocean'?mountOceanEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_ice'?mountSnowEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_space'?mountCosmicEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_forest'?mountForestEffect(root.querySelector('.home-view'),{windowRef:window}):bg==='bg_clouds'?mountCloudSkyEffect(root.querySelector('.home-view'),{windowRef:window}):bg?mountBackgroundEffect(root.querySelector('.home-view'),bg,{windowRef:window}):mountHomeEffects({root,windowRef:window});
   }
   if(screen==='backgrounds'&&player&&typeof window!=='undefined'){
     const id=selectedBackground||player.equipped?.background||'bg_forest';
     stopHomeEffects=id==='bg_ocean'?mountOceanEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_ice'?mountSnowEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_space'?mountCosmicEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_forest'?mountForestEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):id==='bg_clouds'?mountCloudSkyEffect(root.querySelector('.bg-feature-art'),{windowRef:window,preview:true}):mountBackgroundEffect(root.querySelector('.bg-feature-art'),id,{windowRef:window,preview:true});
   }
   if(screen==='practice'&&session?.table<=10&&player){
    try{stopPracticeGL=mountPracticeWorldGL(root.querySelector('.practice-scene-art'),{world:session.table});}catch(error){console.warn('WebGL indisponível; mantendo arte estática.',error);stopPracticeGL=null;}
   }
   saveNav();
   if(screen==='practice'&&session?.answered&&answerTimer===null)scheduleAnswerAdvance();
   restoreScroll(currentScroll);
   firstRender=false;
  }catch(e){
   console.error('Falha ao renderizar:',e);
   root.textContent='Não foi possível carregar esta tela. Recarregue a página para tentar novamente.';
  }
 }
 function startWorld(n){
  const player=profiles.active();if(!player)return navigate('profiles');
  if(!Number.isInteger(n)||n<1||n>10)return;
  const state=worldState(player,n,now());
  // Beta is a development build: progression gates are bypassed only here.
  selectedWorld=n;
  session=createPractice(n,state.id==='due'?'review':'learn',random,now());
  navigate('practice');
 }
 function submitAnswer(value){
  if(screen!=='practice'||!session||session.answered)return;
  if(session.preview){
   const previewPlayer={coins:0,xp:0,stats:{correct:0,wrong:0}};
   answerPractice(session,previewPlayer,value);
  }else profiles.updateActive(player=>answerPractice(session,player,value));
  render();
  const player=profiles.active();
  cleanupPracticeFX=playPracticeFX(root.querySelector('.practice-scene-art, .practice-legacy-shell'),!!session.feedback?.good,player?.equipped?.effect);
  // Single GPU pass: environmental water/light and response energy share one canvas.
  // The answer artwork and feedback remain visible as independent DOM overlays.
  stopPracticeGL?.burst?.(!!session.feedback?.good,[.5,.72]);
  scheduleAnswerAdvance();
 }
 function afterAnswer(){
  cancelAnswerTimer();
  clearPracticeFX();
  if(screen!=='practice'||!session||!session.answered)return;
  if(session.preview&&session.queue.length===0){
   session=createPractice(session.table,'learn',random,now());
   session.preview=true;
   render();
   return;
  }
  if(session.queue.length===0){
   profiles.updateActive(player=>{result=finishPractice(session,player,now());const pet=grantPetForTable(player,session.table,session.portal||1,now());if(pet)result.petRescue=pet.id;});
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
   case 'home':{
    session=null;const p=profiles.active();const pending=Number(p?.flags?.petRescuePending||0);
    if(pending&&PETS.some(x=>x.id===pending)){petSelectedId=pending;petRescue=PETS.find(x=>x.id===pending);navigate('pets');}
    else{petRescue=null;navigate('home');}
    break;
   }
   case 'worlds':session=null;selectedWorld=pickAvailableWorld(profiles.active());navigate('worlds');break;
   case 'selectWorld':{
     const id=Number(dataset.world);
     if(!Number.isInteger(id)||id<1||id>10)return;
     selectedWorld=id;render();break;
   }
   case 'startWorld':startWorld(Number(dataset.world));break;
   case 'previewWorld':{
     const n=Number(dataset.world);
     if(n<2||n>6)return;
     const player=profiles.active();
     if(!player)return navigate('profiles');
     if(worldState(player,n,now()).enabled){startWorld(n);break;}
     selectedWorld=n;
     session=createPractice(n,'learn',random,now());
     session.preview=true;
     navigate('practice');
     break;
   }
   case 'answer':submitAnswer(Number(dataset.answer));break;
   case 'equipSuccessFX':{
    const id=String(dataset.effect||'');
    profiles.updateActive(p=>equipSuccessFX(p,id));
    render();break;
   }
   case 'nextQuestion':afterAnswer();break;
   case 'leavePractice':session=null;navigate('worlds');break;
   case 'openFeature':
     feature=String(dataset.feature||'Em desenvolvimento');
     if(feature==='Pets'){petRescue=null;navigate('pets');break;}
     if(feature==='Baús'){chestNotice='';navigate('chests');break;}
     if(['Baú de itens','Colecionáveis','Molduras','Efeitos'].includes(feature)){
      vaultTab={'Baú de itens':'all','Colecionáveis':'collectible','Molduras':'frame','Efeitos':'effect'}[feature];
      vaultNotice='';navigate('vault');break;
     }
     if(feature==='Fundos'){selectedBackground=null;backgroundNotice='';navigate('backgrounds');}
     else if(feature==='Moda'){fashionNotice='';wardrobeSelection=null;wardrobeTab='fashion';navigate('wardrobe');}
     else navigate('feature');
     break;
   case 'selectPet':petSelectedId=Number(dataset.pet)||1;render();break;
   case 'petsInfo':browser?.alert?.('Cada portal possui pets nas tabuadas 3, 7 e 10. O lendário final do Portal 10 é resgatado no mapa 9.');break;
   case 'petMission':{
    const pet=PETS.find(x=>x.id===Number(dataset.pet)||x.id===petSelectedId);
    if(!pet||profiles.active()?.pets?.[String(pet.id)]?.rescued)break;
    const state=worldState(profiles.active(),pet.table,now());
    selectedWorld=pet.table;
    session=createPractice(pet.table,state.id==='due'?'review':'learn',random,now());
    session.portal=pet.portal;
    navigate('practice');
    break;
   }
   case 'petPlay':{
    const pet=PETS.find(x=>x.id===petSelectedId);if(!pet||!profiles.active()?.pets?.[pet.id]?.rescued)break;
    const img=root.querySelector('[data-pet-showcase]');if(!img)break;
    if(petPlayTimer!==null)clearInterval(petPlayTimer);
    let n=0;img.dataset.playing='true';const frames=petFrames(pet,'happy');img.src=frames[0];
    petPlayTimer=setInterval(()=>{n++;if(n>=8){clearInterval(petPlayTimer);petPlayTimer=null;delete img.dataset.playing;return}img.src=frames[n]},95);break;
   }
   case 'petRescueDone':{
    const id=petRescue?.id;if(id){profiles.updateActive(p=>{p.flags??={};p.flags.petRescueSeen??={};p.flags.petRescueSeen[id]=true;if(p.flags.petRescuePending===id)delete p.flags.petRescuePending});petSelectedId=id}
    petRescue=null;navigate('pets');break;
   }
   case 'vaultTab':
    vaultTab=['all','frame','background','effect','collectible'].includes(dataset.cat)?dataset.cat:'all';
    vaultNotice='';render();break;
   case 'openChest':{
    if(chestOpening)return;
    const id=String(dataset.chest||'');const player=profiles.active();
    const def=player&&chestDefinitions(player).find(x=>x.id===id);
    if(!def||chestState(player,def)!=='ready'){chestNotice=def?(chestState(player,def)==='opened'?'Este baú já foi aberto e os tesouros estão no perfil.':chestRemaining(player,def)):'Baú desconhecido.';render();break;}
    chestOpening={phase:'opening',def};chestNotice='';render();
    const frames=chestFrames(def);let i=0;
    chestTimer=setInterval(()=>{
      if(screen!=='chests'){cancelChestTimer();return}
      i++;
      const img=root.querySelector('[data-chest-anim]');
      if(i<frames.length){if(img)img.src=frames[i];return}
      cancelChestTimer();
      let obtained=null;
      profiles.updateActive(p=>{obtained=openChest(p,id,random)});
      chestOpening=obtained?{phase:'reward',def,result:obtained}:null;
      chestNotice=obtained?'Tesouro conquistado!':'Não foi possível abrir este baú.';
      render();
    },175);
    break;
   }
   case 'closeChest':chestOpening=null;render();break;
   case 'previewBackground':selectedBackground=String(dataset.background||'');backgroundNotice='';render();break;
   case 'backgroundAction':{
     const id=String(dataset.background||'');
     let result;
     profiles.updateActive(p=>{result=acquireBackground(p,id)});
     selectedBackground=id;
     vaultNotice=result?.reason==='equipped'?'Fundo equipado!':result?.reason==='reward-only'?'Este fundo só pode ser obtido em baús.':'';
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
     if(!player||(id!==null&&!availableFrames(player).some(x=>x.id===id)))break;
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
 if(browser){
  browser.addEventListener('keydown',onKeydown);
  browser.addEventListener('pagehide',saveNav);
  browser.addEventListener('scroll',saveNav,{passive:true});
 }
 render();
 return {
  getScreen:()=>screen,
  getPlayer:()=>profiles.active(),
  getSession:()=>session,
  getSelectedWorld:()=>selectedWorld,
  act,
  destroy(){
   cancelAnswerTimer();
   cancelChestTimer();
   clearPracticeFX();
   stopHomeEffects?.();stopHomeEffects=null;
   root.removeEventListener('click',onClick);
   if(browser){
    browser.removeEventListener('keydown',onKeydown);
    browser.removeEventListener('pagehide',saveNav);
    browser.removeEventListener('scroll',saveNav);
   }
  }
 };
}
if(typeof document!=='undefined'){
 const root=document.getElementById('app');
 if(root)createApp({root,storage:window.localStorage});
}
