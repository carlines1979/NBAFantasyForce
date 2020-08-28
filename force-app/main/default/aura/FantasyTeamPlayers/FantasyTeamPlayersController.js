({
	doInit : function(component, event, helper) {
        var teamId = component.get("v.teamId");
        helper.fetchTeamPlayers(component, event, teamId);
		
	},
    
    removePlayer : function(component, event, helper) {
        var playerId = event.target.id; 
        var teamId = component.get("v.teamId");
        helper.deleteTeamPlayer(component,event, playerId, teamId)
    }
})