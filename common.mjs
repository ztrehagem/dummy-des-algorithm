export function transpose(v, n, t) {
  return bitjoin(...t.map(i => bitchoice(v, n, i)));
}

export function bitchoice(v, n, i) {
  return (v >> (n - i)) & 1;
}

export function bitjoin(...arr) {
  return arr.reduce((v, b) => (v << 1) + b);
}
