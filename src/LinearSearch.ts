export default function linearSearch(haystack: number[], needle: number): boolean {
	return haystack?.find(v => v === needle) !== undefined;
}
