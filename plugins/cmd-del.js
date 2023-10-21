//import db from '../lib/database.js'

let handler = async (m, { text }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = m.quoted.fileSha256.toString('hex')
    if (!hash) throw `✳️ Masukkan nama perintah`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw `✳️ Anda tidak dapat menghapus perintah ini`
    delete sticker[hash]
    m.reply(`✅ Perintah dihilangkan`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <text>')
handler.tags = ['cmd']
handler.command = ['delcmd']
handler.owner = true

export default handler
