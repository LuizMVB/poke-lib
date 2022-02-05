angular.module('PokemonLibrary').directive('pkNotFound', NotFound);

function NotFound(){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/pk-not-found.html',
        link: function(scope){
            scope.msg = messagesService.getMessages;
        }
    }
}