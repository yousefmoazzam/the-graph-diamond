/**
 * Created by twi18192 on 19/11/15.
 */

var React = require('../node_modules/react/react');
var ReactDOM = require('../node_modules/react-dom/dist/react-dom.js');

var NodeStore = require('./stores/nodeStore.js');
var nodeActions = require('./actions/nodeActions.js');
var Node = require('./views/node.js');
var GateNode = require('./views/gateNode.js');
var TGenNode = require('./views/tgenNode.js');
var Edge = require('./views/edge.js');

var Draggable = require('../node_modules/react-draggable/dist/react-draggable');

var NodeStylingProperties = { /* Only here temporarily until I think of a better solution to make this global*/
    height: 65,
    width: 65,
    rx: 7,
    ry: 7
};

var NodeContainerStyle = {
    //"height": "100",
    //"width": "100"
    cursor: 'move',
    draggable: 'true',
    className: 'nodeContainer',
    //MozUserSelect: 'none'
};

var EdgeContainerStyle = {

};

var AppContainerStyle = {
    "height": "100%",
    "width": "100%"
};

/* This should really fetch the node's x & y coordinates from the store somehow */

function getAppState(){
    return{
        gateNodePosition: NodeStore.getGateNodePosition(),
        tgenNodePosition: NodeStore.getTGenNodePosition()
    }
}

var App = React.createClass({
    getInitialState: function(){
        return getAppState();
    },
    _onChange: function(){
        this.setState(getAppState());
    },
    componentDidMount: function(){
        NodeStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        NodeStore.removeChangeListener(this._onChange);
    },

    /* react-draggabble event handlers */
    handleStart: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleDrag: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    handleStop: function (event, ui) {
        console.log('Event: ', event);
        console.log('Position: ', ui.position);
    },

    dragOver: function(event){
        console.log("dragOver");
        console.log(event);
    },

    drop: function(ef){
        console.log("drop");
        console.log(ef);
    },


    render: function(){
        return(
            <svg id="appContainer" style={AppContainerStyle}  onDrop={this.drop} >
                <g id="NodesGroup">
                    <GateNode id="Gate1"  style={NodeContainerStyle}
                              height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} x={this.state.gateNodePosition.x} y={this.state.gateNodePosition.y}/>
                    <TGenNode id="TGen1" style={NodeContainerStyle}
                              height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} />
                </g>
                <g id="EdgesGroup">
                    <Edge/>
                </g>
                <Draggable axis="both"
                           handle=".handle"
                           start={{x: 20, y: 20}} /* Starting position, not sure if its relative to the window, or just to its parent */
                           grid={[25, 25]} /* If you want the object to snap to a certain quantised pixel interval, set it here */
                           zIndex={100} /* I think this allows you to set if it goes on top of other thingas when dragged, or goes below them */
                           onStart={this.handleStart}
                           onDrag={this.handleDrag}
                           onStop={this.handleStop}>
                    <rect className="handle" height="100" width="100" id="test" style={{fill: 'lightgrey', stroke: 'black', 'strokeWidth': 1.65}} ></rect>
                </Draggable> /* The problem is that it uses CSS transforms to translate, not updating state... */

            </svg>
        )
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('testContainer')
);
