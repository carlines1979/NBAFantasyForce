({
	doinit : function(component, event, helper) {
        
        var params = event.getParam('arguments');
        if (params) {
            var season = params.season;
            var teamId = params.teamId;
            if (season) {
                component.set("v.selectedSeason" , season);
            } else {
                component.set("v.selectedSeason" , "All Seasons");
            }
            component.set("v.selectedTeamId", teamId); 
            var page = component.get("v.page"); 
            if (page){
               page = page + 1 ;
            } else {
                page = 1; 
            }
            helper.fetchTeamGames(component, season, teamId, page); 
        }
	} ,
    
    onmodalclose : function(component, event, helper) {
    
    	var e = component.getEvent("CloseTeamGames");
    	e.fire() ; 
    
	},
    
    nextpage : function(component, event, helper) {
        var page = component.get("v.page");
        console.log("NExt page:" + page); 
        page = page + 1;
        console.log("NExt page:" + page); 
        helper.fetchTeamGames(component, component.get("v.selectedSeason"), component.get("v.selectedTeamId"), page);        
    },
    previouspage : function(component, event, helper) {
        var page = component.get("v.page");
       
        page = page - 1; 
        helper.fetchTeamGames(component, component.get("v.selectedSeason"), component.get("v.selectedTeamId"), page);        
    }
})