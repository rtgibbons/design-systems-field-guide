const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
(async()=>{
const root=__dirname,data=JSON.parse(fs.readFileSync(path.join(root,'guide-data.json')));
fs.mkdirSync(path.join(root,'screenshots'),{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
// Independent public pages, isolated contexts; no authenticated browser state.
for(let i=0;i<data.length;i+=3){await Promise.all(data.slice(i,i+3).map(async d=>{
 const page=await browser.newPage({viewport:{width:1280,height:900},deviceScaleFactor:1});
 try{const response=await page.goto(d.docs,{waitUntil:'domcontentloaded',timeout:35000});await page.waitForTimeout(2500);const title=await page.title();const text=await page.locator('body').innerText();
 if(!response||response.status()>=400||text.length<100||/access denied|verify you are human|just a moment/i.test(title))throw Error('Unusable public page: '+title);
 await page.screenshot({path:path.join(root,'screenshots',d.id+'.jpg'),type:'jpeg',quality:65});results.push({name:d.name,status:response.status(),title,url:page.url()});console.log('Captured '+d.name);
 }catch(e){results.push({name:d.name,error:e.message});console.log('Skipped '+d.name+': '+e.message)}finally{await page.close()}
}));}
fs.writeFileSync(path.join(root,'capture-results.json'),JSON.stringify(results,null,2));await browser.close();
})();
