// UI Functions, not related to linear algebra

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

const MatrixBuilderFunctions = {

  default : {
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
    createMatrix() {
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
  },

  matlabString : {
    parseMatlabString() {
      const string_input : HTMLInputElement = document.getElementById('matlabstring_input') as HTMLInputElement;
      const matlab_string : string = string_input.value;
      // add values to a 2D array based on string
      let i : number = 0;
      [...matlab_string].forEach(character => {
        console.log(character);
      });
    },
    createMatrix() {
      
    }
  },

  exampleMatrix : {
    populateExampleList(...args : Matrix[][]) {
      const example_list : HTMLOListElement = document.getElementById('example_list') as HTMLOListElement;
      const example_matrices = ([] as Matrix[]).concat.apply([], args);
      example_matrices.forEach((matrixObject, index) => {
        const example_element : HTMLLIElement = document.createElement('li');
        example_element.onclick = () => this.selectExample(matrixObject);
  
        const matrix_title : HTMLElement | null = document.createElement('div');
        matrix_title.innerHTML = matrixObject.name;
        example_element.appendChild(matrix_title);
        
        const matrix_table : HTMLTableElement = document.createElement('table');
        matrixObject.values.forEach(row => {
          const tr : HTMLTableRowElement = document.createElement('tr');
          row.forEach(column => {
            const td : HTMLTableCellElement = document.createElement('td');
            td.innerHTML = `${column}`;
            tr.appendChild(td);
          })
          matrix_table.appendChild(tr);
        })
        example_element.appendChild(matrix_table);
        example_list.appendChild(example_element);
      });
    },
    selectExample(matrixObject : Matrix) {
      userMatrix.name = matrixObject.name;
      userMatrix.values = matrixObject.values.map(row => [...row]);
      loadMatrix(userMatrix);
    }
  }

}

MatrixBuilderFunctions.exampleMatrix.populateExampleList(matricesForRREF, matricesToInvert, matrices);

// const selected_matrix: Matrix = matrices[5];

function matrixOperation() {
  const selected : HTMLInputElement = document.querySelector('#interface_operations') as HTMLInputElement;

  const solution_wrapper : HTMLElement | null = document.querySelector('.solution_wrapper');
  const operations_wrapper : HTMLElement | null = document.querySelector('.operations_wrapper');
  while (solution_wrapper?.hasChildNodes()) {
    solution_wrapper.firstChild?.remove();
  }
  while (operations_wrapper?.hasChildNodes()) {
    operations_wrapper.firstChild?.remove();
  }

  switch (selected.value) {
    case "rref":
      // console.log("RREF");
      loadRREF(userMatrix);
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
