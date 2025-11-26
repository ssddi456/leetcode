function minimumOperations(nums: number[]): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        const remain = nums[i]! % 3;
        if (remain !== 0) {
            count++;
        }
    }
    return count;
};