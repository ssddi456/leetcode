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

const primeFactors = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127];
const gcdCache = new Map<number, Map<number, number>>();
function numberToPrimeFactors(n: number): Map<number, number> {
    const originalN = n;
    if (gcdCache.has(originalN)) {
        // log(`Cache hit for ${n} ${[...gcdCache.get(originalN)!.entries()]}`);
        return gcdCache.get(originalN)!;
    }
    const factors = new Map<number, number>();
    for (const prime of primeFactors) {
        if (prime * prime > n) {
            break;
        }
        while (n % prime === 0) {
            factors.set(prime, (factors.get(prime) || 0) + 1);
            n = n / prime;
        }
    }
    if (n > 1) {
        factors.set(n, (factors.get(n) || 0) + 1);
    }
    gcdCache.set(originalN, factors);
    return factors;
}

function getGCDFactors(factorsA: Map<number, number>, factorsB: Map<number, number>): number {
    let gcdFactors = 1
    for (const [prime, countA] of factorsA.entries()) {
        if (factorsB.has(prime)) {
            const countB = factorsB.get(prime)!;
            gcdFactors *= Math.pow(prime, Math.min(countA, countB));
        }
    }

    return gcdFactors;
}

// 实际是求两个互质数之间的最小距离
function minOperations(nums: number[]): number {
    let oneCount = 0;
    let count = Infinity;
    for (let i = 0; i < nums.length - 1; i++) {
        let numA = nums[i]!;
        if (numA === 1) {
            oneCount++;
        }

        for (let j = i + 1; j < nums.length; j++) {
            const numB = nums[j]!;
            const factorsA = numberToPrimeFactors(numA);
            const factorsB = numberToPrimeFactors(numB);
            numA = getGCDFactors(factorsA, factorsB);
            if (numA === 1) {
                // log(`Found coprime pair: ${numA}, ${numB}, distance: ${j - i}`);
                count = Math.min(count, j - i + 1);
            }
        }
    }
    if (nums[nums.length - 1] === 1) {
        oneCount++;
    }

    if (oneCount > 0) {
        // log(`Found ${oneCount} ones in the array, returning ${nums.length - oneCount}`);
        return nums.length - oneCount;
    }
    if (count === Infinity) {
        return -1;
    }
    return nums.length + count - 2;
};

function minOperations1(nums: number[]): number {
    const n: number = nums.length;
    let num1: number = 0;
    let g: number = 0;
    
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const temp: number = b;
            b = a % b;
            a = temp;
        }
        return a;
    };
    
    for (const x of nums) {
        if (x === 1) {
            num1++;
        }
        g = gcd(g, x);
    }
    
    if (num1 > 0) {
        return n - num1;
    }
    if (g > 1) {
        return -1;
    }
    
    let minLen: number = n;
    for (let i = 0; i < n; i++) {
        let currentGcd: number = 0;
        for (let j = i; j < n; j++) {
            currentGcd = gcd(currentGcd, nums[j]!);
            if (currentGcd === 1) {
                minLen = Math.min(minLen, j - i + 1);
                break;
            }
        }
    }
    return minLen + n - 2;
}



const cases: { params: number[]; expected: number }[] = [
    {
        params: [2,6,3,4],
        expected: 4
    },
    {
        params: [2,10,6,14],
        expected: -1
    },
    {
        params: [6,10,15],
        expected: 4
    },
    {
        params: [2,10,10,35,21],
        expected: 6
    },
    {
        params: [10,5,10,30,70,4,2,6,8,4],
        expected: 13
    }
];

for (let i = 0; i < cases.length; i++) {
    const caseItem = cases[i]!;
    const result = minOperations(caseItem.params);
    if (result === caseItem.expected) {
        log(`Case ${i} passed.`);
    } else {
        log(`Case ${i} failed: expected ${caseItem.expected}, got ${result}.`);
    }
}
