({
	fetchTeamPlayers : function(component, event, teamId) {
        var action = component.get("c.getTeamPlayers");
        action.setParams({team : teamId});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the list.
 				var rows = response.getReturnValue();
                component.set("v.playersList", rows); 
                
                if (rows.length > 5){
                    var e = component.getEvent("MaxPlayers");
                    e.setParams({"teamId" : component.get("v.teamId").Id});
                    e.fire();
                }
                
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
    
    deleteTeamPlayer : function (component, event,  playerId, teamId) {
        
        var action = component.get("c.deleteTeamPlayer");
        action.setParams({team : teamId,
                          playerId : playerId});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Player removed from Fantasy Team", 
                    "type" : 'success'
				});
                toastEvent.fire();
 				//Fetch player to refresh the view				
 				this.fetchTeamPlayers(component, event, teamId); 

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