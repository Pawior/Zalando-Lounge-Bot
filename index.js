const puppeteer = require("puppeteer");
const campaign = "ZZO1MYN";
let productsArr;
const addToCart = async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto(`https://www.zalando-lounge.pl/#/login`);

  await page.goto(`https://www.zalando-lounge.pl/campaigns/${campaign}`);

  let productsArr = await page.$$(".vMpOO");

  for (let i = 6; i < 20; i++) {
    await productsArr[i].click();

    await page.waitForSelector(".jIVZOs");

    /**============================================
     *                Skurwysynu click
     *=============================================**/

    var btn = await page.$(
      "button[class='styles__ArticleSizeButton-sc-1n1fwgw-0 jIVZOs'"
    );

    let valueBtn = await btn.evaluate((el) => el.textContent);

    console.log(valueBtn);
    console.log("\n \n \n \n \n \n \n \n \n \n \n");

    await page.waitForTimeout(100);

    const btns = await page.$$(
      "button[class='styles__ArticleSizeButton-sc-1n1fwgw-0 jIVZOs'"
    );
    await page.waitForTimeout(100);
    for (let i = 0; i < btns.length; i++) {
      const tweet = await (await btns[i].getProperty("innerText")).jsonValue();
      console.log(tweet);
      if (tweet.includes("M")) {
        btns[i].click();
      } else if (
        tweet.includes("S") &&
        !tweet.includes("XS") &&
        !tweet.includes("XXS")
      ) {
        btns[i].click();
      }
    }

    await page.waitForTimeout(200);

    await page.$eval(
      "button[class='styles__Wrapper-sc-causv5-0 jelrHA auto-tests-add-to-cart-button articleButton___add-to-cart___25lRs core___flipper___2fuhC'",
      (elem) => elem.click()
    );
    await page.goBack();
    productsArr = await page.$$(".vMpOO");
    await page.waitForTimeout(200);
  }
  await browser.close();
};

addToCart();
