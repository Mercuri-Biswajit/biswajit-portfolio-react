from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch() # headless=True is default
    page = browser.new_page()
    page.goto('http://localhost:4173/')

    # Check elements and wait for loading
    page.wait_for_selector('nav')
    print("Navigation found.")

    # focus first link
    page.locator('.nav-link').first.focus()
    page.screenshot(path='focus_nav_link.png')
    print("Nav link focused and screenshot saved.")

    # set mobile viewport for hamburger
    page.set_viewport_size({"width": 375, "height": 667})

    # focus hamburger
    page.locator('.hamburger').focus()
    page.screenshot(path='focus_hamburger.png')
    print("Hamburger focused and screenshot saved.")

    # check resume button focus
    page.locator('.btn-nav-cta').focus()
    page.screenshot(path='focus_nav_cta.png')
    print("Nav CTA focused and screenshot saved.")

    browser.close()
