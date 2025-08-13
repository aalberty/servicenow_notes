# flow runtime values
Want to do deeper analysis of flow runtimes than the UI will allow for? Pull the runtime values via script instead for external analysis.

## sys_flow_runtime_value
These are hidden by security rules when you try to view via list, however you can still query via background script. I'd recommend leaving the JSON
parse and stringify in as it can be kind of messy to read otherwise. You can get runtime context IDs from `sys_flow_context` - filter on the `.name` field.

```javascript
var gr = new GlideRecord("sys_flow_runtime_value")
var targetContext = <target_context_sys_id>
gr.addEncodedQuery("context=" + targetContext)
gr.query()
gr.next()
var jdata = JSON.parse(gr.getValue('value'))

gs.info(JSON.stringify(jdata, undefined, 4))
```


## opaque runtime values
Sometimes the runtime values contain so much data that they need to be compressed and stored as chunks (similar to how attachments are handled).
This will be indicated by little to no value present in the `sys_flow_runtime_value.value` field (query rowcount of `sys_flow_runtime_value_chunk` ahead of time). 
In this case, you can use the following.

```javascript
var gr = new GlideRecord("sys_flow_runtime_value_chunk")
var targetRuntime = <sys_id_of_sys_flow_runtime_value>
gr.get(targetRuntime)
var bytes = GlideStringUtil.base64DecodeAsBytes(gr.data)
var data = GlideCompressionUtil.expandToString(bytes)
var jdata = JSON.parse(data)
gs.info(JSON.stringify(jdata, undefined, 4))
```