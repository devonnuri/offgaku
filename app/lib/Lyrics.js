// @flow

import axios from 'axios';
import * as _ from 'lodash';
import { parseXML } from './XMLParser';

const ALSONG_URL = 'http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx';

const parseLyrics = (lyrics: string) =>
  _.chain(lyrics.split('<br>'))
    .map(lyricLine => {
      const match = lyricLine.match(/\[([0-9]+):([0-9]+)\.([0-9]+)\]/);
      if (match && match.length === 4) {
        const minutes = Number(match[1]);
        const seconds = Number(match[2]);
        const milliseconds = Number(match[3]);

        const str = lyricLine.substring(match[0].length);
        if (!str) {
          return undefined;
        }

        return { time: minutes * 60 * 100 + seconds * 100 + milliseconds, str };
      }
      return undefined;
    })
    .groupBy('time')
    .toArray()
    .value();

export const getLyrics = ({
  artist,
  title,
  hash
}: {
  artist?: string,
  title?: string,
  hash?: string
}) => {
  let requestXML;
  if (artist && title) {
    requestXML = `
<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">
  <Body>
    <GetResembleLyric2 xmlns="ALSongWebServer">
      <stQuery>
        <strTitle>${title}</strTitle>
        <strArtistName>${artist}</strArtistName>
      </stQuery>
    </GetResembleLyric2>
  </Body>
</Envelope>
    `.trim();
  } else if (hash) {
    requestXML = `
<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">
  <Body>
    <GetLyric5 xmlns="ALSongWebServer">
      <stQuery>
        <strChecksum>${hash}</strChecksum>
      </stQuery>
    </GetLyric5>
  </Body>
</Envelope>
    `.trim();

    console.log(requestXML);
  } else {
    throw new Error('Should have artist, title or only hash in parameter.');
  }

  return axios
    .post(ALSONG_URL, requestXML, {
      headers: {
        'Content-Type': 'text/xml'
      }
    })
    .then(response => parseXML(response.data))
    .then(
      data =>
        data['soap:Envelope']['soap:Body'][0].GetResembleLyric2Response[0]
          .GetResembleLyric2Result[0].ST_GET_RESEMBLELYRIC2_RETURN
    )
    .then(
      lyricsSet =>
        lyricsSet.sort((a, b) => b.strLyric.length - a.strLyric.length)[0]
          .strLyric[0]
    )
    .then(lyrics => parseLyrics(lyrics))
    .catch(() => [[{ time: 0, str: '싱크 가사가 없습니다.' }]]);
};
