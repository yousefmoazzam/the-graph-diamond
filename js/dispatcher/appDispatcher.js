/**
 * Created by twi18192 on 19/11/15.
 */

var Dispatcher = require('../../node_modules/flux/dist/Flux.js').Dispatcher;
var assign = require('../../node_modules/object-assign/index.js');

var AppDispatcher = assign(new Dispatcher(), {

    handleAction: function(action){
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        })
    }
});

module.exports = AppDispatcher;