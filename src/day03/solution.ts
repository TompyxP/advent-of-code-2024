import { readInput } from '../utils';

const getTuples = (input: string): [number, number][] => {
    const matches = input.match(/mul\(\d{1,3},\s*\d{1,3}\)/g) ?? [];

    const tuples = matches.map((m: string): [number, number] => {
        const numbers = m.match(/\d{1,3}/g);
        return [parseInt(numbers?.[0] ?? ''), parseInt(numbers?.[1] ?? '')];
    });

    return tuples;
}

const getTupleProducts = (tuples: [number, number][]): number[] => {
    return tuples.map(([a, b]) => a * b);
}

const getSumOfProducts = (products: number[]): number => {
    return products.reduce((acc, val) => acc + val, 0);
}

const filterConditionalSections = (text: string): string => {
    const parts = text.split(/(do\(\)|don't\(\))/);
    
    let enabled = true;
    let result = '';
    
    for (const part of parts) {
        if (part === "do()") {
            enabled = true;
        } else if (part === "don't()") {
            enabled = false;
        } else if (enabled) {
            result += part;
        }
    }
    
    return result;
};

const getResultFromInput = (input: string): number => {
    const tuples: [number, number][] = getTuples(input);
    const products: number[] = getTupleProducts(tuples);
    return getSumOfProducts(products);
}

const main = () => {
    try {
        const input: string = readInput(__dirname);
        const sum: number = getResultFromInput(input);

        const cleanedInput: string = filterConditionalSections(input);
        const cleanedSum: number = getResultFromInput(cleanedInput);

        console.log('Sum of products:', sum);
        console.log('Sum of products after filtering conditionals:', cleanedSum);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();