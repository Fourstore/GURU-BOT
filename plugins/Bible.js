import fetch from 'node-fetch';
import { translate } from '@vitalets/google-translate-api';

const BASE_URL = 'https://bible-api.com';

let bibleChapterHandler = async (m, { conn }) => {
  try {
    // Extract the chapter number or name from the command text.
    let chapterInput = m.text.split(' ').slice(1).join('').trim();

    if (!chapterInput) {
      throw new Error(`Silakan tentukan nomor atau nama bab. Contoh: -bible john 3:16`);
    }

    // Encode the chapterInput to handle special characters
    chapterInput = encodeURIComponent(chapterInput);

    // Make an API request to fetch the chapter information.
    let chapterRes = await fetch(`${BASE_URL}/${chapterInput}`);
    
    if (!chapterRes.ok) {
      throw new Error(`Silakan tentukan nomor atau nama bab. Contoh: -bible john 3:16`);
    }

    let chapterData = await chapterRes.json();

    let translatedChapterHindi = await translate(chapterData.text, { to: 'hi', autoCorrect: true });

    let translatedChapterEnglish = await translate(chapterData.text, { to: 'en', autoCorrect: true });

    let bibleChapter = `
📖 *Alkitab*\n
📜 *Bab ${chapterData.reference}*\n
Type: ${chapterData.translation_name}\n
Jumlah ayat: ${chapterData.verses.length}\n
🔮 *Isi Bab (English):*\n
${translatedChapterEnglish.text}\n
🔮 *Isi Bab (Hindi):*\n
${translatedChapterHindi.text}`;

    m.reply(bibleChapter);
  } catch (error) {
    console.error(error);
    m.reply(`Error: ${error.message}`);
  }
};

bibleChapterHandler.help = ['bible [chapter_number|chapter_name]'];
bibleChapterHandler.tags = ['religion'];
bibleChapterHandler.command = ['bible', 'chapter'];

export default bibleChapterHandler;
