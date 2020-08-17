public class FantasyTeams {

    
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
    
    
}