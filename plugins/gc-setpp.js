
let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/.test(mime)) {
    let img = await q.download()
    if (!img) throw '*REPLY PESAN GAMBAR.*'
    await conn.updateProfilePicture(m.chat, img).then(_ => m.reply('GAMBAR BERHASIL SET SEBAGAI PP._*'))
    } else throw '*REPLY PESAN GAMBAR.*'}
    handler.command = /^setpp(group|grup|gc)?$/i
    handler.group = true
    handler.admin = true
    handler.botAdmin = true
    export default handler
