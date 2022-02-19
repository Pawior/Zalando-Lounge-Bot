const puppeteer = require("puppeteer");
// DLa przyszłych pokoleń
// W jaki sposób się loguje
// Puppeteer przy launchu ma parameter userDataDir i ładuje dane użytkownika z /user_data
// A wcześniej stworzyłem folder user_data i skopiowałem do niego pliki z chromium normalnego na którym zalogowałem się do lounge
// A jak się zalogowałem do lounge'a to lounge stworzył localstorage na podstawie którego odbywa się logowanie
// Ten localstorage jest tu najważniejszym plikiem który potrzebuje puppeteer przy starcie
const campaign = "ZZO1MYN";
let productsArr;
(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
    userDataDir: "./user_Data",
  });
  // const client = await page.target().createCDPSession();
  // await client.send('Network.clearBrowserCookies');
  // await client.send('Network.clearBrowserCache');
  const page = await browser.newPage();
  // const context = await browser.createIncognitoBrowserContext();
  // const page = await context.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.goto(`https://www.zalando-lounge.pl/campaigns/${campaign}`)
  // await page.waitForNavigation({
  //   waitUntil: 'networkidle0'
  // });
  // await page.goto(`https://www.zalando-lounge.pl/campaigns/${campaign}`, {
  //   waitUntil: "networkidle0",
  // });
  // await page.waitForTimeout(2000)

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

  // console.log(productsArr);
  for (let i = 6; i < 20; i++) {
    await productsArr[i].click();
    // await page.waitForTimeout(1500);
    await page.waitForSelector(".jIVZOs");
    // let aElementsWithHi;
    // let mSizeElements = await page.$x("//span[contains(., 'M')]");
    // let sSizeElements = await page.$x("//span[contains(., 'S')]");
    // let lSizeElements = await page.$x("//span[contains(., 'L')]");
    // // console.log(sSizeElements)
    // console.log(mSizeElements[0])
    // // console.log(lSizeElements)
    // if (await page.$("//span[contains(., 'M')]") != null) {
    //   await mSizeElements[0].click();
    // } else if (await sSizeElements.length > 0) {
    //   await sSizeElements[0].click();
    // } else if (await lSizeElements.length > 0) {
    //   await lSizeElements[0].click();
    // }



    // const [span] = await page.$x("//button[@class='kTLayg']/span[contains(., 'M')]");


    // var mSizeElements = await page.$x("//span[text()='M']");
    // var sSizeElements = await page.$x("//span[text()='S']");
    // var lSizeElements = await page.$x("//span[text()='L']");
    // var xlSizeElements = await page.$x("//span[text()='XL']");
    // var xsSizeElements = await page.$x("//span[text()='XS']");
    // await page.waitForTimeout(1000)
    // console.log(sSizeElements[0])

    // if (mSizeElements.length > 0) {
    //   await page.waitForTimeout(300)
    //   await mSizeElements[0].click();
    //   console.log("klik \n")
    //   await page.waitForTimeout(300)
    // }
    // if (sSizeElements.length > 0) {

    //   await sSizeElements[0].click();
    //   console.log("klik \n")

    // }
    // if (lSizeElements.length > 0) {

    //   await lSizeElements[0].click();
    //   console.log("klik \n")

    // }
    // if (xlSizeElements.length > 0) {

    //   await xlSizeElements[0].click();
    //   console.log("klik \n")

    // }
    // if (xsSizeElements.length > 0) {

    //   await xsSizeElements[0].click();
    //   console.log("klik \n")

    // }
    /**============================================
     *                Skurwysynu click
     *=============================================**/
    // await page.$eval("button[class='styles__ArticleSizeButton-sc-1n1fwgw-0 jIVZOs'", elem => elem.click());
    var btn = await page.$("button[class='styles__ArticleSizeButton-sc-1n1fwgw-0 jIVZOs'")
    // var spanik = await page.evaluateHandle(e => e.children, btn);
    // let value = await spanik.evaluate(el => el.textContent)
    let valueBtn = await btn.evaluate(el => el.textContent)
    // console.log(value)
    console.log(valueBtn)
    console.log("\n \n \n \n \n \n \n \n \n \n \n")

    await page.waitForTimeout(100)
    // =================================================================
    const btns = await page.$$("button[class='styles__ArticleSizeButton-sc-1n1fwgw-0 jIVZOs'")
    await page.waitForTimeout(100)
    for (let i = 0; i < btns.length; i++) {
      const tweet = await (await btns[i].getProperty('innerText')).jsonValue();
      console.log(tweet);
      if (tweet.includes("M")) {
        btns[i].click();
      } else if (tweet.includes("S") && !tweet.includes("XS") && !tweet.includes("XXS")) {
        btns[i].click();
      }
    }



    // const data = await page.$eval("//span[text()='M']", el => {
    //   el.click()
    // });
    // await page.waitForTimeout(200)
    // const example = await page.evaluate(element => {
    //   element[0].click();
    // }, (await page.$x('//span[text()="M"]'))[0]);



    await page.waitForTimeout(200)
    // let aElementsWithKoszyk = await page.$x(
    //   "//span[contains(., 'Do koszyka')]"
    // );
    // await aElementsWithKoszyk[0].click();
    await page.$eval("button[class='styles__Wrapper-sc-causv5-0 jelrHA auto-tests-add-to-cart-button articleButton___add-to-cart___25lRs core___flipper___2fuhC'", elem => elem.click());
    await page.goBack();
    productsArr = await page.$$(".vMpOO");
    await page.waitForTimeout(200)
    // Po wejsciu rozmiar - ten button class który nie jest disabled
    // 2 opcja: click jIVZOs
  }
  await browser.close();
})();