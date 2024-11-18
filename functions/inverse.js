"use strict";
/**
 * Generates a matrix adjoining the original matrix and an identity matrix of the same size
 *
 * @param {number[][]} matrix - A 2D array representing a matrix
 * @returns {number[][]} - A 2D array containing values the original matrix with the values of an identity matrix of the same size adjoined to its right
 */
function createAdjoin(matrix) {
    const adjoin = matrix.map(row => [...row]);
    adjoin.forEach((row, index) => {
        const identity_row = Array(row.length).fill(0);
        identity_row[index] = 1;
        row.push(...identity_row);
    });
    return adjoin;
}
/**
 * Yields the right matrix adjoined to the right of an identity matrix
 *
 * @param {number[][]} matrix - A 2D array representing an identity matrix (left) and some matrix of the same size (right) adjoined together
 * @returns {number[][]} - The 2D array containing values of the right matrix
 */
function detachAdjoin(matrix) {
    const rightMatrix = matrix.map(row => [...row]);
    return rightMatrix.map(row => row.filter((_, index) => index >= row.length / 2));
}
/**
 * Generates a table in the html body representing a matrix adjoined to an identity matrix, along with a title.
 *
 * @param {Matrix} matrixObject - A matrix object for an adjoined matrix to represent in the html body
 */
function loadAdjoin(matrixObject) {
    const adjoin = createAdjoin(matrixObject.values);
    const adjoin_wrapper = document.createElement('div');
    adjoin_wrapper.classList.add('adjoin_wrapper');
    const matrix_title = document.createElement('div');
    matrix_title.innerHTML = `Matrix [ ${matrixObject.name} I<sub>${matrixObject.values.length}</sub> ]`;
    adjoin_wrapper === null || adjoin_wrapper === void 0 ? void 0 : adjoin_wrapper.appendChild(matrix_title);
    const matrix_table = document.createElement('table');
    roundMatrix(adjoin, 4).forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((column) => {
            const td = document.createElement('td');
            td.innerHTML = `${column}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    adjoin_wrapper === null || adjoin_wrapper === void 0 ? void 0 : adjoin_wrapper.appendChild(matrix_table);
    const operations_wrapper = document.querySelector('.operations_wrapper');
    operations_wrapper === null || operations_wrapper === void 0 ? void 0 : operations_wrapper.appendChild(adjoin_wrapper);
}
/**
 * MAIN FEATURE FOR HONORS PROJECT
 *
 * Performs and a series of steps to append into the html body and return the inverse of a matrix
 * 1. Check the size and the determinant of the matrix
 * 2. Create an adjoin of the matrix with an identity matrix of the same size
 * 3. Rewrite adjoin in RREF
 * 4. Detach the inverse from the adjoin
 * 5. Load and return the inverse
 *
 * Only accepts matrices with non-zero determinants.
 *
 * @param {Matrix} matrixObject - A matrix object to yield the inverse
 * @returns {Matrix | string} - The matrix object containing the inverse, error message if unable to caculate
 */
function loadInverse(matrixObject) {
    const inverseObject = structuredClone(matrixObject);
    const determinant_value = loadDeterminant(matrixObject);
    if (typeof determinant_value === 'string') {
        return 'Matrix is not square.';
    }
    else if (determinant_value === 0) {
        return 'Matrix is singular';
    }
    else {
        loadAdjoin(matrixObject);
        inverseObject.values = createAdjoin(matrixObject.values);
        inverseObject.values = detachAdjoin(loadRREF(inverseObject).values);
        console.log(inverseObject);
    }
    inverseObject.name = `(${inverseObject.name})\<sup>-1</sup>`;
    const solution_wrapper = document.querySelector('.solution_wrapper');
    const matrix_title = document.createElement('div');
    matrix_title.innerHTML = `Matrix ${inverseObject.name}`;
    solution_wrapper === null || solution_wrapper === void 0 ? void 0 : solution_wrapper.appendChild(matrix_title);
    const matrix_table = document.createElement('table');
    inverseObject.values.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(column => {
            const td = document.createElement('td');
            td.innerHTML = `${column}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    solution_wrapper === null || solution_wrapper === void 0 ? void 0 : solution_wrapper.appendChild(matrix_table);
    return inverseObject;
}
