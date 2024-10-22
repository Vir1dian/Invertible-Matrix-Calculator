"use strict";
const matrices = [
    {
        name: 'A',
        values: [
            [1, 0, -3, -2],
            [3, 1, -2, 5],
            [2, 2, 1, 4]
        ],
        row_operations: ''
    },
    {
        name: 'B',
        values: [
            [1, 1, 1, 500000],
            [3 / 100, 4 / 100, 5 / 100, 20500],
            [-5 / 2, 1, 0, 0]
        ],
        row_operations: ''
    },
    {
        name: 'C',
        values: [
            [0, 0, 2, -2],
            [0, 1, -7, 3],
            [5, 0, 4, 0]
        ],
        row_operations: ''
    },
    {
        name: 'D',
        values: [
            [0, 2, 4, 4, -8],
            [2, 4, -3, -5, 4],
            [5, 0, 1, -3, -4],
            [1, 1, 0, 1, 5]
        ],
        row_operations: ''
    },
    {
        name: 'E',
        values: [
            [2, 0, 7],
            [3, 4, 4],
            [0, 1, 0]
        ],
        row_operations: ''
    }
];
const testMatrices = [
    {
        name: 'A',
        values: [
            [0, 0],
            [0, 0]
        ],
        row_operations: ''
    },
    {
        name: 'B',
        values: [
            []
        ],
        row_operations: ''
    },
    {
        name: 'C',
        values: [
            [1, 2, 3],
            [0, 0, 0],
            [4, 5, 6]
        ],
        row_operations: ''
    },
    {
        name: 'D',
        values: [
            [1, 0, 2],
            [3, 0, 4],
            [5, 0, 6]
        ],
        row_operations: ''
    },
    {
        name: 'E',
        values: [
            [1, 2],
            [3, 4],
            [5, 6]
        ],
        row_operations: ''
    },
    {
        name: 'F',
        values: [
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ],
        row_operations: ''
    },
    {
        name: 'G',
        values: [
            [-1, -2, -3],
            [4, 5, 6]
        ],
        row_operations: ''
    },
    {
        name: 'H',
        values: [
            [1 / 2, 1, 1 / 3],
            [1, 1 / 4, 2]
        ],
        row_operations: ''
    },
    {
        name: 'I',
        values: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ],
        row_operations: ''
    },
    {
        name: 'J',
        values: [
            [1, 3, 2, 5],
            [0, 0, 1, 11],
            [0, 0, 0, 2]
        ],
        row_operations: ''
    }
];
/**
 * Generates a table in the html body representing a matrix, along with a title and rref steps
 *
 * @param {Matrix} matrixObject - A matrix object to represent in the html body
 */
function loadMatrix(matrixObject) {
    // const matrix_wrapper = document.createElement('div');
    // matrix_wrapper.classList.add('matrix_wrapper');
    const matrix_wrapper = document.querySelector('.matrix_wrapper');
    const matrix_title = document.createElement('div');
    matrix_title.innerHTML = 'Matrix ' + matrixObject.name;
    matrix_wrapper === null || matrix_wrapper === void 0 ? void 0 : matrix_wrapper.appendChild(matrix_title);
    const matrix_table = document.createElement('table');
    matrixObject.values.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(column => {
            const td = document.createElement('td');
            td.innerHTML = `${column}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    matrix_wrapper === null || matrix_wrapper === void 0 ? void 0 : matrix_wrapper.appendChild(matrix_table);
    // document.body.appendChild(matrix_wrapper);      
}
/**
 * Generates a table in the html body representing a matrix, along with a title and rref steps
 *
 * @param {number[][]} matrix - A 2D array representing a matrix
 * @param {number} digits - The number of decimal places to round all elements of the matrix by
 * @returns {number[][]} The rounded version of the 2D array
 */
function roundMatrix(matrix, digits) {
    let rounded_matrix = matrix;
    const round = Math.pow(10, digits);
    rounded_matrix.forEach(row => {
        row.forEach((_, index) => {
            row[index] = Math.round(row[index] * round) / round;
        });
    });
    return rounded_matrix;
}
