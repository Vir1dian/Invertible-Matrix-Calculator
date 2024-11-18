// import Fraction from 'fraction.js';

interface TargetRows {
  row_a : number;
  row_b : number;
  constant : number;
}

/**
 * Performs Gauss-Jordan elimination on a matrix. Generates elements in the html body representing row operations and the end result.
 * 
 * TODO: Succeed in all test cases
 * 
 * @param {Matrix} matrixObject - A matrix object to yield a RREF
 * @returns {Matrix} Matrix in RREF form, otherwise returns an incomplete RREF if unable to calculate
 */
function loadRREF(matrixObject: Matrix): Matrix {
  const rrefMatrix : Matrix = structuredClone(matrixObject);
  // const pivot_locations : TargetRows[] = []; if you want to display dividing turning the pivot into one at the end instead of per column
  let row_operations : string = '';
  let starting_row : number = 0;  // increments once a pivot for this row is recognized

  // Perform all operations column-by-column
  for (let i = 0; i < rrefMatrix.values[0].length; i++) {
    const setPivotRow_instance : TargetRows | null = setPivotRow(rrefMatrix.values, starting_row, i);
    if (setPivotRow_instance === null) {  // If this column is all zeros...
      continue;  // ...skip this entire column.
    } else if (setPivotRow_instance.row_a !== setPivotRow_instance.row_b) {
      row_operations += `<br>R${setPivotRow_instance.row_a + 1} ↔ R${setPivotRow_instance.row_b + 1}`;
    }

    clearPivotColumn(rrefMatrix.values, starting_row, i).forEach(instance => {
      row_operations += `<br>R${instance.row_a + 1} + (${instance.constant})*R${instance.row_b + 1} → R${instance.row_a + 1}`;
    });

    const normalizePivotRow_instance : TargetRows | null = normalizePivotRow(rrefMatrix.values, starting_row, i);
    if (normalizePivotRow_instance !== null) {
      row_operations += `<br>(${normalizePivotRow_instance.constant})*R${normalizePivotRow_instance.row_a + 1} → R${normalizePivotRow_instance.row_a + 1}`;
    }

    starting_row++;
    row_operations = row_operations ? row_operations.substring(4) : '';  // trims leading <br> tag if row_operations string is not empty
    loadRowOperation(rrefMatrix, row_operations);
    row_operations = '';
  }
  console.log(matrixObject);
  return rrefMatrix;
}

/**
 * Swaps rows if needed so that the pivot is always at the furthest to the top and left
 * compared to lower rows, returns null if entire column contains zeros.
 * 
 * @param {number[][]} matrix 
 * @param {number} row 
 * @param {number} column 
 * @returns {TargetRows | null} 
 */
function setPivotRow(matrix: number[][], row: number = 0, column: number = 0): TargetRows | null {
  if (matrix[row][column] !== 0) {
    return { row_a: row, row_b: row, constant: 0 };
  }
  for (let i = row; i < matrix.length; i++) {
    if (matrix[i][column] !== 0) {
      rowOperationFunctions.swapRow(matrix[row], matrix[i]);
      return { row_a: row, row_b: i, constant: 0 };
    }
  }
  return null;
}

/**
 * Converts all other entries in the column with this pivot to zero
 * 
 * @param {number[][]} matrix 
 * @param {number} row 
 * @param {number} column 
 * @returns {TargetRows[]} 
 */
function clearPivotColumn(matrix: number[][], row: number = 0, column: number = 0): TargetRows[] {
  const target_rows_array : TargetRows[] = [];

  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][column] !== 0 && i !== row) {
      let canceling_coefficient = -1 * matrix[i][column]/matrix[row][column]
      rowOperationFunctions.addRow(matrix[i], matrix[row], canceling_coefficient);
      target_rows_array.push({ row_a: i, row_b: row, constant: canceling_coefficient });
    }
  }

  return target_rows_array;
}

/**
 * Scales this pivot to 1, returns null if unnecessary
 * 
 * @param {number[][]} matrix 
 * @param {number} row 
 * @param {number} column 
 * @returns {TargetRows | null} 
 */
function normalizePivotRow(matrix: number[][], row: number = 0, column: number = 0): TargetRows | null {
  if (matrix[row][column] != 1) {
    let scale_to_one = 1 / matrix[row][column];
    rowOperationFunctions.scaleRow(matrix[row], scale_to_one);
    return { row_a: row, row_b: -1, constant: scale_to_one };
  }
  return null;
}

// Contains all row operation functons (adapt for fraction operations)
const rowOperationFunctions = {
  /**
   * Swaps two rows in a 2D array matrix
   * 
   * @param {number[]} row1 - The index of the first row to swap.
   * @param {number[]} row2 - The index of the second row to swap.
   */
  swapRow(row_A: number[], row_B: number[]): void {
    let temp = row_A.slice();
    row_A.forEach((_, index) => {
      row_A[index] = row_B[index];
    });
    row_B.forEach((_, index) => {
      row_B[index] = temp[index];
    });
  },

  /**
   * Multiply a row by a coefficient in a 2D array matrix
   * 
   * @param {number[]} row1 - The index of the row to be multiplied.
   * @param {number} coefficient - Coefficient to multiply to row.
   */
  scaleRow(row: number[], coefficient: number): void {
    row.forEach((_, index) => {
      row[index] *= coefficient;
    });
  },

  /**
   * Adds two rows in a 2D array matrix
   * 
   * @param {number[]} row1 - Row to be added to.
   * @param {number[]} row2 - Addend to row1.
   * @param {number} coefficient - Coefficient to multiply to row2 before adding.
   */
  addRow(row_A: number[], row_B: number[], coefficient: number = 1): void {
    row_A.forEach((_, index) => {
      row_A[index] += (coefficient * row_B[index]);
    })
  }
}

/**
 * TODO: See comment about operations_wrapper in index.html
 * 
 * @param {Matrix} matrixObject
 */
function loadRowOperation(matrixObject: Matrix, row_operations: string) {
  const rref_step = document.createElement('div');
  rref_step.classList.add('rref_step');
  const matrix_title = document.createElement('div');
  matrix_title.innerHTML = 'Matrix ' + matrixObject.name;
  rref_step.appendChild(matrix_title);

  if (row_operations) {
    const row_operations_element = document.createElement('div');
    row_operations_element.classList.add('row_operations');
    row_operations_element.innerHTML = row_operations;
    rref_step.appendChild(row_operations_element);
  }
  
  const matrix_table = document.createElement('table');
  roundMatrix(matrixObject.values, 4).forEach((row: number[]) => {
    const tr = document.createElement('tr');
    row.forEach((column: number) => {
      const td = document.createElement('td');
      td.innerHTML = `${column}`;
      tr.appendChild(td);
    })
    matrix_table.appendChild(tr);
  })
  rref_step.appendChild(matrix_table);

  const operations_wrapper = document.querySelector('.operations_wrapper');
  operations_wrapper?.appendChild(rref_step);
}