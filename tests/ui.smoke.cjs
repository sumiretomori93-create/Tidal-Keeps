// Desktop WebView-content test. Does not claim Android or Operit runtime coverage.
const assert=require('node:assert/strict');const path=require('node:path'),fs=require('node:fs');
const {chromium}=require(require.resolve('playwright',{paths:[process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES||process.cwd()]}));
const D=require('../shared/domain');
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));const s=D.empty();let id=0;const now='2026-09-26T04:00:00Z';let rejectNext=false;
const call=(a,p)=>D.apply(s,a,p,now,()=>String(++id)).result;
call('add_daily_note',{date:'2026-09-25',text:'在海边散步，收下了一枚小贝壳。',createdBy:'user'});
call('add_event',{date:'2026-09-29',title:'一起看日落',kind:'event'});
call('add_event',{date:'2026-07-23',title:'初次相识',kind:'anniversary'});
await page.exposeFunction('tidalMock',request=>{const p=JSON.parse(request);if(rejectNext){rejectNext=false;return JSON.stringify({success:false,message:'模拟保存失败，原文保留'});}let r;if(p.action==='export_data')r={success:true,text:JSON.stringify(s)};else r=call(p.action,p.params);if(p.action==='get_state')r.dataPath='/config/tidal/tidal-v2';return JSON.stringify(r);});
await page.addInitScript(()=>{window.TidalBridge={request:input=>window.tidalMock(input)};});
await page.goto('file://'+path.resolve(__dirname,'../ui/tidal_keeps/page.html'));
await page.locator('h1').filter({hasText:'海面'}).waitFor();
async function click(action){await page.locator('[data-action="'+action+'"]').first().click();}
async function submit(){await page.locator('.sheet button[type=submit]').click();await page.locator('.sheet').waitFor({state:'hidden'});}
await click('daily');await page.locator('[name=sleepHours]').fill('7.5');await page.locator('[name=mood]').fill('平静');await page.locator('[name=activity]').fill('整理新插件');await submit();assert.equal(s.dailyRecords['2026-09-26'].sleepHours,7.5);
await click('note');await page.locator('[name=text]').fill('去看了海。 <img src=x onerror=alert(1)>');rejectNext=true;await page.locator('.sheet button[type=submit]').click();await page.getByText('模拟保存失败，原文保留',{exact:true}).waitFor();assert.match(await page.locator('[name=text]').inputValue(),/去看了海/);await submit();assert.equal(await page.locator('main img').count(),0);assert.equal(s.dailyRecords['2026-09-26'].notes.length,1);
await click('edit-note');await page.locator('[name=text]').fill('海面有一点风。');await submit();assert.equal(s.dailyRecords['2026-09-26'].notes[0].text,'海面有一点风。');
await click('weight');await page.locator('[name=value]').fill('52.3');await submit();assert.equal(s.weights[0].value,52.3);
const out=path.resolve(__dirname,'../../qa');fs.mkdirSync(out,{recursive:true});await page.screenshot({path:out+'/sea-390.png',fullPage:true});
await page.locator('[data-tab=shell]').click();await click('event');await page.locator('[name=title]').fill('周末约定');await page.locator('[name=date]').fill('2026-10-03');await submit();assert(s.events.some(e=>e.title==='周末约定'));
await page.locator('[data-action=edit-event]').filter({hasText:'编辑'}).first().click();await page.locator('[name=completed]').check();await submit();assert(s.events.some(e=>e.completed));
await page.locator('[data-tab=calendar]').click();await page.locator('[data-action=day][data-id="2026-09-25"]').click();await page.getByText('在海边散步，收下了一枚小贝壳。',{exact:true}).waitFor();await click('cycle');await page.locator('[name=startDate]').fill('2026-09-20');await page.locator('[name=endDate]').fill('2026-09-24');await submit();assert.equal(s.cycles.length,1);await page.screenshot({path:out+'/calendar-390.png',fullPage:true});
await page.locator('[data-tab=jelly]').click();await click('preview');await page.locator('.digest').waitFor();assert.equal(Object.keys(s.digestCache).length,0);assert.match(await page.locator('.digest').textContent(),/海边散步/);await page.screenshot({path:out+'/jelly-390.png',fullPage:true});
await page.locator('[data-tab=drift]').click();await page.locator('#history-search').fill('不存在的词');await page.getByText('还没有找到记录。',{exact:true}).waitFor();await page.locator('#history-search').fill('海边');await page.getByText('在海边散步，收下了一枚小贝壳。',{exact:false}).waitFor();await click('sub-settings');await page.locator('[name=name]').fill('Reiko');await page.locator('[name=holidaySet]').selectOption('basic');await page.locator('[data-form=settings] button[type=submit]').click();await page.waitForFunction(()=>document.body.classList.contains('busy')===false);assert.equal(s.settings.holidaySet,'basic');await click('export');assert.match(await page.locator('.backup').inputValue(),/dailyRecords/);await click('close');
await page.locator('[data-tab=sea]').click();await click('delete-note');await click('confirm-delete');await page.locator('.sheet').waitFor({state:'hidden'});assert.equal(s.dailyRecords['2026-09-26'].notes.length,0);
for(const width of [320,390,760]){await page.setViewportSize({width,height:844});for(const t of ['sea','calendar','shell','jelly','drift']){await page.locator('[data-tab='+t+']').click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow '+width+' '+t);}}
assert.deepEqual(errors,[]);console.log('PASS: 5 tabs, CRUD, save failure retains form, XSS escaping, history filter, digest preview, export, 320/390/760px, no JS errors.');await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
