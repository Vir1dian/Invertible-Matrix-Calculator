"use strict";
function cloneMatrix(matrixObject) {
    return {
        name: matrixObject.name,
        values: matrixObject.values.map(row => row.map(cell => new Fraction(cell.numerator, cell.denominator))),
    };
}
const userMatrix = {
    name: 'A',
    values: []
};
// const matrices: Matrix[] = [
//   {
//     name: 'A',
//     values: [
//       [new Fraction(1), new Fraction(0), new Fraction(-3), new Fraction(-2)],
//       [new Fraction(3), new Fraction(1), new Fraction(-2), new Fraction(5)],
//       [new Fraction(2), new Fraction(2), new Fraction(1), new Fraction(4)]
//     ]
//   },
//   {
//     name: 'B',
//     values: [
//       [new Fraction(1), new Fraction(1), new Fraction(1), new Fraction(500000)],
//       [new Fraction(3, 100), new Fraction(4, 100), new Fraction(5, 100), new Fraction(20500)],
//       [new Fraction(-5, 2), new Fraction(1), new Fraction(0), new Fraction(0)]
//     ]
//   },
//   {
//     name: 'C',
//     values: [
//       [new Fraction(0), new Fraction(0), new Fraction(2), new Fraction(-2)],
//       [new Fraction(0), new Fraction(1), new Fraction(-7), new Fraction(3)],
//       [new Fraction(5), new Fraction(0), new Fraction(4), new Fraction(0)]
//     ]
//   },
//   {
//     name: 'D',
//     values: [
//       [new Fraction(0), new Fraction(2), new Fraction(4), new Fraction(4), new Fraction(-8)],
//       [new Fraction(2), new Fraction(4), new Fraction(-3), new Fraction(-5), new Fraction(4)],
//       [new Fraction(5), new Fraction(0), new Fraction(1), new Fraction(-3), new Fraction(-4)],
//       [new Fraction(1), new Fraction(1), new Fraction(0), new Fraction(1), new Fraction(5)]
//     ]
//   },
//   {
//     name: 'E',
//     values: [
//       [new Fraction(2), new Fraction(0), new Fraction(7)],
//       [new Fraction(3), new Fraction(4), new Fraction(4)],
//       [new Fraction(0), new Fraction(1), new Fraction(0)]
//     ]
//   },
//   {
//     name: 'F',
//     values: [
//       [new Fraction(1), new Fraction(1), new Fraction(1)],
//       [new Fraction(2), new Fraction(3), new Fraction(2)],
//       [new Fraction(3), new Fraction(8), new Fraction(2)]
//     ]
//   }
// ];
const matricesForRREF = [
    {
        name: 'Empty matrix',
        values: [
            []
        ]
    },
    {
        name: 'Zero matrix',
        values: [
            [new Fraction(0), new Fraction(0)],
            [new Fraction(0), new Fraction(0)]
        ]
    },
    {
        name: 'Zero middle row',
        values: [
            [new Fraction(1), new Fraction(2), new Fraction(3)],
            [new Fraction(0), new Fraction(0), new Fraction(0)],
            [new Fraction(4), new Fraction(5), new Fraction(6)]
        ]
    },
    {
        name: 'Zero middle column',
        values: [
            [new Fraction(1), new Fraction(0), new Fraction(2)],
            [new Fraction(3), new Fraction(0), new Fraction(4)],
            [new Fraction(5), new Fraction(0), new Fraction(6)]
        ]
    },
    {
        name: 'Non-square matrix m > n',
        values: [
            [new Fraction(1), new Fraction(2)],
            [new Fraction(3), new Fraction(4)],
            [new Fraction(5), new Fraction(6)]
        ]
    },
    {
        name: 'Non-square matrix m < n',
        values: [
            [new Fraction(1), new Fraction(2), new Fraction(3), new Fraction(4)],
            [new Fraction(5), new Fraction(6), new Fraction(7), new Fraction(8)]
        ]
    },
    {
        name: 'Negative elements',
        values: [
            [new Fraction(-1), new Fraction(-2), new Fraction(-3)],
            [new Fraction(4), new Fraction(5), new Fraction(6)]
        ]
    },
    {
        name: 'Fraction elements',
        values: [
            [new Fraction(1, 2), new Fraction(1), new Fraction(1, 3)],
            [new Fraction(1), new Fraction(1, 4), new Fraction(2)]
        ]
    },
    {
        name: 'Negative fraction elements',
        values: [
            [new Fraction(-1, 2), new Fraction(-1), new Fraction(1, 3)],
            [new Fraction(1), new Fraction(1, 4), new Fraction(2, -3)],
            [new Fraction(0, 1), new Fraction(1, -4), new Fraction(-5)]
        ]
    },
    {
        name: 'Identity matrix',
        values: [
            [new Fraction(1), new Fraction(0), new Fraction(0)],
            [new Fraction(0), new Fraction(1), new Fraction(0)],
            [new Fraction(0), new Fraction(0), new Fraction(1)]
        ]
    },
    {
        name: 'Non-diagonal pivots',
        values: [
            [new Fraction(1), new Fraction(3), new Fraction(2), new Fraction(5)],
            [new Fraction(0), new Fraction(0), new Fraction(1), new Fraction(11)],
            [new Fraction(0), new Fraction(0), new Fraction(0), new Fraction(2)]
        ]
    },
    {
        name: 'No initial zero rows',
        values: [
            [new Fraction(2), new Fraction(4), new Fraction(6)],
            [new Fraction(1), new Fraction(2), new Fraction(3)],
            [new Fraction(3), new Fraction(6), new Fraction(8)]
        ]
    },
    {
        name: 'Column Vector',
        values: [
            [new Fraction(1)],
            [new Fraction(2)],
            [new Fraction(3)]
        ]
    },
    {
        name: 'Row Vector',
        values: [
            [new Fraction(1), new Fraction(2), new Fraction(3)]
        ]
    }
];
const matricesToInvert = [
    {
        name: 'A',
        values: [
            [new Fraction(1), new Fraction(1), new Fraction(1)],
            [new Fraction(2), new Fraction(3), new Fraction(2)],
            [new Fraction(3), new Fraction(8), new Fraction(2)]
        ]
    },
    {
        name: 'A<sup>-1</sup>',
        values: [
            [new Fraction(10), new Fraction(-6), new Fraction(1)],
            [new Fraction(-2), new Fraction(1), new Fraction(0)],
            [new Fraction(-7), new Fraction(5), new Fraction(-1)]
        ]
    },
    {
        name: 'Singular 3 x 3',
        values: [
            [new Fraction(5), new Fraction(-2), new Fraction(1)],
            [new Fraction(8), new Fraction(-5), new Fraction(-3)],
            [new Fraction(15), new Fraction(-6), new Fraction(3)]
        ]
    },
    {
        name: 'Non-square',
        values: [
            [new Fraction(-3), new Fraction(5)]
        ]
    }
];
/**
 * Generates a table in the html body representing a matrix, along with a title
 *
 * @param {Matrix} matrixObject - A matrix object to represent in the html body
 */
function loadMatrix(matrixObject) {
    var _a;
    // const matrix_wrapper = document.createElement('div');
    // matrix_wrapper.classList.add('matrix_wrapper');
    const matrix_wrapper = document.querySelector('.matrix_wrapper');
    // Removes existing tables
    while (matrix_wrapper === null || matrix_wrapper === void 0 ? void 0 : matrix_wrapper.hasChildNodes()) {
        (_a = matrix_wrapper.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
    }
    matrix_wrapper.innerHTML = '<span>Selected matrix</span>';
    const matrix_title = document.createElement('div');
    matrix_title.innerHTML = matrixObject.name;
    matrix_wrapper.appendChild(matrix_title);
    const matrix_table = document.createElement('table');
    matrixObject.values.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(column => {
            const td = document.createElement('td');
            td.innerHTML = `${column.toString()}`;
            tr.appendChild(td);
        });
        matrix_table.appendChild(tr);
    });
    matrix_wrapper.appendChild(matrix_table);
    // document.body.appendChild(matrix_wrapper);      
}
