angular.module('PokemonLibrary').controller('PokemonSearchController', PokemonSearchController);

function PokemonSearchController($scope, $http){
    $scope.pageTitle = $scope.msg('common.app.name');
    $scope.pokemons = [];

    let promise1 = $http.get('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0');
    promise1.then(function(res1){
        res1.data.results.forEach(result => {
            let promise2 = $http.get(result.url);
            promise2.then(function(res2){
                $scope.pokemons.push(
                    {
                        name: res2.data.name,
                        imageUrl: res2.data.sprites.front_default ? res2.data.sprites.front_default : 'img/question.png'
                    }
                );
            });
        });
    });
}