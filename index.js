const puppeteer = require("puppeteer");
// DLa przyszłych pokoleń
// W jaki sposób się loguje
// Puppeteer przy launchu ma parameter userDataDir i ładuje dane użytkownika z /user_data
// A wcześniej stworzyłem folder user_data i skopiowałem do niego pliki z chromium normalnego na którym zalogowałem się do lounge
// A jak się zalogowałem do lounge'a to lounge stworzył localstorage na podstawie którego odbywa się logowanie
// Ten localstorage jest tu najważniejszym plikiem który potrzebuje puppeteer przy starcie
const campaign = "ZZO1MU8";
let productsArr;
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
  await page.goto(`https://www.zalando-lounge.pl/campaigns/${campaign}`, {
    waitUntil: "networkidle0",
  });

  //   await page.evaluate(() => {
  //     location.reload(true);
  //   });

  //   await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

  // let productsArr = document.querySelectorAll("vMpOO");

  // //   console.log(productsArr);
  // await page.screenshot({ path: "example.png" });
  // for (let i = 0; i < 5; i++) {
  //   // await Promise.all([page.waitForNavigation(), page.click(productsArr[i])]);
  //   // await page.goBack();
  //   console.log(i);
  //   console.log(campaign);
  //   // await productsArr[i].click();
  //   // await page.$eval(selectorString, elem => (elem as HTMLElement).click());
  //   // await Promise.all([page.click(productsArr[i]), page.waitForNavigation()]);
  //   await productsArr[i].click();
  //   console.log("xd");
  //   await page.waitForTimeout(1500);
  //   console.log("no i cyh");
  //   // await page.waitForTimeout(500);
  //   await page.goBack();
  // }

  //   await page.$$eval(".vMpOO", (elHandles) =>
  //     elHandles.forEach((el) => {
  //       el.click();
  //       page.waitForNavigation();
  //       page.waitForTimeout(1500);
  //       page.goBack();
  //     })
  //   );

  let productsArr = await page.$$(".vMpOO");

  console.log(productsArr);
  for (let i = 0; i < 20; i++) {
    await productsArr[i].click();
    // await page.waitForTimeout(1500);
    await page.waitForSelector(".jIVZOs");
    let aElementsWithHi = await page.$x("//span[contains(., 'M')]");
    await aElementsWithHi[0].click();
    // await page.click(".jIVZOs");
    let aElementsWithKoszyk = await page.$x(
      "//span[contains(., 'Do koszyka')]"
    );
    await aElementsWithKoszyk[0].click();
    await page.goBack();
    productsArr = await page.$$(".vMpOO");
    // Po wejsciu rozmiar - ten button class który nie jest disabled
    // 2 opcja: click jIVZOs
  }
  await browser.close();
})();
