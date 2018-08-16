var React = require('react');
var PropTypes = require('prop-types');

var Grid = function(props) {
  var gridStyle = {
    width: props.dim * 12,
    height: props.dim * 12,
    background: "#FAFAFA",
    margin: "0 auto",
    WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
    MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
    boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
  };

  return (
    <div style={gridStyle}>
      {props.cells}
    </div>
  )
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired
};

module.exports = Grid;
