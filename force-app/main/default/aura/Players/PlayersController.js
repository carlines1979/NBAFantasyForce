({
	search : function(component, event, helper) {
        console.log("event received: " + event.getParam("playerName") ); 
        var playerName = event.getParam("playerName");
        var childComponent = component.find("childplayersfound");    
        childComponent.initMethod(playerName);
		
	}
})