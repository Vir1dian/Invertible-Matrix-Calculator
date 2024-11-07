
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
    const existing_table : HTMLElement | null = document.getElementById('matrix_inputs_table');
    // Removes existing tables first
    if (existing_table) {
      existing_table.remove();
    }

    const row_input : HTMLInputElement = document.getElementById('row_input') as HTMLInputElement;
    const col_input : HTMLInputElement = document.getElementById('col_input') as HTMLInputElement;

    const rows : number = parseInt(row_input.value);
    const columns : number = parseInt(col_input.value);

    const table : HTMLElement = document.createElement('table');
    table.id = 'matrix_inputs_table';
    table.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    for (let i = 0; i < rows; i++) {
      const tr : HTMLElement = document.createElement('tr');
      for (let j = 0; j < columns; j++) {
        const td : HTMLElement = document.createElement('td');
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
    const table : HTMLElement | null = document.getElementById('matrix_inputs_table');
    const rows : number = 0;
    console.log(rows);
  }

}
const BMMatlabStringFunctions = {

}
const BMExampleMatrixFunctions = {

}

const selected_matrix: Matrix = matrices[5];

function matrixOperation() {
  const selected : HTMLInputElement = document.querySelector('#interface_operations') as HTMLInputElement;
  switch ((selected as HTMLInputElement).value) {
    case "rref":
      // console.log("RREF");
      gaussJordan(selected_matrix);
      break;
    case "det":
      // console.log("determinant");
      loadDeterminant(selected_matrix);
      break;
    case "inv":
      // console.log("Inverse");
      // loadAdjoin(selected_matrix);
      loadInverse(selected_matrix);
      break;
    default:
      console.log("No option selected.")
  }
}

loadMatrix(selected_matrix);