Sample code for a script include that would then be invoked in an advanced reference qualifier field.
```
	//Grabbing departments that do not start with a 1, 2, 3, or 4
	//In this case, it's performing against several hundred records with no
	//noticable performance degredation on the UI
	//Note: the "NOT LIKE" operator is an undocumented and unsupported query
	getDepartments: function(){
		var gr = new GlideRecord("cmn_department");
		gr.addQuery("name", "NOT LIKE", "1%");
		gr.addQuery("name", "NOT LIKE", "2%");
		gr.addQuery("name", "NOT LIKE", "3%");
		gr.addQuery("name", "NOT LIKE", "4%");
		gr.query();
		var colist = [];
		while(gr.next()){
			colist.push(gr.getUniqueValue());
		}
		return "sys_idIN" + colist.join(",");
	}
```

Ref. Qual. field code:

```
javascript: new ScriptIncludeName().getDepartments();
```

Typically the reference qualifier for a field will be calculated once on page load - if you need the reference qualifier to dynamically update based on another field(s) value, then make sure to set the `ref_qual_elements` attribute. E.g. `ref_qual_elements=account;product`.  

NOTE: the '()' after the name of the script include but before the name of the function are easy to forget. If you do forget them, the reference qualifier will silently fail!!!  
