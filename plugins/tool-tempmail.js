//thanks to inrl:https://github.com/inrl-official
import fetch from 'node-fetch';

let handler = async (m, { text, usedPrefix, command }) => {
  if (command === 'tempmail') {
    try {
      const response = await fetch('https://inrl-web.onrender.com/api/getmail?apikey=inrl');
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const tempMails = data.result.join('\n');
        const replyMessage = `*Alamat Email Sementara:*\n\n${tempMails}\n\n menggunakan \`\`\`\.checkmail <mail-address>\`\`\`\ jika Anda ingin memeriksa kotak masuk email sementara yang digunakan dari atas`;
        m.reply(replyMessage);
      } else {
        m.reply('Tidak ditemukan alamat email sementara.');
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply('Gagal mengambil alamat email sementara.');
    }
  } else if (command === 'checkmail') {
    if (!text && !(m.quoted && m.quoted.text)) {
      m.reply('Harap berikan beberapa teks atau kutipan pesan untuk mendapatkan tanggapan.');
      return;
    }

    if (!text && m.quoted && m.quoted.text) {
      text = m.quoted.text;
    } else if (text && m.quoted && m.quoted.text) {
      text = `${text} ${m.quoted.text}`;
    }

    try {
      const response = await fetch(`https://inrl-web.onrender.com/api/getmailinfo?email=${encodeURIComponent(text)}&apikey=inrl`);
      const data = await response.json();

      if (data.status && data.result && data.result.length > 0) {
        const messages = data.result.map((message) => {
          return `
*From:* ${message.from}
*Subject:* ${message.subject}
*Date:* ${message.date}
*Body:*
${message.text}
          `;
        }).join('\n\n---\n\n');
        const replyMessage = `*Pesan in* ${text}:\n\n${messages}`;
        m.reply(replyMessage);
      } else {
        m.reply(`Tidak ada pesan yang ditemukan di ${text}.`);
      }
    } catch (error) {
      console.error('Error:', error);
      m.reply(`Gagal memeriksa pesan masuk ${text}.`);
    }
  }
};
handler.help = ['tempmail']
handler.tags = ['tools']
handler.command = ['tempmail', 'checkmail'];
handler.diamond = false;

export default handler;
