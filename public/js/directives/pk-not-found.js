angular.module('PokemonLibrary').directive('pkNotFound', NotFound);

function NotFound(messagesService){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/pk-not-found.html',
        link: function(scope){
            scope.msg = messagesService.getMessages;
        }
    }
}