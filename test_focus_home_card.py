from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/')
    page.wait_for_selector('.hpc-card')
    card = page.locator('.hpc-card').first
    card.focus()
    card.screenshot(path='focus_home_card.png')
    browser.close()
