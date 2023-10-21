//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw '✳️ Tandai penggunanya'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw '✳️ Masukkan jumlah *XP* yang ingin Anda add'
  if (isNaN(txt)) throw ' 🔢 hanya angka'
  let xp = parseInt(txt)
  let exp = xp
  
  if (exp < 1) throw '✳️ Mínimum *1*'
  let users = global.db.data.users
  users[who].exp += xp

  await m.reply(`≡ *XP ADDED*
┌──────────────
▢  *Total:* ${xp}
└──────────────`)
 conn.fakeReply(m.chat, `▢ Apakah kamu menerima \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['economy']
handler.command = ['addxp'] 
handler.rowner = true

export default handler

