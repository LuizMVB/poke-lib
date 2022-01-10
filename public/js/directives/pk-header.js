angular.module('PokemonLibrary').directive('pkHeader', Header);

function Header(){
    return {
        restrict: 'E',
        scope: {
            navLinks: '='
        },
        templateUrl: 'js/directives/templates/pk-header.html'
    };
}