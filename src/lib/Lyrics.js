import axios from 'axios';

const ALSONG_URL = 'http://lyrics.alsong.co.kr/alsongwebservice/service1.asmx';

export const getLyrics = ({ artist, title }) => {
  const requestXML = `
<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://www.w3.org/2003/05/soap-envelope" xmlns:SOAP-ENC="http://www.w3.org/2003/05/soap-encoding" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ns2="ALSongWebServer/Service1Soap" xmlns:ns1="ALSongWebServer" xmlns:ns3="ALSongWebServer/Service1Soap12">
  <SOAP-ENV:Body>
    <ns1:GetResembleLyric2>
      <ns1:stQuery>
        <ns1:strTitle>${title}</ns1:strTitle>
        <ns1:strArtistName>${artist}</ns1:strArtistName>
        <ns1:nCurPage>0</ns1:nCurPage>
      </ns1:stQuery>
    </ns1:GetResembleLyric2>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
`.trim();
  return axios.post(ALSONG_URL, requestXML, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
};
