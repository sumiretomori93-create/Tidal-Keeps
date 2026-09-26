/* METADATA
{
  "name": "tidal_keeps_core",
  "display_name": {
    "zh": "潮汐留存核心",
    "en": "Tidal Keeps Core"
  },
  "description": {
    "zh": "生活记录与晨间交接。日期按设置时区计算，缺项保持空白。",
    "en": "Shared daily records and morning handoffs."
  },
  "enabled_by_default": true,
  "category": "Data",
  "tools": [
    {
      "name": "add_daily_note",
      "description": {
        "zh": "记录一条生活碎片。调用方记为 assistant，不冒充用户亲手填写。",
        "en": "记录一条生活碎片。调用方记为 assistant，不冒充用户亲手填写。"
      },
      "parameters": [
        {
          "name": "text",
          "description": {
            "zh": "内容，最多4000字符。",
            "en": "内容，最多4000字符。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "save_daily",
      "description": {
        "zh": "记录或修改睡眠小时、状态、做过的事。仅修改传入字段，不作健康评价。",
        "en": "记录或修改睡眠小时、状态、做过的事。仅修改传入字段，不作健康评价。"
      },
      "parameters": [
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "sleepHours",
          "description": {
            "zh": "睡眠小时数；空字符串清除。",
            "en": "睡眠小时数；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "mood",
          "description": {
            "zh": "状态；空字符串清除。",
            "en": "状态；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "activity",
          "description": {
            "zh": "做过的事；空字符串清除。",
            "en": "做过的事；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "get_daily_summary",
      "description": {
        "zh": "读取指定日期的记录、碎片与体重。",
        "en": "读取指定日期的记录、碎片与体重。"
      },
      "parameters": [
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "add_event",
      "description": {
        "zh": "创建一枚贝壳：单次事件、纪念日或自定义节日。",
        "en": "创建一枚贝壳：单次事件、纪念日或自定义节日。"
      },
      "parameters": [
        {
          "name": "title",
          "description": {
            "zh": "事件名称。",
            "en": "事件名称。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "time",
          "description": {
            "zh": "HH:mm；空字符串清除。",
            "en": "HH:mm；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "note",
          "description": {
            "zh": "备注；空字符串清除。",
            "en": "备注；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "countdown",
          "description": {
            "zh": "是否显示未来倒计时。",
            "en": "是否显示未来倒计时。"
          },
          "type": "boolean",
          "required": false
        },
        {
          "name": "kind",
          "description": {
            "zh": "event 事件 / anniversary 纪念日 / holiday 节日。",
            "en": "event 事件 / anniversary 纪念日 / holiday 节日。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "completed",
          "description": {
            "zh": "是否已经完成。",
            "en": "是否已经完成。"
          },
          "type": "boolean",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "update_event",
      "description": {
        "zh": "修改贝壳，仅修改提供的字段。",
        "en": "修改贝壳，仅修改提供的字段。"
      },
      "parameters": [
        {
          "name": "id",
          "description": {
            "zh": "查询得到的记录 ID。",
            "en": "查询得到的记录 ID。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "title",
          "description": {
            "zh": "事件名称。",
            "en": "事件名称。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "time",
          "description": {
            "zh": "HH:mm；空字符串清除。",
            "en": "HH:mm；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "note",
          "description": {
            "zh": "备注；空字符串清除。",
            "en": "备注；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "countdown",
          "description": {
            "zh": "是否显示未来倒计时。",
            "en": "是否显示未来倒计时。"
          },
          "type": "boolean",
          "required": false
        },
        {
          "name": "kind",
          "description": {
            "zh": "event 事件 / anniversary 纪念日 / holiday 节日。",
            "en": "event 事件 / anniversary 纪念日 / holiday 节日。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "completed",
          "description": {
            "zh": "是否已经完成。",
            "en": "是否已经完成。"
          },
          "type": "boolean",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "delete_event",
      "description": {
        "zh": "按用户意愿删除指定贝壳。",
        "en": "按用户意愿删除指定贝壳。"
      },
      "parameters": [
        {
          "name": "id",
          "description": {
            "zh": "查询得到的记录 ID。",
            "en": "查询得到的记录 ID。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "get_events",
      "description": {
        "zh": "查询贝壳列表及相对今天的天数。",
        "en": "查询贝壳列表及相对今天的天数。"
      },
      "parameters": [
        {
          "name": "from",
          "description": {
            "zh": "开始日期 YYYY-MM-DD。",
            "en": "开始日期 YYYY-MM-DD。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "to",
          "description": {
            "zh": "结束日期 YYYY-MM-DD。",
            "en": "结束日期 YYYY-MM-DD。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "record_weight",
      "description": {
        "zh": "新增体重记录；不分析涨跌、目标或体型。",
        "en": "新增体重记录；不分析涨跌、目标或体型。"
      },
      "parameters": [
        {
          "name": "value",
          "description": {
            "zh": "公斤数。",
            "en": "公斤数。"
          },
          "type": "number",
          "required": true
        },
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "recordedAt",
          "description": {
            "zh": "ISO8601 时间，必须含 Z 或时区偏移；省略为现在。",
            "en": "ISO8601 时间，必须含 Z 或时区偏移；省略为现在。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "get_weight_records",
      "description": {
        "zh": "查询体重时间序列。",
        "en": "查询体重时间序列。"
      },
      "parameters": [
        {
          "name": "date",
          "description": {
            "zh": "可选日期 YYYY-MM-DD，省略时不按单日筛选。",
            "en": "可选日期 YYYY-MM-DD，省略时不按单日筛选。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "from",
          "description": {
            "zh": "开始日期。",
            "en": "开始日期。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "to",
          "description": {
            "zh": "结束日期。",
            "en": "结束日期。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "latest",
          "description": {
            "zh": "只返回最新一条。",
            "en": "只返回最新一条。"
          },
          "type": "boolean",
          "required": false
        }
      ]
    },
    {
      "name": "record_cycle",
      "description": {
        "zh": "记录实际经期开始/结束；同一开始日更新，修改开始日期请提供 id。不将估算写为事实。",
        "en": "记录实际经期开始/结束；同一开始日更新，修改开始日期请提供 id。不将估算写为事实。"
      },
      "parameters": [
        {
          "name": "startDate",
          "description": {
            "zh": "实际开始日期 YYYY-MM-DD。",
            "en": "实际开始日期 YYYY-MM-DD。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "endDate",
          "description": {
            "zh": "实际结束日期；空字符串清除。",
            "en": "实际结束日期；空字符串清除。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "id",
          "description": {
            "zh": "修改已有记录时的 ID。",
            "en": "修改已有记录时的 ID。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "get_cycle_status",
      "description": {
        "zh": "读取实际经期与单独标记的日期估算，不提供诊断。",
        "en": "读取实际经期与单独标记的日期估算，不提供诊断。"
      },
      "parameters": [
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "manage_record",
      "description": {
        "zh": "按用户意愿编辑碎片或删除记录。经期修改使用 record_cycle；体重改正需明确删除旧条再新增。",
        "en": "按用户意愿编辑碎片或删除记录。经期修改使用 record_cycle；体重改正需明确删除旧条再新增。"
      },
      "parameters": [
        {
          "name": "action",
          "description": {
            "zh": "update_note / delete_note / delete_weight / delete_cycle。",
            "en": "update_note / delete_note / delete_weight / delete_cycle。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "id",
          "description": {
            "zh": "查询得到的记录 ID。",
            "en": "查询得到的记录 ID。"
          },
          "type": "string",
          "required": true
        },
        {
          "name": "text",
          "description": {
            "zh": "编辑碎片时的新正文。",
            "en": "编辑碎片时的新正文。"
          },
          "type": "string",
          "required": false
        },
        {
          "name": "requestId",
          "description": {
            "zh": "可选重试标识；同一次写入重试须保持相同标识及参数。",
            "en": "可选重试标识；同一次写入重试须保持相同标识及参数。"
          },
          "type": "string",
          "required": false
        }
      ]
    },
    {
      "name": "generate_daily_digest",
      "description": {
        "zh": "生成并缓存日期唯一的晨间交接，返回 text、digest、alreadyGenerated。不会发送消息；工作流需自行注入与防重复投递。",
        "en": "生成并缓存日期唯一的晨间交接，返回 text、digest、alreadyGenerated。不会发送消息；工作流需自行注入与防重复投递。"
      },
      "parameters": [
        {
          "name": "date",
          "description": {
            "zh": "YYYY-MM-DD，省略使用设置时区的今天。",
            "en": "YYYY-MM-DD，省略使用设置时区的今天。"
          },
          "type": "string",
          "required": false
        }
      ]
    }
  ]
}
*/
async function invoke(action,p={}){let result;try{result=await ToolPkg.ipc.call('tidal_keeps.request',{action,params:{...p,author:'assistant',createdBy:'assistant'}},{targetRuntime:'main'});if(!result||typeof result!=='object')throw Error('主运行时没有返回结果。');}catch(e){result={success:false,message:e.message||String(e)};}if(typeof complete==='function')complete(result);return result;}
exports.add_daily_note=p=>invoke('add_daily_note',p);
exports.save_daily=p=>invoke('save_daily',p);
exports.get_daily_summary=p=>invoke('get_daily_summary',p);
exports.add_event=p=>invoke('add_event',p);
exports.update_event=p=>invoke('update_event',p);
exports.delete_event=p=>invoke('delete_event',p);
exports.get_events=p=>invoke('get_events',p);
exports.record_weight=p=>invoke('record_weight',p);
exports.get_weight_records=p=>invoke('get_weight_records',p);
exports.record_cycle=p=>invoke('record_cycle',p);
exports.get_cycle_status=p=>invoke('get_cycle_status',p);
exports.manage_record=async function(p={}){const {action,...rest}=p;if(!['update_note','delete_note','delete_weight','delete_cycle'].includes(action)){const r={success:false,message:'不支持此修改操作。'};if(typeof complete==='function')complete(r);return r;}return invoke(action,rest);};
exports.generate_daily_digest=p=>invoke('generate_daily_digest',p);
