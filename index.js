const puppeteer = require("puppeteer");

(async () => {
  let movieUrl =
    //   "https://www.imdb.com/title/tt6751668/?ref_=hm_fanfav_tt_2_pd_fp1";
    "https://www.decathlon.co.uk/hex-dumbbell-10-kg-id_8353801.html#v2013939";

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(movieUrl, { waitUntil: "networkidle2" }); // Telling the browser that the navigation is finished when there are no more than two network connections for at least half of a sec

  let data = await page.evaluate(() => {
    let item = document.querySelector('span[itemprop="name"]').innerText;
    let availability = document.querySelector('span[class="unavailability"]')
      .innerText;
    let price = document.querySelector('span[id="real_price_value"]').innerText;
    // let title = document.querySelector('div[class="title_wrapper"] > h1')
    //   .innerText;
    // let rating = document.querySelector('span[itemprop="ratingValue"]')
    //   .innerText;
    // let ratingCount = document.querySelector('span[itemprop="ratingCount"]')
    //   .innerText;

    return {
      item,
      availability,
      price,
    };
  });
  console.log(data);

  debugger;

  await browser.close();
})();
