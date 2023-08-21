document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");

    // Create the sudoku grid and input cells 
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);

        }
        sudokuGrid.appendChild(newRow);
    }
});


async function solveSudoku() {
    const gridSize = 9;
    const SudokuArray = [];


    // fill the sudokuArray with input values from the grid 
    for (let row = 0; row < gridSize; row++) {
        SudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).ariaValueMax;
            SudokuArray[row][col] = cellValue !== "" ? parsInt
                (cellValue) : 0;
        }
    }


    // Identify user-input cells and mark them 
    for(let row = 0; row < gridSize; row++){
        for(let col = 0; col < gridSize; col++){
            const cellId  = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);


            if(SudokuArray[row][col] !== 0){
                cell.classList.add("user-input");
            }
        }

    }


    // SOlve the sudoku and  display the solutions 
    if(solveSudokuHelper(SudokuArray)){
        for(let row = 0; row < gridSize; row++){
            for(let col = 0; col < gridSize; col++){
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);


                // Fill in solved values and  apply animation 
                if(!cell.classList.contains("user-input")){
                    cell.ariaValue = SudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20);
                    // add a delay for visualization 

                }
            }
        }
    }
}