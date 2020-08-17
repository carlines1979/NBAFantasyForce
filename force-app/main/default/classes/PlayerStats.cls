public class PlayerStats {
    
    @AuraEnabled
    public static Map<String,Double> getAverStats(String season, String playerId) {
        
        System.debug('SEason:' + season + 'Player Id: ' + playerId);
        Map<String,Double> response = new Map<String,Double>();
        
        response = getStats(season, playerId);
        
        
        return response ; 
        
        
    }
    
    @AuraEnabled
    public static Map<String, Double> getStats(String season, String playerId) {
        
        //List<List<Object>> stats = new List<List<Object>>(); 
        Map<String, Double> mapstats = new Map<String, Double>();
        Integer page = 1 ;
        Http http = new Http();
        HttpRequest request = new HttpRequest();      
        request.setEndpoint('https://www.balldontlie.io/api/v1/stats/?seasons[]='+season+'&player_ids[]='+playerId+'&page='+page) ; 
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            
            Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
			List<Object> statsResults = (List<Object>) results.get('data');   
            
            Object meta = (Object) results.get('meta');    
            Map<String, Object> metainfo = (Map<String,Object>) meta;
            Integer totpages = (Integer)metainfo.get('total_pages');
            Integer totgames = (Integer)metainfo.get('total_count');
            System.debug('PAGE: ' + page);
            page = page + 1;
            do {
                
                
                for (Object o : statsResults) {
                     
                    
                    Map<String, Object> statInfo = (Map<String,Object>) o;
                    
                    //ast (assistance)
                    Double statast;                  
                    if ((Integer)statInfo.get('ast')==null) {
                        statast=0; 
                    } else {
                        statast = (Double)statInfo.get('ast');
                    } 
                    if (mapstats.containsKey('ast')){
                        statast = statast + mapstats.get('ast');
                    }
                    mapstats.put('ast' , statast); 
                    
                    //blk (blocks)
					Double statblk;                  
                    if ((Integer)statInfo.get('blk')==null) {
                        statblk=0; 
                    } else {
                        statblk = (Double)statInfo.get('blk');
                    } 
                    if (mapstats.containsKey('blk')){
                        statblk = statblk + mapstats.get('blk');
                    }
                    mapstats.put('blk' , statblk); 
                    
                    //dreb (defensive rebounds)
					Decimal statdreb;                  
                    if ((Integer)statInfo.get('dreb')==null) {
                        statdreb=0; 
                    } else {
                        statdreb = (Double)statInfo.get('dreb');
                    } 
                    if (mapstats.containsKey('dreb')){
                        statdreb = statdreb + mapstats.get('dreb');
                    }
                    mapstats.put('dreb' , statdreb); 
                    
                    //fg3_pct (3pointer percentage)
					Double statfg3_pct;                  
                    if ((Double)statInfo.get('fg3_pct')==null) {
                        statfg3_pct=0; 
                    } else {
                        if ((Double)statinfo.get('fg3a')>0) {
                           statfg3_pct = ((Double)statinfo.get('fg3m') * 100 / (Double)statinfo.get('fg3a')); 
                        } else {
                           statfg3_pct = 0 ; 
                        }
                        
                    } 
                    if (mapstats.containsKey('fg3_pct')){
                        statfg3_pct = statfg3_pct + mapstats.get('fg3_pct');
                    }
                    mapstats.put('fg3_pct' , statfg3_pct); 
                    
                    //fg2_pct (2pointer percentage)
					Double statfg2_pct;                  
                    if ((Double)statInfo.get('fg_pct')==null) {
                        statfg2_pct=0; 
                    } else {
                        if ((Double)statinfo.get('fga')>0) {
                            statfg2_pct = ((Double)statinfo.get('fgm') * 100 / (Double)statinfo.get('fga'));
                        } else {
                            statfg2_pct = 0;
                        }
                        
                    } 
                    if (mapstats.containsKey('fg2_pct')){
                        statfg2_pct = statfg2_pct + mapstats.get('fg2_pct');
                    }
                    mapstats.put('fg2_pct' , statfg2_pct); 
                    
                    //ft_pct (free throw percentage)
					Double statfgt_pct;                  
                    if ((Double)statInfo.get('ft_pct')==null) {
                        statfgt_pct=0; 
                    } else {
                        if ((Double)statinfo.get('fta')>0){
                            statfgt_pct = ((Double)statinfo.get('ftm') * 100 / (Double)statinfo.get('fta'));
                        } else {
                            statfgt_pct = 0 ; 
                        }
                        
                    } 
                    if (mapstats.containsKey('fgt_pct')){
                        statfgt_pct = statfgt_pct + mapstats.get('fgt_pct');
                    }
                    mapstats.put('fgt_pct' , statfgt_pct); 
                    
                    //pts (points)
                    Double statpts;                  
                    if ((Integer)statInfo.get('pts')==null) {
                        statpts=0; 
                    } else {
                        statpts = (Double)statInfo.get('pts');
                    } 
                    if (mapstats.containsKey('pts')){
                        statpts = statpts + mapstats.get('pts');
                    }
                    mapstats.put('pts' , statpts); 
                    
                    //reb (rebounds)
                    Double statreb;                  
                    if ((Integer)statInfo.get('reb')==null) {
                        statreb=0; 
                    } else {
                        statreb = (Double)statInfo.get('reb');
                    } 
                    if (mapstats.containsKey('reb')){
                        statreb = statreb + mapstats.get('reb');
                    }
                    mapstats.put('reb' , statreb); 
                    
                    //stl (steals)
                    Double statstl;                  
                    if ((Integer)statInfo.get('stl')==null) {
                        statstl=0; 
                    } else {
                        statstl = (Double)statInfo.get('stl');
                    } 
                    if (mapstats.containsKey('stl')){
                        statstl = statstl + mapstats.get('stl');
                    }
                    mapstats.put('stl' , statstl); 
                    
                    System.debug('STATS:' + mapstats);
                }
                
                request.setEndpoint('https://www.balldontlie.io/api/v1/stats/?seasons[]='+season+'&player_ids[]='+playerId+'&page='+page) ; 
        		request.setMethod('GET');
        		response = http.send(request);
                System.debug('PAGE: ' + page);
                page = page + 1;
                results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
				statsResults = (List<Object>) results.get('data');   
                
            } while (page<=totpages+1 && response.getStatusCode() == 200) ;
        	
            Set<String> setstat = mapstats.KeySet();
            for (String k : setstat){
                Double avrg = mapstats.get(k) / totgames ;
                mapstats.put(k,avrg) ; 
            }
            
            System.debug('AVRG STATS:' + mapstats);
            
        }
        
        return mapstats; 
    }
    
    @AuraEnabled
    public static List<Object> getAllStats(String season, String playerId, Integer page) {
        
        System.debug('SEason:' + season + 'Player Id: ' + playerId);
        list<Object> response = new List<Object>();
        
        response = getStatsGames(season, playerId, page);
        
        
        return response ; 
        
        
    }
    
    @AuraEnabled
    public static List<Object> getStatsGames(String season, String playerId, Integer page) {
        
        list<Object> stats = new List<Object>();
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://www.balldontlie.io/api/v1/stats/?seasons[]='+season+'&player_ids[]='+playerId+'&page='+page) ;  
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        
        if (response.getStatusCode() == 200) {
            
            Map<String, Object> results = (Map<String,Object>) JSON.deserializeUntyped(response.getBody());
			List<Object> statsResults = (List<Object>) results.get('data');  
            
            Object meta = (Object) results.get('meta');    
            Map<String, Object> metainfo = (Map<String,Object>) meta;
            Integer pages = (Integer) metainfo.get('current_page'); 
            Integer totalpages = (Integer) metainfo.get('total_pages');
            
            stats.add(pages);
            stats.add(totalpages);
            
            List<Team__c> teams = [Select ServerId__c, Abbreviation__c  from Team__c]; 
            
            for (Object o : statsResults) {
                
                Map<String, Object> listStats = new Map<String, Object>(); 
                
                Map<String, Object> statsInfo = (Map<String,Object>) o;
                
                Map<String, Object> gameInfo = (Map<String,Object>)statsInfo.get('game');
                Integer visId = (Integer)gameInfo.get('visitor_team_id');
                Integer homId = (Integer)gameInfo.get('home_team_id');
                String visTeam;
                String homTeam;
                for (Team__c t : teams) {
                    if(t.ServerId__c == visId){
                        visTeam = t.Abbreviation__c ;                       
                    } else if (t.ServerId__c == homId) {
                        homTeam = t.Abbreviation__c; 
                    }
                    
                }
                listStats.put('Game' , visTeam+'-'+homTeam); 
                
                String min = (String)statsInfo.get('min');
                listStats.put('min', min);
                
                Integer pts = (Integer)statsInfo.get('pts');
                listStats.put('pts', pts);
                
                Integer reb = (Integer)statsInfo.get('reb');
                listStats.put('reb', reb);
                
                Integer stl = (Integer)statsInfo.get('stl');
                listStats.put('stl', stl);
                    
              	Integer ast = (Integer)statsInfo.get('ast');
                listStats.put('ast', ast);
                
                Integer blk = (Integer)statsInfo.get('blk');
                listStats.put('blk', blk);
                    
                // Add the mapp to the response
                stats.add(listStats);             
                
            }
            
        
        }
        
        System.debug('STATS:' + stats);
        return stats;
    }

}