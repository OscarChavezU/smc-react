export function formatNumber(number: any): string {
    return parseFloat(number).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}