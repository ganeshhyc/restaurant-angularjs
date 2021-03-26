var app_url = "http://localhost/game_store_web/";
// var app_url = "https://spbl.store/";
var app = angular.module("myApp",[]);
app.controller("homeCtrl",function homeCtrl($scope,$http){
    $scope.userData = [];
    $scope.productCategories = [];
    $scope.categories = [];
    $scope.new_category = {};
    $scope.editCategories = [];
    $scope.editList = {};
    $scope.cards = [];
    $scope.productList = {};
    $scope.img_gallery = [];
    $scope.productArray = [];
    $scope.uploadFlag = 0;
    $scope.product_category_url = base_url + "product-categories/";
    $scope.product_by_id_url = base_url + "product-by-id/";
    $scope.userUrl = base_url + "user-details/";
    $scope.categoryUrl = base_url + "all-category";

    $scope.load_category = function(){
        $http.get($scope.categoryUrl)
        .then(function successCallback(response) {
            $scope.categories = response.data ;
        }, function errorCallback(response) {
            // 
        });
    }

    $http.get($scope.product_category_url)
    .then(function successCallback(response) {
        $scope.productCategories = response.data ;
    }, function errorCallback(response) {
        // 
    });
    $scope.get_product = function() {
        $http.get($scope.product_by_id_url + $scope.product_id)
        .then(function successCallback(response) {
            $scope.editCategories = response.data ;
            if(typeof($scope.editCategories.card_data.image_gallery)!==''){
                $scope.editCategories.card_data.image_gallery = JSON.parse($scope.editCategories.card_data.image_gallery);
            }
        }, function errorCallback(response) {
            // 
        });        
    }
    $scope.get_card = function() {
        $http.get(app_url+'all-card?start=0&end=100000')
        .then(function successCallback(response) {
            $scope.cards = response.data ;
        }, function errorCallback(response) {
            // 
        });        
    }
    $scope.check_user = function() {
        $http.get($scope.userUrl + $scope.mobile_no)
        .then(function successCallback(response) {
            $scope.userData = response.data ;
        }, function errorCallback(response) {
            // 
        });
    }
    $scope.create = function (createForm) {
        if(createForm.$valid){
            $scope.productList.imageArr = $scope.productArray;
            $http({
				method: 'POST',
				url: base_url + 'create-product',
				data: $scope.productList,
				headers: { 'Content-Type': 'application/json' }
            })
            .then(function successCallback(response) {
                if(response.data.resp == 'success'){
                    alert('Successfully Created!')
                }
                console.log(response.data);

            }, function errorCallback(response) {
                // 
            });
        }
    $scope.productList = {};
    $scope.productArray = [];
    }
    
    $scope.createCategory = function (createForm) {
        if(createForm.$valid){
            $http({
				method: 'POST',
				url: base_url + 'create-category',
				data: $scope.new_category,
				headers: { 'Content-Type': 'application/json' }
            })
            .then(function successCallback(response) {
                if(response.data.resp == 'success'){
                    $scope.load_category();
                    alert('Successfully Created!');
                }
            }, function errorCallback(response) {
                // 
            });
        }
        $scope.new_category = {};
    }
    $scope.edit = function (createForm) {
        $scope.editCategories.card_data.id =  $scope.product_id;
        $scope.editCategories.card_data.image_gallery = JSON.stringify($scope.editCategories.card_data.image_gallery);
        if(createForm.$valid){
            $http({
				method: 'POST',
				url: base_url + 'edit-product',
				data: $scope.editCategories,
				headers: { 'Content-Type': 'application/json' }
            })
            .then(function successCallback(response) {
                if(response.data.resp == 'success'){
                    alert('Successfully Edited!');
                }

            }, function errorCallback(response) {
                // 
            });
        }
        $scope.editCategories = {}
        $scope.product_id = '';
    }

    $scope.uploadImage = function () {
        myUploadWidget = cloudinary.openUploadWidget({
                cloudName: 'dganesh-info',
                uploadPreset: 'aqhidpel',
                text: {
                    en: {
                        "queue": {
                            "title": "Upload complete you can now close this window.",
                        }
                    }
                },
                sources: ['local'],
                maxFileSize: 8000000,
                folder: 'uploads/product_image',
                resource_type: "image",
                publicId: Date.now(),
                thumbnailTransformation: [{
                    width: 324,
                    height: 324,
                    crop: 'scale',
                }],
                showPoweredBy: false
            },
            function (error, result) {
                //Step 2.3:  Listen to 'success' event
                if (result.event === "success") {
                    $scope.uploadFlag = 1;
                    //Step 2.4:  Call the .close() method in order to close the widget
                    //myUploadWidget.close();
                    var imageObj = {
                        imageurl: result.info.path.split('/')[result.info.path.split('/').length - 1],
                        showImage: result.info.thumbnail_url,
                        content: '',
                        type: 'img',
                        sort: $scope.productArray.length + 1
                    }
                    $scope.productArray.push(imageObj);
                    $scope.uploadFlag = 1;
                    $scope.$apply();
                }
            });
    }

    $scope.load_category();

});