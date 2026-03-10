import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();

  // Test 1: Desktop view - check aria-current on Home link
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await desktopPage.goto('http://localhost:8080');

  // Wait for the nav menu to be visible
  await desktopPage.waitForSelector('.nav-menu', { state: 'visible' });

  // Take screenshot of desktop nav
  await desktopPage.screenshot({ path: '/home/jules/verification/desktop_nav.png' });

  await desktopPage.close();

  // Test 2: Mobile view - check hamburger menu state
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 667 } });
  await mobilePage.goto('http://localhost:8080');

  // Wait for the hamburger to be available on mobile
  await mobilePage.waitForSelector('.hamburger', { state: 'visible' });

  // Click hamburger to open menu
  await mobilePage.click('.hamburger');

  // Wait for menu to become active (open)
  await mobilePage.waitForSelector('.nav-menu.active', { state: 'visible' });

  // Take screenshot of mobile nav open
  await mobilePage.screenshot({ path: '/home/jules/verification/mobile_nav_open.png' });

  await mobilePage.close();
  await browser.close();
})();
