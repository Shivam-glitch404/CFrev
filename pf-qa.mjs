export default async function run(page) {
  // scroll through the page so every lazy image loads, then back to top
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 150);
        else res();
      };
      step();
    });
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "C:/Users/HP/Downloads/CherishForever_final/.screenshots/pf-top.png",
  });
  await page.evaluate(() =>
    window.scrollTo(0, document.body.scrollHeight * 0.45),
  );
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "C:/Users/HP/Downloads/CherishForever_final/.screenshots/pf-mid.png",
  });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  await page.screenshot({
    path: "C:/Users/HP/Downloads/CherishForever_final/.screenshots/pf-bottom.png",
  });
  return "done";
}
