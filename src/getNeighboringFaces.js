/**
 * Write an algorithm that processes the output of Algorithm 1 in order to find the neighboring faces of any face.
 * That is, faces that share an edge with the query face.
 * It should take the output of Algorithm 1 as input, unique identifier for the face and output an array of face identifiers.
 * The face identifiers might be an integer or string. Include tests (with text descriptions of the input data) demonstrating that it works.
 * Comment your code with specifics about the computational complexity of your implementation.
 *
 * Overall worst-case runtime: O(E^2)
 * Avg-case runtime: O(E)
 *
 * @param {Array} faces Ex: [[0, 1, 2], [3, 2, 0]] (indices of vertices)
 * @param {Array} faceIndex Ex: 0
 * @param {Array} edges Ex: [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]]
 * @returns array of indices of neighboring edges
 */
function getNeighboringFaces({ faces, faceIndex, edges }) {
  // worst case: O(FEV). Avg case: O(FE) ~ O(E)
  const faceEdges = new Array(faces.length);
  for (var i = 0; i < faces.length; i++) {
    faceEdges[i] = [];
    const face = faces[i];
    for (const edge of edges) {
      let verticesIncluded = 0;
      for (const vertex of face) {
        if (edge[0] === vertex || edge[1] === vertex) {
          verticesIncluded += 1;
        }
      }
      if (verticesIncluded == 2) {
        faceEdges[i].push(edge);
      }
    }
  }

  // worst case: O(E^2). Avg case: ~O(E)
  const overlappingEdges = [];
  for (var i = 0; i < faces.length; i++) {
    if (i !== faceIndex) {
      for (const edge of faceEdges[i]) {
        let isOverlap = false;
        for (const targetEdge of faceEdges[faceIndex]) {
          if (edge[0] == targetEdge[0] && edge[1] == targetEdge[1]) {
            overlappingEdges.push(i);
            isOverlap = true;
            break;
          }
        }
        if (isOverlap) break;
      }
    }
  }

  return overlappingEdges;
}
