import { mkdirSync, readFileSync, writeFileSync } from 'fs';

const REPORT_ERR = (e) => {
  if(e) console.error(e.message);
};

export function mkdir(dir) {
  return mkdirSync(dir, REPORT_ERR);
}

export function read(file) {
  try {
    return readFileSync(file);
  } catch(e) {
    REPORT_ERR(e);
  }
}

export function write(dest, contents) {
  return writeFileSync(dest, contents);
}
