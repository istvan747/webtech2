var app = angular.module("myApp", []);

app.controller("myController", function($scope,$http){
	
	$scope.item = new Object();

	var itemNumberField = document.getElementsByClassName("itemnumberFieldDiv");
	var appelationField = document.getElementsByClassName("appelationFieldDiv");
	var quantityField = document.getElementsByClassName("quantityFieldDiv");
	var storageField = document.getElementsByClassName("storageFieldDiv");
	var itemNumberExists = false;
	var itemNumberEmpty = false;
	var appelationEmpty = false;
	var quantityEmpty = false;
	var storageEmpty = false;

	$scope.listItem = function(){
		$http.get("/listItem").then(function(resp){
			$scope.items = resp.data;
		});
	};

	$scope.listItem();

	$scope.formValid = function(form, index){
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
			itemNumberField[index].className += " has-error";
			itemNumberField[index].setAttribute("toggle", "popover");
			itemNumberField[index].setAttribute("title", "Item number is exists!");			
		}else if($scope.item.itemNumber == undefined || $scope.item.itemNumber == ""){
			itemNumberEmpty = true;
			itemNumberField[index].className += " has-error";
			itemNumberField[index].setAttribute("toggle", "popover");
			itemNumberField[index].setAttribute("title", "Item number is exists!");
		}else{
			itemNumberEmpty = false;
			itemNumberExists = false;
			itemNumberField[index].removeAttribute("toggle");
			itemNumberField[index].removeAttribute("title");
			itemNumberField[index].classList.remove("has-error");
		}

		if($scope.item.appelation == undefined || $scope.item.appelation ==""){
			appelationEmpty = true;
			appelationField[index].className += " has-error";
			appelationField[index].setAttribute("toggle", "popover");
			appelationField[index].setAttribute("title", "Appelation field is empty!");
		}else{
			appelationEmpty = false;
			appelationField[index].removeAttribute("toggle");
			appelationField[index].removeAttribute("title");
			appelationField[index].classList.remove("has-error");
		}

		if($scope.item.quantity == undefined || $scope.item.quantity == ""){
			quantityEmpty = true;
			quantityField[index].className += " has-error";
			quantityField[index].setAttribute("toggle", "popover");
			quantityField[index].setAttribute("title", "Quantity field is empty!");
		}else{
			quantityEmpty = false;
			quantityField[index].removeAttribute("toggle");
			quantityField[index].removeAttribute("title");
			quantityField[index].classList.remove("has-error");
		}

		if($scope.item.storage == undefined || $scope.item.storage == ""){
			storageEmpty = true;
			storageField[index].className += " has-error";
			storageField[index].setAttribute("toggle", "popover");
			storageField[index].setAttribute("title", "Storage field is empty!");
		}else{
			storageEmpty = false;
			storageField[index].removeAttribute("toggle");
			storageField[index].removeAttribute("title");
			storageField[index].classList.remove("has-error");
		}

		return !itemNumberExists && !itemNumberEmpty && !appelationEmpty && !quantityEmpty && !storageEmpty;
	}

	$scope.removeError = function(index){
			itemNumberEmpty = false;
			itemNumberExists = false;
			itemNumberField[index].removeAttribute("toggle");
			itemNumberField[index].removeAttribute("title");
			itemNumberField[index].classList.remove("has-error");
			appelationEmpty = false;
			appelationField[index].removeAttribute("toggle");
			appelationField[index].removeAttribute("title");
			appelationField[index].classList.remove("has-error");
			quantityEmpty = false;
			quantityField[index].removeAttribute("toggle");
			quantityField[index].removeAttribute("title");
			quantityField[index].classList.remove("has-error");
			storageEmpty = false;
			storageField[index].removeAttribute("toggle");
			storageField[index].removeAttribute("title");
			storageField[index].classList.remove("has-error");
	}

	$scope.orderBy = function(o){
		$scope.order = o;
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
		$scope.item = undefined;
		$scope.item = {
			itemNumber : "",
			appelation : "",
			quantity : "",
			storage : ""
		}

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