Store plugins with an available update are valid targets for the below script (sys_store_app where update_available is true)  

Trigger an update to target plugin:  

```javascript
var appgr = new GlideRecord("sys_store_app");
var worker = new sn_appclient.AppUpgrader();
if( appgr.get("scope", "sn_audio_player") ){
    worker.upgrade(appgr.sys_id.toString(), appgr.latest_version, false);
}
```




To review errors related to auto-upgrading plugins:

```javascript
function reviewAutoUpdate() {
    var list = new GlideRecord("sys_flow_context");
    list.addEncodedQuery("sys_created_onONYesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()^name=Update plugin");
    list.query();
    var errors = []
    var error;

    while (list.next()){
        error = checkErrorMessage(list.getUniqueValue())


        if (error != false) {
            errors.push(error)
        }
    }

    gs.info(JSON.stringify(errors, undefined, 4))
}

reviewAutoUpdate()



function checkErrorMessage(contextId){
    var gr = new GlideRecord("sys_flow_runtime_value")
    gr.addEncodedQuery("context=" + contextId)
    gr.query()
    while (gr.next()) {
        var data = JSON.parse(gr.getValue('value'));


        if (data != undefined) {

            if (data.success.value == "error") {
                return {"sys_id": contextId, "error": data.message.value};
            }
        }

    }

    return false;
}
```