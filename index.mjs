import Converter from './converter';
import { bitstr } from './utils';

const origin = 0b10110110;
console.log(bitstr(origin, 8), 'origin');

const converter = new Converter(0b1000110001);

const encrypted = converter.encrypt(origin);
console.log(bitstr(encrypted, 8), 'encrypted');

const decrypted = converter.decrypt(encrypted);
console.log(bitstr(decrypted, 8), 'decrypted');
