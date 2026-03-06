import { readLines } from '../utils';

enum GuardDirection {
    Up = '^',
    Down = 'v',
    Left = '<',
    Right = '>'
}

let currentDirection: GuardDirection;
let currentPosition: [number, number];
let traversedCoordinates: Set<string> = new Set();
let guardIsInGrid: boolean = true;

const intitalizeGridTraversal = (grid: string[][]): void => {
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {

            const cell: string = grid[row][col];

            if (Object.values(GuardDirection).includes(cell as GuardDirection)) {
                
                currentDirection = cell as GuardDirection;
                currentPosition = [row, col];
                traversedCoordinates.add(`${row},${col}`);

                return;
            }
        }
    }
}

const getNextCell = (grid: string[][]): string | null => {
    let nextRow: number = currentPosition[0];
    let nextCol: number = currentPosition[1];

    switch (currentDirection) {
        case GuardDirection.Up:
            nextRow -= 1;
            break;
        case GuardDirection.Down:
            nextRow += 1;
            break;
        case GuardDirection.Left:
            nextCol -= 1;
            break;
        case GuardDirection.Right:
            nextCol += 1;
            break;
    }
    
    return grid[nextRow]?.[nextCol] ?? null;
}

const changeDirection = (): void => {
    switch (currentDirection) {
        case GuardDirection.Up:
            currentDirection = GuardDirection.Right;
            break;
        case GuardDirection.Down:
            currentDirection = GuardDirection.Left;
            break;
        case GuardDirection.Left:
            currentDirection = GuardDirection.Up;
            break;
        case GuardDirection.Right:
            currentDirection = GuardDirection.Down;
            break;
    }
}

const traverseGrid = (grid: string[][]): void => {
    const nextCell: string | null = getNextCell(grid);
    
    if (nextCell === null) {
        guardIsInGrid = false;
        return;
    } else if (nextCell === '#') {
        changeDirection();
    }

    switch (currentDirection) {
        case GuardDirection.Up:
            currentPosition = [currentPosition[0] - 1, currentPosition[1]];
            break;
        case GuardDirection.Down:
            currentPosition = [currentPosition[0] + 1, currentPosition[1]];
            break;
        case GuardDirection.Left:
            currentPosition = [currentPosition[0], currentPosition[1] - 1];
            break;
        case GuardDirection.Right:
            currentPosition = [currentPosition[0], currentPosition[1] + 1];
            break;
    }

    traversedCoordinates.add(`${currentPosition[0]},${currentPosition[1]}`);
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);
        const grid: string[][] = input.map(line => line.split(''));

        intitalizeGridTraversal(grid);

        while (guardIsInGrid) {
            traverseGrid(grid);
        }

        console.log('Number of unique coordinates traversed by the guard:', traversedCoordinates.size);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();