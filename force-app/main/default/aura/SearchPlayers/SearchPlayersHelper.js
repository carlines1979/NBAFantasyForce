({
	fetchNBATeams : function(component, event) {
        
        var action = component.get("c.getNBATeams");
        // No input params
        action.setParams({});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the Teams list.
 				var rows = response.getReturnValue();
                component.set("v.teams", rows); 

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
    
    fetchNBAPlayers : function(component, teamId) {
        
       	component.set('v.columns', [
            	{label: 'Player Name', fieldName: 'Name', type: 'text'},
            	{label: 'Position', fieldName: 'Position__c', type: 'text'},
                {label: 'Height', fieldName: 'Height__c', type: 'text'},
            	{label: 'Weight', fieldName: 'Weight__c', type: 'text'},
            ]);
        
        var action = component.get("c.getNBATeamPlayers");
        console.log("TEAM ID " + teamId); 
        action.setParams({NBATeamId: teamId});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the list.          
 				var data = response.getReturnValue();
                component.set("v.data", data); 

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
        
        
    }
})