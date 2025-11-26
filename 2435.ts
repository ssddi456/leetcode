function log(...args: any[]): void {
    console.log(...args);
}

function printGrid(grid: number[][], r1: number, r2: number, c1: number, c2: number): void {
    for (let i = r1; i <= r2; i++) {
        let rowStr = '';
        for (let j = c1; j <= c2; j++) {
            rowStr += grid[i]![j] + ' ';
        }
        // log(rowStr);
    }
}

// k = 1时，简化为求全路径数
// 否则对每一个格子，本格子值为所有来源路径的值的和对k取余


function numberOfPaths(grid: number[][], k: number): number {
    const h = grid.length;
    const w = grid[0]!.length;
    const pathCache: number[][] = [];
    
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const cacheIdx = i * w + j;
            const gridVal = grid[i]![j]!;
            if (i === 0 && j === 0) {
                // log(`Processing cell (0, 0) with value ${gridVal}, setting cache to [${gridVal % k}]`);
                pathCache[cacheIdx] = new Array(k).fill(0);
                pathCache[cacheIdx][gridVal % k] = 1;
            } else {
                const topCacheVal = i > 0 ? pathCache[(i - 1) * w + j]! : [];
                const leftCacheVal = j > 0 ? pathCache[i * w + (j - 1)]! : [];
                // log(`Processing cell (${i}, ${j}) with value ${gridVal}, topCacheVal: ${JSON.stringify(topCacheVal)}, leftCacheVal: ${JSON.stringify(leftCacheVal)}`);
                const newCacheVal = new Array(k).fill(0);
                for (let w = 0; w < k; w++) {
                    const count = (topCacheVal[w] || 0) + (leftCacheVal[w] || 0);
                    if (count > 0) {
                        const newMod = (w + gridVal) % k;
                        newCacheVal[newMod] = (newCacheVal[newMod] + count) % 1_000_000_007;
                    }
                }
                
                pathCache[cacheIdx] = newCacheVal;
            }
        }
    }

    const finalCache = pathCache[(h - 1) * w + (w - 1)]![0]!;
    
    return finalCache
};

const cases: { params: [number[][], number]; expected: number }[] = [
    {
        params: [[[5,2,4],[3,0,5],[0,7,2]], 3],
        expected: 2
    },
    {
        params: [[[0,0]], 5],
        expected: 1
    }
];

for (let i = 0; i < cases.length; i++) {
    const caseItem = cases[i]!;
    const result = numberOfPaths(caseItem.params[0]!, caseItem.params[1]!);
    if (result === caseItem.expected) {
        log(`Case ${i} passed.`);
    } else {
        log(`Case ${i} failed: expected ${caseItem.expected}, got ${result}.`);
    }
}