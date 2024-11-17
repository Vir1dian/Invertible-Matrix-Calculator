function checkSquare(matrix: number[][]): boolean {
  return matrix.length === 0 || matrix.length === matrix[0].length;
}

function cofactor(matrix: number[][], pos: [number,number]): number {
  const minor: number[][] = matrix
    .filter((_, index_row) => index_row !== pos[0])
    .map(row => row.filter((_, index_column) => index_column !== pos[1]));

  const determinant_value: number | string = determinant(minor);
  if (typeof determinant_value === 'string') {
    return 0;
  }
  return Math.pow(-1, pos[0] + pos[1]) * determinant_value;
}

function determinant(matrix: number[][]): number | string {
  if (!checkSquare(matrix)) {
    return 'Determinant not applicable, not an n x n matrix.';
  } else if (matrix.length === 0) {
    return 1;
  }

  let sum: number = 0;
  matrix[0].forEach((_, index) => {
    // Using the first row of the matrix ... TODO?: implement option to change the column or row being used to prove determinant
    sum += matrix[0][index] * cofactor(matrix, [0, index]);
  })
  return sum;
}

/**
 * Finds the determinant of a matrix using the sum of the product of element and cofactors for the first row
 * 
 * TODO: Add another element to store the summation formula and the steps (such as how cofactors were found) which can be shown or hidden
 * 
 * TODO: See comment about operations_wrapper in index.html
 * 
 * @param {Matrix} matrixObject - A matrix object to yield a determinant
 */
function loadDeterminant(matrixObject: Matrix) {
  const determinant_value = determinant(matrixObject.values);
  const determinant_element = document.createElement('div');
  determinant_element.classList.add('determinant');
  if (typeof determinant_value === 'string') {
    determinant_element.innerHTML = determinant_value;
  }
  else {
    determinant_element.innerHTML = `Determinant of Matrix ${matrixObject.name} : ${determinant_value}`;
  }

  const solution_wrapper = document.querySelector('.solution_wrapper');
  solution_wrapper?.appendChild(determinant_element);
}