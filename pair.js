const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { default: makeWASocket, useMultiFileAuthState, delay, Browsers, makeCacheableSignalKeyStore, DisconnectReason } = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function GIFTED_MD_PAIR_CODE() {
        // Galti yahan thi (./temp/' + id)
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });

            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;
                
                if (connection === "open") {
                    await delay(5000);
                    // Galti yahan bhi thi ('/temp/' + id)
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    try {
                        // Read the creds.json file
                        const sessionData = fs.readFileSync(rf, 'utf-8');
                        // Encode the session data to Base64
                        const base64Encoded = Buffer.from(sessionData).toString('base64');
                        // Add the prefix
                        const prefixedSession = "ARSLAN-MD~" + base64Encoded;
                        
                        // Send the prefixed Base64 session string to the user
                        let message = `*✅ APKA BASE64 SESSION ID TAYAR HAI ✅*\n\nNeechay diye gaye code ko copy karke apne bot ke SESSION_ID mein paste kar dein.\n\n*Developer: ADEEL MD*`;
                        await sock.sendMessage(sock.user.id, { text: message });
                        await sock.sendMessage(sock.user.id, { text: prefixedSession });

                        let desc = `* ♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟
      ⚡️ 𝐀𝐑𝐒𝐋𝐀𝐍-𝐌𝐃 𝐀𝐂𝐓𝐈𝐕𝐀𝐓𝐄𝐃 ⚡️
♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟🟢♛⃟

✦◈━━━━━━━━━◆━━━━━━━━━◈✦

╔☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╗
     📢 𝐎𝐅𝐅𝐈𝐂𝐈𝐀𝐋 𝐂𝐇𝐀𝐍𝐍𝐄𝐋
╚☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╝
🌐 𝐋𝐢𝐧𝐤: *~_https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306_~*

✦◈━━━━━━━━━◆━━━━━━━━━◈✦

╔☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╗
        👑 𝐎𝐖𝐍𝐄𝐑
╚☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╝
📞 𝐋𝐢𝐧𝐤: *~_https://wa.me/message/VRZ5QLDAHXKSF1_~*

✦◈━━━━━━━━━◆━━━━━━━━━◈✦

╔☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╗
       ⭐ 𝐆𝐈𝐓𝐇𝐔𝐁 𝐑𝐄𝐏𝐎
╚☆═⋆✪⋆═⋆✪⋆═⋆✪⋆═⋆✪⋆═☆╝
💻 𝐋𝐢𝐧𝐤: *~_https://github.com/Arslan-MD/Arslan_MD_~*

✦◈━━━━━━━━━◆━━━━━━━━━◈✦

> ⚡ *Status:* _ONLINE & READY_ 🤖  
> 🕶 *Mode:* _AUTO + STABLE CONNECTION_  
> 💎 *Powered By:* _A R S L A N - M D_ ⚡  
> 💙 *Developed with ❤️ by ArslanMD Official*

◈◈◈▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣◈◈◈
   💚 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘: 𝐀𝐑𝐒𝐋𝐀𝐍-𝐌𝐃 💚
◈◈◈▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣◈◈◈*`; 
                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: "ARSLAN-MD👨🏻‍💻",
                                    thumbnailUrl: "https://o.uguu.se/upYMvwrT.jpg",
                                    sourceUrl: "https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306",
                                    mediaType: 1,
                                    renderLargerThumbnail: true
                                }  
                            }
                        });
                        await sock.newsletterFollow("120363348739987203@newsletter");
                        
                    } catch (e) {
                        console.error("Session banane mein galti hui:", e);
                        await sock.sendMessage(sock.user.id, { text: "❌ Session banane mein koi error aagaya." });
                    }

                    await delay(1000);
                    await sock.ws.close();
                    // Galti yahan bhi thi ('./temp/' + id)
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶נג 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            // Galti yahan bhi thi ('./temp/' + id)
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    return await GIFTED_MD_PAIR_CODE();
});

module.exports = router;
