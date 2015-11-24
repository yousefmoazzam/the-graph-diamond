/**
 * Created by twi18192 on 19/11/15.
 */

var React = require('../node_modules/react/react');
var ReactDOM = require('../node_modules/react-dom/dist/react-dom.js');

var Node = require('./views/node.js');
var GateNode = require('./views/gateNode.js');
var TGenNode = require('./views/tgenNode.js');
var Edge = require('./views/edge.js');

var NodeStylingProperties = { /* Only here temporarily until I think of a better solution to make this global*/
    height: 65,
    width: 65,
    rx: 7,
    ry: 7
};

var NodeContainerStyle = {
    "height": "100",
    "width": "100"
};

var EdgeContainerStyle = {

};

var AppContainerStyle = {
    "height": "100%",
    "width": "100%"
};

var App = React.createClass({
    render: function(){
        return(
            <svg id="appContainer" style={AppContainerStyle}>
                <GateNode height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} x="400" y="10"/>
                <TGenNode height={NodeStylingProperties.height + 40} width={NodeStylingProperties.width + 6} x="600" y="10"/>
            </svg>
        )
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('testContainer')
);
