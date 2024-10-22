"use strict";
const selected_matrix = matrices[4];
function matrixOperation() {
    const operation_input = document.querySelector('#interface_operations');
    switch (operation_input.value) {
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
            loadAdjoin(selected_matrix); // temporary
            break;
        default:
            console.log("No option selected.");
    }
}
loadMatrix(selected_matrix);
