export async function all(m) {
	
  // when someone sends a group link to the bot's dm
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('open this link')) && !m.isBaileys && !m.isGroup) {
       this.sendMessage(m.chat,{text:`Hello @${m.sender.split('@')[0]}\nAnda dapat menyewa bot untuk bergabung dengan grup\n\n_Untuk info lebih lanjut bisa DM owner_\n*Jenis* \`\`\`.owner\`\`\` *untuk menghubungi owner*`.trim()}, {quoted:m});
   /*this.sendButton(m.chat, `*Invite bot to a group*      
    Hallo @${m.sender.split('@')[0]} 
    you can rent the bot to join a group or contact owner 
    more info click on the button
  `.trim(), igfg, null, [['Rent', '/buyprem']] , m, { mentions: [m.sender] })*/
   m.react('💎')
} 

 return !0
}