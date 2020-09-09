({
	fetchTeams : function(component, event) {
		var action = component.get("c.getTeams");  
        // Add callback behavior for when response is received
        var params = {} ;
        if (params){
            action.setParams(params);
        }
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
               
                console.log("response : " + response.getReturnValue());
                var teams = response.getReturnValue();
                if (teams) { 
                    component.set("v.teams", teams);                   
                } 
                
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        
        // Send action off to be executed
        $A.enqueueAction(action);
	},
	
})