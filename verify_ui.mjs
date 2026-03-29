import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 } // mobile view to make hamburger visible
  });

  await page.goto('http://localhost:8080');

  // Wait for the hamburger to be available on mobile
  await page.waitForSelector('.hamburger', { state: 'visible' });

  // Ensure 'aria-expanded' correctly functions when toggle clicked
  await page.click('.hamburger');
  let expanded = await page.getAttribute('.hamburger', 'aria-expanded');
  console.log('aria-expanded when open: ', expanded);

  await page.click('.hamburger');
  expanded = await page.getAttribute('.hamburger', 'aria-expanded');
  console.log('aria-expanded when closed: ', expanded);

  // Ensure HOME has aria-current='page'
  let homeCurrent = await page.getAttribute('.nav-menu a[href="/"]', 'aria-current');
  console.log('aria-current on Home Link: ', homeCurrent);

  await browser.close();
})();
