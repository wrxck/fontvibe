export async function captureScreenshot(url: string): Promise<{ screenshot: string }> {
  try {
    const puppeteer = await import('puppeteer-core');
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome-stable',
      headless: true,
      args: ['--no-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });

    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();

    return { screenshot: screenshot as string };
  } catch (err) {
    throw new Error(
      `screenshot failed: ${err instanceof Error ? err.message : 'puppeteer-core not installed — add it as an optional dependency'}`
    );
  }
}
