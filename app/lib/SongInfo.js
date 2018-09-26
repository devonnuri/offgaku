import axios from 'axios';
import * as _ from 'lodash';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import { parseXML } from './XMLParser';

const ALSONG_URL = 'http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx';

const kuroshiro = new Kuroshiro();

kuroshiro.init(new KuromojiAnalyzer());

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

        return {
          time: minutes * 60 * 100 + seconds * 100 + milliseconds,
          str
        };
      }
      return undefined;
    })
    .filter(lyricLine => lyricLine)
    .groupBy('time')
    .toArray()
    .value();

const applyFurigana = async (
  lyrics: Array<Array<{ time: number, str: string }>>
): Promise<any> => {
  const result = [];
  for (const lines of lyrics) {
    const resultLines = [];
    for (const { time, str } of lines) {
      let resultStr = str;
      if (Kuroshiro.Util.hasJapanese(str)) {
        resultStr = await kuroshiro.convert(str, {
          mode: 'furigana'
        });
      }
      resultLines.push({ time, str: resultStr });
    }
    result.push(resultLines);
  }

  return result;
};

export const getInfo = ({
  artist,
  title,
  hash
}: {
  artist?: string,
  title?: string,
  hash?: string
}): Promise<{
  title: string,
  artist: string,
  album: string,
  lyrics: Array<Array<{ time: number, str: string }>>
}> => {
  let requestXML;
  if (hash) {
    requestXML = `
<?xml version="1.0" encoding="UTF-8"?>
<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">
  <Body>
    <GetLyric5 xmlns="ALSongWebServer">
      <stQuery>
        <strChecksum>${hash}</strChecksum>
        <strVersion/>
        <strMACAddress/>
        <strIPAddress/>
      </stQuery>
    </GetLyric5>
  </Body>
</Envelope>
    `.trim();
  } else if (artist && title) {
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
    .then(data => {
      const body = data['soap:Envelope']['soap:Body'][0];

      let result;

      if (body.GetLyric5Response) {
        result = body.GetLyric5Response[0].GetLyric5Result[0];
      } else {
        result = body.GetResembleLyric2Response[0].GetResembleLyric2Result[0].ST_GET_RESEMBLELYRIC2_RETURN.sort(
          (a, b) => b.strLyric.length - a.strLyric.length
        )[0];
      }

      return {
        title: result.strTitle[0],
        artist: result.strArtist[0],
        album: result.strAlbum[0],
        lyrics: parseLyrics(result.strLyric[0])
      };
    })
    .catch(() => ({
      title: 'Offgaku',
      artist: '',
      album: '',
      lyrics: [[{ time: 0, str: '싱크 가사가 없습니다.' }]]
    }))
    .then(async result => {
      const lyrics = await applyFurigana(result.lyrics);
      return { ...result, lyrics };
    });
};
