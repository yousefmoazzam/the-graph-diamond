/**
 * Created by twi18192 on 24/11/15.
 */

var React = require('../../node_modules/react/react');
var NodeStore = require('../stores/nodeStore.js');
var nodeActions = require('../actions/nodeActions.js');

function getGateNodeState(){
    return{
        position: NodeStore.getGateNodePosition(),
        inports: NodeStore.getGateNodeInportsState(),
        outports: NodeStore.getGateNodeOutportsState()
    }
}

var GateNode = React.createClass({
    getInitialState: function(){
        return getGateNodeState();
    },

    _onChange: function(){
        this.setState(getGateNodeState())
    },

    componentDidMount: function(){
        NodeStore.addChangeListener(this._onChange);
        console.log(this.props);
        console.log(this.state);
    },

    componentWillUnmount: function(){
        NodeStore.removeChangeListener(this._onChange);
    },

    nodeClick: function(e){
        console.log("node has been clicked!");
        //alert("Click!")
        console.log(e);
        console.log(e.clientX);
    },

    nodeDrag: function(){
        console.log("node has been dragged!");
    },

    render: function(){
        return (
            <svg {...this.props}>
                <Rectangle id="rectangle" height={NodeStylingProperties.height} width={NodeStylingProperties.width} x="3" y="2" rx={NodeStylingProperties.rx} ry={NodeStylingProperties.ry}
                           style={{fill: 'lightgrey', stroke: 'black', 'strokeWidth': 1.65}}
                           onClick={this.nodeClick}  />
                <Port cx={GateNodePortStyling.inportPositions.set.x} cy={GateNodePortStyling.inportPositions.set.y} r={GateNodePortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <Port cx={GateNodePortStyling.inportPositions.reset.x} cy={GateNodePortStyling.inportPositions.reset.y} r={GateNodePortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <Port cx={GateNodePortStyling.outportPositions.out.x} cy={GateNodePortStyling.outportPositions.out.y} r={GateNodePortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>

                <InportSetText x="10" y={NodeStylingProperties.height / 2 - 6} />
                <InportResetText x="10" y={NodeStylingProperties.height / 2 + 12} />
                <OutportOutText x={NodeStylingProperties.width - 20} y={NodeStylingProperties.height / 2 + 3} />

                <NodeName x="20" y={NodeStylingProperties.height + 22} />
                <NodeType x="25" y={NodeStylingProperties.height + 33} />

            </svg>
        )
    }
});

var NodeStylingProperties = {
    height: 65,
    width: 65,
    rx: 7,
    ry: 7
};

var GateNodePortStyling = {
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
            x: NodeStylingProperties.width + 3,
            y: 33
        }
    },
    portRadius: 2,
    inportPositionRatio: 0,
    outportPositionRatio: 1
};





var InportSetText = React.createClass({
    render:function(){
        return(
            <text {...this.props} fontSize="10px" fontFamily="Verdana" >set</text>
        )
    }
});

var InportResetText = React.createClass({
    render:function(){
        return(
            <text {...this.props} fontSize="10px" fontFamily="Verdana" >reset</text>
        )
    }
});

var OutportOutText = React.createClass({
    render:function(){
        return(
            <text {...this.props} fontSize="10px" fontFamily="Verdana" >out</text>
        )
    }
});




var NodeName = React.createClass({
    render: function(){
        return(
            <text {...this.props} fontSize="15px" fontFamily="Verdana">Arm</text>
        )
    }
});

var NodeType = React.createClass({
    render:function(){
        return(
            <text {...this.props} fontSize="8px" fontFamily="Verdana">Gate</text>
        )
    }
});




var Rectangle = React.createClass({
    render: function(){
        return(
            <rect {...this.props}>{this.props.children}</rect>
        )
    }
});

var Port = React.createClass({
    render: function(){
        return(
            <circle {...this.props}>{this.props.children}</circle>
        )
    }
});

module.exports = GateNode;