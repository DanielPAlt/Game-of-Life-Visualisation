var React = require('react');
var PropTypes = require('prop-types');

var Cell = function(props) {
  var dim = props.dim;

  var cellStyle = {
		width: dim,
		height: dim,
		dislay: "inline-block",
		float: "left",
		border: "1px solid #000",
		background: props.isAlive ? "#79CDCD" : "#3f3f3f"
	}

  return (<div onClick={props.clicked} style={cellStyle}></div>)
};

Cell.propTypes = {
  dim: PropTypes.number.isRequired,
  clicked: PropTypes.func
}

module.exports = Cell;
