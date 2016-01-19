angular.module('weatherApp', ['ngMap'])
.controller('mainCtrl', function($scope, $timeout, weather, news, NgMap){
	



	$scope.getcity = function(city_name){


				console.log(city_name);
				

				console.log(city_name + " is new city ");

				weather.gethourly(city_name , function (response) {
		        console.log(response.data);
			    $scope.hourly = response.data;
			    $scope.city = response.data.city.name;
			    $scope.lat = response.data.city.coord.lat;
			    $scope.lon = response.data.city.coord.lon;
			    $scope.hourly_list= response.data.list;
			    console.log($scope.hourly_list);
			    $scope.marker = "http://openweathermap.org/img/w/" + $scope.hourly_list[0].weather[0].icon + ".png";

			    });

				weather.getweekly(city_name , function (response) {
		        console.log(response.data );
			    $scope.weekly = response.data;
			    $scope.weekly_list = response.data.list;
			    console.log($scope.weekly_list);

			    

			    });

			    news.getnews(city_name , function (response) {
		        console.log(response.data );
			    $scope.news_data = response.data.responseData.results;
			    console.log($scope.news_data);

			    });

			    NgMap.getMap().then(function(map) {
			    
			    //https://github.com/allenhwkim/angularjs-google-maps
			    

			  	});
			    

			};



	$scope.timeSplit = function(string) {
	    var array = string.split(' ');
	    var date =  array[0].split('-');
	    var time = array[1].split(':');
	    var month = date[1].split('');

	    return date[2] + '/' + month[1] + '  ' + time[0] + ':' + time[0];

			};


	$scope.getStamp = function (stamp){
					
			  var a = new Date(stamp * 1000);
			  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			  var month = months[a.getMonth()];
			  var date = a.getDate();

			  var time = date + ' ' + month;
			  return time;
			};

})


.service('weather',function($http){

	var key = ""; //OWM KEY

	
	this.gethourly = function(city , callback){


		var api = "http://api.openweathermap.org/data/2.5/forecast?q=" + city +"&units=metric"+ key;


		$http.get(api).then(callback);

	};

	this.getweekly = function(city , callback){


		var api = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city +"&units=metric"+ "&cnt=10" + key;


		$http.get(api).then(callback);

	};

})
.service('news', function($http){

	var ip = '';

	this.getnews = function(city, callback){

		var json = 'http://ipv4.myexternalip.com/json';
		$http.get(json).then(function (response) {
		ip = response.data.ip;
		console.log(ip);

		}, function(e) {
		    alert("error");
		});

		//https://developers.google.com/news-search/v1/jsondevguide#audience
		
		var req = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&rsz=8&scoring=d&q=" + city + "%20weather&userip=" + ip;


		$http.get(req).then(callback);

		city = '';

	}; //end getnews


	
});