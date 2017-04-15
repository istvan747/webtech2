var app = angular.module("myApp", []);

app.controller("myController", function($scope,$http){
	$http.get("/listItem").then(function(resp){
		$scope.items = resp.data;
	});
});