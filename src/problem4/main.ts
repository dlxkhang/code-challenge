function sum_to_n_a(n: number): number {
    // Time complexity: O(n)
    // Space complexity: O(1)
    let sum = 0;
    for(let i = 1; i <= n; i++) {
        sum+= i;
    }
    return sum;
}

function sum_to_n_b(n: number): number {
    // Time complexity: O(n)
    // Space complexity: O(n)
	if(n === 1) return 1;

    return n + sum_to_n_b(n - 1);
}

function sum_to_n_c(n: number): number {
    // Time complexity: O(1)
    // Space complexity: O(1)
	return (n * (n + 1)) / 2;
}