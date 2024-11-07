"use strict";
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
// BM - Build Matrix
const BMDefaultFunctions = {
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
                input.type = 'number';
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
    createMatrixDefault() {
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
    displayError(error) {
        if (error === 'incomplete') {
            console.log('Incomplete fields!');
        }
    }
};
const BMMatlabStringFunctions = {};
const BMExampleMatrixFunctions = {};
const selected_matrix = matrices[5];
function matrixOperation() {
    const selected = document.querySelector('#interface_operations');
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
            console.log("No option selected.");
    }
}
