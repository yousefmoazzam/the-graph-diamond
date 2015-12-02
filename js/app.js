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
    "width": "100%",
    //'backgroundColor': "green"
};

/* This should really fetch the node's x & y coordinates from the store somehow */

function getAppState(){
    return{
        Gate1Position: NodeStore.getGate1Position(),
        TGen1Position: NodeStore.getTGen1Position()
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
        //console.log(document.getElementById('appContainer'));
        //console.log(document.getElementById('Gate1'));

        this.setState({moveFunction: this.moveElement})


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


    mouseDownSelectElement: function(evt){
        console.log("mouseDown");
        console.log(evt);
        console.log(evt.currentTarget);

        this.setState({draggedElement: evt.currentTarget}); /* Need to send to store */
        nodeActions.draggedElement(evt.currentTarget.id);

        var startCoordinates = {
            x: evt.nativeEvent.clientX,
            y: evt.nativeEvent.clientY
        };
        this.setState({beforeDrag: startCoordinates},
            function(){
                this.setState({moveFunction: this.anotherMoveFunction},
                    function(){
                        console.log("function has changed");
                    })
            });
    },

    moveElement: function(evt){
        //console.log("moveElement has occurred");
    },
    anotherMoveFunction: function(e){
        //console.log("now move is different!");

        /* If mouse movement is minimal, don't change it, but if mouse movement is big enough, change the state */

        //console.log(e);

        var updatedCoordinates = {
            x: e.nativeEvent.clientX,
            y: e.nativeEvent.clientY
        };

        if(!this.state.afterDrag){
            this.setState({afterDrag: updatedCoordinates},
                function(){
                    this.differenceBetweenMouseDownAndMouseUp(this.state.beforeDrag, this.state.afterDrag)
                })
        }
        else{
            this.setState({beforeDrag: this.state.afterDrag},
                function(){
                    this.setState({afterDrag: updatedCoordinates},
                        function(){
                            this.differenceBetweenMouseDownAndMouseUp(this.state.beforeDrag, this.state.afterDrag)
                        })
                })
        }
    },

    mouseUp: function(e){
        console.log("mouseUp");
        console.log(e);
        this.setState({moveFunction: this.moveElement});
        this.setState({beforeDrag: null}); /* Stops the cursor from jumping back to where it previously was on the last drag */
        this.setState({afterDrag: null});

    },

    differenceBetweenMouseDownAndMouseUp: function(start, end){
        //console.log(start);
        //console.log(end);
        var differenceInCoordinates = {
            x: end.x - start.x,
            y: end.y - start.y
        };
        //nodeActions.changeGateNodePosition(differenceInCoordinates);
        nodeActions.changeNodePosition(differenceInCoordinates);
    },

    mouseLeave: function(e){
        console.log("mouseLeave, left the window, emulate a mouseUp event!");
        this.setState({moveFunction: this.moveElement});
        this.setState({beforeDrag: null});
        this.setState({afterDrag: null});
    },


    render: function(){
        return(
            <svg id="appContainer" style={AppContainerStyle} onMouseMove={this.state.moveFunction} onMouseLeave={this.mouseLeave}
                 //onDragOver={this.dragOver} onDragEnter={this.dragEnter} onDrop={this.drop}
            >
                <rect id="dragArea" height="10000" width="10000" fill="transparent"  style={{MozUserSelect: 'none'}}></rect>

                <g id="EdgesGroup" >
                    <Edge/>
                </g>

                <g id="NodesGroup" >
                    <GateNode id="Gate1"  style={NodeContainerStyle}
                              height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} x={this.state.Gate1Position.x} y={this.state.Gate1Position.y}
                              //onDragStart={this.dragStart} onDragEnd={this.dragEnd} onDrag={this.drag}

                              onMouseDown={this.mouseDownSelectElement}  onMouseUp={this.mouseUp}
                              //onMouseMove={this.state.moveFunction}

                    />
                    <TGenNode id="TGen1" style={NodeContainerStyle}
                              height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} x={this.state.TGen1Position.x} y={this.state.TGen1Position.y}

                              onMouseDown={this.mouseDownSelectElement}  onMouseUp={this.mouseUp}
                    />
                </g>

                <Draggable   axis="both"
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


/* Dragging with drag events as opposed to mouse events */

//dragStart: function(e){
//    console.log("dragStart in app");
//    console.log(e);
//
//    //e.dataTransfer.setData('application/x-moz-node', 'Gate1');
//
//    var startCoordinates = {
//        x: e.nativeEvent.clientX,
//        y: e.nativeEvent.clientY
//    };
//    this.setState({beforeDrag: startCoordinates});
//    console.log(this.state);
//    console.log(startCoordinates);
//},
//
//drag: function(e){
//    console.log("drag in app");
//    console.log(e);
//},
//
//dragEnd: function(e){
//    console.log("dragEnd in app");
//    console.log(e)
//},
//
//dragEnter: function(e){
//    e.preventDefault();
//    e.stopPropagation();
//    e.nativeEvent.preventDefault();
//    e.nativeEvent.stopPropagation();
//
//    console.log("dragEnter");
//    console.log(e);
//},
//
//dragOver: function(event){
//    event.preventDefault();
//    event.stopPropagation();
//    event.nativeEvent.preventDefault();
//    event.nativeEvent.stopPropagation();
//    console.log("dragOver");
//    console.log(event);
//},
//
//drop: function(ef){
//    ef.preventDefault();
//    ef.stopPropagation();
//    console.log("drop");
//    console.log(ef);
//
//    var endCoordinates = {
//        x: ef.nativeEvent.clientX,
//        y: ef.nativeEvent.clientY
//    };
//    this.setState({afterDrag: endCoordinates});
//    console.log(this.state);
//
//    this.differenceBetweenMouseDownAndMouseLeave(this.state.beforeDrag, endCoordinates); /* setStae doesnt mutate state immediately, it creates a pending transition, so just use endCoordinates directly */
//},
//
//differenceBetweenMouseDownAndMouseLeave: function(start, end){
//    console.log(start);
//    console.log(end);
//    var differenceInCoordinates = {
//        x: end.x - start.x,
//        y: end.y - start.y
//    };
//    nodeActions.changeGateNodePosition(differenceInCoordinates);
//},
