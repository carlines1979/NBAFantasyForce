({
	doInit : function(component, event, helper) {
		var params = event.getParam('arguments'); 
        if (params) {
            var TeamId = params.TeamId; 
            component.set("v.FanTeamId" , TeamId);           
        }
        helper.fetchNBATeams(component, event)
	},
    
    onChange:function(component, event, helper) {
        var teamId = component.find("selectteam").get("v.value");
        helper.fetchNBAPlayers(component, teamId); 
    },
    
    getSelectedPlayerId : function (component, event, helper){
        var selectedPlayerId = event.getParam('selectedRows');
        component.set("v.noPlayerSelected" , false); 
        component.set("v.playerSelected", selectedPlayerId[0]);
    },
    
    addPlayer : function(component, event, helper) {
      var TeamId = component.get("v.FanTeamId");
      var PlayerId = component.get("v.playerSelected"); 
      helper.addPlayerToTeam(component, event, TeamId, PlayerId);
 
    },
    
    onmodalclose : function(component, event, helper){
        var e = component.getEvent("ClosePlayerSelection");
    	e.fire() ; 
    },
})