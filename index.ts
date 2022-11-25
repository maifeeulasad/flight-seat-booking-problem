const createMatrix = (r: number, c: number) =>
  new Array(r).fill(0).map(() => new Array(c).fill(0));

const matrixDepth = (array: any) => array.length;
const matrixWidth = (array: any) => array[0].length;

const calculateSeatPlan = (
  seatsBlockShapes = [
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4],
  ],
  count = 30
) => {
  // 3*2 + 4*3 + 2*3 + 3*4 -> map
  // 6 + 12 + 6 + 12 -> reduce
  // 36
  const maxCount = seatsBlockShapes
    .map((seatsBlockShape) => seatsBlockShape[0] * seatsBlockShape[1])
    .reduce((prev, current) => prev + current, 0);
  const maxDepth = Math.max(
    ...seatsBlockShapes.map((seatsBlockShape) => seatsBlockShape[1])
  );

  if (count > maxCount) {
    throw Error("Requesting to allot more seat than available");
  }

  let seatsBlocks = seatsBlockShapes.map((seatsBlockShape) =>
    createMatrix(seatsBlockShape[0], seatsBlockShape[1])
  );

  let index = 1;

  // aisle
  for (let depth = 0; depth < maxDepth; depth += 1) {
    seatsBlocks.forEach((seatsBlock, seatsBlockIndex) => {
      if (matrixDepth(seatsBlock) > depth) {
        const width = matrixWidth(seatsBlock);
        if (seatsBlockIndex === seatsBlocks.length - 1) {
          seatsBlock[depth][0] = index;
          index += 1;
        } else if (seatsBlockIndex === 0) {
          seatsBlock[depth][width - 1] = index;
          index += 1;
        } else {
          seatsBlock[depth][0] = index;
          index += 1;
          seatsBlock[depth][width - 1] = index;
          index += 1;
        }
        if (index > count) {
          return seatsBlocks;
        }
      }
    });
  }

  // window
  for (let depth = 0; depth < maxDepth; depth += 1) {
    seatsBlocks.forEach((seatsBlock, seatsBlockIndex) => {
      if (matrixDepth(seatsBlock) > depth) {
        const width = matrixWidth(seatsBlock);
        if (seatsBlockIndex === seatsBlocks.length - 1) {
          seatsBlock[depth][width - 1] = index;
          index += 1;
        } else if (seatsBlockIndex === 0) {
          seatsBlock[depth][0] = index;
          index += 1;
        }
        if (index > count) {
          return seatsBlocks;
        }
      }
    });
  }

  // middle
  for (let depth = 0; depth < maxDepth; depth += 1) {
    seatsBlocks.forEach((seatsBlock) => {
      if (matrixDepth(seatsBlock) > depth) {
        const width = matrixWidth(seatsBlock);
        for (let it = 1; it < width - 1; it += 1) {
          seatsBlock[depth][it] = index;
          index += 1;
        }
        if (index > count) {
          return seatsBlocks;
        }
      }
    });
  }

  return seatsBlocks;
};

const showReadable = (data: any) => {
  const maxDepth = Math.max(...data.map((datum: any) => datum.length));
  data.map((datum: any) => {
    const itemsToAdd = maxDepth - datum.length;
    for (let i = 0; i < itemsToAdd; i += 1) {
      datum.push(Array(datum[0].length).fill(0));
    }
  });
  for (let i = 0; i < maxDepth; i += 1) {
    console.log(data.map((datum: any) => datum[i]));
  }
};

const res = calculateSeatPlan(
  [
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4],
  ],
  30
);
showReadable(res);
