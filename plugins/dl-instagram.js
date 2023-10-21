import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
  if (!text) throw `LINK?`;
  m.reply(wait);

  let res;
  try {
    res = await fetch(`https://inrl-web.onrender.com/api/insta?url=${text}`);
  } catch (error) {
    throw `Terjadi kesalahan: ${error.message}`;
  }

  let api_response = await res.json();
  if (!api_response || !api_response.result || api_response.result.length === 0) {
    throw `Tidak ada video yang ditemukan atau tanggapan tidak valid dari API.`;
  }

  let cap = `INI VIDEO NYA SAYANG >,<`;

  conn.sendFile(m.chat, api_response.result[0], 'instagram.mp4', cap, m);
}

handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(instagram|igdl|ig|instagramdl)$/i

export default handler
