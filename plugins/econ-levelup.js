import { canLevelUp, xpRange } from '../lib/levelling.js';

let handler = async (m, { conn }) => {
    let name = conn.getName(m.sender);
    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.imgur.com/whjlJSf.jpg');
    let user = global.db.data.users[m.sender];
    let background = 'https://i.ibb.co/4YBNyvP/images-76.jpg'; // Fixed background URL

    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier);
        let txt = `
┌───⊷ *LEVEL*
▢ Number : *${name}*
▢ Level : *${user.level}*
▢ XP : *${user.exp - min}/${xp}*
▢ Role : *${user.role}*
└──────────────

Hai, ${name}! Anda belum siap untuk naik level. Sepertinya Anda perlu mengunyah *${max - user.exp}* lebih banyak XP untuk naik level dan mencapai ketinggian baru! Teruskan, dan bot akan segera memuji Anda! 🚀
`.trim();

        try {
            let imgg = `https://wecomeapi.onrender.com/rankup-image?username=${encodeURIComponent(name)}&currxp=${user.exp - min}&needxp=${xp}&level=${user.level}&rank=${encodeURIComponent(pp)}&avatar=${encodeURIComponent(pp)}&background=${encodeURIComponent(background)}`;
            conn.sendFile(m.chat, imgg, 'level.jpg', txt, m);
        } catch (e) {
            m.reply(txt);
        }
    } else {
        let str = `
┌─⊷ *LEVEL UP*
▢ Previous level : *${user.level - 1}*
▢ Current level : *${user.level}*
▢ Role : *${user.role}*
└──────────────

Woo hoo, ${name}! YAnda telah melonjak ke ketinggian baru dan mencapai level ${user.level}! 🎉 Saatnya merayakan! 🎊
Kekuatan baru Anda akan menimbulkan ketakutan di hati para troll, dan bot akan tunduk pada perintah Anda! Pertahankan kerja luar biasa ini, dan siapa yang tahu petualangan epik apa yang menanti Anda🌟
`.trim();

        try {
            let img = `https://wecomeapi.onrender.com/levelup-image?avatar=${encodeURIComponent(pp)}`;
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
        } catch (e) {
            m.reply(str);
        }
    }
}

handler.help = ['levelup'];
handler.tags = ['economy'];
handler.command = ['lvl', 'levelup', 'level'];

export default handler
