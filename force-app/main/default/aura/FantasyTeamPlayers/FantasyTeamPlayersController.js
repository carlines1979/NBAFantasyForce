({
	doInit : function(component, event, helper) {
        
        console.log("TEAM ID: " + JSON.stringify(component.get("v.teamId")) ); 
        var teamId = component.get("v.teamId"); 
        helper.fetchTeamPlayers(component, teamId);
		
	},
    
    removePlayer : function(component, event, helper) {
        var playerId = event.target.id; 
        var teamId = component.get("v.teamId");
        helper.deleteTeamPlayer(component, playerId, teamId)
    }
})