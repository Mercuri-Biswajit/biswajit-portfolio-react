from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/projects')
    page.wait_for_selector('.project-card')
    card = page.locator('.project-card').first
    card.focus()
    card.screenshot(path='focus_project_card.png')
    browser.close()
