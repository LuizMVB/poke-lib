angular.module('PokemonLibrary').directive('pkPagination', Pagination);

function Pagination(){
    return {
        restrict: 'E',
        scope: {
            maxPageNumber: '=',
            numbersPerPagination: '=',
            selectPageNumberFunction: '=',
            initialPageNumber: '='
        },
        templateUrl: 'js/directives/templates/pk-pagination.html',
        link: function(scope){
            //functions
            scope.choosePageNumber = choosePageNumber;
            scope.add = add;
            scope.remove = remove;

            //scope variables
            scope.pages = [];
            let paginationModifier = 0;

            choosePageNumber(scope.initialPageNumber);

            function updatePageNumbers(){
                scope.pages = [... Array(scope.numbersPerPagination).keys()].map(function(item){
                    return {
                        number: item+paginationModifier+1, 
                        class: item+paginationModifier+1 > scope.maxPageNumber ? 'hide' : 'waves-effect',
                    };
                });
            }

            function choosePageNumber(numberChoosed){
                scope.pages = [];
                scope.selectPageNumberFunction(numberChoosed);
                updatePageNumbers();
                let positionChoosed = (numberChoosed-1) % scope.numbersPerPagination;
                scope.pages[positionChoosed].class = 'active red';
            }

            function add(){
                let nextPagination = paginationModifier + scope.numbersPerPagination;
                if(nextPagination <= scope.maxPageNumber){
                    paginationModifier = nextPagination;
                    choosePageNumber(1);
                }
            }

            function remove(){
                let previousPagination = paginationModifier - scope.numbersPerPagination;
                if(previousPagination >= 0){
                    paginationModifier = previousPagination;
                    choosePageNumber(scope.numbersPerPagination);
                }
            }
        }
    }
}