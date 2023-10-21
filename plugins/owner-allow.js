let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who
        if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
        else who = m.chat
        let user = global.db.data.users[who]
        if (!who) throw `✳️ Tandai atau sebutkan seseorang\n\n📌 Contoh : ${usedPrefix + command} @user`
    if (global.allowed.includes(who.split`@`[0])) throw 'Pengguna yang disebutkan sudah diperbolehkan menggunakan bot di DM '
    global.allowed.push(`${who.split`@`[0]}`)
    
    conn.reply(m.chat, ` @${who.split`@`[0]} mendapat izin pamungkas untuk menggunakan bot di DM`, m, { mentions: [who] })
    
    }
    handler.help = ['allow <@tag>']
    handler.tags = ['owner']
    handler.command = ['allow', 'makeallow', 'al'] 
    
    handler.group = true
    handler.rowner = true
    
    export default handler
