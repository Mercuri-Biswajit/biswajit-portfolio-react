from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:4173/')

    # Check elements and wait for loading
    page.wait_for_selector('nav')
    print("Navigation found.")

    # Analyze some components
    print("Links:")
    for el in page.locator('a').all():
        print(f"  - text: '{el.inner_text()}', aria-label: '{el.get_attribute('aria-label')}', href: '{el.get_attribute('href')}'")

    print("Buttons:")
    for el in page.locator('button').all():
        print(f"  - text: '{el.inner_text()}', aria-label: '{el.get_attribute('aria-label')}'")

    browser.close()
