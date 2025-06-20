import { matricesForRREF, matricesToInvert } from "./functions/matrices";
import { showBuildOption, MatrixBuilderFunctions, matrixOperation } from "./renderers";

document.addEventListener("DOMContentLoaded", loadAll);

function loadAll() {
  MatrixBuilderFunctions.exampleMatrix.populateExampleList(matricesForRREF, matricesToInvert);

  document.querySelector<HTMLSelectElement>('#build_options')?.addEventListener("change", showBuildOption);
  document.querySelector<HTMLButtonElement>('#submit_dimensions')?.addEventListener("click", MatrixBuilderFunctions.default.setMatrixInputs);
  document.querySelector<HTMLButtonElement>('#submit_matrix_default')?.addEventListener("click", MatrixBuilderFunctions.default.createMatrix);
  document.querySelector<HTMLButtonElement>('#submit_matrix_matlabstring')?.addEventListener("click", MatrixBuilderFunctions.matlabString.createMatrix);
  document.querySelector<HTMLButtonElement>('#interface_submit')?.addEventListener("click", matrixOperation);
}