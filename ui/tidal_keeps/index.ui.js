const html=require('./page');
function Screen(ctx){
 const controller=ctx.useMemo('tidal-web',()=>ctx.createWebViewController('tidal-keeps'),[]);
 const loaded=ctx.useRef('tidal-loaded',false);
 function load(){if(loaded.current)return;loaded.current=true;
 controller.addJavascriptInterface('TidalBridge',{async request(input){try{const raw=Array.isArray(input)?input[0]:input;const p=typeof raw==='string'?JSON.parse(raw):raw;const allowed=['get_state','get_cycle_status','save_daily','add_daily_note','update_note','delete_note','add_event','update_event','delete_event','record_weight','delete_weight','record_cycle','confirm_cycle_day','delete_cycle','save_settings','preview_daily_digest','export_data','import_legacy','get_binding_context','bind_current_chat','list_binding_options','bind_chat','clear_chat_binding'];if(!p||!allowed.includes(p.action))throw Error('界面操作不受支持。');return JSON.stringify(await ToolPkg.ipc.call('tidal_keeps.request',{action:p.action,params:{...p.params,createdBy:'user',author:'user'}},{targetRuntime:'main'}));}catch(e){return JSON.stringify({success:false,message:e.message||String(e)});}}});
 controller.loadHtml(html,{baseUrl:'https://local.tidal.keeps/'});
 }
 return ctx.UI.WebView({fillMaxSize:true,controller,javaScriptEnabled:true,domStorageEnabled:false,allowFileAccess:false,allowContentAccess:false,mixedContentMode:'neverAllow',onLoad:load});
}
exports.default=Screen;
