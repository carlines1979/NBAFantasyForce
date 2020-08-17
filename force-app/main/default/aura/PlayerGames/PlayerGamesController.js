({
	doinit : function(component, event, helper) {
    	var params = event.getParam('arguments');
        if (params) {
            var playerId = params.PlayerId;
            var playerName = params.PlayerName;

            component.set("v.selectedPlayerName" , playerName);
            component.set("v.selectedPlayerId", playerId); 
            var page = component.get("v.page"); 
            
            if (page){
               page = page + 1 ;
            } else {
                page = 1; 
            }
            
            helper.fetchPlayerGames(component, playerId, page); 
        } 
    
	},
    onmodalclose : function(component, event, helper) {
    	var e = component.getEvent("ClosePlayerGames");
    	e.fire() ; 
    
	},
    
    nextpage : function(component, event, helper) {
        var page = component.get("v.page");
        console.log("NExt page:" + page); 
        page = page + 1;
        console.log("NExt page:" + page); 
        helper.fetchPlayerGames(component, component.get("v.selectedPlayerId"), page);        
    },
    previouspage : function(component, event, helper) {
        var page = component.get("v.page");
       
        page = page - 1; 
        helper.fetchPlayerGames(component, component.get("v.selectedPlayerId"), page);        
    }
})