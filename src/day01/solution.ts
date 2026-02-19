import { readLines } from '../utils';
import '../extensions';

const getSortedLists = (lines: string[]): [number[], number[]] => {
    const leftList: number[] = [];
    const rightList: number[] = [];
    
    for (const line of lines) {
        const [left, right] = line.split(/\s+/).map(Number);
        leftList.push(left);
        rightList.push(right);
    }
    
    leftList.sort((a, b) => a - b);
    rightList.sort((a, b) => a - b);
    
    return [leftList, rightList];
}

const getTotalDistance = (leftList: number[], rightList: number[]): number => {
    let totalDistance: number = 0;

    for (let i = 0; i < leftList.length; i++) {
        totalDistance += Math.abs(leftList[i] - rightList[i]);
    }

    return totalDistance;
}

const getNumberOfOccurrences = (list: number[], target: number): number => {
    return list.filter(num => num === target).length;
}

const getSimilarityScore = (leftList: number[], rightList: number[]): number => {
    let similarityScore: number = 0;

    for (let i = 0; i < leftList.length; i++) {
        const rightListOccurrences = getNumberOfOccurrences(rightList, leftList[i]);

        similarityScore += leftList[i] * rightListOccurrences;
    }

    return similarityScore;
}

const main = () => {
    try {
        const input: string[] = readLines(__dirname);

        const [leftList, rightList] = getSortedLists(input);

        const totalDistance = getTotalDistance(leftList, rightList);
        const similarityScore = getSimilarityScore(leftList, rightList);

        console.log('Total distance:', totalDistance);
        console.log('Similarity score:', similarityScore);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();