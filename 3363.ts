function logGrid(grid: number[][]): void {
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i]?.join(',\t'));
    }
}

function maxCollectedFruits(fruits: number[][]): number {

    const rows = fruits.length;
    const maxsSideStep = Math.floor(rows / 2) - 1;

    let cache = new Array(rows)
    let cache2 = new Array(rows);
    for (let i = rows - 1; i >= 0; i--) {
        cache[i] = new Array(rows).fill(0);
        cache2[i] = new Array(rows).fill(0);
    }

    const getCacheValue = (r: number, c: number): number => {
        if (r < 0 || c < 0 || r >= rows || c >= rows) {
            return 0;
        }
        return cache[r]![c]!;
    }
    const getCache2Value = (r: number, c: number): number => {
        if (r < 0 || c < 0 || r >= rows || c >= rows) {
            return 0;
        }
        return cache2[r]![c]!;
    }
    let topLeft = 0;

    for (let r = rows - 1; r >= 0; r--) {
        // 对角线
        topLeft = topLeft + fruits[r]![r]!;
        // console.log(`Processing diagonal cell (${r}, ${r}), topLeft=${topLeft}`);
        if (r + 1 < rows) {
            let maxSideStep = (r > maxsSideStep) ? (rows - r - 2) : r;
            // console.log(`Processing row ${r}, maxSideStep=${maxSideStep} maxsSideStep=${maxsSideStep}`);
            // 左下部分
            for (let step = 0; step <= maxSideStep; step++) {
                // console.log(`Processing cell (${rows - 1 - step}, ${r})`);
                cache[rows - 1 - step]![r]! = fruits[rows - 1 - step]![r]! + Math.max(
                    getCacheValue(rows - 1 - step + 1, r + 1),
                    getCacheValue(rows - 1 - step, r + 1),
                    getCacheValue(rows - 1 - step - 1, r + 1)
               );
            }
            // ↗右上部分
            for (let step = 0; step <= maxSideStep; step++) {
                // console.log(`Processing cell (${r}, ${rows - 1 - step})`);
                cache2[r]![rows - 1 - step]! = fruits[r]![rows - 1 - step]! + Math.max(
                    getCache2Value(r + 1, rows - 1 - step + 1),
                    getCache2Value(r + 1, rows - 1 - step),
                    getCache2Value(r + 1, rows - 1 - step - 1)
               );
            }
        }
    }

    // console.log('Final cache:');
    // logGrid(cache);
    // console.log('Final cache2:');
    // logGrid(cache2);
    return topLeft + cache[rows - 1]![0]! + cache2[0]![rows - 1]!;
};


const cases: { params: number[][]; expected: number }[] = [
    {
        params: [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]],
        expected: 100,
    },
    {
        params: [[1,1],[1,1]],
        expected: 4,
    },
    {
        params: [[8,5,0,17,15],[6,0,15,6,0],[7,19,16,8,18],[11,3,2,12,13],[17,15,15,4,6]],
        expected: 145,
    },
    {
        params: [[4,18,19,9,20,14],[16,4,4,16,15,16],[2,11,15,6,8,9],[6,7,11,17,7,6],[17,17,2,13,2,14],[16,9,6,14,7,16]],
        expected: 182,
    },
    {
        params: [[4,15,20],[8,8,11],[19,0,6]],
        expected: 68,
    },
    {
        params: [[11,13,5,0],[16,19,7,10],[17,9,15,13],[15,10,13,11]],
        expected: 117,
    }
];

for (let i = 0; i < cases.length; i++) {
    const caseItem = cases[i]!;
    const result = maxCollectedFruits(caseItem.params);
    if (result === caseItem.expected) {
        console.log(`Case ${i} passed.`);
    } else {
        const red = `\x1b[31m`;
        console.log(`${red}Case ${i} failed: expected ${caseItem.expected}, got ${result}.\x1b[0m`);
    }
}