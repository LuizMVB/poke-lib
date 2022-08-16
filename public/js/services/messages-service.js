angular.module('PokemonLibrary').service('messagesService', MessagesService);

function MessagesService(){
    var self = this;
    self.getMessages = getMessages;

    var data = {
        //COMMON
        'common.app.name'                           : 'Pokemon Library',
        'common.label.details'                      : 'Details',
        'common.title.notFound'                     : 'Nothing Here',
        'common.subtitle.notFound'                  : 'Try another page',
        'common.label.loading'                      : 'Loading...',

        //HOME
        'home.label.search'                         : 'Search Your Pokemon',
        'home.searchInput.erro.message'             : 'There cannot be numeric digits ' +
                                                      'in the pokemon\'s name'
    };
    
    function getMessages (key, ...args) {
        let msg = data[key];
        if(!data || !msg) {
            return key;
        } else if (args.length === 0){
            return msg;
        } else {
            return format(msg, args);
        }
    };
    
    function format(msg, args) {
        let argsIndex = 0;
        for (let index = 0; index < msg.length; index++) {
            if(msg[index] === '{' && msg[index+1] === '}') {
                msg = insert(msg, index, args[argsIndex]);
                argsIndex++;
            }
        }
        return msg;
    }
    
    function insert(str, index, value) {
        return str.substr(0, index) + value + str.substr(index+2);
    }
}