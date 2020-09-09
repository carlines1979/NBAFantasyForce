({
	refreshList : function(component, event, helper) {
		var childComponent = component.find("teamlist"); 
        console.log("CALL REFRESH METHOD");    
        childComponent.refreshMethod();
	},
    
    doInit : function(component, event, helper) {
        var url = $A.get('$Resource.CommunityImages') + '/NBALogo.jpg';
        component.set('v.backgroundImageURL', url);
        var url1 = $A.get('$Resource.CommunityImages') + '/basketballcourt.jpg';
        component.set('v.backgroundImageURL1', url1);
    }
})