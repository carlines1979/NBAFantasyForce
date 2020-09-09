public class TeamsController {
    
    @AuraEnabled
    public static List<Team__c> getTeams(){
        
        return [SELECT Name, Logo__c FROM Team__c] ;        
        
    }

}