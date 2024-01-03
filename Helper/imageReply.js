const imageReply1 = async (msgInfo, ctx, address, page) => {
  try {
    const info = await msgInfo;

    await page.setViewport({ width: 1536, height: 900 });
    await page.goto(`https://rugcheck.xyz/tokens/${address}`);
    await page.waitForSelector(
      "#token-show > div > div.row.my-3 > div:nth-child(1) > div > div.card-body.text-center > div > div.risk.mb-3 > h1"
    );

    const screenshot = await page.screenshot({});

    await ctx.telegram.editMessageText(
      info.chat.id,
      info.message_id,
      info.message_id,
      `Here is your ScreenShot`
    );
    await ctx.replyWithPhoto({ source: screenshot });
  } catch (error) {
    console.error(error);
    const info = await msgInfo;
    ctx.telegram.editMessageText(
      info.chat.id,
      info.message_id,
      info.message_id,
      `Some error occurred, try again later!`
    );
  }
};

const imageReply = async (msgInfo, ctx, address, browser) => {
  try {
    const allPages = await browser.pages();
    console.log(allPages.length);
    if (allPages.length < 6) {
      const page = await browser.newPage();
      imageReply1(msgInfo, ctx, address, page);
    } else {
      for (let i = 0; i < allPages.length; i++) {
        
          await allPages[i].close();
      }
      const page = await browser.newPage();
      imageReply1(msgInfo, ctx, address, page);
    }
  } catch (err) {
    console.log(err);
  }
};

export default imageReply;
