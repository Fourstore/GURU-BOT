let handler = async (m, { conn, command, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]


   
    
    if (user.chicken > 0) return m.reply('Kamu sudah memiliki ini')
    if (user.credit < 500) return m.reply(`🟥 *Anda tidak memiliki jumlah emas yang cukup di dompet Anda untuk membeli ayam*`)

    user.credit -= 1000
    user.chicken += 1
    m.reply(`🎉 Anda telah berhasil membeli ayam untuk diadu! Gunakan perintah ${usedPrefix}cock-fight <amount>`)
}

handler.help = ['buych']
handler.tags = ['economy']
handler.command = ['buy-chicken', 'buych'] 

handler.group = true

export default handler