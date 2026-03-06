import { readLines } from '../utils';

// Returns a map where the key is a page number and the value is an array of page numbers that must come before it in the order
const getPageOrderMap = (rules: string[]): Map<number, number[]> => {
    const orderMap: Map<number, number[]> = new Map();

    for (const rule of rules) {
        const [before, after] = rule.split('|').map(Number);
        if (!orderMap.has(after)) {
            orderMap.set(after, []);
        }
        orderMap.get(after)?.push(before);
    }
    return orderMap;
}

const getMiddlePageNumberIfUpdateValid = (orderMap: Map<number, number[]>, update: string): number => {
    const updates: number[] = update.split(',').map(Number);

    for (let i = 0; i < updates.length - 1; i++) {
        const currentPage: number = updates[i];
        
        // If the array at the key of the current page number includes any page numbers that appear after it in the updates, 
        // it means the order is invalid (the array contains page numbers that must come before it)
        for (let j = i + 1; j < updates.length; j++) {
            if (orderMap.get(currentPage)!.includes(updates[j])) {
                return 0;
            }
        }
    }

    return updates[Math.floor(updates.length / 2)];
}

const getSumOfValidMiddlePageNumbers = (orderMap: Map<number, number[]>, updates: string[]): number => {
    let sum: number = 0;

    for (const update of updates) {
        sum += getMiddlePageNumberIfUpdateValid(orderMap, update);
    }

    return sum;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);

        let separatorIndex: number = input.findIndex(line => line === '');

        const pageOrderingRules: string[] = input.slice(0, separatorIndex);
        const updatePageNumbers: string[] = input.slice(separatorIndex + 1);

        const pageOrderMap: Map<number, number[]> = getPageOrderMap(pageOrderingRules);
        const sumOfValidMiddlePageNumbers: number = getSumOfValidMiddlePageNumbers(pageOrderMap, updatePageNumbers);

        console.log('Sum of valid middle page numbers:', sumOfValidMiddlePageNumbers);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();