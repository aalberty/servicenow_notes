# glidemodal

## glidemodal in ui actions
Short example of how to display a modal from a ui action that is a form link. May work with other types of ui actions as well, but others have not been tested to this point. BONUS! this example also leverages a GlideAjax call. 

You'll notice in this example, the OOB ui pages are used (glide_modal_confirm and glide_modal_info). More research is needed for understanding the `GwtMessage()` class; it was simply copied from [sample material](https://developer.servicenow.com/dev.do#!/reference/api/zurich/client/c_GlideModalV3API#r_GMODV3-GlideModal_S_B_N?navFilter=glidemodal).

### client script
```javascript
var dialog; 
function openModal() {
	dialog = new GlideModal("glide_modal_confirm", true, 300);
	dialog.setTitle(new GwtMessage().getMessage("Confirmation"));
	dialog.setPreference("body", new GwtMessage().format("This will trigger <some_business_process>. Would you like to continue?"));
	dialog.setPreference("focusTrap", true);
	dialog.setPreference("onPromptComplete", doComplete);
	dialog.setPreference("onPromptCancel", doCancel);
	dialog.render();
}

function doComplete () {
	var ga = new GlideAjax("<scope.glideajax_script_include>"); // Don't forget the scope!
	// ATTENTION!!! the sysparm_name param is available OOB to identify what function to run from the script include
    ga.addParam("sysparm_name", "process");
	var opid = g_form.getUniqueValue();
	ga.addParam("sysparm_opsrecid", opid);
	try {
        // used anon callback as a troubleshooting measure - not sure if it's required, or if it can be a named
        // function defined elsewhere in the client script
		ga.getXML(function (response) {
			var answer;
			try {
				answer = response.responseXML.documentElement.getAttribute("answer");
			} catch (e) {
				console.warn("GlideAJAX error: ", e);
			}
			
			var body = "No answer received. Check browser devtools console for possible warn/err messages.";

			if (answer != undefined) {
				body = answer;
			}

			dialog = new GlideModal("glide_modal_info", true, 900);
			dialog.setTitle(new GwtMessage().getMessage("Post-processing Results"));
			dialog.setPreference("body", new GwtMessage().format(body));
            // NOTICE!!! dialog.render must happen here. In another rendition, I tried doing a single dialog.render call
            // _after_ the catch below, but that was immediately executed after the AJAX call, and was re-rendering the modal
            // with no changes. Putting dialog.render here, and at the bottom inside of the catch block ensures that the modal
            // preferences will get updated before getting re-rendered.
			dialog.render();
		});
	} catch (e) {
		var msg = "There was a problem calling the GlideAJAX process function: " + JSON.stringify(e);
		dialog = new GlideModal("glide_modal_info", true, 900);
		dialog.setTitle(new GwtMessage().getMessage("Warning!"));
		dialog.setPreference("body", new GwtMessage().format(msg));
		console.warn(msg);
		dialog.render();
	}
	
}

function doCancel () {
	dialog.destroy();
}
```


## glidemodal in client scripts
Short example of how to display a modal from a client script in the fulfiller view. This approach will work correctly
whether the user is in the legacy fulfiller view, or the SOW view

### client script
```javascript
function onLoad() {
   var shouldDisplay = true; // conditional toggle to display the modal
   if (shouldDisplay) {
        // Determine which fulfiller view this is currently running in
        var url = top.location.href;
        var isSOW = url.indexOf("/now/sow/") != -1;

        // GlideModal for legacy fulfiller view
        var header = "Descriptive Modal Header";
        if (!isSOW) {
            var dialog = new GlideModal("<endpoint_of_ui_page_to_display_without_.do>");
            dialog.setTitle(header);
            dialog.render();
        } else {
            // g_modal for SOW view
            var uiPageId = "<sys_id_of_ui_page_to_display>";
            g_modal.showFrame({
                url: '/ui_page.do?sys_id=' + uiPageId,
                title: header,
            });
        }
   }
}
```


### ui page
Here is an example UI page that could be used as the body of the modal above. This setup will display a modal
that requires the user's confirmation in order to close it.

#### html
Note the `invokeConfirmCallBack` as the `onSubmit` function - developer can define seperate callback behavior based
on the button that the user clicks on the confirmation modal (confirm or cancel). GRC UI page `generic_confirm_dialog`
can be used as a model of this behavior if desired. Out of scope for this example as it would make it more complex than needed.

```html
<g:ui_form onsubmit="return invokeConfirmCallBack('ok');">
<table width="100%">
        <tr><td/><td/></tr>
	<tr>
		<td style="white-space:wrap"><g:no_escape>Main content displayed on the modal</g:no_escape></td>	
	</tr>
        <tr><td/><td/></tr>
</table>
</g:ui_form>

```

#### client script
```javascript
function invokePromptCallBack(type) {
    try {
		var gdw = GlideDialogWindow.get();
		var f = gdw.getPreference('onPromptComplete');
		if (typeof(f) == 'function') {
			try {
				f.call(gdw, gdw.getPreference('oldValue'));
			} catch(e) {
			}
		}
		gdw.destroy();
		return false;
	} catch(e) {
		return false;
	}
}
```


