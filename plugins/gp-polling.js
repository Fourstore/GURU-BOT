let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    // Split the message text using the '|' character and slice the array to remove the first element.
    let a = text.split("|").slice(1)
    if (!a[1]) throw "Format\n" + usedPrefix + command + " halo |ya|tidak"
    if (a[12]) throw "Terlalu banyak pilihan, Format\n" + usedPrefix + command + " halo |ya|tidak"
    // Check for duplicate options in the poll.
    if (checkDuplicate(a)) throw "Opsi duplikat dalam pesan!"
    let cap = "*Permintaan Polling Oleh* " + m.name + "\n*Pesan:* " + text.split("|")[0]

   
    const pollMessage = {
        name: cap,
        values: a,
        multiselect: false,
        selectableCount: 1
    }
  
    await conn.sendMessage(m.chat, {
        poll: pollMessage
    })
}

handler.help = ["poll question|option|option"]
handler.tags = ["group"]
handler.command = /^po(l((l?ing|ls)|l)|ols?)$/i

export default handler

// Function to check for duplicate elements in an array.
function checkDuplicate(arr) {
    return new Set(arr).size !== arr.length
}
