import { readLines } from '../utils';

// Returns a map where the key is a page number and the value is an array of page numbers that must come before it
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

const updateIsValid = (orderMap: Map<number, number[]>, updates: number[]): boolean => {
    for (let i = 0; i < updates.length - 1; i++) {
        const currentPage: number = updates[i];
        
        // If the array at the key of the current page number includes any page numbers that appear after it in the updates, 
        // it means the order is invalid (the array contains page numbers that must come before the key)
        for (let j = i + 1; j < updates.length; j++) {
            if (orderMap.has(currentPage) && orderMap.get(currentPage)!.includes(updates[j])) {
                return false;
            }
        }
    }

    return true;
}

const getSumOfMiddlePageNumbers = (updates: number[][]): number => {
    let sum: number = 0;

    for (const update of updates) {
        sum += update[Math.floor(update.length / 2)];
    }

    return sum;
}

const fixInvalidUpdates = (orderMap: Map<number, number[]>, updates: number[][]): number[][] => {
    const fixedUpdates: number[][] = [];

    for (const update of updates) {
        const sortedUpdates: number[] = update.sort((a, b) => {
            const mustComeBeforeA: number[] = orderMap!.get(a) || [];
            const mustComeBeforeB: number[] = orderMap!.get(b) || [];
            
            if (mustComeBeforeA!.includes(b)) {
                return 1;
            } else if (mustComeBeforeB!.includes(a)) {
                return -1;
            } else {
                return 0;
            }
        });
        fixedUpdates.push(sortedUpdates);
    }

    return fixedUpdates;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);

        let separatorIndex: number = input.findIndex(line => line === '');

        const pageOrderingRules: string[] = input.slice(0, separatorIndex);
        const updatePageNumbers: number[][] = input.slice(separatorIndex + 1).map(line => line.split(',').map(Number));

        const pageOrderMap: Map<number, number[]> = getPageOrderMap(pageOrderingRules);

        const validUpdates: number[][] = updatePageNumbers.filter(update => updateIsValid(pageOrderMap, update));
        const invalidUpdates: number[][] = updatePageNumbers.filter(update => !updateIsValid(pageOrderMap, update));
        
        const sumOfValidMiddlePageNumbers: number = getSumOfMiddlePageNumbers(validUpdates);

        const fixedInvalidUpdates: number[][] = fixInvalidUpdates(pageOrderMap, invalidUpdates);
        const sumOfFixedMiddlePageNumbers: number = getSumOfMiddlePageNumbers(fixedInvalidUpdates);


        console.log('Sum of valid middle page numbers:', sumOfValidMiddlePageNumbers);
        console.log('Sum of invalid middle page numbers after fix:', sumOfFixedMiddlePageNumbers);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();