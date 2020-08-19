({
	doInit : function(component, event, helper) {
        
        console.log("TEAM ID: " + JSON.stringify(component.get("v.teamId")) ); 
        var teamId = component.get("v.teamId"); 
        helper.fetchTeamPlayers(component, teamId);
		
	},
})