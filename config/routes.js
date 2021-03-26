app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : "views/main.html"
    })
    .when("/product/:id", {
      templateUrl : "views/product.html"
    })
});