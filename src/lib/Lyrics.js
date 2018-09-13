import axios from 'axios';
import * as _ from 'lodash';
import { parseXML } from './XMLParser';

const ALSONG_URL = 'http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx';

const parseLyrics = lyrics => _.chain(lyrics.split('<br>'))
  .map((lyricLine) => {
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

export const getLyrics = ({ artist, title }) => {
  const requestXML = `
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns2="ALSongWebServer/Service1Soap" xmlns:ns1="ALSongWebServer" xmlns:ns3="ALSongWebServer/Service1Soap12">
  <SOAP-ENV:Body>
    <ns1:GetResembleLyric2>
      <ns1:stQuery>
        <ns1:strTitle>${title}</ns1:strTitle>
        <ns1:strArtistName>${artist}</ns1:strArtistName>
      </ns1:stQuery>
    </ns1:GetResembleLyric2>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
`.trim();

  return axios
    .post(ALSONG_URL, requestXML, {
      headers: {
        'Content-Type': 'text/xml',
      },
    })
    .then(response => parseXML(response.data))
    .then(
      data => data['soap:Envelope']['soap:Body'][0].GetResembleLyric2Response[0]
        .GetResembleLyric2Result[0].ST_GET_RESEMBLELYRIC2_RETURN,
    )
    .then(
      lyricsSet => lyricsSet.sort((a, b) => b.strLyric.length - a.strLyric.length)[0].strLyric[0],
    )
    .then(lyrics => parseLyrics(lyrics));
};
