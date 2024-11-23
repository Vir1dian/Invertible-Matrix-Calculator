"use strict";
/**
 * Checks if a matrix is square (n x n) or not.
 *
 * @param {Fraction[][]} matrix - A 2D array representing a matrix
 * @returns {boolean} - true for a square (n x n) matrix, false of not
 */
function isSquare(matrix) {
    return matrix.length === 0 || matrix.length === matrix[0].length;
}
/**
 * Returns the cofactor of an element in the matrix.
 * Only works on n x n matrices, requires the isSquare function to be used externally.
 *
 * @param {Fraction[][]} matrix - A 2D array representing a matrix
 * @param {[number,number]} pos - An array of two integers specifying a row and column
 * @returns {Fraction | number} - The cofactor of the matrix at an element in the specified row and column
 */
function cofactor(matrix, pos) {
    const minor = matrix
        .filter((_, index_row) => index_row !== pos[0])
        .map(row => row.filter((_, index_column) => index_column !== pos[1]));
    const determinant_value = determinant(minor);
    if (typeof determinant_value === 'string') {
        return 0;
    }
    return determinant_value.multiply(Math.pow(-1, pos[0] + pos[1]));
}
/**
 * Returns the determinant of a matrix using the sum of the product of element and cofactors for the first row
 *
 * TODO: Add another element to store the summation formula and the steps (such as how cofactors were found) which can be shown or hidden
 *
 * TODO: See comment about operations_wrapper in index.html
 *
 * @param {Fraction[][]} matrix - A 2D array representing a matrix
 * @returns {Fraction | string} - The determinant, error string if unable to calculate
 */
function determinant(matrix) {
    if (!isSquare(matrix)) {
        return 'Determinant not applicable, not an n x n matrix.';
    }
    else if (matrix.length === 0) {
        return new Fraction(1);
    }
    let sum = new Fraction(0);
    matrix[0].forEach((_, index) => {
        // Using the first row of the matrix ... TODO?: implement option to change the column or row being used to prove determinant
        const element_cofactor_product = matrix[0][index].multiply(cofactor(matrix, [0, index]));
        sum = sum.add(element_cofactor_product);
    });
    return sum;
}
/**
 * Returns the determinant of a matrix using the sum of the product of element and cofactors for the first row.
 * Generates an element to append into the html body representing the determinant.
 *
 * TODO: Add another element to store the summation formula and the steps (such as how cofactors were found) which can be shown or hidden
 *
 * TODO: See comment about operations_wrapper in index.html
 *
 * @param {Matrix} matrixObject - A matrix object to yield a determinant
 * @returns {Fraction | number | string} - The determinant, error string if unable to calculate
 */
function loadDeterminant(matrixObject) {
    const determinant_value = determinant(matrixObject.values);
    const determinant_element = document.createElement('div');
    determinant_element.classList.add('determinant');
    if (typeof determinant_value === 'string') {
        determinant_element.innerHTML = determinant_value;
    }
    else {
        determinant_element.innerHTML = `Determinant of Matrix ${matrixObject.name} : ${determinant_value.toString()}`;
    }
    const solution_wrapper = document.querySelector('.solution_wrapper');
    solution_wrapper === null || solution_wrapper === void 0 ? void 0 : solution_wrapper.appendChild(determinant_element);
    return determinant_value;
}
