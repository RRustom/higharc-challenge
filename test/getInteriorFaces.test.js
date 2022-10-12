/**
 * Testing Strategy
 * 
 * Tests:
 * 1. A square with a chord
 * 2. the example shape (multiple super-cycles)
 * 3. An edge with multiple vertices
 * 4. two kissing triangles
 * 5. concave/convex
 * 
 * Partitions:
 * 
 * 1. concavity: concave, convex, neither (180 degree angle)
 * 2. # faces an edge belongs to: 0, 1, 2
 * 3. # polygons: 0, 1, >1
 * 4. vertex coordinate values: int, float
 * 5. Node degrees: 2, >2
 * 
 * Fuzz (malformed input):
 * 
 * 1. if not connected
 * 2. if not planar (edges intersect not at endpoints)
 * 3. edges without polygons
 * 4. negative coordinates
 */

const runInteriorFacesTests = () => {
    /**
     * Partitions: Convex, 1 polygon, node degrees=2
     */
    test(
    "a square",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[0, 0], [2, 0], [2, 2], [0, 2]],
        edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
    },
    [[0, 1, 2, 3]]
    );

    /**
     * Partitions: Convex, multiple polygons, node degrees > 2
     */
    test(
    "a square with a chord",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[0, 0], [2, 0], [2, 2], [0, 2]],
        edges: [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]],
    },
    [[0, 1, 2], [3, 2, 0]]
    );

    /**
     * Partitions: Concave, multiple polygons, node degrees > 2
     */
    test(
    "example from packet",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[50, 0], [100, 20], [175, 40], [0, 120], [110, 130], [80, 230]],
        edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 4], [3, 5], [4, 5]],
    },
    [[0, 1, 3, 4], [1, 2, 4], [3, 4, 5]]
    );

    /**
     *
     */
    test(
    "concave shape with neighbors",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[100, 50], [150, 50], [150, 100], [200, 100], [200, 200], [150, 250], [100, 200], [50, 100]],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6], [6, 0], [6, 7], [7, 0]],
    },
    [[0, 1, 2, 3, 4, 6], [4, 5, 6], [0, 6, 7]]
    );

    /**
     *
     */
    test(
    "a more complex concave shape with neighbors",
    getInteriorFaces,
    assertNestedArrayEqual,
    {
        vertices: [[100, 50], [150, 50], [150, 100], [200, 100], [200, 200], [150, 250], [100, 200], [50, 100]],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6], [6, 0], [6, 7], [7, 0], [6, 2]],
    },
    [[6, 0, 1, 2], [6, 2, 3, 4], [6, 4, 5], [6, 7, 0]]
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




