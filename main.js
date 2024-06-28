const TelegramBot = require("node-telegram-bot-api");
const token = "7483576081:AAFiLyYFfGw3fpyAkIl9GYnBDxhK11R0WX8";
const options = {
  polling: true,
};

const botKleefi = new TelegramBot(token, options);

const prefix = ".";
const sayHi = new RegExp(`^${prefix}halo$`);
const gempa = new RegExp(`^${prefix}gempa$`);

botKleefi.onText(sayHi, (callback) => {
  botKleefi.sendMessage(callback.from.id, "halo juga");
});

botKleefi.onText(gempa, async (callback) => {
  const infoBMKG = "https://data.bmkg.go.id/DataMKG/TEWS/";

  const apiCall = await fetch(infoBMKG + "autogempa.json");
  const {
    Infogempa: {
      gempa: { Tanggal, Jam, Wilayah, Shakemap },
    },
  } = await apiCall.json();

  const bmkgImg = infoBMKG + Shakemap;
  console.log(bmkgImg);
  const resultText = `
Tanggal ${Tanggal}, jam ${Jam}
Wilayah ${Wilayah}
  `;

  //   botKleefi.sendMessage(callback.from.id, resultText);
  botKleefi.sendPhoto(callback.from.id, bmkgImg, {
    caption: resultText,
  });
});
