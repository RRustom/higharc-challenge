function handleForm() {
  event.preventDefault();
  // document.querySelector("#response").innerText = null;
  clearDrawing;

  const vertices = JSON.parse(document.querySelector("#vertices").value);
  const edges = JSON.parse(document.querySelector("#edges").value);

  console.log("vertices: ", vertices);
  console.log("edges: ", edges);

  const faces = getInteriorFaces({ vertices, edges });
  console.log("faces: ", faces);
  drawFaces(faces, vertices);
  drawGraph(vertices, edges);

  // const length2 = parseInt(document.querySelector("#length2").value);
  // const length1 = parseInt(document.querySelector("#length1").value);
  // const length3 = parseInt(document.querySelector("#length3").value);
  // // const triangle = new Triangle(length1, length2, length3);
  // // const response = triangle.checkType();
  // // const pTag = document.createElement("p");
  // // pTag.append(response);
  // // document.querySelector("#response").append(pTag);
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
