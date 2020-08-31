({
	doInit : function(component, event, helper) {
        
        var params = event.getParam('arguments');
        if (params) {
            var playerName = params.playerName;
            component.set("v.PlayerName", playerName)
            helper.fetchPlayers(component,playerName); 
        }
		
	},
    
    getSelectedPlayerId : function (component, event, helper){
        var selectedPlayerId = event.getParam('selectedRows');
        component.set("v.noPlayerSelected" , false); 
        component.set("v.playerSelected", selectedPlayerId[0].ServerId__c);
        component.set("v.playerSelectedName", selectedPlayerId[0].Name);
        
    },
    
    StatsPlayer : function (component, event, helper){
        var serverId = component.get("v.playerSelected");
        helper.getLastSeasonStats(component, serverId); 
    },
})