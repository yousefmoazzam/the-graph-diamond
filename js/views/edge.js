/**
 * Created by twi18192 on 19/11/15.
 */

var React = require('../../node_modules/react/react');
var NodeStore = require('../stores/nodeStore.js');

function getEdgeState(){
    return {
        //startNode: NodeStore.getGateNodeOutPort(),
        //endNode: NodeStore.getTGenNodeEnaPort(),

        gateNodePosition: NodeStore.getGateNodePosition(),
        tgenNodePosition: NodeStore.getTGenNodePosition(),
        gateNodeOut: NodeStore.getGateNodeOutportOut(),
        tgenNodeEna: NodeStore.getTGenNodeInportEna()
    }
}

var Edge = React.createClass({
    getInitialState: function(){
        return getEdgeState();
    },
    _onChange: function(){
      this.setState(getEdgeState());
    },
    componentDidMount: function(){
        NodeStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
      NodeStore.removeChangeListener(this._onChange);
    },
    render:function(){
        return(
            <svg id="edgeContainer" {...this.props}>
                <Line height="100" width="100"
                      //x1={this.state.startNode.x} y1={this.state.startNode.y} x2={this.state.endNode.x} y2={this.state.endNode.y}
                      x1={this.state.gateNodePosition.x + this.state.gateNodeOut.x} y1={this.state.gateNodePosition.y + this.state.gateNodeOut.y}
                      x2={this.state.tgenNodePosition.x + this.state.tgenNodeEna.x} y2={this.state.tgenNodePosition.y + this.state.tgenNodeEna.y}
                      style={{strokeWidth: '5', stroke:"orange"}} />
            </svg>
        )
    }
});

var Line = React.createClass({
    render: function(){
        return(
            <line {...this.props}>{this.props.children}</line>
        )
    }
});

module.exports = Edge;