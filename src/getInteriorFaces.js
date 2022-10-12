/**
 * Write an algorithm that finds all of the interior faces (polygons) of such a data structure.
 * The output of the algorithm is up to you. Include tests (with text descriptions of the input data) demonstrating that it works.
 * Comment your code with specifics about the computational complexity of your implementation.
 *
 * @param {Array} vertices Ex: [[0, 0], [2, 0], [2, 2], [0, 2]]
 * @param {Array} edges Ex: [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]]
 * @returns nested array of interior faces (vertex indices) Ex: [[0, 1, 2], [3, 2, 0]]
 */
function getInteriorFaces({ vertices, edges }) {
  // create adjacency list
  const graph = getAdjacencyList(vertices, edges); // O(E)

  function getSortedVertices(vertices, graph) {
    let sortedVertices = [...Array(vertices.length).keys()];

    sortedVertices.sort(function (a, b) {
      return graph[b].length - graph[a].length; // sort by degree
    });

    return sortedVertices;
  }

  // sort vertices by degree
  const sortedVertices = getSortedVertices(vertices, graph); // O(VlogV)

  // create adj list with vertices sorted by degree
  const sortedAdjList = {};

  for (const vertex of sortedVertices) {
    const adjList = [...graph[vertex]].sort(function (a, b) {
      return graph[b].length - graph[a].length;
    });
    sortedAdjList[vertex] = adjList;
  }

  // get max degree vertex
  // max faces = degree - 1
  let maxFacesPerVertex = new Array(vertices.length); // O(V)
  for (var i = 0; i < vertices.length; i++) {
    maxFacesPerVertex[i] = graph[i].length - 1;
  }

  const faces = [];

  function recursive_search(current, traversal) {
    const previous = traversal[traversal.length - 1];
    if (current === traversal[0]) {
      return traversal;
    }

    traversal.push(current);
    maxFacesPerVertex[current] -= 1;

    for (const neighbor of sortedAdjList[current]) {
      if (maxFacesPerVertex[neighbor] > 0 && neighbor !== previous) {
        return recursive_search(neighbor, traversal);
      }
    }
  }

  for (const vertex of sortedVertices) {
    if (maxFacesPerVertex[vertex] > 0) {
      for (const neighbor of sortedAdjList[vertex]) {
        if (maxFacesPerVertex[neighbor] > 0) {
          // perform recursive search
          const traversal = recursive_search(neighbor, [vertex]);

          faces.push(traversal);
        }
      }
    }
  }

  return faces;
}

function getAdjacencyList(vertices, edges) {
  const graph = new Array(vertices.length);

  for (const edge of edges) {
    const [v1, v2] = edge;
    if (graph[v1]) {
      graph[v1].push(v2);
    } else {
      graph[v1] = [v2];
    }

    if (graph[v2]) {
      graph[v2].push(v1);
    } else {
      graph[v2] = [v1];
    }
  }

  return graph;
}

// https://stackoverflow.com/questions/64816766/dot-product-of-two-arrays-in-javascript
const dotProduct = (a, b) =>
  a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

// https://stackoverflow.com/questions/21483999/using-atan2-to-find-angle-between-two-vectors
const getAngle = (v1, v2) => {
  const angle = Math.atan2(v2[1], v2[0]) - Math.atan2(v1[1], v1[0]);
  console.log("    a: ", angle);

  if (angle > Math.PI) {
    angle -= 2 * Math.PI;
  } else if (angle <= -Math.PI) {
    angle += 2 * Math.PI;
  }
  console.log("    normalized: ", angle);
  return angle * (180 / Math.PI);
};

module.exports = { getInteriorFaces };