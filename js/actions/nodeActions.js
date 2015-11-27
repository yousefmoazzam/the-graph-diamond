/**
 * Created by twi18192 on 19/11/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var nodeActions = {
    changeGateNodePosition: function(item){
        AppDispatcher.handleAction({
            actionType: appConstants.GATENODE_CHANGEPOSITION,
            item: item
        })
    }
};

module.exports = nodeActions;