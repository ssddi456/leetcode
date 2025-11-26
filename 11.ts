function maxArea(height: number[]): number {
    let i = 0;
    let j = height.length - 1;
    let max = j * Math.min(height[i]!, height[j]!);
    while (i < j) {
        if (height[i]! < height[j]!) {
            i++;
        } else {
            j--;
        }
        const area = (j - i) * Math.min(height[i]!, height[j]!);
        if (area > max) {
            max = area;
        }
    }

    return max;
};