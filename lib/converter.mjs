import { keygen } from './generator';
import { transpose } from './common';
import { bitstr } from './utils';

export default class Converter {
  constructor(seed) {
    const [key1, key2] = keygen(seed);
    this.key1 = key1;
    this.key2 = key2;
  }

  encrypt(v) {
    return convert(v, this.key1, this.key2);
  }

  decrypt(v) {
    return convert(v, this.key2, this.key1);
  }
}

function convert(v, firstKey, secondKey) {
  const iped = ip(v);
  // console.log(bitstr(iped, 8));
  const left = (iped >> 4) & 0b1111;
  const right = iped & 0b1111;
  // console.log(bitstr(left, 4), bitstr(right, 4));
  const fk1ed = fk(right, firstKey);
  // console.log('fk1ed', bitstr(fk1ed, 4));
  const right2 = fk1ed ^ left
  // console.log('right2', bitstr(right2, 4));
  const fk2ed = fk(right2, secondKey);
  // console.log('fk2ed', bitstr(fk2ed, 4));
  return rip(((right ^ fk2ed) << 4) + right2);
}

function ip(v) {
  return transpose(v, 8, [2,6,3,1,4,8,5,7]);
}

function rip(v) {
  return transpose(v, 8, [4,1,3,5,7,2,8,6]);
}

function fk(v, k) {
  // console.log('fk', bitstr(v, 4));
  const eped = ep(v);
  const xored = eped ^ k;
  // console.log('xored', bitstr(xored, 8));
  const upper = (xored >> 4) & 0b1111;
  const lower = xored & 0b1111;
  const s0ed = s0(upper);
  const s1ed = s1(lower);
  // console.log('s', bitstr(s0ed, 2), bitstr(s1ed, 2));
  return p4(s0ed, s1ed);
}

function ep(v) {
  return transpose(v, 4, [4,1,2,3,2,3,4,1]);
}

function s0(v) {
  // console.log((v >> 2) & 0b11, (v & 0b11));
  return [
    [1,0,3,2],
    [3,2,1,0],
    [0,2,1,3],
    [3,1,3,2]
  ][(v >> 2) & 0b11][(v & 0b11)];
}

function s1(v) {
  // console.log((v >> 2) & 0b11, (v & 0b11));
  return [
    [0,1,2,3],
    [2,0,1,3],
    [3,0,1,0],
    [2,1,0,3]
  ][(v >> 2) & 0b11][(v & 0b11)];
}

function p4(a, b) {
  return transpose((a << 2) + b, 4, [2,4,3,1]);
}
