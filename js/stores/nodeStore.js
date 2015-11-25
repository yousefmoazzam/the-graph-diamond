/**
 * Created by twi18192 on 19/11/15.
 */

var AppDispatcher = require('../dispatcher/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('../../node_modules/object-assign/index.js');

var CHANGE_EVENT = 'change';

var allNodeInfo = {

    gateNode: {
        inports: {
            "set": {connected: false, connectedTo: null}, /* connectedTo should probably be an array, since outports can be connected to multiple inports on different nodes */
            "reset": {connected: false, connectedTo: null}
        },
        outports: {
            "out": {connected: false, connectedTo: null}
        }
    },

    tgenNode: {
        inports: {
            "ena": {connected: false, connectedTo: null}
        },
        outports: {
            "posn": {connected: false, connectedTo: null}
        }
    }
};

var nodePositions = {
    gateNode: {
        x: 400,
        y: 100
    },

    tgenNode: {
        x: 600,
        y: 10
    }
};

var portPositionsForNodes = {
    portRadius: 2,
    inportPositionRatio: 0,
    outportPositionRatio: 1,
    GateNodePortStyling: {
        inportPositions: {
            set: {
                x: 3,
                y: 25
            },
            reset: {
                x: 3,
                y: 40
            }
        },
        outportPositions: {
            out: {
                x: 65 + 3,
                y: 33
            }
        }
    },
    TGenNodePortStyling: {
        inportPositions: {
            ena: {
                x: 65 + 3,
                y: 33
            }
        },
        outportPositions: {
            posn: {
                x: 3,
                y: 33
            }
        }
    }
};

var gateNodeInports = portPositionsForNodes.GateNodePortStyling.inportPositions;
var gateNodeOutports = portPositionsForNodes.GateNodePortStyling.outportPositions;
var tgenNodeInports = portPositionsForNodes.TGenNodePortStyling.inportPositions;
var tgenNodeOutports = portPositionsForNodes.TGenNodePortStyling.outportPositions;

var portPositionsForEdges = {
    gateNode: {
        inports: {
            set: {
                x: nodePositions.gateNode.x + gateNodeInports.set.x,
                y: nodePositions.gateNode.y + gateNodeInports.set.y
            },
            reset: {
                x: nodePositions.gateNode.x + gateNodeInports.reset.x,
                y: nodePositions.gateNode.y + gateNodeInports.reset.y
            }
        },
        outports: {
            out: {
                x: nodePositions.gateNode.x + gateNodeOutports.out.x,
                y: nodePositions.gateNode.y + gateNodeOutports.out.y
            }
        }
    },
    tgenNode: {
        inports: {
            ena: {
                x: nodePositions.tgenNode.x + tgenNodeInports.ena.x,
                y: nodePositions.tgenNode.y + tgenNodeInports.ena.y
            }
        },
        outports: {
            posn: {
                x: nodePositions.tgenNode.x + tgenNodeOutports.posn.x,
                y: nodePositions.tgenNode.y + tgenNodeOutports.posn.y
            }
        }
    }

};

function updateNodePosition(){
    /* Will be used to update the coordinates of a node, to then find the exact location of the ports a connected edge needs to stick to */
}

var nodeStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on(CHANGE_EVENT, cb)
    },
    removeChangeListener: function(cb){
        this.removeListener(CHANGE_EVENT, cb)
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT)
    },
    getGateNodeInportsState: function(){
        return allNodeInfo.gateNode.inports
    },
    getGateNodeOutportsState: function(){
        return allNodeInfo.gateNode.outports
    },
    getTGenNodeInportsState: function(){
        return allNodeInfo.tgenNode.inports
    },
    getTGenNodeOutportsState: function(){
        return allNodeInfo.tgenNode.outports
    },
    getTGenNodeState: function(){
        return allNodeInfo.tgenNode
    },

    getGateNodePosition: function(){
        return nodePositions.gateNode;
    },
    getTGenNodePosition: function(){
        return nodePositions.tgenNode;
    },

    getGateNodeOutPort: function(){
        return portPositionsForEdges.gateNode.outports.out;
    },
    getTGenNodeEnaPort: function(){
        return portPositionsForEdges.tgenNode.inports.ena;
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