({
	doInit : function(component, event, helper) {
        
        var params = event.getParam('arguments');
        if (params) {
            var playerName = params.playerName;
            component.set("v.PlayerName", playerName)
            helper.fetchPlayers(component,playerName); 
        }
		
	}
})