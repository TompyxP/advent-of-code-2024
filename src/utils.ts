import { readFileSync } from 'fs';
import { join } from 'path';

export function readInput(dir: string, filename: string = 'input.txt'): string {
    return readFileSync(join(dir, filename), 'utf-8').trim();
}

export function readLines(dir: string, filename: string = 'input.txt'): string[] {
  	return readInput(dir, filename).split('\n').map(line => line.trim());
}
