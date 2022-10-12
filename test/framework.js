/**
 * assert if two arrays have the same elements
 * (not necessarily ordered)
 * @param {Array} arr1 first array
 * @param {Array} arr2 second array
 */
function assertArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  return Array.from(set1).every((element) => {
    return set2.has(element);
  });
}

/**
 *
 * @param {*} arr1
 * @param {*} arr2
 * @returns
 */
function assertNestedArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let sortedArr1 = [];
  const sortedArr2 = [];

  for (var i = 0; i < arr1.length; i++) {
    sortedArr1.push([...arr1[i]].sort());
    sortedArr2.push([...arr2[i]].sort());
  }

  const sortNested = function (a, b) {
    return a[0] === b[0] ? 0 : a[0] < b[0] ? -1 : 1;
  };

  sortedArr1.sort(sortNested);
  sortedArr2.sort(sortNested);

  for (var i = 0; i < sortedArr1.length; ++i) {
    for (var j = 0; j < sortedArr1[i].length; ++j) {
      if (sortedArr1[i][j] !== sortedArr2[i][j]) return false;
    }
  }
  return true;
}

/**
 * test function
 * @param {string} desc description
 * @param {function} fn function to test
 */
function test(desc, fn, assertion, inputs, expected) {
  try {
    const output = fn(inputs);
    const result = assertion(output, expected);
    if (!result) throw "test failed";

    console.log("\x1b[32m%s\x1b[0m", "\u2714 " + desc);
  } catch (error) {
    console.log("\n");
    console.log("\x1b[31m%s\x1b[0m", "\u2718 " + desc);
    console.error(error);
  }
}

module.exports = {
  assertArrayEqual,
  assertNestedArrayEqual,
  test,
};
