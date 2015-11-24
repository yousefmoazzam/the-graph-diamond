/**
 * Created by twi18192 on 24/11/15.
 */

var React = require('../../node_modules/react/react');

var GateNode = React.createClass({
    getInitialState: function(){
        return null
    },
    componentDidMount: function(){
        console.log(this.props);
    },
    nodeClick: function(){
        console.log("node has been clicked!");
    },
    nodeDrag: function(){
        console.log("node has been dragged!");
    },
    render: function(){
        return (
            <svg id="nodeContainer" {...this.props} draggable="true">
                <Rectangle id="rectangle" height={NodeStylingProperties.height} width={NodeStylingProperties.width} x="3" y="2" rx={NodeStylingProperties.rx} ry={NodeStylingProperties.ry}
                           style={{fill: 'lightgrey', stroke: 'black', 'strokeWidth': 1.65}}
                           onClick={this.nodeClick} onDragStart={this.nodeDrag} />
                <Port cx={3} cy="25" r={PortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <Port cx={3} cy="40" r={PortStyling.portRadius}
                      style={{fill: 'black', stroke: 'black', 'strokeWidth': 1.65}}/>
                <Port cx={NodeStylingProperties.width + 3} cy="33" r={PortStyling.portRadius}
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

var PortStyling = {
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
})




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