
let handler = async (m, { conn, args, text, usedPrefix, command }) => {
if (!text) throw `✳️ Masukkan nomor tujuan pengiriman undangan grup\n\n📌 Example :\n*${usedPrefix + command}*6283163784116`
if (text.includes('+')) throw  `Masukkan nomor tanpa *+*`
if (isNaN(text)) throw ' 📌 Masukkan angka saja tanpa kode negara tanpa spasi'
let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
 
      await conn.reply(text+'@s.whatsapp.net', `≡ *UNDANGAN KE GRUP*\n\nSeorang pengguna mengundang Anda untuk bergabung dengan grup ini \n\n${link}`, m, {mentions: [m.sender]})
        m.reply(`✅ Tautan undangan telah dikirim ke pengguna`) 

}
handler.help = ['invite <628xxx>']
handler.tags = ['group']
handler.command = ['invite','invitar'] 
handler.group = true
handler.admin = false
handler.botAdmin = true

export default handler
