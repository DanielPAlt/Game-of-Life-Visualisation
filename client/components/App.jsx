var React = require('react');
var createReactClass = require('create-react-class');

// components
var GridContainer = require('./GridContainer.jsx');

var App = createReactClass({
  render: function(){
    return(
      <GridContainer dim={40}/>
    );
  }
});

module.exports = App;
