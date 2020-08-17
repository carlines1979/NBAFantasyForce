public class TeamGames {
    
    @AuraEnabled
    public static List<Object> getGames(String Season , String TeamId, Integer Page) {
        System.debug('Season: ' + Season);
        List<Object> games = new List<Object>(); 
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        if (String.isEmpty(Season) || Season == ' ' || Season == null || Season == 'All Seasons'){
            request.setEndpoint('https://www.balldontlie.io/api/v1/games/?team_ids[]='+TeamId+'&page='+Page) ;
        } else {
            request.setEndpoint('https://www.balldontlie.io/api/v1/games/?seasons[]='+Season+'&team_ids[]='+TeamId+'&page='+Page) ;
        }
        
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            
            Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> gamesResults = (List<Object>) results.get('data');
            Object meta = (Object) results.get('meta');
            
            Map<String, Object> metainfo = (Map<String,Object>) meta;
            Integer pages = (Integer) metainfo.get('current_page'); 
            Integer totalpages = (Integer) metainfo.get('total_pages'); 
            //System.debug('Total Pages:' + pages);
            games.add(pages); 
            games.add(totalpages);
            
            for (Object o : gamesResults) {
                Map<String, Object> listGame = new Map<String, Object>(); 
                
                //System.debug('GAME RESULTS: ' + o);
                Map<String, Object> gameInfo = (Map<String,Object>) o;
                //Date
                String gameDate = (String)gameInfo.get('date');
                listGame.put('gameDate' , gameDate); 
                //Home Team
                Map<String, Object> homeTeamInfo = (Map<String,Object>)gameInfo.get('home_team'); 
                String teamnamehome = (String)homeTeamInfo.get('full_name');
                Integer homeScore = (Integer)gameInfo.get('home_team_score');
                //String hs = String.valueOf(homeScore);
                listGame.put('teamnamehome' , teamnamehome);
                listGame.put('homeScore', homeScore);
                //Visitor Team
                Map<String, Object> visitorTeamInfo = (Map<String,Object>)gameInfo.get('visitor_team'); 
                String teamnamevisitor = (String)visitorTeamInfo.get('full_name');
                Integer visitorScore = (Integer)gameInfo.get('visitor_team_score');
                //String vs = String.valueOf(visitorScore);
                listGame.put('teamnamevisitor' , teamnamevisitor);
                listGame.put('visitorScore' , visitorScore);
                
                // Postseason
                Boolean postseason = (Boolean)gameInfo.get('postseason');
				listGame.put('postseason', postseason);                
                // Add the list
                games.add(listGame); 
                
                //System.debug(gameDate);
                //System.debug(homeTeamInfo);
                //System.debug(teamnamehome);
            }
        }
        System.debug('Return:' + games) ; 
        return games;
    }

}