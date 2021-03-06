class Connect4 {
  constructor(selector) {
    this.GAME_ROWS = 6;
    this.GAME_COLS = 7;
    this.selector = selector;
    this.player = "red";
    this.GameOver = false;
    this.createTable();
    this.c4EventListeners();
  }

  createTable() {
    const table = $(this.selector);
    table.empty();
    this.GameOver = false;
    this.player = "red";
    for (let row = 0; row < this.GAME_ROWS; row++) {
      const $row = $("<div>").addClass("row");
      for (let col = 0; col < this.GAME_COLS; col++) {
        const $col = $("<div>")
          .addClass("col empty")
          .attr("data-col", col)
          .attr("data-row", row);
        $row.append($col);
      }
      table.append($row);
    }
  }

  c4EventListeners() {
    const table = $(this.selector);
    const that = this;
    function prevEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = $(cells[i]);
        if (cell.hasClass("empty")) {
          return cell;
        }
      }
      console.log(cells);
      return null;
    }

    table.on("mouseenter", ".col.empty", function() {
      if (that.GameOver) return;
      const col = $(this).data("col");
      const $lastEmptyCell = prevEmptyCell(col);
      $lastEmptyCell.addClass(`next-${that.player}`);
      // console.log(col);
    });

    table.on("mouseleave", ".col", function() {
      $(".col").removeClass(`next-${that.player}`);
    });

    table.on("click", ".col.empty", function() {
      if (that.GameOver) return;
      const col = $(this).data("col");
      // const row = $(this).data('row');
      const $lastEmptyCell = prevEmptyCell(col);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data("player", that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("col")
      );
      if (winner) {
        that.GameOver = true;
        alert(`Yay! ${that.player} has won the game!`);
        $(".col.empty").removeClass("empty");
        return;
      }

      that.player = that.player === "red" ? "black" : "red";
      $(this).trigger("mouseenter");
    });
  }

  checkForWinner(row, col) {
    const that = this;

    function $getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);
      while (
        i >= 0 &&
        i < that.GAME_ROWS &&
        j >= 0 &&
        j < that.GAME_COLS &&
        $next.data("player") === that.player
      ) {
        total++;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 + checkDirection(directionA) + checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }

    function checkDiagonalsPositiveSlope() {
      return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
    }

    function checkDiagonalsNegativeSlope() {
      return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    }

    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    }
    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }

    return (
      checkVerticals() ||
      checkHorizontals() ||
      checkDiagonalsPositiveSlope() ||
      checkDiagonalsNegativeSlope()
    );
  }

  restartGame() {
    this.createTable();
  }
}
