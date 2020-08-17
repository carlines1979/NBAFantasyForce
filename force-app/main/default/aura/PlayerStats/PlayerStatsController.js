({
    
	onclicksubmit : function(component, event, helper) {
        var playerId = component.get("v.playerrecord").ServerId__c;
        var playerName = component.get("v.playerrecord").Name;
        component.set("v.isModalOpen" , true);
        
        var childComponent = component.find("CmpPlayerGames"); 
        //console.log("found teamgames" + childComponent); 
        childComponent.initMethod(playerId, playerName);
	},
    
    recordUpdate: function(component, event, helper) {
        var playerId = component.get("v.playerrecord").ServerId__c ; 
        helper.fetchAverStats(component, event, playerId) ;
    },
    
    onmodalclose : function(component, event, helper) {
    	component.set("v.isModalOpen", false);
	},
})