/**
 * Created by twi18192 on 24/11/15.
 */

var React = require('../../node_modules/react/react');
var NodeStore = require('../stores/nodeStore.js');

function getTGenNodeState(){
    return{
        position: NodeStore.getTGenNodePosition(),
        inports: NodeStore.getTGenNodeInportsState(),
        outports: NodeStore.getTGenNodeOutportsState()
    }
}

var TGenNode = React.createClass({
    getInitialState: function(){
        return getTGenNodeState();
    },

    _onChange: function(){
        this.setState(getTGenNodeState())
    },

    componentDidMount: function(){
        NodeStore.addChangeListener(this._onChange);
        console.log(this.props);
        console.log(this.state);
    },

    componentWillUnmount: function(){
        NodeStore.removeChangeListener(this._onChange)
    },

    nodeClick: function(){
        console.log("node has been clicked!");
    },

    nodeDrag: function(){
        console.log("node has been dragged!");
    },

    render: function(){
        return (
            <svg {...this.props}
                 x={this.state.position.x} y={this.state.position.y}  >
                <Rectangle id="rectangle" height={NodeStylingProperties.height} width={NodeStylingProperties.width} x="3" y="2" rx={NodeStylingProperties.rx} ry={NodeStylingProperties.ry}
                           style={{fill: 'lightgrey', stroke: 'black', 'strokeWidth': 1.65}}
                           onClick={this.nodeClick} onDragStart={this.nodeDrag} />
                <Port cx={TGenNodePortStyling.inportPositions.ena.x} cy={TGenNodePortStyling.inportPositions.ena.y} r={TGenNodePortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <Port cx={TGenNodePortStyling.outportPositions.posn.x} cy={TGenNodePortStyling.outportPositions.posn.y} r={TGenNodePortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <InportEnaText x="10" y={NodeStylingProperties.height / 2 + 3}/>
                <OutportPosnText x={NodeStylingProperties.width - 27} y={NodeStylingProperties.height / 2 + 3} />

                <NodeName x="17" y={NodeStylingProperties.height + 22} />

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

var TGenNodePortStyling = {
    portRadius: 2,
    inportPositionRatio: 0,
    outportPositionRatio: 1,
    inportPositions: {
        ena: {
            x: 3,
            y: 33
        }
    },
    outportPositions: {
        posn: {
            x: 65 + 3,
            y: 33
        }
    }
};

var InportEnaText = React.createClass({
    render:function(){
        return(
            <text {...this.props} fontSize="10px" fontFamily="Verdana" >ena</text>
        )
    }
});

var OutportPosnText = React.createClass({
    render: function(){
        return(
            <text {...this.props} fontSize="10px" fontFamily="Verdana" MozUserSelect="none" >posn</text>
        )
    }
});




var NodeName = React.createClass({
    render: function(){
        return(
            <text {...this.props} fontSize="15px" fontFamily="Verdana">TGen</text>
        )
    }
});

//var NodeType = React.createClass({
//    render:function(){
//        return(
//            <text {...this.props} fontSize="8px" fontFamily="Verdana">Gate</text>
//        )
//    }
//})




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

module.exports = TGenNode;