({
	doInit : function(component, event, helper) {
		var params = event.getParam('arguments'); 
        if (params) {
            var TeamId = params.Team; 
            component.set("v.FanTeamId" , TeamId);           
        }
        helper.fetchNBATeams(component, event)
	},
    
    onChange:function(component, event, helper) {
        var teamId = component.find("selectteam").get("v.value");
        console.log("val :  "+ teamId);
        helper.fetchNBAPlayers(component, teamId); 
    },
    
    onmodalclose : function(component, event, helper){
        var e = component.getEvent("ClosePlayerSelection");
    	e.fire() ; 
    },
})