var React = require('react');
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Button = require('react-bootstrap').Button;

// components
var Cell = require('./Cell.jsx');
var Grid = require('./Grid.jsx');

var GridContainer = createReactClass({
  getInitialState: function() {
    return {
      matrix: [],
      generations: 0,
      neighborCells: [[0, 1], [1, 0], [-1, 0], [0, -1], [-1, -1], [1, 1], [-1, 1], [1, -1]],
      isPaused: false
    };
  },

  componentWillMount: function() {
    this.freshGrid();
  },

  freshGrid: function() {
    var matrix = [];
    var dim = this.props.dim;

    var Cell = function() {
      this.neighborsCount = 0;
      this.isAlive = false;
    }

    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        var cell = new Cell();
        row.push(cell);

        if (Math.random() < 0.6) {
          cell.isAlive = true;
        }
      }
      matrix.push(row);
    }

    this.setState({matrix: matrix});
  },

  createGrid: function() {
    this.interval = setInterval(function() {
      this.clearNeighborsCount(this.state.matrix);
      var newMatrix = JSON.parse(JSON.stringify(this.state.matrix));
      this.countNeighbours(newMatrix);
      this.updateCells(newMatrix);
      this.setState({matrix: newMatrix});
    }.bind(this), 100)
  },

  countNeighbours: function(newMatrix) {
    var dim = this.props.dim;

    for (var i = 0; i < dim; i++) {
      for (var j = 0; j < dim; j++) {
        this.countNeighboursCell(i, j, newMatrix);
      }
    }
  },

  countNeighboursCell: function(row, col, newMatrix) {
    var neighborCells = this.state.neighborCells;
    var cell = newMatrix[row][col];

    for (var i = 0; i < neighborCells.length; i++) {
      var neighborPos = neighborCells[i];
      var x = row + neighborPos[0];
      var y = col + neighborPos[1];

      if (this.isWithinGrid(x, y)) {
        var neighbor = newMatrix[x][y];
        if (neighbor.isAlive) {
          cell.neighborsCount++;
        }
      }
    }
  },

  isWithinGrid: function(row, col) {
    var dim = this.props.dim;

    if (row >= 0 && col >= 0 && row < dim && col < dim) {
      return true;
    }
    return false;
  },

  updateCells: function(newMatrix) {
    var dim = this.props.dim;

    for (var i = 0; i < dim; i++) {
      for (var j = 0; j < dim; j++) {
        var currentCell = newMatrix[i][j];

        if (currentCell.isAlive && (currentCell.neighborsCount == 2 || currentCell.neighborsCount == 3)) {
          currentCell.isAlive = true;
        } else if (!currentCell.isAlive && currentCell.neighborsCount == 3) {
          currentCell.isAlive = true;
        } else {
          currentCell.isAlive = false;
        }
      }
    }
  },

  clearNeighborsCount: function() {
    var dim = this.props.dim;

    for (var i = 0; i < dim; i++) {
      for (var j = 0; j < dim; j++) {
        this.state.matrix[i][j].neighborsCount = 0;
      }
    }
  },

  togglePause: function() {
    var isPaused = this.state.isPaused;

    if (isPaused) {
      this.setState({isPaused: false}, function() {
        this.createGrid();
      });
    } else {
      clearInterval(this.interval);
      this.setState({isPaused: true});
    }
  },

  reset: function() {
    clearInterval(this.interval);
    this.setState({isPaused: false});
    this.freshGrid();
    this.createGrid();
  },

  componentDidMount: function() {
    this.createGrid();
  },

  render: function() {
    var dim = this.props.dim;

    var cells = [];
    for (var i = 0; i < dim; i++) {
      var row = [];
      for (var j = 0; j < dim; j++) {
        row.push(<Cell dim={12} isAlive={this.state.matrix[i][j].isAlive} key={i*dim+j} row={i} col={j} />)
      }
      cells.push(row);
    };

    var isPaused = this.state.isPaused;

    // styles
    var buttonStyles = {
      marginBottom: 5,
      marginLeft: 5,
      marginRight: 5
    }
    var gridContainerStyles = {
      marginTop:25
    }

    return (
      <div style={gridContainerStyles}>
        <Row>
          <Col xs={12} md={9}>
            <Grid cells={cells} dim={this.props.dim} />
          </Col>
          <Col xs={12} md={3}>
            <Button bsStyle="warning" style={buttonStyles} onClick={this.togglePause}><Glyphicon glyph={isPaused ? "play" : "pause"}/> {isPaused ? "Play" : "Pause"}</Button>
            <Button bsStyle="danger" style={buttonStyles} onClick={this.reset}><Glyphicon glyph="repeat"/> Reset</Button>
          </Col>
      </Row>
    </div>
    )
  }
});

module.exports = GridContainer;
