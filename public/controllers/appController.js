app.controller('appController', function($scope, $http, $state){

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: new google.maps.LatLng(34.046470, -118.250954),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

 $scope.getCoordinate = function(){
   var input1x = null;
   var input1y = null; 
   var input2x = null; 
   var input2y = null; 
   var midPtx = null;
   var midPty = null;

   var input1 = {"input1": $scope.input1, "input2": $scope.input2};

     $http.post('https://middle-app.herokuapp.com/middle', input1).then(function(response){
    input1x = response.data.input1.lat
    input1y = response.data.input1.lng;
    input2x = response.data.input2.lat;
    input2y = response.data.input2.lng;
  }).then(function(){
      if (input1x != null && input1y != null && input2x != null && input2y != null){
        console.log('works')
        midPtx = ((input1x + input2x)/2);
        midPty = ((input1y + input2y)/2);
        var locations = [
      [$scope.input1, input1x, input1y],
      [$scope.input2, input2x, input2y],
      ["Mid Point", midPtx, midPty]
    ];
    console.log(locations)
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: new google.maps.LatLng(midPtx, midPty),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  
    var infowindow = new google.maps.InfoWindow();
  
    var marker, i;
  
    for (i = 0; i < locations.length; i++) { 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
  
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
        }
    })
 }
}); 