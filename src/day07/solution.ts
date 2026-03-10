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

const concatenateNumbers = (a: number, b: number): number => {
    const digits = b === 0 ? 1 : Math.floor(Math.log10(Math.abs(b))) + 1;
    return a * Math.pow(10, digits) + b;
}

const numbersCanProduceResult = (data: EquationData, includeConcatenation: boolean = false): boolean => {
    const { numbers, outcome } = data;

    const intermediateResults: Map<number, number[]> = new Map();

    for (let i = 1; i < numbers.length; i++) {
        if (i === 1) {

            intermediateResults.set(i, [
                numbers[i - 1] + numbers[i],
                numbers[i - 1] * numbers[i],
                ...(includeConcatenation ? [concatenateNumbers(numbers[i - 1], numbers[i])] : [])
            ]);
        } else {

            for (const prevResult of intermediateResults.get(i - 1) ?? []) {
                if (intermediateResults.has(i)) {
                    const sum = prevResult + numbers[i];
                    const product = prevResult * numbers[i];
                    const concatenation = includeConcatenation ? concatenateNumbers(prevResult, numbers[i]) : null;
                    const possibleResults = [
                        sum <= outcome ? sum : null,
                        product <= outcome ? product : null,
                        concatenation && concatenation <= outcome ? concatenation : null
                    ].filter(result => result !== null) as number[];

                    intermediateResults.set(i, [
                        ...(intermediateResults.get(i) ?? []),
                        ...possibleResults
                    ]);
                } else {
                    const sum = prevResult + numbers[i];
                    const product = prevResult * numbers[i];
                    const concatenation = includeConcatenation ? concatenateNumbers(prevResult, numbers[i]) : null;
                    const possibleResults = [
                        sum <= outcome ? sum : null,
                        product <= outcome ? product : null,
                        concatenation && concatenation <= outcome ? concatenation : null
                    ].filter(result => result !== null) as number[];

                    intermediateResults.set(i, [
                        ...possibleResults
                    ]);
                }
            }
        }
    }

    return intermediateResults.get(numbers.length - 1)?.includes(outcome) ?? false;
}

const getSumOfValidEquationResults = (equationDataArray: EquationData[], includeConcatenation: boolean = false): number => {
    let sum: number = 0;

    for (const data of equationDataArray) {
        if (numbersCanProduceResult(data, includeConcatenation)) {
            sum += data.outcome;
        }
    }

    return sum;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);
        const equationDataArray: EquationData[] = createEquationDataArray(input);

        console.log('Sum of Valid Equation Results (without concatenation):', getSumOfValidEquationResults(equationDataArray, false));
        console.log('Sum of Valid Equation Results (with concatenation):', getSumOfValidEquationResults(equationDataArray, true));

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();