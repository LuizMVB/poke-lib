angular.module('PokemonLibrary').controller('PokemonSearchController', PokemonSearchController);

function PokemonSearchController($scope, $http){
    $scope.selectPageNumber = selectPageNumber;
    $scope.validateSearchInput = validateSearchInput;

    $scope.pageTitle = $scope.msg('common.app.name');
    $scope.pokemons = [];
    $scope.numbersPerPagination = 20;

    function validateSearchInput(pokemonSearchTextFilter){
        if(pokemonSearchTextFilter.match('[0-9]')){
            $scope.msgErro = $scope.msg('home.searchInput.erro.message');
        }else{
            $scope.msgErro = undefined;
        }
    }

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
                }).then(function(){
                    $scope.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (a.name < b.name) {
                            return -1;
                        }
                        return 0;
                    });
                });
            });
        });
    }
}