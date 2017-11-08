import Converter from './lib/converter';
import { bitstr } from './lib/utils';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (str) => new Promise(res => rl.question(str, res));

(async () => {
  const key = await question('key [0-1024] > ');
  const str = await question('str > ');
  rl.close();
  const converter = new Converter(parseInt(key));
  const strarr = str.split('');
  const bytearr = strarr.map(c => c.charCodeAt(0));
  const encarr = bytearr.map(b => converter.encrypt(b));
  const encstr = String.fromCharCode(...encarr);
  console.log('--- encrypted ---');
  console.log(encarr);
  console.log(encstr);
  const decbytearr = encstr.split('').map(c => c.charCodeAt(0)).map(b => converter.decrypt(b));
  const decstr = String.fromCharCode(...decbytearr);
  console.log('--- decrypted ---');
  console.log(decbytearr);
  console.log(decstr);
})();
