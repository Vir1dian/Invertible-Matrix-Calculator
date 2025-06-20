import { matricesForRREF, matricesToInvert } from "./functions/matrices";
import { showBuildOption, MatrixBuilderFunctions, matrixOperation } from "./renderers";

document.addEventListener("DOMContentLoaded", loadAll);

function loadAll() {
  MatrixBuilderFunctions.exampleMatrix.populateExampleList(matricesForRREF, matricesToInvert);

  document.querySelector<HTMLSelectElement>('#build_options')?.addEventListener("change", showBuildOption);
}