"use strict";
function checkSquare(matrix) {
    return matrix.length === matrix[0].length;
}
function cofactor(matrix, pos) {
    const minor = matrix
        .filter((_, index_row) => index_row !== pos[0])
        .filter((_, index_column) => index_column !== pos[1]);
    return Math.pow(-1, pos[0] + pos[1]) * determinant(minor);
}
function determinant(matrix) {
    if (!checkSquare(matrix)) {
        return 0;
    }
    else if (matrix.length === 0) {
        return 1;
    }
    let sum = 0;
    matrix[0].forEach((_, index) => {
        sum += matrix[0][index] * cofactor(matrix, [0, index]);
    });
    return sum;
}
function loadDeterminant() {
}
