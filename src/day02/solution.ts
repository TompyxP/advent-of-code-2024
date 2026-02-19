import { readLines } from '../utils';

const SAFE_CHANGE_MAX: number = 3;

const lineIncreasesSafety = (lineNumbers: number[]): boolean => {
    for (let i = 1; i < lineNumbers.length; i++) {
        const change = lineNumbers[i] - lineNumbers[i - 1];
        if (change <= 0 || change > SAFE_CHANGE_MAX) {
            return false;
        }
    }
    return true;
}

const lineDecreasesSafety = (lineNumbers: number[]): boolean => {
    for (let i = lineNumbers.length - 1; i > 0; i--) {
        const change = lineNumbers[i - 1] - lineNumbers[i];
        if (change <= 0 || change > SAFE_CHANGE_MAX) {
            return false;
        }
    }
    return true;
}

const isLineSafe = (lineNumbers: number[]): boolean => {
    return lineIncreasesSafety(lineNumbers) || lineDecreasesSafety(lineNumbers);
}

const solvePart1 = (lines: string[]): number => {
    let safeCount: number = 0;
    
    for (const line of lines) {
        const lineNumbers: number[] = line.split(' ').map(Number);

        if (isLineSafe(lineNumbers)) {
            safeCount++;
        }
    }

    return safeCount;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);

        const safeCount: number = solvePart1(input);
        
        console.log(`Safe lines: ${safeCount}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();