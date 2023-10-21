
let handler  = async (m, { conn, args, text }) => {
if (!text) throw `*MASUKKAN NAMA YANG ANDA INGINKAN JADI NAMA GRUP BARU*`
try {
let text = args.join` `
if(!args || !args[0]) {
} else {
conn.groupUpdateSubject(m.chat, text)}
} catch (e) {
throw '*MAAF ADA KESALAHAN, NAMA TIDAK BOLEH LEBIH DARI 25 KARAKTER*'
}}
handler.help = ['setname <text>']
handler.tags = ['group']
handler.command = /^(setname)$/i
handler.group = true
handler.admin = true
export default handler