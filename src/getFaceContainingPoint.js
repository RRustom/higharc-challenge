/**
 * Given a point and the output of Algorithm 1, find the face the point is contained within.
 * Naturally, the point may not be inside of a face.
 * Include tests (with text descriptions of the input data) demonstrating that it works.
 * Comment your code with specifics about the computational complexity of your implementation.
 *
 * Complexity: O(V) worst-case
 *
 * Notes:
 * - originally tried to test each face with a point-in-polygon algorithm
 * - After trying to be clever about the order of polygons to test, I found
 *  that a faster approach with complexity O(logV)
 *
 * @param {*} point
 * @param {*} faces
 * @param {*} vertices
 * @param {*} edges
 *
 * @returns an array of face indices which contain the point
 */
function getFaceContainingPoint({ point, faces, vertices }) {
  return getFaceContainingPointFast({ point, faces, vertices });
}

/**
 * Standard linear scan approach
 *
 * Complexity: O(V)
 */
function getFaceContainingPointSlow({ point, faces, vertices }) {
  // perform ray casting on each face O(VF)

  let rightMostX = 0;
  for (const vertex of vertices) {
    if (vertex[0] > rightMostX) rightMostX = vertex[0];
  }
  // padding, for edge cases (assuming canvas scale)
  rightMostX += 100;

  let insideFaces = [];
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    const facePolygon = getFacePolygon(face, vertices);
    const isInside = isPointInPolygon(point, facePolygon, rightMostX);
    if (isInside) insideFaces.push(i);
  }

  return insideFaces;
}

/**
 * An improved algorithm that performs a rough binary search
 *
 * Complexity: O(logV) with one-time O(VlogV) pre-processing
 */
function getFaceContainingPointFast({ point, faces, vertices }) {
  // 1. create a bounding box around the shape
  // 2. create sections with the y values of all vertices (remove dups if any)
  // 3.   as we draw each one, create a section and keep track of which faces lie before the section
  // 4. binary search horizontally across the sections

  // create bounding box
  let maxX = 0;
  let maxY = 0;
  let minX = 0;
  let minY = 0;
  for (const vertex of vertices) {
    if (vertex[0] > maxX) maxX = vertex[0];
    if (vertex[0] < minX) minX = vertex[0];
    if (vertex[1] > maxY) maxY = vertex[1];
    if (vertex[1] > minY) minY = vertex[1];
  }
  // padding, for edge cases (assuming canvas scale)
  maxX += 100;
  maxY += 100;
  minX -= 100;
  minY -= 100;

  // sort vertices along x axis (should be saved for future requests)
  let vertexObjects = vertices.map((v, i) => ({ x: v[0], y: v[1], id: i }));
  const sortedVertices = [...vertexObjects].sort(function (a, b) {
    return a.x - b.x;
  });

  const sections = [
    {
      startX: minX,
      endX: sortedVertices[0].x,
      startY: minY,
      endY: maxY,
      faces: new Set(),
    },
  ];
  let lastVertexX = null; // avoid dups
  for (let i = 0; i < sortedVertices.length; i++) {
    const vertex = sortedVertices[i];
    const section = {};
    if (i === sortedVertices.length - 1) {
      section["startX"] = vertex.x;
      section["endX"] = maxX;
    } else {
      section["startX"] = vertex.x;
      section["endX"] = sortedVertices[i + 1].x;
    }
    section["startY"] = minY;
    section["endY"] = maxY;
    section["faces"] = new Set();

    if (section.startX === section.endX) continue;

    // very loose condition
    for (let faceId = 0; faceId < faces.length; faceId++) {
      const face = faces[faceId];
      for (const faceVertex of face) {
        const facePoint = vertices[faceVertex];

        if (section.startX <= facePoint[0] && facePoint[0] <= section.endX) {
          if (!section["faces"].has(faceId)) section["faces"].add(faceId);
        }
      }
    }
    sections.push(section);
    lastVertexX = vertex.x;
  }

  const binarySearch = function (sections, point, start, end) {
    // base case
    if (start > end) return null;

    // middle index
    let mid = Math.floor((start + end) / 2);

    // point lies in the section
    const section = sections[mid];
    if (section.startX <= point[0] && point[0] <= section.endX) {
      return section;
    }

    // search left side
    if (section.startX > point[0])
      return binarySearch(sections, point, start, mid - 1);
    // search right side
    else return binarySearch(sections, point, mid + 1, end);
  };

  const targetSection = binarySearch(sections, point, 0, sections.length - 1);

  if (!targetSection) return [];

  let insideFaces = [];

  targetSection.faces.forEach((face) => {
    const facePolygon = getFacePolygon(faces[face], vertices);
    const isInside = isPointInPolygon(point, facePolygon, maxX);
    if (isInside) insideFaces.push(face);
  });

  return insideFaces;
}

/**
 * Get vertices of edges of a face
 * @param {*} face
 * @param {*} vertices
 * @returns
 */
function getFacePolygon(face, vertices) {
  const shape = [];
  for (let i = 0; i < face.length; i++) {
    const currentVertex = face[i];
    shape.push(vertices[currentVertex]);
  }
  return shape;
}

/**
 * Euclidian distance between 2 points
 * @param {*} p1
 * @param {*} p2
 *
 * @returns euclidian distance between p1 and p2
 */
function distanceBetween(p1, p2) {
  const x = p2[0] - p1[0];
  const y = p2[1] - p1[1];

  return Math.sqrt(x * x + y * y);
}

/**
 * Check if point in polygon
 * @param {*} point
 * @param {*} polygon
 * @param {*} rightMostPoint (rightmost bound for scanning line)
 * @returns
 */
function isPointInPolygon(point, polygon, rightMostX) {
  // https://en.wikipedia.org/wiki/Point_in_polygon

  // sanity check
  if (polygon.length < 3) return false;

  const ray = [point, [rightMostX, point[1]]];

  // count intersections
  let intersections = 0;
  for (let i = 0; i < polygon.length; i++) {
    const current = polygon[i];
    const next = i === polygon.length - 1 ? polygon[0] : polygon[i + 1];

    if (doSegmentsIntersect([current, next], ray)) {
      if (getOrientation(current, point, next) == 0) {
        return isOnLineSegment(current, next, point);
      }
      intersections += 1;
    }
  }
  return intersections % 2 === 1;
}

/**
 * Check if point is on line segment (start, end)
 * @param {*} start [x, y]
 * @param {*} end [x, y]
 * @param {*} point [x, y]
 */
function isOnLineSegment(start, end, point) {
  if (
    point[0] <= Math.max(start[0], end[0]) &&
    point[0] >= Math.min(start[0], end[0]) &&
    point[1] <= Math.max(start[1], end[1]) &&
    point[1] >= Math.min(start[1], end[1])
  ) {
    return true;
  }
  return false;
}

/**
 * Get orientation of 3 points p1, p2, p3
 * @param {*} p1
 * @param {*} p2
 * @param {*} p3
 *
 * @returns 0 if p1, p2, p3 collinear, 1 if clockwise, 2 if ccw
 */
function getOrientation(p1, p2, p3) {
  //iq.opengenus.org/orientation-of-three-ordered-points
  const slopeDiff =
    (p2[1] - p1[1]) * (p3[0] - p2[0]) - (p3[1] - p2[1]) * (p2[0] - p1[0]);

  if (slopeDiff === 0) return 0; // collinear
  if (slopeDiff > 0) return 1; //
  return 2;
}

/**
 * Check if 2 line segments intersect
 * @param {*} s1
 * @param {*} s2
 *
 * @returns
 */
function doSegmentsIntersect(s1, s2) {
  // https://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/

  const s1s2Start = getOrientation(s1[0], s1[1], s2[0]);
  const s1s2End = getOrientation(s1[0], s1[1], s2[1]);
  const s2s1Start = getOrientation(s2[0], s2[1], s1[0]);
  const s2s1End = getOrientation(s2[0], s2[1], s1[1]);

  // General case (intersect somewhere in the middle)
  if (s1s2Start !== s1s2End && s2s1Start !== s2s1End) {
    return true;
  }

  // Special cases (collinearity)

  // 1. start of s2 is collinear with s1 and lies on s1
  if (s1s2Start == 0 && isOnLineSegment(s1[0], s1[1], s2[0])) {
    return true;
  }

  // 2. end of s2 is collinear with s1 and lies on s1
  if (s1s2End == 0 && isOnLineSegment(s1[0], s1[1], s2[1])) {
    return true;
  }

  // 3. start of s1 is collinear with s2 and lies on s2
  if (s2s1Start == 0 && isOnLineSegment(s2[0], s2[1], s1[0])) {
    return true;
  }

  // 4. end of s1 is collinear with s2 and lies on s2
  if (s2s1End && isOnLineSegment(s2[0], s2[1], s1[1])) {
    return true;
  }

  return false;
}
