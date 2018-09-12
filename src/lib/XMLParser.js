import { parseString } from 'xml2js';

export const parseXML = xml => new Promise((resolve, reject) => {
  parseString(xml, (error, result) => {
    if (error) reject(error);
    resolve(result);
  });
});
