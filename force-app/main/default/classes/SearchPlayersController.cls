public without sharing class SearchPlayersController {
    
    @AuraEnabled
    public static List<Team__c> getNBATeams(){
        try {
            List<Team__c> NBATeams = [SELECT id, Name FROM Team__c]; 
        	return NBATeams;  
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage() );
        }       
    }
    
    @AuraEnabled
    public static List<Contact> getNBATeamPlayers(String NBATeamId) {
        
        try {
            List<Contact> teamPlayers = new List<Contact>();
            Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('NBA Player').getRecordTypeId();
            
            if (String.isEmpty(NBATeamId) || NBATeamId == null || NBATeamId == ' '){
                teamPlayers = [SELECT Name, Position__c, Height__c, Weight__c FROM Contact 
                           WHERE 	RecordTypeId 	= :recordTypeId ]; 
            } else {
                teamPlayers = [SELECT Name, Position__c, Height__c, Weight__c FROM Contact 
                           WHERE 	Team__c 		= :NBATeamId AND
                                	RecordTypeId 	= :recordTypeId ]; 
            }
                       
            return teamPlayers;    
            
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage() ); 
        }
        
    }
    
    @AuraEnabled
    public static void addPlayerToTeam(Id fanteam , Contact player){
        try {
             FanTeamPlayer__c ftp = new FanTeamPlayer__c (Player__c = player.Id , FantasyTeam__C = fanteam);
        
       		 insert ftp;
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage() ); 
        }
 
        
    }
    
    @AuraEnabled
    public static List<Contact> searchPlayerByName(String name){
        
        try {
            Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('NBA Player').getRecordTypeId();
            return [SELECT FirstName, LastName, Position__c, Team__r.Name FROM Contact 
                    WHERE RecordTypeId 	= :recordTypeId AND
                   		 (FirstName LIKE :name+'%' OR LastName LIKE :name+'%' OR Name LIKE :name+'%')] ; 
            
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage()); 
        }
        
        
    }

}