function isPowerOfFour(n: number): boolean {
    if (n < 0) {
        return false;
    }
    return (n & 0x55555555) === n && (n & (n - 1)) === 0;
};