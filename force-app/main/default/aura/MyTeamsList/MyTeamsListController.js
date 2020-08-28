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
        this.doInit(component, event, helper); 
    }, 
    
    deleteFantasyTeam : function(component, event, helper){
        var teamId = event.target.id;
        helper.deleteTeam(component, event, teamId);        
    },
    
    maxPlayers : function(component, event, helper){
        var butId = event.getParam("teamId");
        var but  = document.getElementById(butId); 
        document.getElementById(butId).disabled=true;
    }
})