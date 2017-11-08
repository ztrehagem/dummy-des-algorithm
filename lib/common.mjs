export function transpose(v, n, t) {
  return bitjoin(...t.map(i => bitchoice(v, n, i)));
}

export function rotate(v, n, m) {
  const transarr = new Array(n).fill(0).map((v, i) => (i + m) % n + 1);
  return transpose(v, n, transarr);
}

export function bitchoice(v, n, i) {
  return (v >> (n - i)) & 1;
}

export function bitjoin(...arr) {
  return arr.reduce((v, b) => (v << 1) + b);
}
