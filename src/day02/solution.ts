import { readLines } from '../utils';
import '../extensions';

const SAFE_CHANGE_MAX: number = 3;

const lineIncreasesSafely = (lineNumbers: number[], useProblemDampener: boolean = false): boolean => {
    for (let i = 1; i < lineNumbers.length; i++) {
        const change = lineNumbers[i] - lineNumbers[i - 1];

        if (change <= 0 || change > SAFE_CHANGE_MAX) {
            if (useProblemDampener) {
                let withoutCurrentIndex = lineNumbers.removeAtIndex(i);
                let withoutPreviousIndex = lineNumbers.removeAtIndex(i - 1);

                return lineIncreasesSafely(withoutCurrentIndex) || lineIncreasesSafely(withoutPreviousIndex);
            } else {    
                return false;
            }
        }
    }
    return true;
}

const isLineSafe = (lineNumbers: number[], useProblemDampener: boolean = false): boolean => {
    return lineIncreasesSafely(lineNumbers, useProblemDampener) || lineIncreasesSafely([...lineNumbers].reverse(), useProblemDampener);
}

const getSafeLineCount = (lines: string[], useProblemDampener: boolean = false): number => {
    let safeCount: number = 0;
    
    for (const line of lines) {
        const lineNumbers: number[] = line.split(' ').map(Number);

        if (isLineSafe(lineNumbers, useProblemDampener)) {
            safeCount++;
        }
    }

    return safeCount;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);

        const safeCount: number = getSafeLineCount(input);
        const trueSafeCount: number = getSafeLineCount(input, true);

        console.log(`Safe lines without dampener: ${safeCount}`);
        console.log(`Safe lines with dampener: ${trueSafeCount}`);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();