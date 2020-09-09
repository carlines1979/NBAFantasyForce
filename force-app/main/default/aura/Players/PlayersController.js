({
	search : function(component, event, helper) {
        console.log("event received: " + event.getParam("playerName") ); 
        var playerName = event.getParam("playerName");
        var childComponent = component.find("childplayersfound");    
        childComponent.initMethod(playerName);
		
	},
    
    doInit : function(component, event, helper) {
        var url1 = $A.get('$Resource.CommunityImages') + '/TeamList.jpeg';
        component.set('v.backgroundImageURL1', url1);
    }
})