"use strict";
/**
 * Performs Gauss-Jordan elimination on a matrix. Organizes into reduced row echelon form (RREF)
 * TODO: Account for non diagonal leading 1's
 *
 * @param {Matrix} matrixObject - A matrix object to yield a RREF
 */
function gaussJordan(matrixObject) {
    let rrefMatrix = Object.assign({}, matrixObject);
    // Move to the first column that isn't full of zeros
    // checkForZeroColumn(matrixObject);
    // Swap rows if needed so that the top row has the leading number
    for (let i = 0; i < rrefMatrix.values.length; i++) {
        if (rrefMatrix.values[0][0] === 0 && rrefMatrix.values[i][0] !== 0) {
            swapRow(rrefMatrix.values[0], rrefMatrix.values[i]);
            break;
        }
    }
    for (let a = 0; a < rrefMatrix.values.length; a++) {
        // Convert all values below the leading coefficient of row a to zero
        for (let i = a + 1; i < rrefMatrix.values.length; i++) {
            if (rrefMatrix.values[i][a] !== 0) {
                let canceling_coefficient = -1 * rrefMatrix.values[i][a] / rrefMatrix.values[a][a];
                addRow(rrefMatrix.values[i], rrefMatrix.values[a], canceling_coefficient);
                rrefMatrix.row_operations += '<br>R' + (i + 1) + ' + (' + canceling_coefficient + ')*R' + (a + 1) + ' → R' + (i + 1);
            }
        }
        // Convert all values above the leading coefficient of row a to zero
        for (let i = a - 1; i >= 0; i--) {
            if (rrefMatrix.values[i][a] !== 0) {
                let canceling_coefficient = -1 * rrefMatrix.values[i][a] / rrefMatrix.values[a][a];
                addRow(rrefMatrix.values[i], rrefMatrix.values[a], canceling_coefficient);
                rrefMatrix.row_operations += '<br>R' + (i + 1) + ' + (' + canceling_coefficient + ')*R' + (a + 1) + ' → R' + (i + 1);
            }
        }
        rrefMatrix.name += '\'';
        rrefMatrix.row_operations = rrefMatrix.row_operations ? rrefMatrix.row_operations.substring(4) : '';
        loadRREF(rrefMatrix);
        rrefMatrix.row_operations = '';
    }
    // Scale all leading coefficients to 1
    for (let i = 0; i < rrefMatrix.values.length; i++) {
        if (rrefMatrix.values[i][i] != 1) {
            let scale_to_one = 1 / rrefMatrix.values[i][i];
            scaleRow(rrefMatrix.values[i], scale_to_one);
            rrefMatrix.row_operations += '<br>(' + scale_to_one + ')*R' + (i + 1) + ' → R' + (i + 1);
        }
    }
    rrefMatrix.name += '\'';
    rrefMatrix.row_operations = rrefMatrix.row_operations ? rrefMatrix.row_operations.substring(4) : '';
    loadRREF(rrefMatrix);
    rrefMatrix.row_operations = '';
}
/**
 * Swaps two rows in a 2D array (matrix)
 *
 * @param {number[]} row1 - The index of the first row to swap.
 * @param {number[]} row2 - The index of the second row to swap.
 */
function swapRow(row_A, row_B) {
    let temp = row_A.slice();
    row_A.forEach((_, index) => {
        row_A[index] = row_B[index];
    });
    row_B.forEach((_, index) => {
        row_B[index] = temp[index];
    });
}
/**
 * Multiply a row by a coefficient in a 2D array (matrix)
 *
 * @param {number[]} row1 - The index of the row to be multiplied.
 * @param {number} coefficient - Coefficient to multiply to row.
 */
function scaleRow(row, coefficient) {
    row.forEach((_, index) => {
        row[index] *= coefficient;
    });
}
/**
 * Adds two rows in a 2D array (matrix)
 *
 * @param {number[]} row1 - Row to be added to.
 * @param {number[]} row2 - Addend to row1.
 * @param {number} coefficient - Coefficient to multiply to row2 before adding.
 */
function addRow(row_A, row_B, coefficient = 1) {
    row_A.forEach((_, index) => {
        row_A[index] += (coefficient * row_B[index]);
    });
}
/**
 * TODO: Forces iteration to begin from the next column if the first matrix column are all zeros
 */
function checkForZeroColumn(matrix) {
    return true;
}
function loadRREF(matrixObject) {
    const rref_step = document.createElement('div');
    rref_step.classList.add('rref_step');
    const matrix_title = document.createElement('div');
    matrix_title.innerHTML = 'Matrix ' + matrixObject.name;
    rref_step.appendChild(matrix_title);
    if (matrixObject.row_operations) {
        const row_operations = document.createElement('div');
        row_operations.classList.add('row_operations');
        row_operations.innerHTML = matrixObject.row_operations;
        rref_step.appendChild(row_operations);
    }
    const matrix_table = document.createElement('table');
    roundMatrix(matrixObject.values, 4).forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((column) => {
            const td = document.createElement('td');
            td.innerHTML = `${column}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    rref_step.appendChild(matrix_table);
    const rref_wrapper = document.querySelector('.rref_wrapper');
    rref_wrapper === null || rref_wrapper === void 0 ? void 0 : rref_wrapper.appendChild(rref_step);
}
