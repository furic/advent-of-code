import * as fs from 'fs';
import type { PathFindingPoint } from '../../types';
import { findPathScore } from '../../utils';

const input = fs
	.readFileSync('input', 'utf8')
	.split('')
	.map((n) => parseInt(n, 16).toString(2).padStart(4, '0').split(''))
	.flat();
