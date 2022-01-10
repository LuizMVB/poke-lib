angular.module('PokemonLibrary').factory('routes', Factory);

function Factory() {

    var factory = {};

    factory.get = get;

    function get(key){
        const routes = [
            {BASE:                                                     '/'    },
            {HOME:                                                     '/home'},
        ];
        
        var routeKey = null;

        for (let index = 0; index < routes.length; index++) {
            const route = routes[index];
            if(route.hasOwnProperty(key)){
                routeKey = route[key];
            }
        }

        return routeKey ? routeKey : routes[0].BASE;
    }

    return factory;
}

angular.module('PokemonLibrary')
.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    const appRoutes = [
        {name: 'home',          path: '/home',          templateUrl: '../../views/home.html',            controller: 'PokemonSearchController'},
    ];

    appRoutes.forEach(route => {
        $routeProvider.when(route.path, {
            templateUrl: route.templateUrl,
            controller: route.controller,
        });
    });
    
    $routeProvider.otherwise({redirectTo: '/home'});
});