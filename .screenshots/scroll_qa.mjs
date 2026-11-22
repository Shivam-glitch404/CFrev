export default async function run(page) {
  // Scroll through the page to trigger lazy-loading and reveal animations
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1500);
  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll("img")].map((i) => ({
      src: i.src.split("/").pop(),
      ok: i.complete && i.naturalWidth > 0,
    })),
  );
  return imgs;
}
