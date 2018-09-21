import fs from 'fs';
import { createHash } from 'crypto';

const BUFFER_SIZE = 0x28000;

const checksum = filename => {
  const fd = fs.openSync(filename, 'r');
  const hash = createHash('md5');
  const buffer = Buffer.alloc(BUFFER_SIZE);

  try {
    let bytesRead;

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE);
      hash.update(buffer.slice(0, bytesRead));
    } while (bytesRead === BUFFER_SIZE);
  } finally {
    fs.closeSync(fd);
  }

  return hash.digest('hex');
};

export default checksum;
