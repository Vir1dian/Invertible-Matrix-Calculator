
function showBuildOption() {
  const option_default : HTMLElement | null = document.getElementById('build_matrix_default');
  const option_matlabstring : HTMLElement | null = document.getElementById('build_matrix_matlabstring');
  const option_example : HTMLElement | null = document.getElementById('build_matrix_example');

  const selected : HTMLInputElement = document.querySelector('#build_options') as HTMLInputElement;
  switch(selected.value) {
    case "matlabstring":
      option_default!.style.display = "none";
      option_matlabstring!.style.display = "";
      option_example!.style.display = "none";
      break;
    case "example":
      option_default!.style.display = "none";
      option_matlabstring!.style.display = "none";
      option_example!.style.display = "";
      break;
    default:
      option_default!.style.display = "";
      option_matlabstring!.style.display = "none";
      option_example!.style.display = "none";
  }
}

// BM - Build Matrix
const BMDefaultFunctions = {

  setMatrixInputs() {
    const matrix_inputs : HTMLElement | null = document.getElementById('matrix_inputs');
    const existing_table : HTMLTableElement = document.getElementById('matrix_inputs_table') as HTMLTableElement;
    // Removes existing tables first
    if (existing_table) {
      existing_table.remove();
    }

    const row_input : HTMLInputElement = document.getElementById('row_input') as HTMLInputElement;
    const col_input : HTMLInputElement = document.getElementById('col_input') as HTMLInputElement;

    const rows : number = parseInt(row_input.value);
    const columns : number = parseInt(col_input.value);

    const table : HTMLTableElement = document.createElement('table');
    table.id = 'matrix_inputs_table';
    table.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (let i = 0; i < rows; i++) {
      const tr : HTMLTableRowElement = document.createElement('tr');
      for (let j = 0; j < columns; j++) {
        const td : HTMLTableCellElement = document.createElement('td');
        const input : HTMLInputElement = document.createElement('input');

        input.type = 'number';
        input.classList.add('matrix_cell_input');
        input.id = `matrix_cell_input_${i}_${j}`;

        td.appendChild(input);
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }

    matrix_inputs?.appendChild(table);

    const submit : HTMLElement | null = document.getElementById('submit_matrix_default');
    submit!.style.display = '';
  },

  createMatrixDefault() {
    userMatrix.values = [];

    const table : HTMLTableElement = document.getElementById('matrix_inputs_table') as HTMLTableElement;
    const rows : number = table.rows.length;
    const columns : number = table.rows[0].cells.length;

    let error_flag : number = 0;

    for (let i = 0; i < rows; i++) {
      const row : number[] = [];
      for (let j = 0; j < columns; j++) {
        const input : HTMLInputElement = document.getElementById(`matrix_cell_input_${i}_${j}`) as HTMLInputElement;
        if (!input.value) {
          error_flag = 1;
          input.style.border = 'solid 2px red';
          input.style.backgroundColor = 'red';
        } 
        else {
          row.push(parseFloat(input.value));
        }
      }
      if (error_flag !== 1) {
        userMatrix.values.push(row);
      }
    }

    if (error_flag === 1) {
      userMatrix.values = [];
      this.displayError('incomplete');
    }
    else {
      loadMatrix(userMatrix);
    }
  },

  displayError(error : string) {
    if (error === 'incomplete') {
      console.log('Incomplete fields!');
    }
  }

}
const BMMatlabStringFunctions = {

}
const BMExampleMatrixFunctions = {

}

const selected_matrix: Matrix = matrices[5];

function matrixOperation() {
  const selected : HTMLInputElement = document.querySelector('#interface_operations') as HTMLInputElement;
  switch (selected.value) {
    case "rref":
      // console.log("RREF");
      gaussJordan(userMatrix);
      break;
    case "det":
      // console.log("determinant");
      loadDeterminant(userMatrix);
      break;
    case "inv":
      // console.log("Inverse");
      // loadAdjoin(selected_matrix);
      loadInverse(userMatrix);
      break;
    default:
      console.log("No option selected.")
  }
}
