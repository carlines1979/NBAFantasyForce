({
	fetchAverStats : function(component, event, playerId) {
        component.set('v.isLoading', true);
		var action = component.get("c.getAverStats");
        action.setParams({season: 2018,
                          playerId: playerId});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(JSON.stringify(response.getReturnValue()));
                var resp = response.getReturnValue();
                
        		component.set("v.data", resp);
    			var data = component.get("v.data");
        		component.set('v.isLoading', false);
               
    			console.log("DATA: " + data)
    			//component.set("v.data", rows); 
            } else {
                //UNSuccess message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": "Something went wrong. Please, try again later!",
                    "type" : 'error'
				});
                toastEvent.fire();
				component.set('v.isLoading', false);
            }
        });
        $A.enqueueAction(action);
                              
	}
})