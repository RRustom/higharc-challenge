// a handy helper function found here:
// https://javascript.plainenglish.io/how-to-create-an-svg-element-with-vanilla-javascript-a6b140745196
function createSVG(o) {
  let xmlns = "http://www.w3.org/2000/svg";
  let type = o.type || "circle";

  let el = document.createElementNS(xmlns, type);

  if (o.className) {
    el.className.baseVal = o.className;
  }
  if (o.attrs) {
    Object.keys(o.attrs).forEach(function (key, idx) {
      let value = o.attrs[key];
      if (key != key.toLowerCase()) {
        key = key.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      }
      // SVG-specific
      el.setAttributeNS(null, key, value);
    });
  }
  return el;
}

function drawVertex(index, x, y) {
  let svg = document.getElementsByTagName("svg")[0];

  let circle = createSVG({
    type: "circle",
    attrs: {
      id: index,
      cx: x,
      cy: y,
      r: 4,
      stroke: "red",
      fill: "red",
      strokeWidth: 3,
      transform: `translate(${50}, ${50})`,
    },
  });

  let text = createSVG({
    type: "text",
    attrs: {
      id: `label-${index}`,
      x: x + 8,
      y: y,
      fontSize: "24px",
      transform: `translate(${50}, ${50})`,
    },
  });
  var textNode = document.createTextNode(index);
  text.appendChild(textNode);

  svg.appendChild(circle);
  svg.appendChild(text);
}

function drawFaces(faces, vertices) {
  let svg = document.getElementsByTagName("svg")[0];

  for (var i = 0; i < faces.length; i++) {
    const face = faces[i];
    console.log("face: ", face);
    let points = "";

    // convert face into a polygon string
    for (const vIndex of face) {
      const vertex = vertices[vIndex];
      console.log("  vertex: ", vertex);
      points += `${vertex[0]}, ${vertex[1]} `;
    }

    console.log("points: ", points);

    let polygon = createSVG({
      type: "polygon",
      attrs: {
        id: `face-${i}`,
        fill: "hsla(" + Math.floor(Math.random() * 360) + ", 100%, 70%, 1)", // random color
        points,
        transform: `translate(${50}, ${50})`,
      },
    });
    svg.appendChild(polygon);
  }
}

function drawGraph(vertices, edges) {
  let svg = document.getElementsByTagName("svg")[0];
  // draw faces

  // draw lines
  for (var i = 0; i < edges.length; i++) {
    const [src, dst] = edges[i];
    const [x1, y1] = vertices[src];
    const [x2, y2] = vertices[dst];

    let line = createSVG({
      type: "line",
      attrs: {
        id: `edge-${src}-${dst}`,
        stroke: "black",
        strokeWidth: 3,
        x1: x1 + 50,
        y1: y1 + 50,
        x2: x2 + 50,
        y2: y2 + 50,
      },
    });
    svg.appendChild(line);
  }

  // draw vertices with labels
  for (var i = 0; i < vertices.length; i++) {
    const [x, y] = vertices[i];

    drawVertex(i, x, y);
  }
}

function clearDrawing() {
  let parent = document.getElementsByTagName("svg")[0];
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}
