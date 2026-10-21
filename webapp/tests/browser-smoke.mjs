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
