export function bitstr(v, n) {
  return v.toString(2).padStart(n, 0);
}
