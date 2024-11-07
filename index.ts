
function showBuildOption() {
  const option_default = document.getElementById('build_matrix_default');
  const option_matlabstring = document.getElementById('build_matrix_matlabstring');
  const option_example = document.getElementById('build_matrix_example');

  const selected = document.querySelector('#build_options');
  switch((selected as HTMLInputElement).value) {
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


const selected_matrix: Matrix = matrices[5];

function matrixOperation() {
  const selected = document.querySelector('#interface_operations');
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