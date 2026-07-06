from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/about')

    # Check elements and wait for loading
    page.wait_for_selector('.social-links')
    print("Social links found.")

    print("Social Links on About page:")
    for el in page.locator('.social-links a').all():
        print(f"  - text: '{el.inner_text()}', aria-label: '{el.get_attribute('aria-label')}', href: '{el.get_attribute('href')}'")

    browser.close()
