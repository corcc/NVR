import path from 'path';
import {writeScripts } from '@taccl/package';
const scripts = writeScripts(path.join(__dirname.replace(process.cwd(), ''), 'Config'));
console.log('scripts:');
console.log(scripts);
