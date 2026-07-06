from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/')

    page.wait_for_selector('.footer')

    # Check footer link focus
    footer_links = page.locator('.footer-logo-link')
    footer_links.first.focus()
    footer_links.first.scroll_into_view_if_needed()
    footer_links.first.screenshot(path='focus_footer_logo.png')

    browser.close()
