/**
 * Created by twi18192 on 19/11/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('../../node_modules/object-assign/index.js');

var CHANGE_EVENT = 'change';

var allNodeInfo = {
    node1: {

    },

    node2: {

    }
};

var nodeStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb)
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb)
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT)
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    var item = action.item;

    switch(action.actionType){

        default:
            return true
    }

});

module.exports = nodeStore;