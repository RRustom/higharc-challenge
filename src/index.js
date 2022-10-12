function handleForm() {
  event.preventDefault();
  clearDrawing;

  const vertices = JSON.parse(document.querySelector("#vertices").value);
  const edges = JSON.parse(document.querySelector("#edges").value);

  const faces = getInteriorFaces({ vertices, edges });
  drawFaces(faces, vertices);
  drawGraph(vertices, edges);
}

function runTests() {
  console.log("START RUNNING TESTS");
  runInteriorFacesTests();
  runNeighboringFacesTests();
}

window.addEventListener("load", function () {
  document
    .querySelector("#get-faces-form")
    .addEventListener("submit", handleForm);

  const runTestsButton = document.querySelector("#run-tests");
  runTestsButton.onclick = runTests;
});
