({
	clickCreate : function(component, event, helper) {
        
        var fanTeam = component.get("v.newFantasyTeam");
        helper.createFantasyTeam(component, fanTeam, event);                       	
	},
})