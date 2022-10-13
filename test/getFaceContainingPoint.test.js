/**
 * Testing Strategy
 * 
 * Tests:
 * 1. TODO
 * 
 * Partitions:
 * 
 * 1. inside/outside the shape
 * 2. on a vertex with n degree: 2, 3, > 3
 * 3. on an edge (and the orientation of the edge)
 * 4. within a face
 * 5. really close to an edge
 * 
 * Fuzz (malformed input):
 * 
 * 1. TODO
 */

const runFaceContainingPointTests = () => {
    /**
     * Partitions: convex, inside shape, 1 face
     */
    test(
        "inside a square",
        getFaceContainingPoint,
        assertArrayEqual,
        {
            point: [1, 1],
            faces: [[0, 1, 2, 3]],
            vertices:[[0, 0], [2, 0], [2, 2], [0, 2]],
            // edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
        },
        [0]
    )

    /**
     * Partitions: convex, outside shape, 1 face
     */
    test(
        "outside a square",
        getFaceContainingPoint,
        assertArrayEqual,
        {
            point: [3, 2.5],
            faces: [[0, 1, 2, 3]],
            vertices:[[0, 0], [2, 0], [2, 2], [0, 2]],
            // edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
        },
        []
    )

    // /**
    //  * Partitions: convex, on edge (vertical), 1 face
    //  */
    // test(
    //     "on vertical edge of a square",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [2, 1.5],
    //         faces: [[0, 1, 2, 3]],
    //         vertices:[[0, 0], [2, 0], [2, 2], [0, 2]],
    //         // edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
    //     },
    //     [0]
    // )

    // /**
    //  * Partitions: convex, on edge (vertical), 1 face
    //  */
    // test(
    //     "on horizontal edge of a square",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [1, 0],
    //         faces: [[0, 1, 2, 3]],
    //         vertices:[[0, 0], [2, 0], [2, 2], [0, 2]],
    //         // edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
    //     },
    //     [0]
    // )


    // /**
    //  * Partitions: convex, on edge (vertical), 1 face
    //  */
    // test(
    //     "on diagonal edge of a square with a chord",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [1, 1],
    //         faces: [[0, 1, 2], [3, 2, 0]],
    //         vertices:[[0, 0], [2, 0], [2, 2], [0, 2]],
    //         // edges: [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]],
    //     },
    //     [0, 1]
    // )

    // /**
    //  * Partitions: convex, multiple faces, on edge
    //  */
    // // test(
    // //     "example from packet, on edge",
    // //     getFaceContainingPoint,
    // //     assertArrayEqual,
    // //     {
    // //         point: [26, 60],
    // //         faces: [[0, 1, 3, 4], [1, 2, 4], [3, 4, 5]],
    // //         vertices: [[50, 0], [100, 20], [175, 40], [0, 120], [110, 130], [80, 230]],
    // //         edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 4], [3, 5], [4, 5]],
    // //     },
    // //     [0]
    // // );

    // /**
    //  * Partitions: convex, single face, on vertex with degree = 2
    //  */
    // test(
    //     "example from packet, on vertex with degree 2",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [175, 40],
    //         faces: [[0, 1, 3, 4], [1, 2, 4], [3, 4, 5]],
    //         vertices: [[50, 0], [100, 20], [175, 40], [0, 120], [110, 130], [80, 230]],
    //         // edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 4], [3, 5], [4, 5]],
    //     },
    //     [1]
    // );

    // /**
    //  * Partitions: convex, multiple faces, on vertex with degree > 2
    //  */
    // test(
    //     "example from packet, on vertex with degree >2",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [110, 130],
    //         faces: [[0, 1, 3, 4], [1, 2, 4], [3, 4, 5]],
    //         vertices: [[50, 0], [100, 20], [175, 40], [0, 120], [110, 130], [80, 230]],
    //         // edges: [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 4], [3, 5], [4, 5]],
    //     },
    //     [0, 1, 2]
    // );

    // /**
    //  * Partitions: concave, inside
    //  */
    // test(
    //     "gate shape, inside",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [25, 50],
    //         faces: [[0, 1, 2, 8], [2, 8, 6], [2, 6, 7], [2, 7, 5, 4, 3]],
    //         vertices: [[0, 0], [50, 0], [50, 100], [100, 100], [100, 0], [150, 0], [0, 150], [150, 150], [0, 100]],
    //         // edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 7], [7, 6], [6, 8], [8, 0], [8, 2], [2, 6], [2, 7]],
    //     },
    //     [0]
    // );

    // /**
    //  * Partitions: concave, outside
    //  */
    // test(
    //     "gate shape, on shared edge",
    //     getFaceContainingPoint,
    //     assertArrayEqual,
    //     {
    //         point: [25, 100],
    //         faces: [[0, 1, 2, 8], [2, 8, 6], [2, 6, 7], [2, 7, 5, 4, 3]],
    //         vertices: [[0, 0], [50, 0], [50, 100], [100, 100], [100, 0], [150, 0], [0, 150], [150, 150], [0, 100]],
    //         // edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 7], [7, 6], [6, 8], [8, 0], [8, 2], [2, 6], [2, 7]],
    //     },
    //     [0, 1]
    // );

    test(
        "a more complex concave shape",
        getFaceContainingPoint,
        assertArrayEqual,
        {
            point: [175, 75],
            faces:  [[6, 0, 1, 2], [6, 2, 3, 4], [6, 4, 5], [6, 7, 0]],
            vertices: [[100, 50], [150, 50], [150, 100], [200, 100], [200, 200], [150, 250], [100, 200], [50, 100]],
            // edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 6], [6, 0], [6, 7], [7, 0], [6, 2]],
        },
        [0]
    );

}