from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/about')

    # Check elements and wait for loading
    page.wait_for_selector('.social-links')
    print("Social links found.")

    # focus first social link
    social_links = page.locator('.social-link').all()
    if social_links:
        social_links[0].focus()
        page.screenshot(path='focus_social_link.png')
        print("Social link focused and screenshot saved.")

    browser.close()
