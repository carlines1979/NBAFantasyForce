({
	doInit : function(component, event, helper) {
		
        helper.fetchFantasyTeams(component, event);   
	},
    
    openModalPlayers : function(component, event, helper) {
        component.set("v.isModalOpen" , true); 
        var childComponent = component.find("CmpSearchPlayers"); 
        var teamId = event.target.id;
        childComponent.initMethod(teamId);

    },
    
    onmodalclose : function(component, event, helper){
        component.set("v.isModalOpen", false);
    }
})