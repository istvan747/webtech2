var app = angular.module("myApp", []);

app.controller("myController", function($scope,$http){
	


	$scope.listItem = function(){
		$http.get("/listItem").then(function(resp){
			$scope.items = resp.data;
		});
	};

	$scope.listItem();

	$scope.saveItem = function(){
		$scope.newJSONitem = "{"
							+ "\"itemNumber\" : \"" + $scope.itemNumber + "\", "
						 	+ "\"appelation\" : \"" + $scope.appelation + "\", "
						 	+ "\"quantity\" : \"" + $scope.quantity + "\", "
						 	+ "\"storage\" : \"" + $scope.storage + "\"}";
		$http.post("/addItem",$scope.newJSONitem);
		$scope.listItem();
	};
});