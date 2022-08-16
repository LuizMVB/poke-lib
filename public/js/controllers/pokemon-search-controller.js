angular.module('PokemonLibrary').controller('PokemonSearchController', PokemonSearchController);

function PokemonSearchController($scope, $http, Constants){
    $scope.selectPageNumber = selectPageNumber;
    $scope.validateSearchInput = validateSearchInput;

    $scope.pageTitle = $scope.msg('common.app.name');
    $scope.pokemons = [];

    function validateSearchInput(pokemonSearchTextFilter){
        if(pokemonSearchTextFilter.match('[0-9]')){
            $scope.msgErro = $scope.msg('home.searchInput.erro.message');
        }else{
            $scope.msgErro = undefined;
        }
    }

    function selectPageNumber(pageNumberSelected) {
        $scope.pokemonSearchTextFilter = undefined;
        $scope.msgErro = undefined;
        $scope.pokemons = [];
        let offset = (pageNumberSelected - 1) * Constants.DEFAULT_NUMBER_PER_PAGINATION;
        let promise1 = $http.get(Constants.POKE_API_URL + '/pokemon?limit=' + Constants.DEFAULT_NUMBER_PER_PAGINATION + '&offset=' + offset);
        promise1.then(function(res1){
            $scope.maxPageNumber = Math.ceil(res1.data.count / Constants.DEFAULT_NUMBER_PER_PAGINATION);
            res1.data.results.forEach(result => {
                let promise2 = $http.get(Constants.POKE_API_URL + result.url.slice(25));
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

    $scope.$watch(function() {
        return $http.pendingRequests.length;
    }, function(pendingRequests) {
        if(pendingRequests === 0){
            $scope.pokemons.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
        }
    });
}