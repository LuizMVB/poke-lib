angular.module('PokemonLibrary').directive('pkCard', Card);

function Card(messagesService){
    return {
        restrict: 'E',
        scope: {
            title: '@',
            content: '@',
            img: '@',
            buttonLabel: '@'
        },
        templateUrl: 'js/directives/templates/pk-card.html',
        link: function(scope){
            scope.msg = messagesService.getMessages;
        }
    }
}