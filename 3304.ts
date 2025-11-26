const getNextChar = (s: string): string => {
    if (s === 'z') {
        return 'a';
    }
    return String.fromCharCode(s.charCodeAt(0) + 1);
}

function kthCharacter(k: number): string {
    let chars = 'a';
    let totalCount = 1;
    if (k === 1) {
        return 'a';
    }

    while (totalCount < k/2) {
        let newChars = '';
        for (let i = 0; i < chars.length; i++) {
            const ch = chars[i]!;
            newChars += getNextChar(ch);
        }
        chars = chars + newChars;
        totalCount = chars.length;
        // console.log(`Generated chars: ${chars}, totalCount: ${totalCount}`);
    }
    return getNextChar(chars[(k - totalCount - 1)]!);
};

const cases: { params: number; expected: string }[] = [
    {
        params: 5,
        expected: 'b'
    },
    {
        params: 10,
        expected: 'c'
    },
]

for (let i = 0; i < cases.length; i++) {
    const caseItem = cases[i]!;
    const result = kthCharacter(caseItem.params);
    if (result === caseItem.expected) {
        console.log(`Case ${i} passed.`);
    } else {
        console.log(`Case ${i} failed: expected ${caseItem.expected}, got ${result}.`);
    }
}