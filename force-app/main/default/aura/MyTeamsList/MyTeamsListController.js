({
	doInit : function(component, event, helper) {
		
        helper.fetchFantasyTeams(component, event);   
	},
    
    openModalPlayers : function(component, event, helper) {
        component.set("v.isModalOpen" , true); 
        var childComponent = component.find("CmpSearchPlayers"); 
        var teamId = event.target.id;
        console.log(teamId); 
        childComponent.initMethod(teamId);

    },
    
    onmodalclose : function(component, event, helper){
        component.set("v.isModalOpen", false);
        this.doInit(component, event, helper); 
    }
})