"use strict";
// UI Functions, not related to linear algebra
function showBuildOption() {
    const option_default = document.getElementById('build_matrix_default');
    const option_matlabstring = document.getElementById('build_matrix_matlabstring');
    const option_example = document.getElementById('build_matrix_example');
    const selected = document.querySelector('#build_options');
    switch (selected.value) {
        case "matlabstring":
            option_default.style.display = "none";
            option_matlabstring.style.display = "";
            option_example.style.display = "none";
            break;
        case "example":
            option_default.style.display = "none";
            option_matlabstring.style.display = "none";
            option_example.style.display = "";
            break;
        default:
            option_default.style.display = "";
            option_matlabstring.style.display = "none";
            option_example.style.display = "none";
    }
}
const MatrixBuilderFunctions = {
    default: {
        setMatrixInputs() {
            const matrix_inputs = document.getElementById('matrix_inputs');
            const existing_table = document.getElementById('matrix_inputs_table');
            // Removes existing tables first
            if (existing_table) {
                existing_table.remove();
            }
            const row_input = document.getElementById('row_input');
            const col_input = document.getElementById('col_input');
            const rows = parseInt(row_input.value);
            const columns = parseInt(col_input.value);
            const table = document.createElement('table');
            table.id = 'matrix_inputs_table';
            table.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            for (let i = 0; i < rows; i++) {
                const tr = document.createElement('tr');
                for (let j = 0; j < columns; j++) {
                    const td = document.createElement('td');
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.classList.add('matrix_cell_input');
                    input.id = `matrix_cell_input_${i}_${j}`;
                    td.appendChild(input);
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
            matrix_inputs === null || matrix_inputs === void 0 ? void 0 : matrix_inputs.appendChild(table);
            const submit = document.getElementById('submit_matrix_default');
            submit.style.display = '';
        },
        createMatrix() {
            userMatrix.name = 'A';
            userMatrix.values = [];
            const table = document.getElementById('matrix_inputs_table');
            const rows = table.rows.length;
            const columns = table.rows[0].cells.length;
            let error_flag = 0;
            for (let i = 0; i < rows; i++) {
                const row = [];
                for (let j = 0; j < columns; j++) {
                    const input = document.getElementById(`matrix_cell_input_${i}_${j}`);
                    if (!input.value) {
                        error_flag = 1;
                        input.style.border = 'solid 2px red';
                        input.style.backgroundColor = 'red';
                    }
                    else {
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
        displayError(error) {
            if (error === 'incomplete') {
                console.log('Incomplete fields!');
            }
        }
    },
    matlabString: {
        parseMatlabString() {
            const string_input = document.getElementById('matlabstring_input');
            let matlab_string = string_input.value.trim();
            if (!matlab_string.startsWith('[') || !matlab_string.endsWith(']')) {
                throw new Error('Matrix input must be enclosed in brackets [ ]');
            }
            // Remove the brackets
            matlab_string = matlab_string.slice(1, -1).trim();
            if (!matlab_string) {
                throw new Error('Empty matrix input');
            }
            const matrix_values = matlab_string.split(';').map(row => {
                const trimmedRow = row.trim();
                const values = trimmedRow.split(/\s+/);
                return values.map(item => parseFraction(item)); // Assuming parseFraction handles errors
            });
            // Check for consistent row lengths
            const columnCount = matrix_values[0].length;
            if (!matrix_values.every(row => row.length === columnCount)) {
                throw new Error('Inconsistent dimensions');
            }
            return matrix_values;
        },
        createMatrix() {
            userMatrix.name = 'A';
            userMatrix.values = MatrixBuilderFunctions.matlabString.parseMatlabString();
            loadMatrix(userMatrix);
        }
    },
    exampleMatrix: {
        populateExampleList(...args) {
            const example_list = document.getElementById('example_list');
            const example_matrices = [].concat.apply([], args);
            example_matrices.forEach((matrixObject, index) => {
                const example_element = document.createElement('li');
                example_element.onclick = () => this.selectExample(matrixObject);
                const matrix_title = document.createElement('div');
                matrix_title.innerHTML = matrixObject.name;
                example_element.appendChild(matrix_title);
                const matrix_table = document.createElement('table');
                matrixObject.values.forEach(row => {
                    const tr = document.createElement('tr');
                    row.forEach(column => {
                        const td = document.createElement('td');
                        td.innerHTML = `${column}`;
                        tr.appendChild(td);
                    });
                    matrix_table.appendChild(tr);
                });
                example_element.appendChild(matrix_table);
                example_list.appendChild(example_element);
            });
        },
        selectExample(matrixObject) {
            userMatrix.name = matrixObject.name;
            userMatrix.values = matrixObject.values.map(row => [...row]);
            loadMatrix(userMatrix);
        }
    }
};
MatrixBuilderFunctions.exampleMatrix.populateExampleList(matricesForRREF, matricesToInvert);
function matrixOperation() {
    var _a, _b;
    const selected = document.querySelector('#interface_operations');
    const solution_wrapper = document.querySelector('.solution_wrapper');
    const operations_wrapper = document.querySelector('.operations_wrapper');
    while (solution_wrapper === null || solution_wrapper === void 0 ? void 0 : solution_wrapper.hasChildNodes()) {
        (_a = solution_wrapper.firstChild) === null || _a === void 0 ? void 0 : _a.remove();
    }
    while (operations_wrapper === null || operations_wrapper === void 0 ? void 0 : operations_wrapper.hasChildNodes()) {
        (_b = operations_wrapper.firstChild) === null || _b === void 0 ? void 0 : _b.remove();
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
            console.log("No option selected.");
    }
}
