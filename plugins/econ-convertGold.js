
const xppercredit = 350 
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^buy/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xppercredit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].exp >= xppercredit * count) {
    global.db.data.users[m.sender].exp -= xppercredit * count
    global.db.data.users[m.sender].credit += count
    conn.reply(m.chat, `
┌─「 *PAYMENT NOTE* 」
‣ *Nominal purchase* : + ${count} 
‣ *Spent* : -${xppercredit * count} XP
└──────────────`, m)
  } else conn.reply(m.chat, `❎ Maaf, Anda tidak mempunyai cukup *XP* untuk membeli *${count}* Gold\n\n Anda bisa mendapatkan *XP* menggunakan perintah dari *menu permainan dan ekonomi*`, m)
}
handler.help = ['buy', 'buyall']
handler.tags = ['economy']
handler.command = ['buy', 'buyall'] 

handler.disabled = false

export default handler
