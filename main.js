const store=require('./shared/tidal_keeps_storage');
const screenModule=require('./ui/tidal_keeps/index.ui.js');
// Operit replaces .ui.js modules with a screen function while parsing registrations.
const screen=typeof screenModule==='function'?screenModule:screenModule.default;
let ipcRegistered=false;
function safeGetter(name){try{return typeof globalThis[name]==='function'?String(globalThis[name]()||'').trim():'';}catch(_){return '';}}
async function callerContext(){
 let chatId=safeGetter('getChatId'), cardId=safeGetter('getCallerCardId'), callerName=safeGetter('getCallerName');
 if(!chatId&&typeof Tools!=='undefined'&&Tools.Chat&&typeof Tools.Chat.listChats==='function'){
  try{const listed=await Tools.Chat.listChats({sort_by:'updatedAt',sort_order:'desc',limit:100});const current=String(listed?.currentChatId||'').trim();if(current)chatId=current;}catch(_){/* sidebar UI may not expose an active chat */}
 }
 let chatTitle='', characterName=callerName;
 if(chatId&&typeof Tools!=='undefined'&&Tools.Chat&&typeof Tools.Chat.findChat==='function'){
  try{const found=await Tools.Chat.findChat({query:chatId,match:'exact',index:0});const chat=found?.chat||{};chatTitle=String(chat.title||chat.name||'').trim();characterName=String(chat.characterCardName||characterName||'').trim();}catch(_){/* context lookup is best effort */}
 }
 if(typeof Tools!=='undefined'&&Tools.Chat&&typeof Tools.Chat.listCharacterCards==='function'){
  try{const listed=await Tools.Chat.listCharacterCards();const cards=Array.isArray(listed?.cards)?listed.cards:[];const card=(cardId&&cards.find(x=>String(x?.id||'').trim()===cardId))||cards.find(x=>String(x?.name||'').trim()===characterName);if(card?.name)characterName=String(card.name).trim();}catch(_){/* card lookup is best effort */}
 }
 return {chatId,chatTitle,characterCardId:cardId,characterName};
}
async function bindingOptions(){
 const chats=typeof Tools!=='undefined'&&Tools.Chat&&typeof Tools.Chat.listChats==='function'?(await Tools.Chat.listChats({sort_by:'updatedAt',sort_order:'desc',limit:100})).chats||[]:[];
 const cards=typeof Tools!=='undefined'&&Tools.Chat&&typeof Tools.Chat.listCharacterCards==='function'?(await Tools.Chat.listCharacterCards()).cards||[]:[];
 return {chats:chats.map(x=>({id:String(x.id||''),title:String(x.title||x.id||''),characterCardId:String(x.characterCardId||''),characterName:String(x.characterCardName||'')})).filter(x=>x.id),cards:cards.map(x=>({id:String(x.id||''),name:String(x.name||x.id||'')})).filter(x=>x.id)};
}
async function enrichParams(params){
 const p={...(params||{})};
 if(p.createdBy==='assistant'||p.author==='assistant'){
  const c=await callerContext();p.createdBy='assistant';p.author='assistant';p.createdByName=c.characterName||c.callerName||'';p.createdByCardId=c.characterCardId||'';p.createdInChatId=c.chatId||'';p.updatedByName=p.createdByName;p.updatedByCardId=p.createdByCardId;p.updatedInChatId=p.createdInChatId;
 }
 return p;
}
function registerIpc(){
 if(ipcRegistered)return;
 ipcRegistered=true;
 ToolPkg.ipc.on('tidal_keeps.request',async p=>{try{
  const action=p?.action, params=p?.params||{};
  if(action==='get_binding_context'){const state=await store.dispatch('get_state');return {success:true,binding:state.state.chatBinding,context:await callerContext()};}
  if(action==='bind_current_chat'){const context=await callerContext();return await store.dispatch('save_chat_binding',context);}
  if(action==='list_binding_options')return {success:true,options:await bindingOptions()};
  if(action==='bind_chat'){const q=params||{};const options=await bindingOptions();const chat=options.chats.find(x=>x.id===String(q.chatId||''));if(!chat)throw Error('所选对话不存在或已被删除。');const card=options.cards.find(x=>x.id===String(q.characterCardId||''));return await store.dispatch('save_chat_binding',{chatId:chat.id,chatTitle:chat.title,characterCardId:card?.id||chat.characterCardId||'',characterName:card?.name||chat.characterName||''});}
  if(action==='clear_chat_binding')return await store.dispatch('clear_chat_binding');
  return await store.dispatch(action,await enrichParams(params));
 }catch(e){return {success:false,message:e.message||String(e)};}});
}
// Main IPC dispatch loads this entry script and executes its top-level module code,
// but it does not call registerToolPkg(). Register the channel during module init.
registerIpc();
exports.registerToolPkg=function(){
 const route='toolpkg:com.reiko.tidal_keeps:ui:tidal_keeps';
 ToolPkg.registerUiRoute({id:'tidal_keeps',route,runtime:'compose_dsl',screen,params:{},title:{zh:'潮汐留存',en:'Tidal Keeps'}});
 ToolPkg.registerNavigationEntry({id:'tidal_keeps_sidebar',route,surface:'main_sidebar_plugins',title:{zh:'潮汐留存',en:'Tidal Keeps'},icon:'Water',order:116});
 return true;
};
