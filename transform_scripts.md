# Transform Scripts

## Types
| Script Type        | Description                                                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------|
| onStart        | Executes at the start of an import before any rows are read                                              |
| onAfter        | Executes at the end of a row transformation and after the source row has been transformed and saved      |
| onBefore       | Executes at the start of a row transformation and before the row is transformed into the target row      |
| onChoiceCreate | Executes at the start of a choice value creation before the new choice value is created                  |
| onComplete     | Executes at the end of an import after all rows are read and transformed                                 |
| onForeignInsert| Executes at the start of the creation of a related, referenced record before the record is created       |
| onReject       | Executes during foreign record or choice creation if the foreign record or choice is rejected; the entire transformation row is not saved |

source: https://developer.servicenow.com/dev.do#!/learn/courses/xanadu/app_store_learnv2_importingdata_xanadu_importing_data_into_servicenow/app_store_learnv2_importingdata_xanadu_importing_data/app_store_learnv2_importingdata_xanadu_transform_event_scripts

## Variables

### onAfter variables
|Variable Name|Variable Type|Description|
|---|---|---|
|source|	GlideRecord|	The row of the source table that is currently being processed.|
|target|	GlideRecord|	The row of the target table that is currently being processed.|
|import_set|	GlideRecord|	The import set that is currently being transformed.|
|map|	GlideTransformMap|	Read-only information about the current transform map record.|
|log|	Function|	The log object for the current import run. For example, log.info(...), log.warn(...), log.error(...).|
|action|	String|	Action returns a value of either "insert" or "update" indicating whether the current target row was created or updated.|
|status_message|	String|	Defines a custom message to be sent in the <status_message> XML response.|
|error|	Boolean|	When set to true, will halt the entire transformation for the current import set, with an error message.|
|error_message|	String|	Defines a custom message to be sent in the <error_message> XML response.|


source: https://www.servicenow.com/docs/bundle/yokohama-integrate-applications/page/script/server-scripting/reference/r_MapWithTransformationEventScripts.html