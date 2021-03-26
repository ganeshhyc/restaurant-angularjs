app.controller("myCtrl",($scope, $rootScope, $http)=>{
    $scope.rest_data = [];
    $scope.img_data = [];
    $scope.brand = [];
    $scope.variety = [];
    $scope.style = [];
    $scope.country = [];
    $scope.stars = [];
    $scope.top_10 = [];
    $scope.sort_name = {'name':'Low-High','sort':'Stars'}
    $scope._rest = ()=>{
        $scope.rest_data = [];
        var full_url = document.URL;
        var url_array = full_url.split('/');
        $scope.product_id = url_array[url_array.length-1];
        $http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/TopRamen8d30951.json',(res) => {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With");
        }).then(function(resp){
            angular.forEach(resp.data,(_val,_key)=>{
                $scope.rest_data.push(_val);
            });
            $scope.brand = [...new Set($scope.rest_data.map(item => item.Brand))]; // unique brands
            $scope.brand.unshift("All Brands");
            $scope.style = [...new Set($scope.rest_data.map(item => item.Style))]; // unique style
            $scope.style.unshift("All Styles");
            $scope.country = [...new Set($scope.rest_data.map(item => item.Country))]; // unique country
            $scope.country.unshift("All Countries");
        })
    }
    $scope._images = ()=>{
        $scope.img_data = [];
        $http.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/noodlesec253ad.json',(res) => {
              res.header("Access-Control-Allow-Origin", "*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With");
        }).then(function(resp){
            angular.forEach(resp.data,(_val,_key)=>{
                $scope.img_data.push(_val);
            });
        })
    }
    $scope.getRnd_0_6 = () => {
        return Math.floor(Math.random() * (6 - 0)) + 0;
      }
    $scope.isNumber = (number) => {
        return angular.isNumber(number) && !isNaN(number);
    }
    
    $scope._rest();
    $scope._images();
})