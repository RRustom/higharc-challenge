/**
 * Testing Strategy
 * 
 * Partitions:
 * 
 * 1. concavity: concave, convex, neither (180 degree angle)
 * 2. # adjacent faces per face: 0, 1, > 1
 * 3. # polygons: 0, 1, >1
 * 
 * Fuzz (malformed input):
 * 
 * 1. if not connected
 * 2. if not planar (edges intersect not at endpoints)
 * 3. edges without polygons
 * 4. negative coordinates
 */

const runNeighboringFacesTests = () => {
    /**
     * Partitions: Convex, 1 polygon, 0 adj faces
     */
    test(
    "a square",
    getNeighboringFaces,
    assertArrayEqual,
    {
        faces: [[0, 1, 2, 3]],
        faceIndex: 0,
        vertices: [[0, 0], [2, 0], [2, 2], [0, 2]],
        edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
    },
        []
    );

    /**
     * Partitions: 1 polygon, 1 adj face
     */
    test(
    "a square with a chord",
    getNeighboringFaces,
    assertArrayEqual,
    {
        faces: [[0, 1, 2], [3, 2, 0]],
        faceIndex: 0,
        vertices: [[0, 0], [2, 0], [2, 2], [0, 2]],
        edges: [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]],
    },
        [1]
    );

    /**
     * Partitions: multiple polytons, >1 adj face
     */
    test(
    "example from packet",
    getNeighboringFaces,
    assertArrayEqual,
    {
        faces: [[0, 1, 3, 4], [1, 2, 4], [3, 4, 5]],
        faceIndex: 0,
        edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 4], [3, 5], [4, 5]],
    },
        [1, 2]
    );

    /**
     *
     */
    test(
    "concave shape with neighbors (2 neighbors)",
    getNeighboringFaces,
    assertArrayEqual,
    {
        faces: [[6, 0, 1, 2], [6, 2, 3, 4], [6, 4, 5], [6, 7, 0]],
        faceIndex: 0,
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6], [6, 0], [6, 7], [7, 0], [6, 2]],
    },
        [3, 1]
    );

    test(
    "a more complex concave shape with neighbors (1 neighbor)",
    getNeighboringFaces,
    assertArrayEqual,
    {
        faces: [[6, 0, 1, 2], [6, 2, 3, 4], [6, 4, 5], [6, 7, 0]],
        faceIndex: 3,
        vertices: [[100, 50], [150, 50], [150, 100], [200, 100], [200, 200], [150, 250], [100, 200], [50, 100]],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6], [6, 0], [6, 7], [7, 0], [6, 2]],
    },
        [0]
    );

    /**
     *
     */
    test(
    "two triangles kissing",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[0, 0], [100, 0], [50, 50], [0, 100], [100, 100]],
        edges: [[0, 2], [2, 1], [1, 4], [4, 2], [2, 3], [3, 0]],
    },
    [[0, 2, 3], [2, 4, 1]]
    );
}




