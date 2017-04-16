var app = angular.module("myApp", []);

app.controller("myController", function($scope,$http){
	
	$scope.item = new Object();
	//$scope.items;

	$scope.listItem = function(){
		$http.get("/listItem").then(function(resp){
			$scope.items = resp.data;
		});
	};

	$scope.listItem();

	$scope.formValid = function(form, classIndex){
		
		var itemNumberField = document.getElementsByClassName("itemnumberFieldDiv");
		var appelationField = document.getElementsByClassName("appelationFieldDiv");
		var quantityField = document.getElementsByClassName("quantityFieldDiv");
		var storageField = document.getElementsByClassName("storageFieldDiv");

		var itemNumberExists = false;
		var itemNumberEmpty = false;
		var appelationEmpty = false;
		var quantityEmpty = false;
		var storageEmpty = false;

		if(form != "updateItem"){
			$scope.listItem();
			for(i in $scope.items){
				if($scope.items[i].itemNumber == $scope.item.itemNumber){
					itemNumberExists = true;
					break;
				}
			}
		}

		if(itemNumberExists){
			itemNumberField[classIndex].className += " has-error";
			itemNumberField[classIndex].setAttribute("toggle", "popover");
			itemNumberField[classIndex].setAttribute("title", "Item number is exists!");			
		}else if($scope.item.itemNumber == undefined || $scope.item.itemNumber == ""){
			itemNumberEmpty = true;
			itemNumberField[classIndex].className += " has-error";
			itemNumberField[classIndex].setAttribute("toggle", "popover");
			itemNumberField[classIndex].setAttribute("title", "Item number is exists!");
		}else{
			itemNumberEmpty = false;
			itemNumberExists = false;
			itemNumberField[classIndex].removeAttribute("toggle");
			itemNumberField[classIndex].removeAttribute("title");
			itemNumberField[classIndex].classList.remove("has-error");
		}

		if($scope.item.appelation == undefined || $scope.item.appelation ==""){
			appelationEmpty = true;
			appelationField[classIndex].className += " has-error";
			appelationField[classIndex].setAttribute("toggle", "popover");
			appelationField[classIndex].setAttribute("title", "Appelation field is empty!");
		}else{
			appelationEmpty = false;
			appelationField[classIndex].removeAttribute("toggle");
			appelationField[classIndex].removeAttribute("title");
			appelationField[classIndex].classList.remove("has-error");
		}

		if($scope.item.quantity == undefined || $scope.item.quantity == ""){
			quantityEmpty = true;
			quantityField[classIndex].className += " has-error";
			quantityField[classIndex].setAttribute("toggle", "popover");
			quantityField[classIndex].setAttribute("title", "Quantity field is empty!");
		}else{
			quantityEmpty = false;
			quantityField[classIndex].removeAttribute("toggle");
			quantityField[classIndex].removeAttribute("title");
			quantityField[classIndex].classList.remove("has-error");
		}

		if($scope.item.storage == undefined || $scope.item.storage == ""){
			storageEmpty = true;
			storageField[classIndex].className += " has-error";
			storageField[classIndex].setAttribute("toggle", "popover");
			storageField[classIndex].setAttribute("title", "Storage field is empty!");
		}else{
			storageEmpty = false;
			storageField[classIndex].removeAttribute("toggle");
			storageField[classIndex].removeAttribute("title");
			storageField[classIndex].classList.remove("has-error");
		}

		return !itemNumberExists && !itemNumberEmpty && !appelationEmpty && !quantityEmpty && !storageEmpty;
	}

	$scope.addItem = function(){
		if($scope.formValid("addItem",0)){
			$http.post("/addItem",JSON.stringify($scope.item)).then(function mySucces(response){
				$scope.listItem();
				$scope.unSelectItem();
			}, function myError(response){

			});
		}
	};

	$scope.selectItem = function(selectedItem){
		$scope.item = selectedItem;

	};

	$scope.unSelectItem = function(){
		$scope.item.itemNumber = "";
		$scope.item.appelation = "";
		$scope.item.quantity = "";
		$scope.item.storage = "";
	}

	$scope.deleteItem = function(){
		$http.get("/deleteitem?itemnumber="+$scope.item.itemNumber).then(function mySucces(response){
			$scope.listItem();
			$scope.unSelectItem();
		}, function myError(response){

		});
	};

	$scope.updateItem = function(){
		if($scope.formValid("updateItem",1)){
			$http.post("/updateItem",$scope.item).then(function mySucces(response){
				$scope.listItem();
				$scope.unSelectItem();
			}, function myError(response){

			});
		}
	};

	$scope.itemToString = function(){
		console.log("item: " + $scope.item + "\nitem.itemNumber: " + $scope.item.itemNumber + "\nitem.appelation: " + $scope.item.appelation + "\nitem.quantity: " + $scope.item.quantity + "\nitem.storage: " + $scope.item.storage); 
	}

});