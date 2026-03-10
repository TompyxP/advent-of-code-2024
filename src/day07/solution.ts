import { readLines } from '../utils';

type EquationData = {
    numbers: number[];
    outcome: number;
}

const createEquationDataArray = (input: string[]): EquationData[] => {
    const equationDataArray: EquationData[] = [];

    input.map((line: string) => {
        const [ result, numbersString ] = line.split(': ');
        const numbers = numbersString.split(' ').map(Number);
        equationDataArray.push({ numbers, outcome: Number(result) });
    });

    return equationDataArray;
}

const numbersCanProduceResult = (data: EquationData): boolean => {
    const { numbers, outcome } = data;

    const intermediateResults: Map<number, number[]> = new Map();

    for (let i = 1; i < numbers.length; i++) {
        if (i === 1) {

            intermediateResults.set(i, [
                numbers[i - 1] + numbers[i],
                numbers[i - 1] * numbers[i]
            ]);
        } else {

            for (const prevResult of intermediateResults.get(i - 1) ?? []) {
                if (intermediateResults.has(i)) {
                    intermediateResults.set(i, [
                        ...(intermediateResults.get(i) ?? []),
                        prevResult + numbers[i],
                        prevResult * numbers[i]
                    ]);
                } else {
                    intermediateResults.set(i, [
                        prevResult + numbers[i],
                        prevResult * numbers[i]
                    ]);
                }
            }
        }
    }

    return intermediateResults.get(numbers.length - 1)?.includes(outcome) ?? false;
}

const getSumOfValidEquationResults = (equationDataArray: EquationData[]): number => {
    let sum: number = 0;

    for (const data of equationDataArray) {
        if (numbersCanProduceResult(data)) {
            sum += data.outcome;
        }
    }

    return sum;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);
        const equationDataArray: EquationData[] = createEquationDataArray(input);

        console.log('Sum of Valid Equation Results:', getSumOfValidEquationResults(equationDataArray));

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();