interface Matrix {
  name: string;
  values: number[][];
}

const matrices: Matrix[] = [
  {
    name: 'A',
    values: [
      [1, 0, -3, -2],
      [3, 1, -2, 5],
      [2, 2, 1, 4]
    ]
  },
  {
    name: 'B',
    values: [
      [1, 1, 1, 500000],
      [3/100, 4/100, 5/100, 20500],
      [-5/2, 1, 0, 0]
    ]
  },
  {
    name: 'C',
    values: [
      [0, 0, 2, -2],
      [0, 1, -7, 3],
      [5, 0, 4, 0]
    ]
  },
  {
    name: 'D',
    values: [
      [0, 2, 4, 4, -8],
      [2, 4, -3, -5, 4],
      [5, 0, 1, -3, -4],
      [1, 1, 0, 1, 5]
    ]
  },
  {
    name: 'E',
    values: [
      [2, 0, 7],
      [3, 4, 4],
      [0, 1, 0]
    ]
  }
];

const testMatrices: Matrix[] = [
  {
    name: 'A',  // matrix of zeros
    values: [
      [0, 0],
      [0, 0]
    ]
  },
  {
    name: 'B',  // empty matrix
    values: [
      []
    ]
  },
  {
    name: 'C',  // zero row
    values: [
      [1, 2, 3],
      [0, 0, 0],
      [4, 5, 6]
    ]
  },
  {
    name: 'D',  // zero column
    values: [
      [1, 0, 2],
      [3, 0, 4],
      [5, 0, 6]
    ]
  },
  {
    name: 'E',  // non-square matrix m > n
    values: [
      [1, 2],
      [3, 4],
      [5, 6]
    ]
  },
  {
    name: 'F',  // non-square matrix m < n
    values: [
      [1, 2, 3, 4],
      [5, 6, 7, 8]
    ]
  },
  {
    name: 'G',  // negative elements
    values: [
      [-1, -2, -3],
      [4, 5, 6]
    ]
  },
  {
    name: 'H',  // fraction elements
    values: [
      [1/2, 1, 1/3],
      [1, 1/4, 2]
    ]
  },
  {
    name: 'I',  // identity matrix
    values: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  },
  {
    name: 'J',  // non-diagonal leading ones
    values: [
      [1, 3, 2, 5],
      [0, 0, 1, 11],
      [0, 0, 0, 2]
    ]
  }
];

/**
 * Generates a table in the html body representing a matrix, along with a title and rref steps
 * 
 * @param {Matrix} matrixObject - A matrix object to represent in the html body
 */
function loadMatrix(matrixObject: Matrix) {
  // const matrix_wrapper = document.createElement('div');
  // matrix_wrapper.classList.add('matrix_wrapper');
  const matrix_wrapper = document.querySelector('.matrix_wrapper')
  const matrix_title = document.createElement('div');
  matrix_title.innerHTML = 'Matrix ' + matrixObject.name;
  matrix_wrapper?.appendChild(matrix_title);
  
  const matrix_table = document.createElement('table');
  matrixObject.values.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(column => {
      const td = document.createElement('td');
      td.innerHTML = `${column}`;
      tr.appendChild(td);
    })
    matrix_table.appendChild(tr);
  })
  matrix_wrapper?.appendChild(matrix_table);

  // document.body.appendChild(matrix_wrapper);      
}

/**
 * Generates a table in the html body representing a matrix, along with a title and rref steps
 * 
 * @param {number[][]} matrix - A 2D array representing a matrix
 * @param {number} digits - The number of decimal places to round all elements of the matrix by
 * @returns {number[][]} The rounded version of the 2D array
 */
function roundMatrix(matrix: number[][], digits: number): number[][] {
  let rounded_matrix = matrix;
  const round = Math.pow(10, digits);
  rounded_matrix.forEach(row => {
    row.forEach((_, index) => {
      row[index] = Math.round(row[index]*round)/round;
    })
  });
  return rounded_matrix;
}