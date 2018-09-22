// @flow

import { readFile } from 'await-file';
import { createHash } from 'crypto';
import NodeID3 from 'node-id3';

const checksum = async (filename: string): Promise<string> =>
  readFile(filename)
    .then(data => {
      const buffer = NodeID3.removeTagsFromBuffer(data);

      return createHash('md5')
        .update(buffer.slice(0, 0x28000))
        .digest('hex');
    })
    .catch(error => {
      throw error;
    });

export default checksum;
