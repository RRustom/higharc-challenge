// vertices: [[0, 0], [2, 0], [2, 2], [0, 2]], "edges": [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]]
function recursive_dfs(vertices, edges) {
  traversal = [];
  visited = new Set();
  graph = getAdjacencyList(vertices, edges);

  function recurseDfs(visited, graph, vertex) {
    if (!visited.has(vertex)) {
      traversal.push(vertex);
      visited.add(vertex);
      for (const neighbor of graph[vertex]) {
        recurseDfs(visited, graph, neighbor);
      }
    }
  }

  // start from vertex with index 0
  recurseDfs(visited, graph, 0);

  return traversal;
}

function dfs(vertices, edges) {
  // traversal = []
  visited = new Set();
  traversal = [];
  stack = [];

  graph = getAdjacencyList(vertices, edges);

  function dfs_iterative(vertex) {
    stack.push(vertex);

    while (stack.length > 0) {
      vertex = stack.pop();
      if (!visited.has(vertex)) {
        visited.add(vertex);
        traversal.push(vertex);

        for (const neighbor of graph[vertex]) {
          stack.push(neighbor);
        }
      }
    }
  }

  dfs_iterative(0);
  return traversal;
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

vertices = [
  [0, 0],
  [2, 0],
  [2, 2],
  [0, 2],
];

edges = [
  [0, 1],
  [1, 2],
  [0, 2],
  [0, 3],
  [2, 3],
];

const t = dfs(vertices, edges);
console.log(t);
