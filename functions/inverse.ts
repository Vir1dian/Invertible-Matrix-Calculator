function createAdjoin(matrix: number[][]): number[][] {
  const adjoin = matrix.map(row => [...row]);
  adjoin.forEach((row, index) => {
    const identity_row: number[] = Array(row.length).fill(0);
    identity_row[index] = 1;
    row.push(...identity_row);
  })
  return adjoin;
}
function loadAdjoin(matrixObject: Matrix) {
  const adjoin = createAdjoin(matrixObject.values);

  const adjoin_wrapper = document.createElement('div');
  adjoin_wrapper.classList.add('adjoin_wrapper');
  const matrix_title = document.createElement('div');
  matrix_title.innerHTML = `Matrix [ ${matrixObject.name} I_${matrixObject.values.length} ]`;
  adjoin_wrapper?.appendChild(matrix_title);   
  
  const matrix_table = document.createElement('table');
  roundMatrix(adjoin, 4).forEach((row: number[]) => {
    const tr = document.createElement('tr');
    row.forEach((column: number) => {
      const td = document.createElement('td');
      td.innerHTML = `${column}`;
      tr.appendChild(td);
    })
    matrix_table.appendChild(tr);
  })
  adjoin_wrapper?.appendChild(matrix_table);

  const operations_wrapper = document.querySelector('.operations_wrapper');
  operations_wrapper?.appendChild(adjoin_wrapper);
}

function inverse(matrixObject: Matrix) {
  
}