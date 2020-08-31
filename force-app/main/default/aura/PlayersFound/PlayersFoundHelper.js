({
	fetchPlayers : function(component, playerName) {
        
            component.set('v.columns', [
            	{label: 'Player Name', fieldName: 'FirstName', type: 'text'},
                {label: 'Player LastName', fieldName: 'LastName', type: 'text'},   
            	{label: 'Position', fieldName: 'Position__c', type: 'text'},
                {label: 'Team', fieldName: 'TeamName', type: 'text'},
            ]);
        
        var action = component.get("c.searchPlayerByName");
                console.log("NAME: " + playerName); 
        action.setParams({name: playerName});
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success set the list.          
 				var data = response.getReturnValue();
                for (var i = 0; i < data.length; i++) {
                	var row = data[i];
                    if (row.Team__c) {
                     	row.TeamName = row.Team__r.Name;   
                    } 
               		component.set("v.data", data);        
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
        
	getLastSeasonStats : function(component,ServerId) {
        var action = component.get("c.getLastSeasonStats");
        action.setParams({ServerId: ServerId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                let val = response.getReturnValue() ;
                
                var labelset=[] ;
                var dataset=[] ;
                val.forEach(function(key) {
                    labelset.push(key.label) ; 
                    dataset.push(key.count) ; 
                });
                var playerName = component.get("v.playerSelectedName"); 
                new Chart(document.getElementById("bar-chart"), {
                    type: 'bar',
                    data: {
                        labels:labelset,
                        datasets: [{
                            label: playerName,
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#3e95cd"],
                            data: dataset
                        }]
                    },
                    options: {
                        title: {
                            display: true,
                            text: 'Last Season Player Stats'
                        }
                    }
                });
                
            }
        });
        $A.enqueueAction(action); 
    },
})