# glidemodal in client scripts
Short example of how to display a modal from a client script in the fulfiller view. This approach will work correctly
whether the user is in the legacy fulfiller view, or the SOW view

## client script
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


## ui page
Here is an example UI page that could be used as the body of the modal above. This setup will display a modal
that requires the user's confirmation in order to close it.

### html
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

### client script
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


