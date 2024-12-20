"use strict";
// import Fraction from 'fraction.js';
/**
 * Performs Gauss-Jordan elimination on a matrix. Generates elements in the html body representing row operations and the end result.
 *
 * @param {Matrix} matrixObject - A matrix object to yield a RREF
 * @returns {Matrix} Matrix in RREF form, otherwise returns an incomplete RREF if unable to calculate
 */
function loadRREF(matrixObject) {
    const operations_wrapper = document.querySelector('.operations_wrapper');
    if (!operations_wrapper.contains(operations_wrapper.querySelector('span'))) {
        operations_wrapper.innerHTML = '<span>Operations</span>';
    }
    const rrefMatrix = cloneMatrix(matrixObject);
    // const pivot_locations : TargetRows[] = []; if you want to display dividing turning the pivot into one at the end instead of per column
    let row_operations = '';
    let starting_row = 0; // increments once a pivot for this row is recognized
    // Perform all operations column-by-column
    for (let i = 0; i < rrefMatrix.values[0].length && starting_row < rrefMatrix.values.length; i++) {
        const setPivotRow_instance = setPivotRow(rrefMatrix.values, starting_row, i);
        if (setPivotRow_instance === null) { // If this column is all zeros...
            continue; // ...skip ALL operations in this entire column.
        }
        else if (setPivotRow_instance.row_a !== setPivotRow_instance.row_b) {
            row_operations = `R${setPivotRow_instance.row_a + 1} ↔ R${setPivotRow_instance.row_b + 1}`;
            loadRowOperation(rrefMatrix, row_operations);
            row_operations = '';
        }
        row_operations = '';
        clearPivotColumn(rrefMatrix.values, starting_row, i).forEach(instance => {
            row_operations += `<br>R${instance.row_a + 1} + (${instance.constant.toString()})*R${instance.row_b + 1} → R${instance.row_a + 1}`;
        });
        if (row_operations) {
            row_operations = row_operations.substring(4); // trims leading <br> tag if row_operations string is not empty
            loadRowOperation(rrefMatrix, row_operations);
            row_operations = '';
        }
        const reducePivotRow_instance = reducePivotRow(rrefMatrix.values, starting_row, i);
        if (reducePivotRow_instance !== null) {
            row_operations = `(${reducePivotRow_instance.constant.toString()})*R${reducePivotRow_instance.row_a + 1} → R${reducePivotRow_instance.row_a + 1}`;
            loadRowOperation(rrefMatrix, row_operations);
            row_operations = '';
        }
        starting_row++;
    }
    rrefMatrix.name = `RREF(${rrefMatrix.name})`;
    return rrefMatrix;
}
/**
 * Swaps rows if needed so that this pivot is always at the furthest to the top and left
 * compared to lower rows, returns null if this entire column contains zeros.
 *
 * @param {Fraction[][]} matrix
 * @param {number} row
 * @param {number} column
 * @returns {TargetRows | null}
 */
function setPivotRow(matrix, row = 0, column = 0) {
    if (matrix[row][column].toDecimal() !== 0) {
        return { row_a: row, row_b: row, constant: 0 };
    }
    for (let i = row; i < matrix.length; i++) {
        if (matrix[i][column].toDecimal() !== 0) {
            rowOperationFunctions.swapRow(matrix[row], matrix[i]);
            return { row_a: row, row_b: i, constant: 0 };
        }
    }
    return null;
}
/**
 * Converts all other entries in the column with this pivot to zero
 *
 * @param {Fraction[][]} matrix
 * @param {number} row
 * @param {number} column
 * @returns {TargetRows[]} data used to display the current step of the elimination process
 */
function clearPivotColumn(matrix, row = 0, column = 0) {
    const target_rows_array = [];
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][column].toDecimal() !== 0 && i !== row) {
            const canceling_coefficient = matrix[i][column].divide(matrix[row][column]).multiply(-1);
            rowOperationFunctions.addRow(matrix[i], matrix[row], canceling_coefficient);
            target_rows_array.push({ row_a: i, row_b: row, constant: canceling_coefficient });
        }
    }
    return target_rows_array;
}
/**
 * Scales this pivot to 1, returns null if unnecessary
 *
 * @param {Fraction[][]} matrix
 * @param {number} row
 * @param {number} column
 * @returns {TargetRows | null}
 */
function reducePivotRow(matrix, row = 0, column = 0) {
    if (matrix[row][column].toDecimal() !== 1) {
        let scale_to_one = new Fraction(1);
        scale_to_one = scale_to_one.divide(matrix[row][column]);
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
     * @param {Fraction[]} row1 - The index of the first row to swap.
     * @param {Fraction[]} row2 - The index of the second row to swap.
     */
    swapRow(row_A, row_B) {
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
     * @param {Fraction[]} row1 - The index of the row to be multiplied.
     * @param {Fraction | number} coefficient - Coefficient to multiply to row.
     */
    scaleRow(row, coefficient) {
        row.forEach((_, index) => {
            row[index] = row[index].multiply(coefficient);
        });
    },
    /**
     * Adds two rows in a 2D array matrix
     *
     * @param {Fraction[]} row1 - Row to be added to.
     * @param {Fraction[]} row2 - Addend to row1.
     * @param {Fraction | number} coefficient - Coefficient to multiply to row2 before adding.
     */
    addRow(row_A, row_B, coefficient = 1) {
        row_A.forEach((_, index) => {
            row_A[index] = row_A[index].add(row_B[index].multiply(coefficient));
        });
    }
};
/**
 * TODO: See comment about operations_wrapper in index.html
 *
 * @param {Matrix} matrixObject
 */
function loadRowOperation(matrixObject, row_operations) {
    const rref_step = document.createElement('div');
    rref_step.classList.add('rref_step');
    // const matrix_title = document.createElement('div');
    // matrix_title.innerHTML = 'Matrix ' + matrixObject.name;
    // rref_step.appendChild(matrix_title);
    const row_operations_element = document.createElement('ul');
    row_operations_element.classList.add('row_operations');
    row_operations.split('<br>').forEach(operation => {
        const row_operation_element = document.createElement('li');
        row_operation_element.innerHTML = operation;
        row_operations_element.appendChild(row_operation_element);
    });
    rref_step.appendChild(row_operations_element);
    const matrix_table = document.createElement('table');
    matrixObject.values.forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((column) => {
            const td = document.createElement('td');
            td.innerHTML = `${column.toString()}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    rref_step.appendChild(matrix_table);
    const operations_wrapper = document.querySelector('.operations_wrapper');
    operations_wrapper === null || operations_wrapper === void 0 ? void 0 : operations_wrapper.appendChild(rref_step);
}
