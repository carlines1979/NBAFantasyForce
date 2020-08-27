({
	fetchFantasyTeams : function(component,event) {
		
        var action = component.get("c.getUserTeams");
        action.setParams({});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the list.
 				var rows = response.getReturnValue();
                console.log("response: " + rows);
                component.set("v.teamList", rows); 

            } else if (state === "ERROR") {
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server.
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": message, 
                    "type" : 'error'
				});
                toastEvent.fire();
                
            } else {
                //UNSuccess message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": "Something went wrong. Please, try again later!"
                    
				});
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
	},
    
    deleteTeam : function(component, event, teamId) {
		
        var action = component.get("c.deleteTeam");
        console.log("TEAM ID " + teamId); 
        action.setParams({teamId: teamId});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the list.
 				          
 				var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "SUCCESS!",
                    "message": "Team Deleted!",
                     "type" : 'success'
				});
                toastEvent.fire();
                
                component.refreshMethod();

            } else if (state === "ERROR") {
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server.
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": message, 
                    "type" : 'error'
				});
                toastEvent.fire();
                
            } else {
                //UNSuccess message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": "Something went wrong. Please, try again later!"
                    
				});
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
	},
    
 
 
})