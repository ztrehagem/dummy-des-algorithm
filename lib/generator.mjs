import { transpose, rotate } from './common';
import { bitstr } from './utils';

export function keygen(seed) {
  // console.log(bitstr(seed, 10));
  const p10ed = p10(seed, 10);
  const left = (p10ed >> 5) & 0b11111;
  const left1 = rotate(left, 5, 1);
  const left2 = rotate(left1, 5, 2);
  const right = p10ed & 0b11111;
  const right1 = rotate(right, 5, 1);
  const right2 = rotate(right1, 5, 2);
  const key1 = p8((left1 << 5) + right1, 10);
  const key2 = p8((left2 << 5) + right2, 10);
  // console.log(bitstr(key1, 8), bitstr(key2, 8));
  return [key1, key2];
}

function p10(v, n) {
  return transpose(v, n, [3,5,2,7,4,10,1,9,8,6]);
}

function p8(v, n) {
  return transpose(v, n, [6,3,7,4,8,5,10,9]);
}
