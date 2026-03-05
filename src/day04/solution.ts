import { readLines } from '../utils';

const directions: [number, number][] = [
    [0, 1],  // right
    [0, -1], // left
    [1, 0],  // down
    [-1, 0], // up
    [1, 1],  // diagonal right down
    [-1, 1], // diagonal right up
    [1, -1], // diagonal left down
    [-1, -1] // diagonal left up
];

const getXmasCountForGridCoordinate = (grid: string[][], row: number, col: number): number => {
    let count: number = 0;

    for (const [rowDir, colDir] of directions) {

        let xmasFound: boolean = true;

        for (let letterIndex = 0; letterIndex < 4; letterIndex++) {
            const newRow: number = row + (rowDir * letterIndex);
            const newCol: number = col + (colDir * letterIndex);

            if (!(grid?.[newRow]?.[newCol] === 'XMAS'[letterIndex])) {
                xmasFound = false;
                break;
            }
        }

        if (xmasFound) {
            count++;
        }
    }

    return count;
}

const getXmasCount = (grid: string[][]): number => {
    let count: number = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            count += getXmasCountForGridCoordinate(grid, row, col);
        }
    }

    return count;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);
        const grid: string[][] = input.map(line => line.split(''));

        const xmasCount: number = getXmasCount(grid);

        console.log('Xmas count:', xmasCount);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();