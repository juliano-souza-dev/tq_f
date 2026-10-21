import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
const failures=[],screens=['360x740','390x844','1280x800'];
async function setup(width,height){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
 const page=await ctx.newPage();
 page.on('pageerror',err=>failures.push('Page error '+width+'x'+height+': '+err.message));
 const response=await page.goto('http://127.0.0.1:8765/',{waitUntil:'domcontentloaded'});
 assert.equal(response.status(),200);
 await page.locator('.player-choice[data-player="alana"]').click();
 await page.locator('[data-action="enter"]').click();
 await page.locator('.home-logo').waitFor();
 assert.equal(await page.locator('h1').count(),0); // home usa arte de logotipo
 const broken=await page.locator('.home-logo, .home-header-art, .fashion-base, .play-art, .hero-character').evaluateAll(async images=>{
  await Promise.all(images.map(img=>img.decode().catch(()=>null)));
  return images.filter(img=>!img.naturalWidth).map(img=>img.src);
 });
 assert.deepEqual(broken,[],'Arte quebrada na home');
 const overflow=await page.evaluate(()=>Math.max(0,document.documentElement.scrollWidth-innerWidth));
 assert.ok(overflow<3,'Scroll horizontal na home: '+overflow);
 const composition=await page.evaluate(()=>{
   const rect=selector=>{const box=document.querySelector(selector)?.getBoundingClientRect();return box?{top:box.top,bottom:box.bottom,left:box.left,right:box.right,height:box.height}:null};
   const tileElements=[...document.querySelectorAll('.home-tiles .home-tile')];
   return {
      screen:rect('.home-view'),header:rect('.home-header'),
      logo:rect('.home-logo'),stage:rect('.hero-stage'),
      play:rect('.play-button'),chest:rect('.next-chest'),
      tiles:rect('.home-tiles'),nav:rect('.tabbar'),
      tileRects:tileElements.map(el=>{const b=el.getBoundingClientRect();return {top:b.top,bottom:b.bottom}}),
      scroll:document.documentElement.scrollHeight,viewport:innerHeight,
      scene:getComputedStyle(document.querySelector('.home-view')).backgroundImage
   };
 });
 assert.ok(composition.scene.includes('home-magical-bg.webp'),'Cenário mágico não aplicado');
 assert.equal(composition.tileRects.length,5,'Cinco atividades secundárias, sem destinos repetidos');
 assert.ok(!await page.locator('.home-tile[data-action="worlds"]').count(),'Mundos não deve duplicar Jogar e rodapé');
 assert.ok(!await page.locator('.home-tile[data-feature="Colecionáveis"]').count(),'Coleção já está no rodapé');
 assert.equal(await page.locator('.wallet-coin').count(),1,'Ícone de moeda em CSS');
 assert.equal(await page.locator('.wallet-gem').count(),1,'Ícone de gema em CSS');
 assert.equal(await page.locator('.next-chest-progress-fill').getAttribute('value'),'0');
 assert.equal(await page.locator('.next-chest-progress-fill').getAttribute('max'),'3');
 assert.equal((await page.locator('.next-chest-counter').innerText()).trim(),'0 / 3');
 const panel=await page.evaluate(()=>{
   const base=document.querySelector('.next-chest').getBoundingClientRect();
   const badge=document.querySelector('.next-chest-progress').getBoundingClientRect();
   const caption=document.querySelector('.next-chest-counter').getBoundingClientRect();
   const body=document.querySelector('.home-tiles').getBoundingClientRect();
   const wallet=document.querySelector('.hero-wallet').getBoundingClientRect();
   const hud=document.querySelector('.home-header').getBoundingClientRect();
   return {base:{top:base.top,bottom:base.bottom,left:base.left,right:base.right},
           badge:{top:badge.top,bottom:badge.bottom,left:badge.left,right:badge.right},
           caption:{top:caption.top,bottom:caption.bottom,left:caption.left,right:caption.right},
           body:{top:body.top,bottom:body.bottom},wallet:{left:wallet.left,right:wallet.right},
           hud:{left:hud.left,right:hud.right}};
 });
 assert.ok(panel.badge.left>=panel.base.left&&panel.badge.right<=panel.base.right,'Plaqueta ultrapassou o baú');
 assert.ok(panel.badge.top>=panel.base.top&&panel.badge.bottom<=panel.base.bottom,'Plaqueta está fora do baú');
 assert.ok(panel.caption.left>=panel.badge.left&&panel.caption.right<=panel.badge.right,'Texto do progresso não cabe na plaqueta');
 assert.ok(panel.badge.bottom<=panel.body.top+1,'Plaqueta invade a área de atividades');
 assert.ok(panel.wallet.left>=panel.hud.left&&panel.wallet.right<=panel.hud.right,'Saldo sai do HUD');
 assert.ok(composition.screen.bottom<=composition.viewport+3,'Home ultrapassou viewport');
 assert.ok(composition.scroll<=composition.viewport+4,'Home exige rolagem vertical: '+JSON.stringify(composition));
 assert.ok(composition.header.bottom<=composition.logo.bottom+2,'Header fora de hierarquia');
 assert.ok(composition.logo.bottom<=composition.stage.bottom+2,'Logo fora de hierarquia');
 assert.ok(composition.stage.bottom<=composition.play.bottom+2,'Hero excedeu CTA');
 assert.ok(composition.play.bottom<=composition.chest.bottom+2,'CTA encosta no baú');
 assert.ok(composition.chest.bottom<=composition.tiles.bottom+2,'Baú sobreposto aos atalhos');
 assert.ok(composition.tileRects.every(r=>r.top>=composition.tiles.top-2 && r.bottom<=composition.tiles.bottom+3),'Cards fora do painel');
 assert.ok(composition.tiles.bottom<=composition.nav.top+3,'Atalhos encobertos pela navegação');
 await page.screenshot({path:'screenshots/home-'+width+'x'+height+'.png',fullPage:true});
 return {page,ctx};
}
try{
 for(const size of screens){
   const [w,h]=size.split('x').map(Number);
   const {page,ctx}=await setup(w,h);
   await page.locator('.play-button').click();
   await page.locator('.world-pin[data-world="1"]').click();
   await page.locator('.world-start').click();
   assert.equal(await page.locator('.question-scroll h1').count(),1);
   await page.screenshot({path:'screenshots/practice-'+size+'.png',fullPage:true});
   if(w===390){
     for(let turn=0;turn<20;turn++){
       const text=(await page.locator('.question-scroll h1').innerText()).replaceAll('\n',' ');
       const matched=text.match(/(\d+)\s*×\s*(\d+)/);
       assert.ok(matched,'Pergunta ilegível '+text);
       const answer=Number(matched[1])*Number(matched[2]);
       await page.locator('.answer-choice').filter({hasText:new RegExp('^'+answer+'$')}).click();
       await page.locator('.next-question').click();
     }
     await page.locator('.win-panel h1').waitFor();
     await page.screenshot({path:'screenshots/victory-390x844.png',fullPage:true});
     const sessionCount=await page.evaluate(()=>JSON.parse(localStorage.getItem('tabuadaquest.webapp.v1')).profiles.find(p=>p.name==='Alana').stats.sessions);
     assert.equal(sessionCount,1,'Sessão não persistiu');
   }
   await ctx.close();
 }
 if(failures.length)throw Error(failures.join('\n'));
 console.log('✓ Browser smoke: 360x740, 390x844, 1280x800, login, assets, mapa, prática, 20 respostas e persistência');
}finally{await browser.close();}
