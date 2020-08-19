({
	refreshList : function(component, event, helper) {
		var childComponent = component.find("teamlist"); 
        console.log("CALL REFRESH METHOD");    
        childComponent.refreshMethod();
	},
})