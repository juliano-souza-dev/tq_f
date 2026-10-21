import {createProfileStore} from '../core/profiles.mjs';
import {WORLDS,worldState} from '../core/progression.mjs';
import {createPractice,answerPractice,nextPractice,finishPractice} from '../core/practice.mjs';
import {profilesScreen} from '../features/profiles/view.mjs';
import {homeScreen} from '../features/home/view.mjs';
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
  const player=profiles.active();
  try{
   switch(screen){
    case 'profiles':
      root.innerHTML=profilesScreen(profiles.profiles(),selectedPlayer);break;
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
     navigate('feature');break;
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
   root.removeEventListener('click',onClick);
   if(typeof window!=='undefined')window.removeEventListener('keydown',onKeydown);
  }
 };
}
if(typeof document!=='undefined'){
 const root=document.getElementById('app');
 if(root)createApp({root,storage:window.localStorage});
}
