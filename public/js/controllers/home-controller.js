angular.module('PokemonLibrary').controller('HomeController', HomeController);

function HomeController($scope, routes, messagesService){
    $scope.msg = messagesService.getMessages;
    $scope.routes = routes;
    $scope.navLinks = [
        {name: 'HOME', path: $scope.routes.get('HOME')},
    ];
}