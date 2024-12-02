/**
 * Generates a matrix adjoining the original matrix and an identity matrix of the same size
 * 
 * @param {Fraction[][]} matrix - A 2D array representing a matrix
 * @returns {Fraction[][]} - A 2D array containing values the original matrix with the values of an identity matrix of the same size adjoined to its right
 */
function createAdjoin(matrix: Fraction[][]): Fraction[][] {
  const adjoin : Fraction[][] = matrix.map(row => [...row]);
  adjoin.forEach((row, index) => {
    const identity_row: Fraction[] = Array(row.length).fill(new Fraction(0));
    identity_row[index] = new Fraction(1);
    row.push(...identity_row);
  })
  return adjoin;
}

/**
 * Yields the right matrix adjoined to the right of an identity matrix
 * 
 * @param {Fraction[][]} matrix - A 2D array representing an identity matrix (left) and some matrix of the same size (right) adjoined together
 * @returns {Fraction[][]} - The 2D array containing values of the right matrix
 */
function detachAdjoin(matrix: Fraction[][]): Fraction[][] {
  const rightMatrix : Fraction[][] = matrix.map(row => [...row]);
  return rightMatrix.map(row => row.filter((_, index) => index >= row.length / 2));
}

/**
 * Generates a table in the html body representing a matrix adjoined to an identity matrix, along with a title.
 * 
 * @param {Matrix} matrixObject - A matrix object for an adjoined matrix to represent in the html body
 */
function loadAdjoin(matrixObject: Matrix) {
  const adjoin : Fraction[][] = createAdjoin(matrixObject.values);

  const adjoin_wrapper : HTMLElement = document.createElement('div');
  adjoin_wrapper.classList.add('adjoin_wrapper');
  const matrix_title : HTMLElement = document.createElement('ul');
  matrix_title.classList.add('adjoin_title');
  matrix_title.innerHTML = `<li>Matrix [ ${matrixObject.name} I<sub>${matrixObject.values.length}</sub> ]</li>`;
  adjoin_wrapper?.appendChild(matrix_title);   
  
  const matrix_table : HTMLTableElement = document.createElement('table');
  adjoin.forEach((row: Fraction[]) => {
    const tr : HTMLTableRowElement = document.createElement('tr');
    row.forEach((column: Fraction) => {
      const td : HTMLTableCellElement = document.createElement('td');
      td.innerHTML = `${column.toString()}`;
      tr.appendChild(td);
    })
    matrix_table.appendChild(tr);
  })
  adjoin_wrapper?.appendChild(matrix_table);

  const operations_wrapper : HTMLElement = document.querySelector('.operations_wrapper') as HTMLElement;
  operations_wrapper.appendChild(adjoin_wrapper);
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
function loadInverse(matrixObject: Matrix) : Matrix | string {
  const inverseObject : Matrix = cloneMatrix(matrixObject);
  const determinant_value : Fraction | string = determinant(matrixObject.values);
  if (typeof determinant_value === 'string') {
    return 'Matrix is not square.';
  }
  else if (determinant_value.numerator === 0) {
    return 'Matrix is singular, no inverse found.';
  }
  else {
    const operations_wrapper : HTMLElement = document.querySelector('.operations_wrapper') as HTMLElement;
    operations_wrapper.innerHTML = `<span>Operations</span><ul class="determinant_step"><li>${loadDeterminant(matrixObject, determinant_value)}</li></ul>`;
    loadAdjoin(matrixObject);
    inverseObject.values = createAdjoin(matrixObject.values);
    inverseObject.values = detachAdjoin(loadRREF(inverseObject).values);
  }
  inverseObject.name = `(${inverseObject.name})\<sup>-1</sup>`;
  return inverseObject;
}