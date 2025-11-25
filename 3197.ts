// 1. 一共三种切法
// 1. 水平切三块，在三块中分别收缩
// 2. 垂直切三块，在三块中分别收缩
// 3. 先水平切两块，再垂直切两块，总共四块，必有一块全为0，然后收缩另外三块
// 2. 收缩时，如果一条边全为0，可以直接收缩，否则需要找到该边上最小的非0值作为收缩值
// 3. 计算每种切法的和，取最小值

function log(...args: any[]): void {
    // console.log(...args);
}

function printGrid(grid: number[][], r1: number, r2: number, c1: number, c2: number): void {
    // for (let i = r1; i <= r2; i++) {
    //     let rowStr = '';
    //     for (let j = c1; j <= c2; j++) {
    //         rowStr += grid[i]![j] + ' ';
    //     }
    //     log(rowStr);
    // }
}

function getBlockSize(grid: number[][], r1: number, r2: number, c1: number, c2: number): number {
   let topRow = r1;
   let bottomRow = r2;
   let leftCol = c1;
   let rightCol = c2;

   // 收缩上边界
   while (topRow <= bottomRow) {
       let allZero = true;
       for (let col = leftCol; col <= rightCol; col++) {
           if (grid[topRow]![col] !== 0) {
               allZero = false;
               break;
           }
       }
       if (allZero) {
           topRow++;
       } else {
           break;
       }
   }

   // 收缩下边界
   while (bottomRow >= topRow) {
       let allZero = true;
       for (let col = leftCol; col <= rightCol; col++) {
           if (grid[bottomRow]![col] !== 0) {
               allZero = false;
               break;
           }
       }
       if (allZero) {
           bottomRow--;
       } else {
           break;
       }
   }

   // 收缩左边界
   while (leftCol <= rightCol) {
       let allZero = true;
       for (let row = topRow; row <= bottomRow; row++) {
           if (grid[row]![leftCol] !== 0) {
               allZero = false;
               break;
           }
       }
       if (allZero) {
           leftCol++;
       } else {
           break;
       }
   }

   // 收缩右边界
   while (rightCol >= leftCol) {
       let allZero = true;
       for (let row = topRow; row <= bottomRow; row++) {
           if (grid[row]![rightCol] !== 0) {
                allZero = false;
                break;
              }
       }
       if (allZero) {
           rightCol--;
       } else {
           break;
       }
   }
   // 计算收缩后的区域和
   let sum = (bottomRow - topRow + 1) * (rightCol - leftCol + 1);
//    log(`Before contraction: r1=${r1}, r2=${r2}, c1=${c1}, c2=${c2}`);
//    printGrid(grid, r1, r2, c1, c2);
//    log(`After contraction: topRow=${topRow}, bottomRow=${bottomRow}, leftCol=${leftCol}, rightCol=${rightCol}`);
//    printGrid(grid, topRow, bottomRow, leftCol, rightCol);
//    log(`Contraction size: ${(bottomRow - topRow + 1) * (rightCol - leftCol + 1)}`);
   return sum;
}


function minimumSum(grid: number[][]): number {
    const w = grid[0]!.length;
    const h = grid.length;
    let minSum = Number.MAX_SAFE_INTEGER;
    if (h > 2) {
        // 水平切三块
        for (let i = 0; i < h - 2; i++) {
            for (let j = i + 1; j < h - 1; j++) {
                // log('-----------------------------------');
                const sum = getBlockSize(grid, 0, i, 0, w - 1) +
                            getBlockSize(grid, i + 1, j, 0, w - 1) +
                            getBlockSize(grid, j + 1, h - 1, 0, w - 1);
                // log(`Cut at row1=${i}, row2=${j}, sum=${sum}`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);
            }
        }
    }
    if (w > 2) {
        // 垂直切三块
        for (let i = 0; i < w - 2; i++) {
            for (let j = i + 1; j < w - 1; j++) {
                // log('-----------------------------------');
                const sum = getBlockSize(grid, 0, h - 1, 0, i) +
                            getBlockSize(grid, 0, h - 1, i + 1, j) +
                            getBlockSize(grid, 0, h - 1, j + 1, w - 1);
                // log(`Cut at col1=${i}, col2=${j}, sum=${sum}`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);
            }
        }
    }

    if (w > 1 && h > 1) {
        // 先水平切两块，再垂直切两块
        // 然后组合为3块，一共四种组合方法
        for (let i = 0; i < h - 1; i++) {
            for (let j = 0; j < w - 1; j++) {
                // log('-----------------------------------');
                // 组合方法1，合并第一行
                let a1 = getBlockSize(grid, 0, i, 0, w - 1);
                let a2 = getBlockSize(grid, i + 1, h - 1, 0, j);
                let a3 = getBlockSize(grid, i + 1, h - 1, j + 1, w - 1);


                let sum = a1 + a2 + a3;
                // log(`Cut at row=${i}, col=${j}, sum=${sum}, blocks=(${a1},${a2},${a3})`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);

                // 组合方法1，合并第2行
                a1 = getBlockSize(grid, 0, i, 0, j);
                a2 = getBlockSize(grid, 0, i, j + 1, w - 1);
                a3 = getBlockSize(grid, i + 1, h - 1, 0, w - 1);
                
                sum = a1 + a2 + a3;
                // log(`Cut at row=${i}, col=${j}, sum=${sum}, blocks=(${a1},${a2},${a3})`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);

                // 组合方法1，合并第1列
                a1 = getBlockSize(grid, 0, h - 1, 0, j);
                a2 = getBlockSize(grid, 0, i, j + 1, w - 1);
                a3 = getBlockSize(grid, i + 1, h - 1, j + 1, w - 1);
                
                sum = a1 + a2 + a3;
                // log(`Cut at row=${i}, col=${j}, sum=${sum}, blocks=(${a1},${a2},${a3})`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);

                // 组合方法1，合并第2列
                a1 = getBlockSize(grid, 0, h - 1, j + 1, w - 1);
                a2 = getBlockSize(grid, 0, i, 0, j);
                a3 = getBlockSize(grid, i + 1, h - 1, 0, j);
                
                sum = a1 + a2 + a3;
                // log(`Cut at row=${i}, col=${j}, sum=${sum}, blocks=(${a1},${a2},${a3})`);
                // log('-----------------------------------');
                minSum = Math.min(minSum, sum);
            }
        }
    }

    return minSum;
};


const cases = [


    [[1,0,1],[1,1,1]],
    [[1,0,1,0],[0,1,0,1]],
    [[1,1],[1,1]],
];

const expected = [
    5,
    5,
    4,
];

for (let i = 0; i < cases.length; i++) {
    const result = minimumSum(cases[i]!);
    if (result === expected[i]) {    
        console.log(`Case ${i + 1} passed`);
    } else {
        console.log(`Case ${i + 1} failed: expected ${expected[i]}, got ${result}`);
    }
}