({
	clickSearch : function(component, event, helper) {
        
        var e = component.getEvent("PlayerSearch");
        e.setParams({"playerName" : component.get("v.searchInput")});
        e.fire(); 
		
	}
})