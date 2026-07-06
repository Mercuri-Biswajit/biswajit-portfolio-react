from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/about')

    # Check elements and wait for loading
    page.wait_for_selector('.social-links')

    # focus first social link and scroll it into view before screenshotting
    social_links = page.locator('.social-link')
    social_links.first.focus()
    social_links.first.scroll_into_view_if_needed()
    social_links.first.screenshot(path='focus_social_link_element.png')

    browser.close()
