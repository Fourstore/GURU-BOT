let handler = async (m, { conn, text }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw '✳️ tandai penggunanya'
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) throw '✳️ Masukkan jumlah *Emas* yang ingin Anda add'
    if (isNaN(txt)) throw '🔢 hanya angka'
    let dmt = parseInt(txt)
    let diamond = dmt
    
    if (diamond < 1) throw '✳️ Minimum  *1*'
    let users = global.db.data.users
   users[who].credit += dmt

    await m.reply(`≡ *Gold ADDED*
┌──────────────
▢ *Total:* ${dmt}
└──────────────`)
   conn.fakeReply(m.chat, `▢ Apakah kamu menerima \n\n *+${dmt}* Gold`, who, m.text)
}

handler.help = ['addgold <@user>']
handler.tags = ['economy']
handler.command = ['addgold'] 
handler.rowner = true

export default handler
