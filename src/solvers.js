/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; // fixme

  var board = new Board({n: n});

  if (arguments[1] === undefined) {
    var row = 0;
    var col = 0;
  } else {
    board = arguments[1];
  }

  var counter = 0;
  var max = 0;


  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      // [0, 1, 0]
      // [1, 0, 0]
      // [0, 0, 1]
      //console.log("Myboard" , board.attributes)
      if (board.attributes[i][j] !== 1) {
        board.togglePiece(i, j);
        if (!board.hasColConflictAt(j) && !board.hasRowConflictAt(i)) {
          solution = board;
        } else {
          board.togglePiece(i, j);
        }
      }
    }
  }

  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// [0, 1, 0]
// [1, 0, 0]
// [0, 0, 1]


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});

  var results = new Set();

  var counter = function(board, n) {
    var count = 0;

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        if (board.attributes[i][j] === 1) {
          count++;
        }
      }
    }
    return count;
  };

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      // [0, 1]
      // [1, 0]
      var output = this.findNRooksSolution(n, board);
      // 0, 0
      // 0, 1

      // 0, 1
      // 1, 0

      var tempBoard = new Board(output);
      if (!tempBoard.hasAnyRooksConflicts()) {
        var count = counter(board, n);
        if (count === n) {
          results.add(JSON.stringify(output));
        }
        board.togglePiece(i, j);
      }
    }
  }

  console.log(results);

  solutionCount = results.size;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // if (n === 0 || n === 2 || n === 3) {
  //   n = 0;
  //   // solution = [[]];
  //   // still needs to retain n x n structure
  //   // 0, 0
  //   // 0, 0
  // } else {
  //   var board = new Board({n: n});
  // }

  var board = new Board({n: n});

  if (arguments[1] === undefined) {
    var row = 0;
    var col = 0;
  } else {
    board = arguments[1];
  }

  var counter = 0;
  var max = 0;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      // [1, 0, 0, 0]
      // [0, 0, 0, 0]
      // [0, 0, 0, 0]
      // [0, 0, 0, 0]
      //console.log("Myboard" , board.attributes)
      if (board.attributes[i][j] !== 1) {
        if (!board.hasAnyQueenConflictsOn(i, j)) {
          board.togglePiece(i, j);
          solution = board;
        }
      }
    }
    solution = board.rows();
  }

  if (n === 0) {
    solution = [];
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};