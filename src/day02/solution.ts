import { readLines } from '../utils';

function main() {
    try {
        const input = readLines(__dirname);
        console.log(input);
        
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();