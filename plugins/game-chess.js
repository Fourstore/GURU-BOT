import { Chess } from 'chess.js';

const handler = async (m, { conn, args }) => {
  const key = m.chat;
  conn.chess = conn.chess || {};
  let chessData = conn.chess[key] || {
    gameData: null,
    fen: null,
    currentTurn: null,
    players: [],
    hasJoined: []
  };
  conn.chess[key] = chessData;
  const { gameData, fen, currentTurn, players, hasJoined } = chessData;
  const feature = args[0]?.toLowerCase();

  if (feature === 'delete') {
    delete conn.chess[key];
    return conn.reply(m.chat, '🏳️ *Permainan catur dihentikan.*', m);
  }

  if (feature === 'create') {
    if (gameData) {
      return conn.reply(m.chat, '⚠️ *Permainan sedang berlangsung.*', m);
    }
    chessData.gameData = { status: 'menunggu', black: null, white: null };
    return conn.reply(m.chat, '🎮 *Permainan catur dimulai.*\nMenunggu pemain lain bergabung.', m);
  }

  if (feature === 'join') {
    const senderId = m.sender;
    if (players.includes(senderId)) {
      return conn.reply(m.chat, '🙅‍♂️ *Anda telah bergabung dalam permainan ini.*', m);
    }
    if (!gameData || gameData.status !== 'menunggu') {
      return conn.reply(m.chat, '⚠️ *Tidak ada permainan catur yang menunggu pemain.*', m);
    }
    if (players.length >= 2) {
      return conn.reply(m.chat, '👥 *Pemain sudah cukup.*\nPermainan akan dimulai secara otomatis.', m);
    }
    players.push(senderId);
    hasJoined.push(senderId);
    if (players.length === 2) {
      gameData.status = 'ready';
      const [black, white] = Math.random() < 0.5 ? [players[1], players[0]] : [players[0], players[1]];
      gameData.black = black;
      gameData.white = white;
      chessData.currentTurn = white;
      return conn.reply(m.chat, `🙌 *Pemain yang telah bergabung:*\n${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}\n\n*Black:* @${black.split('@')[0]}\n*White:* @${white.split('@')[0]}\n\nPlease use *'catur dimulai'* to begin the game.`, m, { mentions: hasJoined });
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m);
    }
  }

  if (feature === 'start') {
    if (gameData.status !== 'ready') {
      return conn.reply(m.chat, '⚠️ *Tidak dapat memulai permainan. Tunggu hingga dua pemain bergabung.*', m);
    }
    gameData.status = 'playing';
    const senderId = m.sender;
    if (players.length === 2) {
      const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      chessData.fen = fen;
      const encodedFen = encodeURIComponent(fen);
      const turn = `🎲 *Turn:* White @${gameData.white.split('@')[0]}`;
      const flipParam = senderId === gameData.black ? '' : '&flip=true';
      const flipParam2 = senderId === gameData.black ? '' : '-flip';
      const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
      try {
        await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [gameData.white] });
      } catch (error) {
        const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
        await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [gameData.black] });
      }
      return;
    } else {
      return conn.reply(m.chat, '🙋‍♂️ *Anda telah bergabung dalam permainan catur.*\nMenunggu pemain lain untuk bergabung.', m);
    }
  }

  if (args[0] && args[1]) {
    const senderId = m.sender;
    if (!gameData || gameData.status !== 'playing') {
      return conn.reply(m.chat, '⚠️ *Permainan belum dimulai.*', m);
    }
    if (currentTurn !== senderId) {
      return conn.reply(m.chat, `⏳ *Saat ini ${chessData.currentTurn === gameData.white ? 'White' : 'Black'}'giliran untuk bergerak.*`, m, {
        contextInfo: {
          mentionedJid: [currentTurn]
        }
      });
    }
    const chess = new Chess(fen);
    if (chess.isCheckmate()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *Permainan Skakmat.*\n🏳️ *Permainan catur dihentikan.*\n*Pemenang:* @${m.sender.split('@')[0]}`, m, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      });
    }
    if (chess.isDraw()) {
      delete conn.chess[key];
      return conn.reply(m.chat, `⚠️ *Game Draw.*\n🏳️ *Permainan catur dihentikan.*\n*Pemain:* ${hasJoined.map(playerId => `- @${playerId.split('@')[0]}`).join('\n')}`, m, {
        contextInfo: {
          mentionedJid: hasJoined
        }
      });
    }
    const [from, to] = args;
    try {
      chess.move({ from, to, promotion: 'q' });
    } catch (e) {
      return conn.reply(m.chat, '❌ *Invalid move.*', m);
    }
    chessData.fen = chess.fen();
    const currentTurnIndex = players.indexOf(currentTurn);
    const nextTurnIndex = (currentTurnIndex + 1) % 2;
    chessData.currentTurn = players[nextTurnIndex];
    const encodedFen = encodeURIComponent(chess.fen());
    const currentColor = chessData.currentTurn === gameData.white ? 'White' : 'Black';
    const turn = `🎲 *Turn:* ${currentColor} @${chessData.currentTurn.split('@')[0]}\n\n${chess.getComment() || ''}`;
    const flipParam = senderId === gameData.black ? '' : '&flip=true';
    const flipParam2 = senderId === gameData.black ? '' : '-flip';
    const boardUrl = `https://www.chess.com/dynboard?fen=${encodedFen}&board=graffiti&piece=graffiti&size=3&coordinates=inside${flipParam}`;
    try {
      await conn.sendFile(m.chat, boardUrl, '', turn, m, false, { mentions: [chessData.currentTurn] });
    } catch (error) {
      const boardUrl2 = `https://chessboardimage.com/${encodedFen + flipParam2}.png`;
      await conn.sendFile(m.chat, boardUrl2, '', turn, m, false, { mentions: [chessData.currentTurn] });
    }
    chess.deleteComment();
    return;
  }

  if (feature === 'help') {
    return conn.reply(m.chat, `
      🌟 *Perintah Permainan Catur:*

*buat catur* - Mulai permainan catur
*ikut catur* - berakhir dengan permainan catur yang menunggu
*catur dimulai* - Mulailah permainan catur jika sudah ada dua pemain yang bergabung
*hapus catur*

*Contoh:*
Ketik *buat catur* untuk memulai permainan catur.
Ketik *gabung catur* untuk bergabung dalam permainan catur yang menunggu.
    `, m);
  }
  return conn.reply(m.chat, '❓ Perintah tidak valid. Gunakan *"bantuan catur"* untuk melihat perintah yang tersedia.', m);
};

handler.help = ['chess [create]', 'chess delete', 'chess join', 'chess start'];
handler.tags = ['game'];
handler.command = /^(chess|chatur)$/i;

export default handler;
