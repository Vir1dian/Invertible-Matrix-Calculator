import { Fraction, parseFraction } from "./classes/fractions";
import type { Matrix } from "./functions/matrices";
import { userMatrix, loadMatrix } from "./functions/matrices";
import { loadDeterminant } from "./functions/determinant";
import { loadRREF } from "./functions/rref";
import { loadInverse } from "./functions/inverse";

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
};

// refactor into classes in separate files in the future
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
      const submit : HTMLElement | null = document.getElementById('submit_matrix_default');
  
      const rows : number = parseInt(row_input.value);
      const columns : number = parseInt(col_input.value);

      if (!rows || !columns) {
        submit!.style.display = 'none';
        this.displayError('incomplete');
      } else {
        submit!.style.display = '';
      }
  
      const table : HTMLTableElement = document.createElement('table');
      table.id = 'matrix_inputs_table';
      table.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  
      for (let i = 0; i < rows; i++) {
        const tr : HTMLTableRowElement = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
          const td : HTMLTableCellElement = document.createElement('td');
          const input : HTMLInputElement = document.createElement('input');
  
          input.type = 'text';
          input.classList.add('matrix_cell_input');
          input.id = `matrix_cell_input_${i}_${j}`;
  
          td.appendChild(input);
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
  
      matrix_inputs?.appendChild(table);
    },
    createMatrix() {
      userMatrix.name = 'A';
      userMatrix.values = [];
  
      const table : HTMLTableElement = document.getElementById('matrix_inputs_table') as HTMLTableElement;
      const rows : number = table.rows.length;
      const columns : number = table.rows[0].cells.length;
  
      let error_flag : number = 0;
  
      for (let i = 0; i < rows; i++) {
        const row : Fraction[] = [];
        for (let j = 0; j < columns; j++) {
          const input : HTMLInputElement = document.getElementById(`matrix_cell_input_${i}_${j}`) as HTMLInputElement;
          if (!input.value || Number.isNaN(parseFraction(input.value).numerator)) {
            error_flag = 1;
            input.style.boxShadow = 'inset 0px 1px 1px red';
          } 
          else {
            input.style.boxShadow = '';
            row.push(parseFraction(input.value));
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
      const matrix_wrapper : HTMLElement = document.querySelector('.matrix_wrapper') as HTMLElement;
      while (matrix_wrapper.hasChildNodes()) {
        matrix_wrapper.firstChild?.remove();
      }
      const error_element: HTMLElement = document.createElement('div');
      error_element.style.color = 'red';

      if (error === 'incomplete') {
        error_element.innerHTML = 'Input boxes are not filled correctly, try again.';
        matrix_wrapper.appendChild(error_element);
        throw new Error('Incomplete/Invalid fields!');
      }
    }
  },

  matlabString : {
    parseMatlabString(matlab_string: string): Fraction[][] {
      // Handle eye(), zeros(), and ones() functions
      if (/^eye\(\d+\)$/.test(matlab_string)) {
        const size = parseInt(matlab_string.match(/\d+/)![0], 10);
        return generateIdentityMatrix(size);
      } else if (/^zeros\(\d+,\s*\d+\)$/.test(matlab_string)) {
        const [rows, cols] = matlab_string.match(/\d+/g)!.map(Number);
        return generateMatrix(rows, cols, 0);
      } else if (/^ones\(\d+,\s*\d+\)$/.test(matlab_string)) {
        const [rows, cols] = matlab_string.match(/\d+/g)!.map(Number);
        return generateMatrix(rows, cols, 1);
      }

      if (!matlab_string.startsWith('[') || !matlab_string.endsWith(']')) {
        this.displayError('empty');
      }
  
      // Remove the brackets
      matlab_string = matlab_string.slice(1, -1).trim();

      if (!matlab_string) {
        this.displayError('empty');
      }

      const matrix_values: Fraction[][] = matlab_string.split(';').map(row => {
        const trimmedRow = row.trim();
        const values = trimmedRow.split(/\s+/);
        return values.map(item => parseFraction(item)); // Assuming parseFraction handles errors
      });

      // Check for consistent row lengths
      const columnCount = matrix_values[0].length;
      if (!matrix_values.every(row => row.length === columnCount)) {
        this.displayError('invalid');
      }

      return matrix_values;
    },
    createMatrix() {
      const string_input : HTMLInputElement = document.getElementById('matlabstring_input') as HTMLInputElement;
      let matlab_string: string = string_input.value.trim();
      userMatrix.values = MatrixBuilderFunctions.matlabString.parseMatlabString(matlab_string);
      userMatrix.name = matlab_string;
      loadMatrix(userMatrix);
    },
    displayError(error : string) {
      const matrix_wrapper : HTMLElement = document.querySelector('.matrix_wrapper') as HTMLElement;
      while (matrix_wrapper.hasChildNodes()) {
        matrix_wrapper.firstChild?.remove();
      }
      const error_element: HTMLElement = document.createElement('div');
      error_element.style.color = 'red';

      if (error === 'empty') {
        error_element.innerHTML = 'Input field is empty or incorrectly filled. Try again.';
        matrix_wrapper.appendChild(error_element);
        throw new Error('Empty matlab string.');
      }

      if (error === 'invalid') {
        error_element.innerHTML = 'Dimensions of matrix are not consistent, each row must have the same number of columns. Try again.';
        matrix_wrapper.appendChild(error_element);
        throw new Error('Inconsistent dimensions.');
      }
    }
  },

  exampleMatrix : {
    populateExampleList(...args : Matrix[][]) {
      const example_list : HTMLOListElement = document.getElementById('example_list') as HTMLOListElement;
      const example_matrices = ([] as Matrix[]).concat.apply([], args);
      example_matrices.forEach((matrixObject) => {
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

};

// Helper function to generate identity matrix
function generateIdentityMatrix(size: number): Fraction[][] {
  return Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => i === j ? parseFraction('1') : parseFraction('0'))
  );
};

// Helper function to generate zeros or ones matrix
function generateMatrix(rows: number, cols: number, fillValue: number): Fraction[][] {
  const value = parseFraction(fillValue.toString());
  return Array.from({ length: rows }, () => Array(cols).fill(value));
};

function matrixOperation() {
  const selected : HTMLInputElement = document.querySelector('#interface_operations') as HTMLInputElement;

  const solution_wrapper : HTMLElement = document.querySelector('.solution_wrapper') as HTMLElement;
  const operations_wrapper : HTMLElement = document.querySelector('.operations_wrapper') as HTMLElement;
  while (solution_wrapper.hasChildNodes()) {
    solution_wrapper.firstChild?.remove();
  }
  while (operations_wrapper.hasChildNodes()) {
    operations_wrapper.firstChild?.remove();
  }

  switch (selected.value) {
    case "rref":
      // console.log("RREF");
      loadSolution(loadRREF(userMatrix));
      break;
    case "det":
      // console.log("determinant");
      loadSolution(loadDeterminant(userMatrix));
      break;
    case "inv":
      // console.log("Inverse");
      // loadAdjoin(selected_matrix);
      loadSolution(loadInverse(userMatrix));
      break;
    default:
      const error_element: HTMLElement = document.createElement('div');
      error_element.style.color = 'gray';
      error_element.innerHTML = 'No option selected.';
      operations_wrapper.appendChild(error_element);
      console.log("No option selected.")
  }
};

function loadSolution(solution: Matrix | string) {
  const solution_wrapper : HTMLElement = document.querySelector('.solution_wrapper') as HTMLElement;
  solution_wrapper.innerHTML = '<span>Solution</span>';

  if (typeof solution === 'string') {
    const string_element: HTMLElement = document.createElement('div');
    string_element.innerHTML = solution;
    solution_wrapper.appendChild(string_element);
  }
  else {
    const matrix_title : HTMLElement = document.createElement('div');
    matrix_title.innerHTML = solution.name;
    solution_wrapper.appendChild(matrix_title);

    const matrix_table : HTMLTableElement = document.createElement('table');
    solution.values.forEach(row => {
      const tr : HTMLTableRowElement = document.createElement('tr');
      row.forEach(column => {
        const td : HTMLTableCellElement = document.createElement('td');
        td.innerHTML = `${column}`;
        tr.appendChild(td);
      })
      matrix_table.appendChild(tr);
    })
    solution_wrapper.appendChild(matrix_table);
  }
};

export {
  showBuildOption,
  MatrixBuilderFunctions,
  matrixOperation
};