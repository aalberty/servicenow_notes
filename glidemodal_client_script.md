# glidemodal in client scripts
Short example of how to display a modal from a client script in the fulfiller view. This approach will work correctly
whether the user is in the legacy fulfiller view, or the SOW view

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
            var dialog = new GlideModal("<name_of_ui_page_to_display>");
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