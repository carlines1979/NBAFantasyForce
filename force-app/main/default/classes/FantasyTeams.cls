public without sharing class FantasyTeams {

    
    @AuraEnabled
    public static void createTeam(FantasyTeam__c fanTeam){
        try {
            Id userId = System.UserInfo.getUserId(); 
            User us = [SELECT contactId  FROM user WHERE id=:userId];
            
            Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('FantasyPlayer').getRecordTypeId();
            
            Contact con = [Select Id, Name FROM Contact WHERE id =:us.ContactId and RecordTypeId = :recordTypeId ]; 
            
            fanTeam.FantasyPlayer__c = con.Id; 
            
            insert fanTeam;    
            
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage()); 
        }     
        
    }
    
    @AuraEnabled
    public static List<FantasyTeam__c> getUserTeams(){
        
        try{ 
            List<FantasyTeam__c> fanteams = new List<FantasyTeam__c>();
            
       		Id userId = System.UserInfo.getUserId(); 
            User us = [SELECT contactId  FROM user WHERE id=:userId];
            
            Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('FantasyPlayer').getRecordTypeId();
            
            Contact con = [Select Id, Name FROM Contact WHERE id =:us.ContactId and RecordTypeId = :recordTypeId ]; 
            
            fanteams = [SELECT Id, FantasyName__c FROM FantasyTeam__c WHERE FantasyPlayer__c=:con.Id]; 
                   
            return fanteams;  
            
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage()); 
        }
        
    }
    
    @AuraEnabled
    public static List<Contact> getTeamPlayers(FantasyTeam__c team) {
        
        try {
            List<Contact> teamPlayers = new List<Contact>();
        	Id teamId = team.Id;
            Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('NBA Player').getRecordTypeId();
            teamPlayers = [SELECT id, Name, Position__c , Height__c FROM Contact WHERE 
                           Id IN (SELECT Player__c FROM FanTeamPlayer__c WHERE FantasyTeam__c = :teamId)
                          and RecordTypeId = :recordTypeId ] ; 
            
            return teamPlayers; 
            
        } catch (Exception e){
            throw new AuraHandledException('Server-side Error: ' + e.getMessage() ); 
        }       
        
    }
    
    
}