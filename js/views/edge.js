/**
 * Created by twi18192 on 19/11/15.
 */

var React = require('../../node_modules/react/react');

var Edge = React.createClass({
    render:function(){
        return(
            <svg id="edgeContainer" {...this.props}>
                <Line height="100" width="100" x1="90%" y1="53%" x2="75" y2="25"
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