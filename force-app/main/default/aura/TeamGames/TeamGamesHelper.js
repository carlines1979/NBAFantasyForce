({
	fetchTeamGames : function(component, season, teamId, page) {
		component.set('v.columns', [
            	{label: 'Date', fieldName: 'gameDate', type: 'text'},
            	{label: 'Home Team', fieldName: 'teamnamehome', type: 'text'},
                {label: 'Home Score', fieldName: 'homeScore', type: 'number'},
            	{label: 'Visitor Team', fieldName: 'teamnamevisitor', type: 'text'},
                {label: 'Visitor Score', fieldName: 'visitorScore', type: 'number'},
            	{label: 'Post Season', fieldName: 'postseason', type: 'text'},
            ]);
            console.log("FETCH: " + page);
            component.set('v.isLoading', true);
            var action = component.get("c.getGames");
            action.setParams({Season: season,
                              TeamId: teamId,
                              Page: page});
            
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var rows = response.getReturnValue();
                
            	var datarow = []; 
                for (var i = 0; i < rows.length; i++) {
                	var row = rows[i];
                    if (i === 0) {
                     	component.set("v.page" , row);   
                        var page = component.get("v.page");
                        console.log("PAGE: " + page); 
                    } else if (i === 1){
                        component.set("v.lastpage" , row);   
                        var lastpage = component.get("v.lastpage");
                        console.log("LAST PAGE: " + lastpage);
                    } else {
                        console.log("else:" + row); 
                        datarow.push(row); 
                    }
                	       
           		}
        		component.set("v.data", datarow);
    			var data = component.get("v.data");
        		component.set('v.isLoading', false);
                if (page == lastpage){
                    component.set('v.isLastPage', true);
                } else {
                    component.set('v.isLastPage', false);
                }
        		if (page == 1){
                    component.set('v.isFirstPage', true);
                } else {
                    component.set('v.isFirstPage', false);
                }
    			//console.log("DATA: " + data)
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