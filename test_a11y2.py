from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/')

    # Check elements and wait for loading
    page.wait_for_selector('footer')
    print("Footer found.")

    print("Social Links:")
    for el in page.locator('footer a').all():
        print(f"  - text: '{el.inner_text()}', aria-label: '{el.get_attribute('aria-label')}', href: '{el.get_attribute('href')}'")

    browser.close()
