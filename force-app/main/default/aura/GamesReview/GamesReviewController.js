({
	onclicksubmit : function(component, event, helper) {
        var serverId = component.get("v.teamrecord.ServerId__c");
        console.log("ServerId: " + serverId);
		//component.set("v.serverid" , serverId );
        
        var selectedYear = component.get("v.selectedYear");
        //console.log("Selected Year:" + selectedYear);
        
        component.set("v.isModalOpen" , true);
        
        var childComponent = component.find("CmpTeamGames"); 
        //console.log("found teamgames" + childComponent); 
        childComponent.initMethod(selectedYear , serverId);
       		        
        
	},
    
    onChange:function(component, event, helper) {
        var y=component.find("selectyear").get("v.value");
        //console.log("YEar :  "+ y);
        component.set("v.selectedYear",component.find("selectyear").get("v.value"));
    },
    
    onmodalclose : function(component, event, helper) {
    	component.set("v.isModalOpen", false);
	},
})