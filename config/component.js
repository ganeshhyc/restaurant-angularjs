app.directive('navbar',function(){
    return {
        templateUrl : 'components/navbar.html',
        scope : {
            navbarvar : '='
        }
    }
});
app.directive('options',function(){
    return {
        templateUrl : 'components/options.html',
        scope : {
            optionsvar : '='
        }
    }
});