({
	openWiki : function(component, event, helper) {
        var name = component.get("v.teamrecord.Name");
        var namerep = name.replace(/ /g, "_"); 
		window.open("https://en.wikipedia.org/wiki/"+namerep);
	}
})