import fetch from 'node-fetch'; 
import spotifydl from '../lib/spotify.js';
let handler = async (m, { conn, text }) => {
    if (!text) {
        console.log('Tidak ada nama lagu yang disediakan.'); 
        throw `*Silakan masukkan nama lagu*`;
    }

    try {
        
        
        const apiUrl = `https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkeysapi}&query=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.log('Kesalahan mencari lagu:', response.statusText);
            throw 'Kesalahan saat mencari lagu';
        }

        const data = await response.json();

        if (!data.result || data.result.length === 0) {
            console.log('Hasil pencarian untuk lagu tidak ditemukan:', text);
            throw 'Tidak ditemukan hasil pencarian untuk lagu tersebut';
        }

        
        const firstResult = data.result[0];

        
        const songLink = firstResult.link;

       
        const { data: spotifyData, coverimage, audio } = await spotifydl(songLink);

        if (!spotifyData || !coverimage || !audio) {
            console.log('Data Spotify yang diterima tidak valid:', spotifyData); 
            throw 'Data Spotify yang diterima tidak valid';
        }

        const { name, artists, album_name, link } = spotifyData;

        const spotifyi = `🎵 Now Playing\n⊱ ──── {♪} ──── ⊰\n🎶 *Title:* ${name}\n🎤 *Artist(s):* ${artists.join(', ')}\n💿 *Album:* ${album_name}\n🌐 *URL:* ${songLink}
        `;
        

        
        conn.sendFile(m.chat, audio, `${name}.mp3`, spotifyi, m);

        
        conn.sendFile(m.chat, coverimage, 'spotify_cover.jpg', spotifyi, m);
    } catch (error) {
        console.error('Kesalahan saat mengambil data Spotify:', error); 
        throw '*Error*';
    }
};

handler.help = ['spotify']
handler.tags = ['downloader']
handler.command = /^(spotify|song)$/i;
export default handler;
