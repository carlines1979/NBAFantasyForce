public class Balldontliecallouts {
    
    public static void getTeams() {
        List <Object> teams = new List <Object>();
        Integer counter = 0 ; 
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.balldontlie.io/api/v1/teams') ;
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            
            Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
            teams = (List<Object>) results.get('data'); 	
          	
            List<Team__c> insertTeams = new List<Team__c>();
            //Get the record type ID so that we can assign it
            Id recordTypeId = Schema.SObjectType.Team__c.getRecordTypeInfosByName().get('NBA Team').getRecordTypeId();
            for (Object team : teams) {
                Map<String, Object> teamInfo = (Map<String,Object>) team;
               	
                Team__c insertTeam = new Team__c (Name = (String)teamInfo.get('full_name'),
                                             	 City__c = (String)teamInfo.get('city'),
                                              	 Conference__c = (String)teamInfo.get('conference'),	
                                              	 Division__c = (String)teamInfo.get('division'),
                                                 Abbreviation__c = (String)teamInfo.get('abbreviation'),
                                                 RecordTypeId = recordTypeId ) ; 
                insertTeams.add(insertTeam); 
                counter += 1 ; 
            }
            
            insert insertTeams ; 
          	System.debug('INSERTED TEAMS: ' + counter);
        }
            
      
    }
    
    
    public static void getPlayers(){
        
		List<Contact> players = new List<Contact>(); 
        
        // First Call to get the number of pages.
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.balldontlie.io/api/v1/players/') ;
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            
            
            Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
            Object meta = (Object) results.get('meta');
           
            Map<String, Object> metainfo = (Map<String,Object>) meta;
            Integer pages = (Integer) metainfo.get('total_pages');  
            
            List<Team__c> teams = [Select Id, Name FROM Team__c ];
            
            
            for (Integer page=100 ; page<133 ; page++){
                System.debug('PAGE: ' + page + ' of: ' + pages);
            	players.addAll(getPlayersCallOut(page , teams)) ;
                
            }
            
            insert players ; 
        
        }
        
        
    }
    
    
    public static List<Contact> getPlayersCallOut(Integer page, List<Team__c> teams) {
        
        List <Object> players = new List <Object>();
        List<Contact> insertPlayers = new List<Contact>();
        System.debug('PAGE in future: ' + page);
        
            
        	System.debug('page......' + page); 
             
            Http http = new Http();
            HttpRequest request = new HttpRequest(); 
            request.setMethod('GET');
            request.setEndpoint('https://www.balldontlie.io/api/v1/players/?page=' + page) ;
            HttpResponse response = http.send(request);
            
            if(response.getStatusCode() == 200) {
                Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
                players = (List<Object>) results.get('data'); 
                
                //Get the record type ID so that we can assign it
                Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('NBA Player').getRecordTypeId();
                
               
                
                for (Object player : players) {
                    Map<String, Object> playerInfo = (Map<String,Object>) player;
                    
                    Map<String, Object> playerTeam = (Map<String,Object>) playerInfo.get('team'); 
                                        
                    Team__c team = new Team__c() ; 
                    String teamname = (String)playerTeam.get('full_name');
                    
                    for (Team__c t : teams) {
                        if (teamname.equalsIgnoreCase(t.Name)) {
                            team.Id = t.Id ; 
                            team.Name = t.Name ;
                            break; 
                        }
                    }
                    
                                                          
                    Integer heightfeet;
                    Integer heightinches;
                    Integer weight ;
                    if (playerInfo.get('height_feet') == null){
                        heightfeet = 0;
                    } else {
                        heightfeet = (Integer)playerInfo.get('height_feet');
                    }
                    if (playerInfo.get('height_inches') == null){
                        heightinches = 0;
                    } else {
                        heightinches = (Integer)playerInfo.get('height_inches');
                    }
                    if (playerInfo.get('weight_pounds') == null){
                        weight = 0;
                    } else {
                        weight = (Integer)playerInfo.get('weight_pounds');
                    }
                    
                    // Assign position picklist value
                    String position = (String)playerInfo.get('position');
                    Integer serverId = (Integer)playerInfo.get('id');                  
                   	if (position == 'F') {
                        position = 'Forward';
                    } else if (position == 'C') {
                        position = 'Center';
                    } else if (position == 'G') {
                        position = 'Guard';
                    } else if (position == 'G-F' ){
                        position = 'Guard-Forward'; 
                    } else if (position == 'F-C') {
                        position = 'Forward-Center';
                    } else {
                        position = 'Unknown'; 
                    }
                    
                    String lastName = (String)playerInfo.get('last_name'); 
                    if (!String.isEmpty(lastName) && !(position=='Unknown')) { 
                        Contact insertPlayer = new Contact (FirstName = (String)playerInfo.get('first_name'),
                                                            LastName  = (String)playerInfo.get('last_name'),
                                                            position__c   = position ,
                                                            Height_Feet__c = heightfeet,
                                                            Height_Inches__c = heightinches,
                                                            Weight__c = weight, 
                                                            Team__c = team.Id,
                                                            ServerId__c = serverId, 
                                                            RecordTypeId = recordTypeId ) ; 
                        
                        
                        insertPlayers.add(insertPlayer); 
                    } else {
                        System.debug('Page:' + page + 'Team:' + Team.name + 'FirstName: ' + (String)playerInfo.get('first_name'));
                    }
                    
                }
                
                
               // insert insertPlayers ;  
               
                
        }
		       	
        
        return insertPlayers ;  
        
        
        
    }

}