
const selected_matrix: Matrix = matrices[0];

function matrixOperation() {
  const operation_input = document.querySelector('#interface_operations');
  switch ((operation_input as HTMLInputElement).value) {
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
      createAdjoin(selected_matrix.values);  // temporary
      break;
    default:
      console.log("No option selected.")
  }
}

loadMatrix(selected_matrix);