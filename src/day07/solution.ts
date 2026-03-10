import { readLines } from '../utils';

type EquationData = {
    numbers: number[];
    outcome: number;
}

const createEquationDataArray = (input: string[]): EquationData[] => {
    const equationDataArray: EquationData[] = [];

    input.map((line: string) => {
        const [ outcome, numbersString ] = line.split(': ');
        const numbers: number[] = numbersString.split(' ').map(Number);
        equationDataArray.push({ numbers, outcome: Number(outcome) });
    });

    return equationDataArray;
}

const numbersCanProduceOutcome = (data: EquationData, includeConcatenation: boolean = false, currentValue: number = data.numbers[0], index: number = 1): boolean => {
    const { numbers, outcome } = data;

    if (index === numbers.length) {
        return currentValue === outcome;
    }
    
    if (currentValue > outcome) {
        return false;
    }
    
    const nextValue: number = numbers[index];
    
    if (numbersCanProduceOutcome(data, includeConcatenation, currentValue + nextValue, index + 1)) {
        return true;
    }
    
    if (numbersCanProduceOutcome(data, includeConcatenation, currentValue * nextValue, index + 1)) {
        return true;
    }
    
    if (includeConcatenation) {
        if (numbersCanProduceOutcome(data, includeConcatenation, Number(`${currentValue}${nextValue}`), index + 1)) {
            return true;
        }
    }
    
    return false;
}

const getCalibrationResult = (equationDataArray: EquationData[], includeConcatenation: boolean = false): number => {
    let sum: number = 0;

    for (const data of equationDataArray) {
        if (numbersCanProduceOutcome(data, includeConcatenation)) {
            sum += data.outcome;
        }
    }

    return sum;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);
        const equationDataArray: EquationData[] = createEquationDataArray(input);

        console.log('Calibration result:', getCalibrationResult(equationDataArray));
        console.log('Calibration result (with concatenation):', getCalibrationResult(equationDataArray, true));

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();