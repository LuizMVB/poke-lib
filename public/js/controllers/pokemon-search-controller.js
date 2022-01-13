angular.module('PokemonLibrary').controller('PokemonSearchController', PokemonSearchController);

function PokemonSearchController($scope, $http){
    $scope.selectPageNumber = selectPageNumber;

    $scope.pageTitle = $scope.msg('common.app.name');
    $scope.pokemons = [];
    $scope.numbersPerPagination = 20;

    function selectPageNumber(pageNumberSelected) {
        $scope.pokemons = [];
        let offset = (pageNumberSelected - 1) * $scope.numbersPerPagination;
        let promise1 = $http.get('https://pokeapi.co/api/v2/pokemon?limit=' + $scope.numbersPerPagination + '&offset=' + offset);
        promise1.then(function(res1){
            $scope.maxPageNumber = Math.ceil(res1.data.count / $scope.numbersPerPagination);
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
}