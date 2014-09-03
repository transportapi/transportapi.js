/**
 * A generic set of functions for calling TransportAPI
 * 
 * Call the init function to set up your API key and APP ID
 * 
 * Functions are mostly asynchronous, meaning it will fire the API call when
 * you call it, but will succeed with data some time later, so you must pass in
 * a 'successFuction' which gets called at that time.
 *
 * Assumes jquery '$' object (for ajax calls)
 *
 * This does not know about any leaflet 'map' object
 *
 * Follows the static module pattern (http://stackoverflow.com/a/3218926/338265)
 */

var TransportAPI = (function () {

   var appId = '';
   var apiKey = '';
   
   var transportAPIbaseURL = 'http://transportapi.com/v3';
   //var transportAPIbaseURL = 'http://162.13.137.133/v3'; //harry's server
   
   //--- Private methods ---
   
   //Auth bit of the URL (added to all URLs)
   var authParams = function() {
      return "app_id=" + appId + "&api_key=" + apiKey + "&callback=?";
   };
   
   //An ajax call to a transportapi endpoint (generic)
   var transportAPIcall = function (url, successFunction ) {
   	   
      return function() {
         $.ajax({
            url : url,
            dataType : "jsonp",
            timeout : 10000
         })
         .done(successFunction)
         .fail(function() {
            console.log( "transportAPIcall FAIL. URL:" + url );
         });
      };   
      
   }
   
   return {
      //--- Public methods ---
   	   
      //Get set up to call TransportAPI
      init: function(setAppId, setApiKey) {
         appId = setAppId;
         apiKey = setApiKey;
      },
      
      
      //Bus stops in bounding box
      busStopsBBOX: function( minlon,minlat,maxlon,maxlat, page, rpp, successFunction ) {
         //e.g. http://transportapi.com/v3/uk/bus/stops/bbox.json?minlon=-0.0938&minlat=51.5207&maxlon=-0.074&maxlat=51.5286&page=1&rpp=25
         var url = transportAPIbaseURL + "/uk/bus/stops/bbox.json?" +
                 "minlon=" + minlon + "&" +
                 "minlat=" + minlat + "&" + 
                 "maxlon=" + maxlon + "&" +
                 "maxlat=" + maxlat + "&" +
                 "page=" + page + "&" +
                 "rpp=" + rpp + "&" +
                 authParams();
                  
         return transportAPIcall(url, successFunction );
         
      },
      
      //Train stations in a bounding box
      trainStationsBBOX: function( minlon,minlat,maxlon,maxlat, page, rpp, successFunction ) {
         var url = transportAPIbaseURL + "/uk/train/stations/bbox.json?" +
                 "minlon=" + minlon + "&" +
                 "minlat=" + minlat + "&" + 
                 "maxlon=" + maxlon + "&" +
                 "maxlat=" + maxlat + "&" +
                 "page=" + page + "&" +
                 "rpp=" + rpp + "&" +
                 authParams();
                  
         return transportAPIcall(url, successFunction );
         
      },
      
      //Tube stations list
      //Set line to "all" to get all stations
      tubeStations: function( line, successFunction ) {
      	 if (line=="all") line="stations";
         var url = transportAPIbaseURL + "/uk/tube/" + line + ".json?" + authParams();
         return transportAPIcall(url, successFunction );
      },
      
      
      //Tube plaforms list including performance
      tubePlatforms: function( stationCode, successFunction ) {
      	 var url = transportAPIbaseURL + "/uk/tube/platforms/northern/" + stationCode + ".json?" + authParams();
         return transportAPIcall(url, successFunction );
      },
      
      //Tube dashboard (tube-radar-like information)
      tubeStationsPerformance: function( successFunction ) {
         var url = transportAPIbaseURL + "/uk/tube/stations/performance.json?" + authParams();
         return transportAPIcall(url, successFunction );
      },
      
      // performance information for given set of train stations
      // stationCodes is an array of codes with a "CRS:" or "TIPLOC:" prefix
      // (or without a prefix it assumes CRS)
      trainPerformance: function( stationCodes, successFunction ) {
      	 
      	 var stationsParam = stationCodes.join(",");
      	      
         var url = transportAPIbaseURL + "/uk/train/stations_live_performance.json?" +
                   "stations=" + stationsParam + "&" +
                   "station_detail=true&" +
                   authParams();
                   
         console.log( "calling trainPerformance:" + url );
         
         return transportAPIcall(url, successFunction );
      	 
      }
      
   };
   
   
})();

