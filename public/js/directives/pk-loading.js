angular.module('PokemonLibrary').directive('pkLoading', Loading);

function Loading($http, messagesService){
    return {
        restrict: 'E',
        templateUrl: 'js/directives/templates/pk-loading.html',
        link: function(scope){
            scope.msg = messagesService.getMessages;
            scope.$watch(function() {
                return $http.pendingRequests.length;
            }, function(pendingRequests) {
                if(pendingRequests !== 0){
                    scope.isLoading = false;
                }else{
                    scope.isLoading = true;
                }
            });
        }
    }
}