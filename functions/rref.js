function loadMatrix(matrix) {
  const matrix_wrapper = document.createElement('div');
  matrix_wrapper.classList.add('matrix_wrapper');
  const matrix_title = document.createElement('div');
  matrix_title.innerHTML = 'Matrix ' + matrix.name;
  matrix_wrapper.appendChild(matrix_title);
  
  const matrix_table = document.createElement('table');
  roundMatrix(matrix.values, 4).forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(element => {
      const td = document.createElement('td');
      td.innerHTML = element;
      tr.appendChild(td);
    })
    matrix_table.appendChild(tr);
  })
  matrix_wrapper.appendChild(matrix_table);

  if (matrix.steps) {
    const matrix_step = document.createElement('div');
    matrix_step.innerHTML = matrix.steps;
    matrix_wrapper.appendChild(matrix_step);
  }

  document.body.appendChild(matrix_wrapper);      
}

/**
 * Performs Gauss-Jordan elimination on a matrix. Organizes into reduced row echelon form (RREF)
 * 
 * @param {Matrix} matrix - The index of the first row to swap.
 */
function gaussJordan(matrix) {
  rrefMatrix = { ...matrix };

  // Move to the first column that isn't full of zeros
  // checkForZeroColumn(matrix);

  // Swap rows if needed so that the top row has the leading number
  for (i = 0; i < rrefMatrix.values.length; i++) {
    if (rrefMatrix.values[0][0] === 0 && rrefMatrix.values[i][0] !== 0) {
      swapRow(rrefMatrix.values[0], rrefMatrix.values[i]);
      break;
    }
  }

  for (a = 0; a < rrefMatrix.values.length; a++) {
    // Convert all values below the leading coefficient of row a to zero
    for (i = a + 1; i < rrefMatrix.values.length; i++) {
      if (rrefMatrix.values[i][a] !== 0) {
        let canceling_coefficient = -1 * rrefMatrix.values[i][a]/rrefMatrix.values[a][a]
        addRow(rrefMatrix.values[i], rrefMatrix.values[a], canceling_coefficient);
        rrefMatrix.steps += '<br>R' + (i + 1) + ' + (' + canceling_coefficient + ')*R' + (a + 1) + ' → R' + (i + 1);
      }
    }

    // Convert all values above the leading coefficient of row a to zero
    for (i = a - 1; i >= 0; i--) {
      if (rrefMatrix.values[i][a] !== 0) {
        let canceling_coefficient = -1 * rrefMatrix.values[i][a]/rrefMatrix.values[a][a]
        addRow(rrefMatrix.values[i], rrefMatrix.values[a], canceling_coefficient);
        rrefMatrix.steps += '<br>R' + (i + 1) + ' + (' + canceling_coefficient + ')*R' + (a + 1) + ' → R' + (i + 1);
      }
    }
    rrefMatrix.name += '\'';
    loadMatrix(rrefMatrix);
    rrefMatrix.steps = '';
  }
  
  // Scale all leading coefficients to 1
  for (i = 0; i < rrefMatrix.values.length; i++) {
    if (rrefMatrix.values[i][i] != 1) {
      let scale_to_one = 1 / rrefMatrix.values[i][i];
      scaleRow(rrefMatrix.values[i], scale_to_one);
      rrefMatrix.steps += '<br>(' + scale_to_one + ')*R' + (i + 1) + ' → R' + (i + 1);      
    }
  }
  
  rrefMatrix.name += '\'';
  loadMatrix(rrefMatrix);
}

/**
 * Swaps two rows in a 2D array (matrix)
 * 
 * @param {Array<number>} row1 - The index of the first row to swap.
 * @param {Array<number>} row2 - The index of the second row to swap.
 */
function swapRow(row_A, row_B) {
  let temp = row_A.slice();
  row_A.forEach((column, index) => {
    row_A[index] = row_B[index];
  });
  row_B.forEach((column, index) => {
    row_B[index] = temp[index];
  });
}

/**
 * Multiply a row by a coefficient in a 2D array (matrix)
 * 
 * @param {Array<number>} row1 - The index of the row to be multiplied.
 * @param {number} coefficient - Coefficient to multiply to row.
 */
function scaleRow(row, coefficient) {
  row.forEach((column, index) => {
    row[index] *= coefficient;
  });
}

/**
 * Adds two rows in a 2D array (matrix)
 * 
 * @param {Array<number>} row1 - Row to be added to.
 * @param {Array<number>} row2 - Addend to row1.
 * @param {number} coefficient - Coefficient to multiply to row2 before adding.
 */
function addRow(row_A, row_B, coefficient = 1) {
  row_A.forEach((column, index) => {
    row_A[index] += (coefficient * row_B[index]);
  })
}

/**
 * TODO: Forces iteration to begin from the next column if the first matrix column are all zeros
 */
function checkForZeroColumn(matrix) {
  return true;
}

function roundMatrix(matrix, digits) {
  rounded_matrix = matrix;
  const round = Math.pow(10, digits);
  rounded_matrix.forEach(row => {
    row.forEach((column, index) => {
      row[index] = Math.round(row[index]*round)/round;
    })
  });
  return rounded_matrix;
}

loadMatrix(matrices[3]);
gaussJordan(matrices[3]);