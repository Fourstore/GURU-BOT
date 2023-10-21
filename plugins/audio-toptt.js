import { toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `✳️ Membalas audio yang ingin Anda ubah menjadi vn suara :\n *${usedPrefix + command}*`
    let media = await q.download?.()
    if (!media) throw '❎ Gagal mengunduh media'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw '❎ Terjadi kesalahan saat mengonversi'
    conn.sendFile(m.chat, audio.data, 'audio.mp3', '', m, true, { mimetype: 'audio/mp4' })
}
handler.help = ['toav']
handler.tags = ['fun']

handler.command = ['toav', 'tovn'] 

export default handler
