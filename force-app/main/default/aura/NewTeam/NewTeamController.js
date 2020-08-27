({
	clickCreate : function(component, event, helper) {
        
        var fanTeam = component.get("v.newFantasyTeam");
        var teamName = Object.values(fanTeam)[1]; 
        if (teamName.length === 0) {
            alert("Give your team a cool name!");   
        } else {           
            helper.createFantasyTeam(component, fanTeam, event);
        }
                             	
	},
})