function checkSquare(matrix: number[][]): boolean {
  return matrix.length === matrix[0].length;
}

function cofactor(matrix: number[][], pos: [number,number]): number {
  const minor: number[][] = matrix
    .filter((_, index_row) => index_row !== pos[0])
    .filter((_, index_column) => index_column !== pos[1]);
  return Math.pow(-1, pos[0] + pos[1]) * determinant(minor);
}

function determinant(matrix: number[][]): number {
  if (!checkSquare(matrix)) {
    return 0;
  } else if (matrix.length === 0) {
    return 1;
  }

  let sum: number = 0;
  matrix[0].forEach((_, index) => {
    sum += matrix[0][index] * cofactor(matrix, [0, index]);
  })
  return sum;
}

function loadDeterminant() {
  
}