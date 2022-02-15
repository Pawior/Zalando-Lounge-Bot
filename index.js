const puppeteer = require("puppeteer");
// DLa przyszłych pokoleń
// W jaki sposób się loguje
// Puppeteer przy launchu ma parameter userDataDir i ładuje dane użytkownika z /user_data
// A wcześniej stworzyłem folder user_data i skopiowałem do niego pliki z chromium normalnego na którym zalogowałem się do lounge
// A jak się zalogowałem do lounge'a to lounge stworzył localstorage na podstawie którego odbywa się logowanie
// Ten localstorage jest tu najważniejszym plikiem który potrzebuje puppeteer przy starcie
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./user_data",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto("https://www.zalando-lounge.pl", {
    waitUntil: "networkidle0",
  });
  await page.waitForTimeout(12000);
  //   await page.evaluate(() => {
  //     location.reload(true);
  //   });

  //   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
  await page.screenshot({ path: "example.png" });

  await browser.close();
})();
